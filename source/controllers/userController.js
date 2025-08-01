const User = require('../models/user.js')
const { 
  validateUserCreationInput,
  validateUsernameInDatabase,
  validateUserNOTInDatabase,
  validateUserUpdateInput
} = require('../middlewares/validators/userValidators.js');

const getAllUsers = async (req, res) => {
    try{
      const allUsers = await User.find();
      res.status(200).json(allUsers);
    } catch (error) {
      console.error('Error fetching users:', error); // Log the error
      res.status(500).json({ message: error.message });
    }
};

const getUser = async (req, res) => {
    try{
      // Database Validation: Check if user exists
      const userValidation = await validateUsernameInDatabase(req.body.username, req.params.id);
      if (!userValidation.isValid) {
        return res.status(404).json({ error: userValidation.message });
      }
      res.status(200).json(userValidation.user);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
};

const createUser = async (req, res) => {
    try { 
      // validate input
      const userValidation = await validateUserNOTInDatabase(req.body.username, null);
      if (!userValidation.isValid) {
        return res.status(400).json({ error: userValidation.message });
      }
      const userCreationValidation = await validateUserCreationInput(req.body);
      if (!userCreationValidation.isValid) {
        return res.status(400).json({ error: userCreationValidation.message });
      }

      // Set the creationDate to now
      const pacificDate = new Date().toLocaleString("en-US", { 
      timeZone: "America/Los_Angeles" 
      });
      req.body.creationDate = new Date(pacificDate).toISOString();

      const newUser = new User(req.body);
      // save user
      newUser.save();
      // print log
      console.log(newUser);
  
      res.status(201).json({
        message: "New User Created!",
        data: newUser
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
      const userValidation = await validateUsernameInDatabase(null, req.params.id);
      if (!userValidation.isValid) {
        return res.status(404).json({ error: userValidation.message });
      }
      
      const userUpdateValidation = await validateUserUpdateInput(req.body);
      if (!userUpdateValidation.isValid) {
        return res.status(400).json({ error: userUpdateValidation.message });
      }
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Return the updated document
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
      const userValidation = await validateUsernameInDatabase(req.body.username, req.params.id);
      if (!userValidation.isValid) {
        return res.status(404).json({ error: userValidation.message });
      }
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
};
  