const mongoose = require('mongoose');
const User = require('../models/users');
const FriendTrips = require('../models/friendTrips');
const jwt = require('jsonwebtoken');
const config = require('../config');
const ObjectId = mongoose.Types.ObjectId;

exports.registerUser = (req, res) => {
    const { name, email, username, password } = req.body;
    User.findOne({username}, function(err, existingUser) {
      if (err) {
        return res.status(422).send({success: false, message: err.errors});
      }
  
      if (existingUser) {
        return res.status(422).send({ success: false,
          message: "Username already there"});
      }

      const user = new User({
        name,
        email,
        username,
        password
      });
      user.save(async function(err) {
        if (err) {
          return res.status(422).send({success: false, message: err.errors});
        }

        const friendTripList = new FriendTrips({
          username,
          tripIDs: []
        })
        const friendList = await friendTripList.save()
        if(friendList){
          return res.status(200).send({
            message: "Registered Successful"});
        }else{
          return res.status(422).send({errors: [{title: 'Error!', detail: 'API failed to work'}]});
        }
  
       
      });



    })
    
        
     
    }

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    const resp = await User.findOne({ username, password });
   
    if (resp) {
      const token = jwt.sign({
        userId: resp._id,
        username: resp.username
      }, config.SECRET, { expiresIn: '1h'});
      
      return res.status(200).send({
        message: token})
    } else {
      return res.status(422).send({errors: [{title: 'Error!', detail: 'API failed to work'}]});

    }
  }

exports.getUsers = async (req, res) => {
    const resp = await User.find({}, {"_id": 0, "username": 1, "email":2});
    if (resp) {
      res.status(200).send(resp)

    } else {
      return res.status(422).send({errors: [{title: 'Error!', detail: 'API failed to work'}]});

    }
  }

  exports.authMiddleware = function(req, res, next) {
    const token = req.headers.authorization;
      if (token) {
        let user = {}
        try{
           user = parseToken(token);
        }
        catch(e){
          return res.status(422).send({errors: e});

        }
        
        User.findOne({_id: ObjectId(user.userId)}, function(err, {_id, name, email, username}) {
          if (err) {
            return res.status(422).send({errors: err.errors});
          }
    
          if (user) {
            res.locals.user = {_id, name, email, username};
            next();
          } else {
            return notAuthorized(res);
          }
        })
      } else {
        return notAuthorized(res);
      }
    }
    
    function parseToken(token) {
      return jwt.verify(token.split(' ')[1], config.SECRET);
    }
    
    function notAuthorized(res) {
      return res.status(401).send({errors: [{title: 'Not authorized!', detail: 'You need to login to get access!'}]});
    }
    
  

  exports.getSingleUser = async (req,res) => {
    const username = req.params.username
    const resp = await User.findOne({ username });
    if(resp){
      res.status(200).send(resp)
    }else{
      return res.status(422).send({errors: [{title: 'Error!', detail: 'API failed to work'}]});

    }
    
  }
