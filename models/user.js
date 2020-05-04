const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },

    tokens:[{
        token:{
            type: String,
        }
    }]
})




userSchema.methods.generateAuthToken = async function(){
    const jk =  this
   const token = await jwt.sign({_id:jk._id.toString()},process.env.token)  
   jk.tokens = jk.tokens.concat({ token })
    await jk.save()

    return token 
}


userSchema.statics.findByCredentials = async (email, password) => {
    const jk = await JK.findOne({ email })

    if (!jk) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, jk.password)

    if (!isMatch) {
        throw new Error('Unable to logi')
    }

    return jk
}

userSchema.pre('save', async function (next) {
    const jk = this

    if (jk.isModified('password')) {
        jk.password = await bcrypt.hash(jk.password, 8)
    }

    next()
})




const JK = mongoose.model('JK', userSchema)

module.exports = JK