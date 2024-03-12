import mongoose from 'mongoose';


const UserSchema= new mongoose.Schema({   
    username:{
        type: String,
        required:true,
        unique:true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password: {
        type: String,
        required:true
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    country:{
        type: String,
        required: true,
    },
    img:{
        type: String,
    },
    city:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },





}, {timestamps:true})


// Middleware to handle duplicate key error
UserSchema.post('save', function(error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        if (error.keyPattern && error.keyPattern.email) {
            next(new Error('Email already exists'));
        } else if (error.keyPattern && error.keyPattern.username) {
            next(new Error('Username already exists'));
        } else {
            next(new Error('Duplicate key error'));
        }
    } else {
        next(error);
    }
});

export default mongoose.model("User", UserSchema)
