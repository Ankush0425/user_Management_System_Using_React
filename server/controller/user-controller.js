import { response } from 'express';
import { User } from '../model/user.js';
import mongoose from 'mongoose';

export const addUser = async (req, res) => {
  const user = req.body;

  const newUser = new User(user);
  
  try {
    // Saving into the database
    await newUser.save();
    res.status(201).json({ response: newUser });
  } catch (error) {
    res.status(401).json({ response: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({response: users});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const editUser = async (req, res) => {
  try {
    const isValidId = mongoose.isValidObjectId(req.params.id);
    if (!isValidId) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const user = await User.findOne({ _id: req.params.id });
    res.status(200).json({response: user});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const editingUser = async (req, res) => {
  let user = req.body;
  try {
    const newUser = await User.findOneAndUpdate({ _id: req.params.id }, user, {new: true});
    res.status(201).json({response: newUser});
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try{
      await User.deleteOne({ _id: req.params.id });
      return res.status(200).json({response: "User deleted successfully!"})
  }catch(error){
    return res.status(409).json( {message: error.message} )
  }
}

