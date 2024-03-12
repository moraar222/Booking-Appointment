import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../routes/utils/error.js"
import jwt from "jsonwebtoken"

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const register = async (req, res, next) => {
  try {
      const { username, email, password } = req.body;
      
      const errors = [];
      if (!username) errors.push("Username is required!")
      if (!email) errors.push("Email is required!")
      if (!password) errors.push("Password is required!")
      if (password && !passwordRegex.test(password)) 
        errors.push("Invalid password, needs to have at least one uppercase and lowercase letter, 1 digit and 1 special character")

      if (errors.length > 0) return res.status(400).send(errors)

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const newUser = new User({
          ...req.body,
          password: hash,
      });

      await newUser.save();
      res.status(200).send("User has been created.");
  } catch (err) {
      next(err);
  }
};

export const login = async (req,res,next) => {
    try{
        const user = await User.findOne({username:req.body.username})
        if(!user) return next(createError(404, "User not found"))

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if(!isPasswordCorrect) return next(createError(404, "Wrong Password or username"))

        const token = jwt.sign({id:user._id, isAdmin:user.isAdmin}, process.env.JWT)


        const {password, isAdmin, ...otherDetails} = user._doc
        res.cookie("access_token", token, {
            httpOnly:true,
        }).status(200).json({...otherDetails, token })
    }catch(err){
        next(err)
    }
}
export const Register = async (req,res,next) => {
    try{
        const user = await User.findOne({username:req.body.username})
        if(!user) return next(createError(404, "Username is Required"))

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if(!isPasswordCorrect) return next(createError(404, "Invalid password, needs to have at least one uppercase and lowercase letter,"))

        const isEmailCorrect = await bcrypt.compare(req.body.password, user.password)
        if(!isEmailCorrect) return next(createError(404, "Wrong Email Format"))

        const token = jwt.sign({id:user._id, isAdmin:user.isAdmin}, process.env.JWT)


        const {password, isAdmin, ...otherDetails} = user._doc
        res.cookie("access_token", token, {
            httpOnly:true,
        }).status(200).json({details:{...otherDetails}, token, isAdmin })
    }catch(err){
        next(err)
    }
}