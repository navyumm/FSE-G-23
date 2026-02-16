// Register Controller

const { where } = require("sequelize");
const { User } = require("../models");
const { hashPassword, comparePassword } = require("../utils/bcrypt");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields requird" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.emai,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is requird" });
    }

    if (!password) {
      return res.status(400).json({ message: "Password is requird" });
    }

    const user = await User.findOne({where : {email}})
    if(!user){
        return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await comparePassword(password, user.password);
    
    if (!isMatch) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    res.status(201).json({
        success: true,
        message: "Login successfully",
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }  
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
