const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String },
    last_name: {type: String },
    age: { type: Number },
    company: { type: String },
    email: { type: String, require: true },
    password: { type: String, require: true },
    role: { type: String, default: 'regular' }
},
{
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('users', studentSchema);