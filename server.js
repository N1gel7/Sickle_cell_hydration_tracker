import express from "express"
import { initDatabase } from "./db/database.js"

const app = express();
const PORT = 5000;
app.use(express.json())
initDatabase();




app.listen(PORT , ()=>{console.log("Server running on " + PORT)});