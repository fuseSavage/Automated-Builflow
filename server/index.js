const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ["GET", "POST", "DELETE"],
    credentials: true
}))


app.listen(3001, () => {
    console.log('Server is running...')
})