import mongoose from "mongoose";

const zauzetiSchema= new mongoose.Schema({
    kor_ime:String,
    datum_od:Date,
    datum_do:Date
})

export default mongoose.model('zauzeti',zauzetiSchema,'zauzeti')