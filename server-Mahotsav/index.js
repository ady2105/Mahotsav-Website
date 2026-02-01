const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const PORT = process.env.PORT | 3000;
const cors = require('cors');

mongoose.connect(`mongodb+srv://zeesh_uchiha:zeeshan@cluster0.s29ojh6.mongodb.net/Mahotsav?appName=Cluster0`)
    .then(()=>console.log("MongoDB Connected"));

const Participants = require("./models/participants");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.post('/', (req, res)=>{
    const body = req.body;
    console.log(body);
    return res.json({success: true});
});

app.get('/', async (req, res)=>{
    await Participants.create({
        name: "Zeeshan",
        event: "brush attack",
        email: "zq8281@gmail.com",
        branch: "Computer Science",
        year: 2
    })
    return res.json({success: true});
});

app.listen(PORT, ()=>{
    console.log("Server started at PORT: ", PORT)
})