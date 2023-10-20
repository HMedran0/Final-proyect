const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, require: true },
    last_name: {type: String, requrie: true},
    age: { type: Number, require: true },
    company: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    role: { type: String, default: 'regular' }
},
{
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('student', studentSchema);