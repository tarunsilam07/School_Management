const express=require('express');
const mysql=require('mysql2');
const dotenv=require('dotenv');

const router=express.Router();
dotenv.config();

const db=mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    port:process.env.DB_PORT,
    waitForConnections:true,
    connectionLimit:5,
    queueLimit:0,
});

router.post('/addSchool',(req,res)=>{
    const {name,address,latitude,longitude}=req.body;
    if(!name || !address || !latitude || !longitude){
        return res.status(400).send({error:"Please make sure that all fields are filled"});
    }

    const query='INSERT INTO schools(name,address,latitude,longitude) VALUES(?,?,?,?)';

    db.query(query,[name,address,latitude,longitude],(errors,results)=>{
        if(errors) 
            return res.status(500).send({error:errors.message});
        res.status(201).send({msg:'School is successfully added',id:results.insertId});
    });
});

router.get('/schools',(req,res)=>{
    const{latitude,longitude}=req.query;

    if(!latitude || !longitude){
        return res.status(400).send({error:'Please pass the latitude and longitude as paramaters'});
    }

    const query='SELECT id,name,address,latitude,longitude FROM schools';
    db.query(query,(err,schools)=>{
        if(err)
            return res.status(500).send({error:err.message});

        const orderedSchools=schools.map((school)=>{
            const distance=Math.sqrt(Math.pow(school.latitude-latitude,2)+Math.pow(school.longitude-longitude,2));
            return {...school,distance};
        }).sort((a,b)=>a.distance-b.distance);

        res.send(orderedSchools);
    })
})

module.exports=router;