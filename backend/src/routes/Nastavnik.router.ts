import express from 'express';
import {Nastavnik} from "../controllers/Nastavnik.controller"

const nastavnikRouter=express.Router()

nastavnikRouter.route("/dohvatiUcenika").post(
    (req,res)=>new Nastavnik().dohvatiUcenika(req,res)
)
nastavnikRouter.route("/otkaziCas").post(
    (req,res)=>new Nastavnik().otkaziCas(req,res)
)
nastavnikRouter.route("/casoviNastavnika").post(
    (req,res)=>new Nastavnik().casoviNastavnika(req,res)
)
nastavnikRouter.route("/casoviUcenika").post(
    (req,res)=>new Nastavnik().casoviUcenika(req,res)
)
nastavnikRouter.route("/nastavnikovKomentar").post(
    (req,res)=>new Nastavnik().nastavnikovKomentar(req,res)
)
nastavnikRouter.route("/dodajZauzetost").post(
    (req,res)=>new Nastavnik().dodajZauzetost(req,res)
)
nastavnikRouter.route("/dohvatiZauzetost").post(
    (req,res)=>new Nastavnik().dohvatiZauzete(req,res)
)
nastavnikRouter.route("/najangazovaniji").post(
    (req,res)=>new Nastavnik().najAngazovanijiNastavnici(req,res)
)
nastavnikRouter.route("/prosekPoDanu").get(
    (req,res)=>new Nastavnik().prosecniBrojCasovaPoDanu(req,res)
)

nastavnikRouter.route("/nastavniciPoPredmetuPoUzrastu").get(
    (req,res)=>new Nastavnik().nastavniciPoUzrastimaZaSvePredmete(req,res)
)
nastavnikRouter.route("/promenaPodataka").post(
    (req,res)=>new Nastavnik().promenaPodataka(req,res)
)
nastavnikRouter.route("/dohvatiCV/:kor_ime").get(
    (req,res)=>new Nastavnik().dohvatiCV(req,res)
)
export default nastavnikRouter;