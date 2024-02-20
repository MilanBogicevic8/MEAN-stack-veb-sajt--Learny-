import mongoose from "mongoose";

const predmetiSchema=new mongoose.Schema(
    {
        naziv:String,
        odobren:Boolean
    }
)

export default mongoose.model('predmeti',predmetiSchema,'predmeti')