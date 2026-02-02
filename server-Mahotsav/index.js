const express = require('express');
require('dotenv').config();
const { default: mongoose } = require('mongoose');
const app = express();
const PORT = process.env.PORT | 3000;
const cors = require('cors');

mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("MongoDB Connected"));

const models = require("./models/participants")

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.post('/', async (req, res)=>{
    const body = req.body;
    try{
        const model = models[body.eventName];
        if(model.schema ===  models["individualSchema"]){
            await model.create({
                Name: body.name,
                Email: body.email,
                Mobile_Number: body.mobileNo,
                Branch: body.branch
            })
        }
        else{
            await model.create({
                Team_Name: body.tName,
                Team_Leader: body.lName,
                Leader_Email: body.lEmail,
                Leader_Mobile_No: body.lMobile,
                Leader_Branch: body.lBranch,
                Members: [...body.members]
            })
        }
        return res.json({success: true});
    } catch(err){
        console.log(err);
        return res.json({success: false});
    }
});

app.listen(PORT, ()=>{
    console.log("Server started at PORT: ", PORT)
})