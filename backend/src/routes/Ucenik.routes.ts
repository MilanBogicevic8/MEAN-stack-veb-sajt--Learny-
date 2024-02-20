import express from "express";

import multer from 'multer'
import { Ucenik } from "../controllers/Ucenik.controller";
import Korisnik from "../models/Korisnik";

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

const ucenikRuter=express.Router()


ucenikRuter.route("/promenaSlike").post(
    upload.fields([
        { name: 'photo', maxCount: 1 },
    ]), (req,res)=>new Ucenik().promenaSlike(req,res)
)
ucenikRuter.route("/promenaPodataka").post(
    (req,res)=>new Ucenik().promenaPodataka(req,res)
)
ucenikRuter.route("/nastavnici").get(
    (req,res)=>new Ucenik().nastavnici(req,res)
)
ucenikRuter.route("/slikaNastavnika").post(
    (req,res)=>new Ucenik().slikaNastavnika(req,res)
)
ucenikRuter.route("/zakazivanjeCasa").post(
    (req,res)=>new Ucenik().zakazivanjeCasa(req,res)
)
ucenikRuter.route("/zakazivanjeCasaInteraktivno").post(
    (req,res)=>new Ucenik().zakazivanjeCasaInteraktivno(req,res)
)
ucenikRuter.route("/casovi").get(
    (req,res)=>new Ucenik().casovi(req,res)
)
ucenikRuter.route("/ocena").post(
    (req,res)=>new Ucenik().ocena(req,res)
)
ucenikRuter.route("/brojCasovaZaSveUcenike").get(
    (req,res)=>new Ucenik().brojCasovaZaSveUcenike(req,res)
)
ucenikRuter.route("/obavestenja").post(
    (req,res)=>new Ucenik().obavestenja(req,res)
)
ucenikRuter.route("/oznaciProcitano").post(
    (req,res)=>new Ucenik().oznaciProcitano(req,res)
)
ucenikRuter.route("/potvrdiZahtev").post(
    (req,res)=>new Ucenik().potvrdiZahtev(req,res)
)
ucenikRuter.route("/otkaziZahtev").post(
    (req,res)=>new Ucenik().otkaziZahtev(req,res)
)

ucenikRuter.route("/povecanjeBrojUcesnikaCasa").post(
    (req,res)=>new Ucenik().povecanjeBrojUcesnikaCasa(req,res)
)
ucenikRuter.route("/smanjenjeBrojUcesnikaCasa").post(
    (req,res)=>new Ucenik().smanjenjeBrojUcesnikaCasa(req,res)
)
export default ucenikRuter;