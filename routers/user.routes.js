const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const {  userSchema } = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// get all user
router.get("/", async (req, res) => {
    try {
        const alldata = await userSchema.find()
        res.json(alldata)
    }
        
    catch (error) {
        res.status(500).json({
            error
        })

    }
});

// create user
router.post("/create", async (req, res) => {
        let data = req.body
        let user = await userSchema.findOne({ email:data.email});
        let newUser;
        // Hash the password
        data.password = await bcrypt.hash(data.password, 10);

        if (!user) {
            newUser = new userSchema(data)
            user = await newUser.save()
            return res.status(200).json({
                data: user,
                messaage: "inserted successful"
            })

        }
        res.status(200).json({
            messaage: "Username is alredy existed"
        })
    }
); 

//update user
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
  
    // Find the user by ID and update it
    userSchema.findByIdAndUpdate(id, updatedData, { new: true }, (err, updatedModel) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update user' });
      } else {
        res.status(200).json(updatedModel);
      }
    });
  });

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params 
        const user_data = await userSchema.findOne({ _id: id})
        await user_data.save()
        res.json(user_data)
    }
    catch (error) {
        res.status(500).json({
            error
        })

    }
});

// Delete an user by ID
router.delete('/:id', async (req, res) => {
    const userId = req.params.id;

      const deletedUser = await userSchema.findByIdAndDelete(userId);
  
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ message: 'User deleted successfully', deletedUser });
    });
module.exports = router;