const user_router = require("./routers/user-router");
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 5000;

app.use(express.json());
app.use("/auth",user_router);
const start = async () => {
    try{
        await mongoose.connect("mongodb+srv://manhattan:root@dia-task.9vpfpm4.mongodb.net/?retryWrites=true&w=majority",{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        app.listen(port,()=> {
            console.log(`Server starting on ${port}`)
        })
    } catch (e) {
        console.log(e);
    }
}
start();