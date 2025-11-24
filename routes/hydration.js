import express from 'express'
import db from '../db/database.js';
import { getHydrationReminder, calculateDailyProgress } from '../utils/reminders.js';


const router = express.Router();
const DRINK_TYPES = ['water', 'tea', 'coffee', 'juice', 'milk', 'soda', 'sports drink', 'other'];

router.post("/" , async(req,res)=>{
    try{
        const{amount_litres,drink_type = 'water',notes} = req.body;

        if(!amount_litres || amount_litres<=0){
            return res.status(400).json({
                error : "Amount in litres is required and must be greater than 0"
            })
        }

     if (!DRINK_TYPES.includes(drink_type)) {
      return res.status(400).json({ 
        error: `Invalid drink type. Must be one of: ${DRINK_TYPES.join(', ')}` 
      });
    }

    const timestamp = new Date().toISOString();
    const str = db.prepare(`
        INSERT INTO hydration_entries (amount_litres,timestamp,drink_type,notes) VALUES (?,?,?,?)
    `);

        const result = str.run(amount_litres, timestamp, drink_type, notes || null);

        res.status(201).json({
            success:true,
            message : "Hydration entry added successfully",
            entry:{
                id: rresult.lastInsertRowid,
                amount_litres,
                timestamp,
                drink_type,
                notes
            }
        })
   }
   catch(error){
    console.error("Error adding hydration entry:" , error);
    res.status(500).json({error: "Filed to add hydration entry"})
   }
})

router.get("/" , async(req,res)=>{
    try{
      const lastEntry = db.prepare(`
      SELECT * FROM hydration_entries 
      ORDER BY timestamp DESC 
      LIMIT 1
    `).get();

    const todayStart = new Date();
    todayStart.setHours(0,0,0,0);
    const todayStartISO = todayStart.toISOString();

    const todayEntries = db.prepare(`
        SELECT * FROM hydration_entries
        WHERE timestamp >= ?
        ORDER BY timestamp DESC
        `).all(todayStartISO);

    const dailyProgress = calculateDailyProgress(todayEntries);
    const dailyGoal = calculateDailyGoal(dailyProgress.totalLitres);

    let reminder = null;
    if(lastEntry){
        reminder = getHydrationReminder(lastEntry.timestamp);
    }
    else{
        reninder = {
            type : "urgent",
            message: 'You haven\'t logged any water intake yet! Start hydrating now!'
        }
    }
    res.json({
        success : true,
        lastEntry,
        reminder,
        dailyGoal,
        todayEntries
    })
    }catch(error){
        console.error("Error fetching hydration data" , error)
        res.status(500).json({
            error : "failed to fetch hydration data"
        })
    }
})