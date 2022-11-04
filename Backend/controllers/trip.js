const Trips = require("../models/trips");
const SingleTrip = require("../models/singletrip");
const FriendTrips = require('../models/friendTrips');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const config = require('../config');



exports.getTrips = async (req, res)=>{
    const user = res.locals.user;
    const resp = await Trips.find({username:user.username});
    if (resp) {
  
      res.status(200).send(resp);
    } else {
      return res.status(422).send({errors: [{title: 'Fetch Error!', detail: 'API failed to fetch the data'}]});
    }
  }


  exports.getSingleTripDetails = async (req, res) => {
    const tripId = req.params.tripid
    user = res.locals.user
    const singleTripDetails = await SingleTrip.findOne({tId: tripId});
    const singleTripMetaData = await Trips.findOne({"_id": ObjectId(tripId)});
    if (singleTripDetails && singleTripMetaData) {
      let obj = {}
      obj.metaData = singleTripMetaData
      obj.singleTripDetails = singleTripDetails
      res.status(200).send(obj);
    } else {
      return res.status(422).send({errors: [{title: 'Fetch Error!', detail: 'API failed to fetch the data'}]});
    }
    
   
    
  
  }


exports.addNewTrip = async (req, res)=>{
  const parts  = new Date().toLocaleDateString("en-GB")
  req.body.createdOn = parts

  req.body.username =res.locals.user.username
  const trip = new Trips(req.body);
  const addedTrip = await trip.save();

  const tripDays = []
  for (let index = 0; index < req.body.days; index++) {
    tripDays.push([
      {numberOfAct: 0},
      []
    ]);
    
  }

  const singleTripDetails = new SingleTrip({
    username:res.locals.user.username,
    tripname:req.body.name,
    tId: addedTrip._id,
    tripdata:tripDays
  });
  const saveTripDet = await singleTripDetails.save();
  if (saveTripDet && addedTrip) {
    return res.status(200).send({
      success:true,
      tripId: addedTrip._id
    })
  } else {
    return res.status(422).send({errors: [{title: 'Fetch Error!', detail: 'API failed to fetch the data'}]});
  }

  

}

exports.deleteTrip = async (req, res)=>{

  const tripToDel = req.params.tripid

  
  const tripDelSuccess = await SingleTrip.deleteOne({tId:tripToDel});
  const deleteTrip = await Trips.deleteOne({"_id":ObjectId(tripToDel)})
  

  
  if(tripDelSuccess && deleteTrip){
    return res.status(200).send({
      success:true
    })
  }else {
    return res.status(422).send({errors: [{title: 'Fetch Error!', detail: 'API failed to fetch the data'}]});
  }


}

exports.updateTripData = async (req, res)=>{
  const tripToUpd = req.params.tripid
  const {data} = req.body
  const updateSingleTrip = await SingleTrip.updateOne({tId:tripToUpd}, {$set:{tripdata: data}})
  
  if(updateSingleTrip){
    return res.status(200).send({
      success:true
    })
  }else {
    return res.status(422).send({errors: [{title: 'Error!', detail: 'API failed to work'}]});
  }
 

}

 //add friend
 exports.addFriend = async (req, res)=>{
  const friendAdded = req.body.friendToAdd
  const tripToUpd = req.params.tripid
   const updateOne = await Trips.updateOne({"_id": ObjectId(tripToUpd)}, {$push:{friends: friendAdded}});

  // Add that trip id to friend Trip table
   const FriendTripUpdate = await FriendTrips.updateOne({username: friendAdded}, {$push: {"tripIDs": tripToUpd}});
   if(updateOne && FriendTripUpdate){
    return res.status(200).send({
      success:true
    })
  }else {
    return res.status(422).send({errors: [{title: 'Fetch Error!', detail: 'API failed to fetch the data'}]});
  }
   
  
}

// Remove Friend
exports.rmvFriend = async (req, res)=>{

  const friendDel = req.body.friendToDel
  const tripToUpd = req.params.tripid
  const updateOne = await Trips.updateOne({"_id": ObjectId(tripToUpd)}, {$pull:{friends: friendDel}});
  const FriendTripUpd = await FriendTrips.updateOne({username: friendDel}, {$pull: {"tripIDs": tripToUpd}});
 
  
  if(updateOne && FriendTripUpd){
    return res.status(200).send({
      success:true
    })
  }else {
    return res.status(422).send({errors: [{title: 'Fetch Error!', detail: 'API failed to fetch the data'}]});
  }

  
}

exports.getTripsAsFrnd = (req, res) => {
  const user = res.locals.user;
  
  Trips.find({friends: user.username}, function(err, resp){
    if (err) {
      return res.status(422).send({errors: err.errors});
    }else{
      res.status(200).send(resp)
    }
  })
  
}
