
import { mongo } from "mongoose";
import Student from "../models/student.js"; // studentModel එක import කරනවා.




export function getStudent(req, res) {
   
    Student.find().then((studentList) => {
    
        res.json({
            list: studentList // studentList එක JSON විදියට පිළිතුර යවනවා.
        });
        
    
        });
    
    }


    // add student to mongodb

export function createStudent(req, res) {
    const student = new Student({ // Student එකක් හදනවා.
        name: req.body.name, // req.body.name එක Student එකට assign කරනවා.
        age: req.body.age, // req.body.age එක Student එකට assign කරනවා.
        email: req.body.email, // req.body.email එක Student එකට assign කරනවා.
        phone: req.body.phone, // req.body.phone එක Student එකට assign කරනවා.
        address: req.body.address, // req.body.address එක Student එකට assign කරනවා.
    });


    student.save().then(() => { // student එක save කරනවා. 
        res.json({ // JSON විදියට පිළිතුර යවනවා.
            message: "Student added successfully" // message එක JSON විදියට පිළිතුර යවනවා.
        });
    });
}


