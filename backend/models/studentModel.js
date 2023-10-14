const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, require: true },
    age: { type: Number, require: true },
    grade: { type: Number, require: true },
    email: { type: String, require: true },
},
{
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('student', studentSchema);