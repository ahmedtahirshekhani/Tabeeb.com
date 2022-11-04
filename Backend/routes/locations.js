const express = require("express");
const router = express.Router();

const LocCtrl = require("../controllers/location");

router.get("/:mainlocationname", LocCtrl.getSubLoc);
router.get("", LocCtrl.getMainLoc);
  
 /* 
  app.post("/api/locations/:locationname", async (req, res) => {
    const locationName= req.params.locationname
  
    // const {selectedMainLocation} = req.body;
    // console.log(req.body);
    const resp = await Locations.findOne({name:locationName});
    // console.log(resp.subPlaces)
    if (resp) {
  
      res.send({
        success: true,
        message: resp.subPlaces
      });
    } else {
      res.send({
        success: false,
        message: "Api failed! Error",
      });
    }
  
    // console.log(resp)
  });

  */

module.exports = router;
