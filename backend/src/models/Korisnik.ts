import mongoose from "mongoose";

const korisnikSchema=new mongoose.Schema({
    //svi
    ime:String,
    prezime:String,
    kor_ime:String,
    lozinka:String,
    tip:String,
    status:String,
    pitanje:Array,
    pol:String,
    adresa:String,
    telefon:String,
    mejl:String,
    files:Object,
    //ucenik
    skola:String,
    razred:Number,
    //nastavnik
    uzrast:Array,
    predmeti:Array,
    //i ucenik ima ocene
    ocene:Array,
    //svi
    slika:String,
    bezbednost:String,
    bezbednost_pitanje:String
})

export default mongoose.model('korisnik',korisnikSchema,'korisnici')