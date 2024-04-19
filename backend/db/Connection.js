const mongoose = require('mongoose');
const mongoURI="mongodb://localhost:27017/RegisterUser";
mongoose.connect('mongodb://localhost:27017/RegisterUser',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true

    }).then(()=>{
    console.log("connection sucessful")
}).catch((e)=>{
    console.log(`connection fails${e}`)
})
// module.exports = connectToMongo;