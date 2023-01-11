const express=require('express');
const cors=require('cors');
const router=require('./route');
var PORT=process.env.PORT || 5000;
const app=express();
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.json()) // middleware for parsing application/json
var mysql=require('mysql');

app.use('',router);
var con=mysql.createConnection({
    user:"phisham100",
    password:"Hisham@20",
    database:"sql_project"
});
con.connect((err)=>{
        if(err)
            throw err;
        console.log("Connected");
    
});
app.listen(3000,(req,res)=>{
    console.log("Server started on 3000");
})