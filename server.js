const express = require("express");
const app = express();

const port = 3000;
const User = require("./models/user");
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("database is connected");
  } catch (error) {
    console.log(error);
  }
};
connectDB();


// creating controllers
const getAll = (req, res) => {
  User
    .find()
    .then((user) => res.status(200).send(user))
    .catch((error) => res.status(500).send(error));
};

const createOne = (req, res) => {
  const { body } = req;
   User.findOne({ username: body.username },(err,user)=>{
    if (user) {
        return res
          .status(417)
          .send({ message: "Same userName is found,try another one" });
      }
      User
        .create({ ...body })
        .then(() => {
          res.status(201).send({ msg: "new user created" });
        })
  });
  
};

const updateOne = (req, res) => {
  const{id}=req.params
  const{body}=req
  if(!req.body){
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  User.findByIdAndUpdate(id,req.body)
  .then(user=>{
    if(!user)
      res.status(404).send({message:'cannot update'})
      User.username=body.username
  User.save()
  .then(()=>res.status(201).send({message:'user is updated successfully'}))  
  .catch((err)=>res.status(500).send(err))
  })
  .catch(err=>{
    res.status(500).send({
      message:'Error updating user'
    })
  })
};

const deleteOne = (req, res) => {
  const{id}=req.params
  findByIdAndRemove(id)
    .then(user => {
      if (!user) {
        res.status(404).send({
          message: `Cannot delete. Maybe user was not found!`
        });
      } else {
        res.send({
          message: "user was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete user"
      });
    });
};

// creating routes
const Router = require("express");
const router = Router();

router.get("/getAll", getAll);
router.post("/createOne/", createOne);
router.put("/updateOne/:id", updateOne);
router.delete("/deleteOne/:id", deleteOne);

app.use(express.json());
app.use(router);
app.listen(port, (err) => {
  err ? console.log(err) : console.log(`the server is running on port ${port}`);
});
