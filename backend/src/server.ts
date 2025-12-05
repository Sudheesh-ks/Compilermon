import express from 'express';
import dotenv from 'dotenv';
dotenv.config()

const app = express();

const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.send("API is working.....")
})


app.listen(PORT, () => {
    console.log(`Server connected successfully on ${PORT}`);
})