import express from "express"
import { initDatabase } from "./db/database.js"
import hydrationRoutes from './routes/hydration.js';
const app = express();
const PORT = 5001;
app.use(express.json())
initDatabase();

app.use('/api/hydration', hydrationRoutes);



app.listen(PORT , ()=>{console.log("Server running on " + PORT)});