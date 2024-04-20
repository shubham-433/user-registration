const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
app.use(cors(corsOptions))
require('./db/connection');
const { validate, User } = require('./db/models/User');
app.get('/', (req, res) => {
 res.send('Hello World');
});

app.post('/api/register', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
        return res.status(200).send({message:'Email already in use',status:409});
    }
    let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        mobileNumber: req.body.mobileNumber,
        gender: req.body.gender,
        dob: req.body.dob,
        about: req.body.about
    });

    try {
        await user.save();
        res.status(200).send({message:'Data saved successfully'});
    } catch (ex) {
        
        res.status(400).send(ex.message,{message:'Error in saving data'});
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`server listining on http://localhost:${PORT}`));
