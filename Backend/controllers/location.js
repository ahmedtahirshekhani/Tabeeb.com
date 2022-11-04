
const Locations = require("../models/locations");
const config = require('../config');

exports.getSubLoc = async (req, res) => {
    const resp = await Locations.findOne({name:req.params.mainlocationname});
    if (resp) {
      return res.status(200).send(resp.subPlaces)
    } else {
      return res.status(422).send({errors: [{title: 'Error!', detail: 'API failed to work'}]});
    }
  
  }

exports.getMainLoc = async (req, res) => {
    const resp = await Locations.find();
    if (resp) {
    
     return res.status(200).send(resp)
    } else {
      return res.status(422).send({errors: [{title: 'Error!', detail: 'API failed to work'}]});
    }
  }