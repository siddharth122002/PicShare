const express = require('express');
const dotenv = require('dotenv');
const router =require('./routes/routes')
const db = require('./utilities/connection')
const cors = require('cors');
const app = express();
dotenv.config();
db()

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors());
app.use('/api',router);

app.listen(3000,()=>{
    console.log(`listening on port ${process.env.PORT}`)
})