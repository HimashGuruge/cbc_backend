import express from "express";


import {getStudent, createStudent  } from "../contollers/studentController.js";

//create studentRouter 
const studentRouter = express.Router(); // Express එකෙන් studentRouter එකක් හදනවා.

studentRouter.get("/", getStudent); // "/" කියන ලිපිනයට GET ඉල්ලීමක් ආවම getStudent function එක වැඩ කරනවා.




studentRouter.post("/", createStudent); // "/" කියන ලිපිනයට POST ඉල්ලීමක් ආවම createStudent function එක වැඩ කරනවා.
            










export default studentRouter; // studentRouter එක export කරනවා.