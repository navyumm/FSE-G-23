// Register Controller

const { User } = require("../models");

exports.register = async (req, res) => {
try {
        const { name, email, password } = req.body
    
        if(!name || !email || !password){
            return res.status(400).json({ message: "All fields requird"});
        }
    
       const existingUser = await User.findOne({where: {email}});
       if(existingUser){
            return res.status(400).json({ message: "User already exists"});
       }
    
       const user = await User.create({
        name,
        email,
        password
       })
    
       res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: {
            id: user.id,
            name: user.name,
            email: user.emai,
        }
       })
} catch (error) {
    res.status(500).json({
        message: error.message
    })
}


}



exports.login = () => {}