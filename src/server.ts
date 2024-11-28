import express from 'express';
import dotenv from 'dotenv';
dotenv.config()
import cors from 'cors';
import connectDb from './config/dbConfig';
import shortUrl from './routes/shortUrl';



const port = process.env.PORT || 5000;

const app = express()

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))

app.get('/',(req,res)=>{
    res.send("Hello World")
})

//connect DB
connectDb()

//routes
app.use("/api/",shortUrl);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})
