import mongoose from "mongoose"; // mongoose import කරනවා.

// Student Schema එක app.post එකෙන් එළියට ගන්නවා. මේක එක පාරක් හදන්න ඕනේ.
const studentSchema = mongoose.Schema({
  name: String, // නම string විදියට ගන්නවා.
  age: Number, // වයස අංකයක් විදියට ගන්නවා.
  gender: String, // ස්ත්‍රී/පුරුෂ භාවය string විදියට ගන්නවා.
});

const Student = mongoose.model("students", studentSchema); // "students" collection එකට Student model එක හදනවා.

export default Student; // Student model එක export කරනවා.
