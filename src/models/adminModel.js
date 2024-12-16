import mongoose from 'mongoose';

//define schema for admin 
const adminUser = new mongoose.Schema({
    username: { type: String, required: true, unique: true, minlength:5, maxlength: 10},
    email: { type: String, required: true, unique: true, lowercase: true},
    password: { type: String, required: true, minlength:5, maxlength: 70},
}, {timestamps: true})

// Create the admin model based on the schema
const Admin = mongoose.model('Admin', adminUser);

// Export the user model
export default Admin;