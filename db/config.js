const mongoose=require('mongoose');

const db_url=process.env.DATABASE_URL||"mongodb://localhost:27017/tts"
const connectDb = async() => {
  return await mongoose.connect(db_url,{useUnifiedTopology: true,useNewUrlParser: true});
};
module.exports= { connectDb };
 
