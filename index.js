const mongoose = require('mongoose');
require('dotenv').config();

const { MONGODB_PASSWORD } = process.env;

mongoose.connect(`mongodb+srv://dedjoris09:${MONGODB_PASSWORD}@newserve.rthliqi.mongodb.net/?retryWrites=true&w=majority`, {

});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', async () => {
  console.log('Connected to the database');
  await db.collection('users').createIndex({ location: '2dsphere' });
});

  

const userSchema = new mongoose.Schema({
    name: String,
    location: {
      type: { type: String, enum: ['Point'], required: true },
      coordinates: { type: [Number], required: true },
    },
});
userSchema.index({ location: '2dsphere' });
  
const stuffSchema = new mongoose.Schema({
description: String,
user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const User = mongoose.model('User', userSchema);
const Stuff = mongoose.model('Stuff', stuffSchema);
module.exports = {User,Stuff}