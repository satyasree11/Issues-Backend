const mongoose=require('mongoose');
const emailSchema= new mongoose.Schema({
    email:{type:String,
        required:true,
        unique:true
    },
});
const waitlistSchema = new mongoose.Schema({
    count:{type:Number,default:0},
})
const Email = mongoose.model('Email', emailSchema);
const Waitlist = mongoose.model('Waitlist', waitlistSchema);

module.exports = { Email, Waitlist };