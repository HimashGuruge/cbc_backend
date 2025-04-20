import User from '../models/user.js';
import bcrypt from 'bcrypt'; // bcrypt ආනයනය කරනවා මුරපද හැෂ් කිරීම සඳහා.
import {strlen} from "../function.js"; // ලිපි දිග පරීක්ෂා කිරීම සඳහා අභිරුචි ෆන්ක්ෂන් එකක් ආනයනය කරනවා.
import jwt from 'jsonwebtoken'; // JWT ආනයනය කරනවා පරිශීලකයාගේ තොරතුරු සුරක්ෂිත කිරීම සඳහා.
import dotenv from 'dotenv';

dotenv.config();

// දත්ත සමුදායෙන් පරිශීලකයා ලබා ගැනීම find() භාවිතයෙන්
export function getuser(req, res) {
   
    User.find().then((userList) => {
    
        res.json({
            list: userList // userList එක JSON ආකාරයෙන් පිළිතුර යවනවා.
        });
        
    
    });
}

export function createUser(req, res) {

    const newUserData = req.body;

    newUserData.password = bcrypt.hashSync(newUserData.password, 10); // මුරපදය bcrypt භාවිතයෙන් හැෂ් කරනවා.

    const user = new User(newUserData); // ඉල්ලීමේ බොඩිය භාවිතයෙන් නව පරිශීලක වස්තුවක් සාදනවා.
    user.save().then(
        () => {
            res.json({
                message: "User Created", // සාර්ථක පණිවිඩයක් JSON ආකාරයෙන් යවනවා.
            });
        }
    ).catch(() => {
        res.json({
            message: "Error", // දෝෂ පණිවිඩයක් JSON ආකාරයෙන් යවනවා.
        });
    });
}



export function loginUser(req, res) {
    // ඊමේල් එක භාවිතා කරලා ඩේටාබේස් එකේ යූසර් හොයනවා
    User.find({ email: req.body.email }).then((userList) => {
        // යූසර්ලා හමු නොවුණොත්
        if (userList.length == 0) {
            res.json({
                message: "User Not Found" // පරිශීලකයා හමු නොවුණු පණිවිඩයක් JSON ආකාරයෙන් යවනවා
            });
        } else {
            // පළවෙනි යූසර් එක ගන්නවා
            const user = userList[0];

            // ලබා දුන් මුරපදය ඩේටාබේස් එකේ හැෂ් කරපු මුරපදය එක්ක සසඳනවා
            const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);

            // මුරපදය හරි නම්
            if (isPasswordCorrect) {
                // JWT ටෝකනයක් හදනවා, යූසර්ගේ තොරතුරු එක්ක
                const token = jwt.sign({
                    email: user.email,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    isBlocked: user.isBlocked,
                    type: user.type,
                    profilepicture: user.profilepicture
                }, process.env.SECRET);

                // සාර්ථක ලොගින් පණිවිඩයක් එක්ක ටෝකනය යවනවා
                res.json({
                    message: "Login Success",
                    token: token
                });
            }
        }
    });
}






 