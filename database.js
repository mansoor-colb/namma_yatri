// const { MongoClient } = require('mongodb');
var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const User = require('./channel')
const Ride = require('./ride')
const uri = 'mongodb+srv://web1234:web1234@cluster0.syfouhl.mongodb.net/drydata?retryWrites=true&w=majority';

const mongoose = require('mongoose');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas!');

    const db = mongoose.connection;
    const collection = db.collection('drydatas');
    db.on('error', function(err) {
      console.log(err);
    });
    // Find all documents in the collection
    //     collection.find({}).toArray((err, documents) => {
    //       if (err) {
    //         console.log(err);
    //         return;
    //       }

    //       console.log('Documents:', documents);
    //       if (documents.length != 0) {
    //         console.log('Collection is empty');
    //       }
    //     });
  })
  .catch((err) => {
    console.log(err);
  });

app.get('/items/:teleid', async (req, res) => {
  try {
    const item = await User.findOne({ tele_id: req.params.teleid });
    if (!item) {
      res.send({ "data": 0 });
    } else {
      res.send({ "data": 1 });
    }
  } catch (err) {
    console.log(err);
    res.send({ "data": 99 });
  }
});


app.post('/items', async (req, res) => {
  const newItem = new User({
    tele_id: req.body.tele_id,
    name: req.body.name,
    contact: req.body.contact,
  });
  try {
    const item = await newItem.save();
    res.send({ "data": 1 });;
  } catch (err) {
    console.log(err);
    res.send({ "data": 0 });;
  }
});

app.put('/update/:id', async (req, res) => {
  console.log(req.params.id)
  try {
    const filter = { name: req.params.id };
    const update = { contact: req.body.contact, tele_id: req.body.tele_id };
    const options = { new: true }; // Return the updated document
    const updatedItem = await User.findOneAndUpdate(filter, update, options);
    if (!updatedItem) {
      res.status(404).send();
    } else {
      res.json(updatedItem);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});







///ridemodels
app.put('/updateride/:id', async (req, res) => {
  console.log(req.params.id);
  try {
    const filter = { tele_id: req.params.id };
    const update = {
      ridefrom: req.body.ridefrom,
      rideto: req.body.rideto,
      ride_id: req.body.ride_id,
      src: req.body.src,
      dest: req.body.dest,
      fare: req.body.fare,
      status: req.body.status,
      issaved: req.body.issaved
    };
    const options = {
      new: true, // Return the updated document
      sort: { $natural: -1 }, // Sort by reverse order of insertion
    };
    const updatedItem = await Ride.findOneAndUpdate(filter, update, options);
    if (!updatedItem) {
      res.send({ "data": 0 });
    } else {
      res.send({ "data": 1 });
    }
  } catch (err) {
    console.log(err);
    res.send({ "data": 0 });
  }
});

app.post('/rides', async (req, res) => {
  const newItem = new Ride({
    tele_id: req.body.tele_id,
    ride_id: req.body.ride_id,
    ridefrom: req.body.ridefrom,
    rideto: req.body.rideto,
    src: req.body.src,
    dest: req.body.dest,
    fare: req.body.fare,
    status: req.body.status,
    issaved: req.body.issaved,




  });
  try {
    const item = await newItem.save();
    res.send({ "data": 1 });
  } catch (err) {
    console.log(err);
    res.send({ "data": 0 });
  }
});
//for quick
app.get('/getride/:teleid', async (req, res) => {
  try {
    const item = await Ride.find({ tele_id: req.params.teleid, issaved: true });
    if (!item) {
      res.send({ "data": 0 });
    } else {
      res.send(item);
    }
  } catch (err) {
    console.log(err);
    res.send({ "data": 99 });
  }
});

// for history
app.get('/getrideall/:teleid', async (req, res) => {
  try {
    const item = await Ride.find({ tele_id: req.params.teleid });
    if (!item) {
      res.send({ "data": 0 });
    } else {
      res.send(item);
    }
  } catch (err) {
    console.log(err);
    res.send({ "data": 99 });
  }
});


app.get('/getrideid/:rideiid', async (req, res) => {
  try {
    const item = await Ride.find({ ride_id: req.params.rideiid });
    if (item.length == 0) {
      res.send({ "data": 0 });
    } else {
      res.send({ "data": 1 });
    }
  } catch (err) {
    console.log(err);
    res.send({ "data": 99 });
  }
});


app.get('/getcurrent/:teleid', async (req, res) => {
  console.log("jjjj")
    try {
      const item = await Ride.find({tele_id:req.params.teleid,status:"ongoing"});
      if (!item) {
        res.send({"data":0});
      } else {
        res.send(item);
      }
    } catch (err) {
      console.log(err);
      res.send({"data":99});
    }
  });



app.listen(3000, function() {
  console.log("Server is listening at port:");
});
