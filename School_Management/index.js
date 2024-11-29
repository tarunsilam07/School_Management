const express=require('express')
const dotenv=require('dotenv');
const schoolRouter=require('./routes/schoolRouter')

const app=express();
dotenv.config();

const PORT=process.env.PORT || 3000;

app.use(expres.json());
app.use('/',schoolRouter);

app.listen(PORT,()=>{
    console.log(`Server Started at PORT:${PORT}`);
})