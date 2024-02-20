import mongoose from "mongoose";

const otkazaniSchema=new mongoose.Schema(
    {
        datum_od:Date,
        datum_do:Date,
        ucenik:Array,
        nastavnik:String,
        teme:String,
        potvrdjen:Boolean,
        //kad se odrzi postavlja se na true
        odrzan:Boolean,
        //predmet iz kog se drzi cas
        predmet:String,
        komentar_nastavnika:String,
        komentar_ucenika:String,
        //ucenik ocenjuje nastavnika
        ocena:Number,
        //datum kada je nastavnik potvrdio cas(ili otkazao uz obrazlozenje)
        datum_potvrde:Date,
        //datum kada je ucenik procitao da je cas potvrdjen
        datum_citanja:Date,
        razlog_otkazivanja:String,
        broj_ucesnika:Number
    }
)

export default mongoose.model('otkazan',otkazaniSchema,'otkazani')