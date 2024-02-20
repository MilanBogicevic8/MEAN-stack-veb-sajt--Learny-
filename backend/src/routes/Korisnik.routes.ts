import express from "express";
import {Korisnik} from "../controllers/Korisnik.controller"
import multer from 'multer'

const storage = multer.diskStorage({
  destination: function(req, file, cb) { cb(null, './uploads/') },
  filename: function(req, file, cb) { cb(null, Date.now() + file.originalname) }
});

const fileFilter = (_req, file, cb) => {
    const allowedMimeTypes = ["image/jpg", "image/jpeg", "image/png", "application/pdf"];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Uploaded file is not of supported type (jpg, jpeg, png, pdf)."), false);
    }
};

const upload = multer({storage, fileFilter})

const korisnikRuter=express.Router()

korisnikRuter.use(
    function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    }
)
korisnikRuter.route("/login").post(
    (req,res)=>new Korisnik().login(req,res)
)
korisnikRuter.route("/registracijaNastavnik").post(
    upload.fields([
        { name: 'photo', maxCount: 1 },
        { name: 'cv', maxCount: 1 }
    ]), (req,res)=>new Korisnik().registracija_nastavnik(req,res)
)

korisnikRuter.route("/registracijaUcenik").post(
    upload.fields([
        { name: 'photo', maxCount: 1 },
    ]), (req,res)=>{
        console.log(req.body)
        console.log(req.files)
        new Korisnik().registracija_ucenik(req,res)
    }
)

korisnikRuter.route("/resetLozinke").post(
    (req,res)=>new Korisnik().resetLozinke(req,res)
)

korisnikRuter.route("/promenaLozinke").post(
    (req,res)=>{
        //console.log(req.body)
        new Korisnik().promenaLozinke(req,res)
    }
)
korisnikRuter.route("/proba").post(
    
    (req,res)=>{
        console.log('Request proba');
        new Korisnik().proba(req,res)
    }
)

korisnikRuter.route("/korisnik").post(
    (req,res)=>new Korisnik().korisnik(req,res)
)

korisnikRuter.route("/dohvatiPredmete").get(
    (req,res)=>new Korisnik().dohvatiPredmete(req,res)
)
korisnikRuter.route("/dodajPredmet").post(
    (req,res)=>new Korisnik().dodajPredmet(req,res)
)
korisnikRuter.route("/info").get(
    (req,res)=>new Korisnik().info(req,res)
)
korisnikRuter.route("/raspodelaPoPolu").get(
    (req,res)=>new Korisnik().raspodelaPoPolu(req,res)
)
korisnikRuter.route("/odnos").get(
    (req,res)=>new Korisnik().odnosPredmetaKojeNekoDrziIKojeNikoNeDrzi(req,res)
)

export default korisnikRuter;