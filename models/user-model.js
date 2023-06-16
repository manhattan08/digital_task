const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    login:{type:String,unique:true,require:true},
    email:{type:String,unique:true,require:true},
    phone:{type:String,unique:true,require:true},
    name:{type:String,require:true},
    password:{type:String,require:true}
});

module.exports = model("User",UserSchema);