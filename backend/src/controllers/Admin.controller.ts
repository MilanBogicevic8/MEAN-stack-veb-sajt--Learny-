import express from 'express'
import User from '../models/Korisnik'
import Predmeti from '../models/Predmeti'

export class Admin{

    login=(req:express.Request,res:express.Response)=>{
        let kor_ime=req.body.kor_ime
        let lozinka=req.body.lozinka
        User.findOne({kor_ime:kor_ime,lozinka:lozinka}).then(
            data=>{
                console.log(data)
                if(data){
                    if(data.tip=="admin"){
                        res.json(data);
                        return;
                    }
                    res.json(null);
                }else{
                    res.json(null);
                }
            }
        )
    }

    svi=(req:express.Request,res:express.Response)=>{
        User.find({}).then(data=>{res.json(data)})
      }
    promenaStatusa=(req:express.Request,res:express.Response)=>{
        let nastavnik=req.body.nastavnik
        let status=req.body.status

        User.updateOne({_id:nastavnik._id},{status:status}).then(data=>{res.json({"message":"ok"})})
    }

    dohvatiPredmete=(req:express.Request,res:express.Response)=>{
        Predmeti.find({}).then(data=>{res.json(data)})
    }
    dodajPredmet= async (req:express.Request,res:express.Response)=>{
        let predmet=req.body.predmet
        let pred=await Predmeti.findOne({naziv:predmet})
        if(pred){
            return res.json({"message":"Vec postoji takav predmet."})
        }
        Predmeti.insertMany({naziv:predmet,odobren:true}).then(data=>{
            res.json({"message":"ok"})
        })
    }
    dodajNeodobrenPredmet=async (req:express.Request,res:express.Response)=>{
        let predmet=req.body.predmet
        let pred=await Predmeti.findOne({naziv:predmet})
        if(pred){
            return res.json({"message":"Vec postoji takav predmet."})
        }
        Predmeti.insertMany({naziv:predmet,odobren:false}).then(data=>{
            res.json({"message":"ok"})
        })
    }
    odobriPredmet=(req:express.Request,res:express.Response)=>{
        let predmet=req.body.predmet
        Predmeti.updateOne({_id:predmet._id},{odobren:true}).then(
            data=>{
                res.json({"message":"ok"})
            }
        )
    }
}