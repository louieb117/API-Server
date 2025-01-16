const User = require('../models/user.js')

const getAllUsers = async (req, res) => {
    try{
      const allUsers = await User.find();
      console.log(allUsers); // Log the result
      res.json(allUsers);
    } catch (error) {
      console.error('Error fetching users:', error); // Log the error
      res.status(500).json({ message: error.message });
    }
};

const getUser = async (req, res) => {
    try{
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found'});
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

const createUser = async (req, res) => {
    try { 
      // create a user
      const newUser = new User(req.body);
      // save user
      newUser.save();
      // print log
      console.log(testUser);
  
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    try{
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        // Return the updated document
        runValidators: true, // Ensure validation rules are applied
      });
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

module.export = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
};
  