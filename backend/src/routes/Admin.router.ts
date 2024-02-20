import express from 'express';
import {Admin} from "../controllers/Admin.controller"

const adminRouter=express.Router()

adminRouter.route("/login").post(
    (req,res)=>new Admin().login(req,res)
)
adminRouter.route("/svi").get(
    (req,res)=>new Admin().svi(req,res)
)
adminRouter.route("/promenaStatusa").post(
    (req,res)=>new Admin().promenaStatusa(req,res)
)
adminRouter.route("/dohvatiPredmete").get(
    (req,res)=>new Admin().dohvatiPredmete(req,res)
)
adminRouter.route("/dodajPredmet").post(
    (req,res)=>new Admin().dodajPredmet(req,res)
)
adminRouter.route("/odobriPredmet").post(
    (req,res)=>new Admin().odobriPredmet(req,res)
)
adminRouter.route("/dodajNeodobrenPredmet").post(
    (req,res)=>new Admin().dodajNeodobrenPredmet(req,res)
)
export default adminRouter;