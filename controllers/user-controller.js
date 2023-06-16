const {validationResult} = require("express-validator");
const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const UserDto = require("../dtos/user-dto");
const tokenService = require('../services/token-service');

class UserController{
    async registration(req,res){
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const {email,password,name,login,phone} = req.body;
            const candidate = await UserModel.findOne({ $or: [{ email }, { phone }, { login }] });
            if(candidate){
                return res.status(400).json({ error: 'user with the same email/phone/login already exists' });
            }
            const hashPassword = bcrypt.hashSync(password,10);
            const user = await UserModel.create({email,password:hashPassword,name,login,phone})

            const userDto = new UserDto(user);
            const token = tokenService.generateToken({...userDto});

            return res.status(200).json({token,user:userDto})
        } catch (e) {
            return res.status(500).json(e)
        }
    }
    async login(req,res){
        try{
            const {login,password} = req.body;
            const user = await UserModel.findOne({
                $or: [{ email: login }, { phone: login }, { login }]
            });
            if(!user){
                return res.status(400).json({error:'no such user exists'})
            }
            const isPassEqual = bcrypt.compareSync(password,user.password);
            if(!isPassEqual)
                 return res.status(403).json({error:"incorrect password"})
            const userDto = new UserDto(user);
            const token = tokenService.generateToken({...userDto});

            return res.status(200).json({token,user:userDto});
        } catch (e) {
            return res.status(500).json(e)
        }
    }
}

module.exports = new UserController();