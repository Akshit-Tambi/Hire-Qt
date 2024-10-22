const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Connect to MongoDB
mongoose.connect("mongodb+srv://21ucs015:jkhdtjz0@cluster0.o6ql4ux.mongodb.net/hireQt");


const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    },    
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
})

// Add method to hash the password
userSchema.methods.createHash = async function (plainTextPassword) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(plainTextPassword, salt);
};

// Add method to validate the password
userSchema.methods.validatePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);


module.exports = {
    User
};