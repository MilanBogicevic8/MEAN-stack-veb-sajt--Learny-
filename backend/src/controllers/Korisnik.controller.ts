import express, { json } from 'express'
import crypto from 'crypto'

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
import User from '../models/Korisnik'
import Predmeti from '../models/Predmeti';
import Casovi from '../models/Casovi';


export class Korisnik{
    login=(req:express.Request,res:express.Response)=>{
        let kor_ime=req.body.kor_ime
        let lozinka=req.body.lozinka
        if(kor_ime=="admin" && lozinka=="admin"){
          return res.json(null)
        }
        console.log(kor_ime,lozinka)
        User.findOne({kor_ime:kor_ime}).then(
            data=>{
                if (!data) {
                    //console.log("Nije pronadjeno ime")
                    return res.json({ message: "Nije pronadjen korisnik sa tim imenom." });
                }
                
                if(!bcrypt.compareSync(lozinka,data.lozinka)){
                    return res.json({
                        accessToken: null,
                        message: "Netacna sifra!"
                      });
                }
                
                var token = jwt.sign({ id: data._id }, "jwt-secret", {
                    expiresIn: 86400 
                });
                console.log(kor_ime,lozinka)
                if(data.tip=="ucenik"){
                    res.status(200).send({
                        id: data._id,
                        kor_ime: data.kor_ime,
                        mejl: data.mejl,
                        tip: data.tip,
                        accessToken: token,
                        slika: data.files?.photo || null,
                        ime: data.ime,
                        prezime: data.prezime,
                        adresa:data.adresa,
                        telefon:data.telefon,
                        skola:data.skola,
                        razred:data.razred
                    });
                }else if(data.tip=="nastavnik"){
                    if(data.status=="neodobren"){
                      return res.json({"message":"Administrator još uvek nije odobrio Vaš nalog, sačekajte..."})
                    }
                    res.status(200).send({
                        id: data._id,
                        kor_ime: data.kor_ime,
                        mejl: data.mejl,
                        tip: data.tip,
                        accessToken: token,
                        slika: data.files?.photo || null,
                        ime: data.ime,
                        prezime: data.prezime,
                        adresa:data.adresa,
                        telefon:data.telefon,
                        predmeti:data.predmeti,
                        uzrast:data.uzrast
                    });
                }else{
                    //dopuni za administratora
                }
            }
        )
    }

    registracija_ucenik=(req,res:express.Response)=>{
        let ime=req.body.ime
        let prezime=req.body.prezime
        let kor_ime=req.body.kor_ime
        let lozinka=bcrypt.hashSync(req.body.lozinka,8)
        let tip=req.body.tip
        let status="odobren"
        let pitanje=req.body.pitanje
        let pol=req.body.pol
        let adresa=req.body.adresa
        let telefon=req.body.telefon
        let mejl=req.body.mejl
        let skola=req.body.skola
        let razred=req.body.razred
        let bezbednost=req.body.bezbednost
        let bezbednost_pitanje=req.body.bezbednost_pitanje
        User.findOne({kor_ime:kor_ime}).then(data=>{
            if(data){
                res.json({"message":"Korisnicko ime je vec zauzeto"})
                return
            }
            User.findOne({mejl:mejl}).then(data=>{
                if(data){
                    res.json({"message":"Mejl vec postoji u bazi"})
                    return
                }
                let slika="default.jpg"
                if(req.files && req.files.photo){
                    slika=req.files.photo[0].filename
                }
                console.log(slika)
                const userNew=new User({
                    ime:ime,
                    prezime:prezime,
                    kor_ime:kor_ime,
                    lozinka:lozinka,
                    tip:tip,
                    status:status,
                    pitanje:pitanje,
                    pol:pol,
                    adresa:adresa,
                    telefon:telefon,
                    mejl:mejl,
                    skola:skola,
                    razred:razred,
                    slika:slika,
                    files:req.files?req.files:null,
                    bezbednost:bezbednost,
                    bezbednost_pitanje:bezbednost_pitanje,
                    ocene:[]
                    
                })
                console.log(userNew)
                userNew.save().then(
                    data=>{
                        res.json({"message":"ok"})
                        return
                    }
                )
            })
        })
    }
    registracija_nastavnik=(req,res:express.Response)=>{
        //console.log(req.body);
        let ime=req.body.ime
        let prezime=req.body.prezime
        let kor_ime=req.body.kor_ime
        let lozinka=bcrypt.hashSync(req.body.lozinka,8)
        let tip=req.body.tip
        let status="neodobren"
        let pitanje=req.body.pitanje
        let pol=req.body.pol
        let adresa=req.body.adresa
        let telefon=req.body.telefon
        let mejl=req.body.mejl
        let predmeti=req.body.predmeti
        let uzrast=req.body.uzrast
        let bezbednost=req.body.bezbednost
        let bezbednost_pitanje=req.body.bezbednost_pitanje
        //predmeti=[new Set(predmeti)]
        User.findOne({kor_ime:kor_ime}).then(user=>{
            
            if (user) {
                res.json({ "message": "Vec postoji to korisnicko ime!" });
                return
            }

            User.findOne({mejl:mejl}).then(user=>{

                if (user) {
                    res.json({ "message": "E-mejl je vec zauzet!" });
                    return
                }

                let slika="default.jpg"
                if(req.files && req.files.photo){
                    slika=req.files.photo[0].filename
                }
                const userNew=new User({
                    ime:ime,
                    prezime:prezime,
                    kor_ime:kor_ime,
                    lozinka:lozinka,
                    tip:tip,
                    status:status,
                    pitanje:pitanje,
                    pol:pol,
                    adresa:adresa,
                    telefon:telefon,
                    mejl:mejl,
                    predmeti:predmeti,
                    uzrast:uzrast,
                    files:req.files,
                    slika:slika,
                    bezbednost:bezbednost,
                    bezbednost_pitanje:bezbednost_pitanje,
                    ocene:[]
                })

                console.log(userNew)
                userNew.save().then(
                    data=>{
                        console.log(userNew)
                        res.json({"message":"ok"})
                        return
                    }
                ).catch(
                    data=>{
                        console.log(data)
                    }
                )
            })
        })
        //res.json({"message":"ok"})
    }

    korisnik=(req:express.Request,res:express.Response)=>{
        let kor_ime=req.body.kor_ime
        User.findOne({kor_ime}).then(
            data=>{
                if(data){
                    res.json(data)
                }else{
                    res.json(null)
                }
            }
        )
    }

    resetLozinke=async (req:express.Request,res:express.Response)=>{
        let kor_ime=req.body.kor_ime
        let lozinka=bcrypt.hashSync(req.body.lozinka,8)
        let user= await User.findOne({kor_ime:kor_ime})
        if(!user){
          res.json({"message":"Ne postoji taj korisnik u sistemu"})
          return
        }
        user.lozinka=lozinka
        await user.save()
        res.json({"message":"uspesna promena lozinke"})
    }

    promenaLozinke=async (req:express.Request,res:express.Response)=>{
        let kor_ime=req.body.kor_ime
        let staraLozinka=req.body.stara_lozinka
        let novaLozinka=req.body.nova_lozinka

        let user=await User.findOne({kor_ime:kor_ime})
        if(!user){
          res.json({"message":"Nema tog korisnika u sistemu"});
          return
        }
        console.log(kor_ime,staraLozinka,novaLozinka)
        console.log(user)
        if(!bcrypt.compareSync(staraLozinka,user.lozinka)){
            res.json({"message":"Stara lozinka nije tacna"})
            return
        }else{
            user.lozinka=bcrypt.hashSync(novaLozinka,8)
            await user.save()
            res.json({"message":"ok"})
        }
    }


    proba=(req:express.Request,res:express.Response)=>{
        res.json({"message":"ok"})
    }


    dohvatiPredmete=(req:express.Request,res:express.Response)=>{
        Predmeti.find({odobren:true}).then(
            data=>{
                res.json(data)
            }
        )
    }

    dodajPredmet=async (req:express.Request,res:express.Response)=>{
        let predmet=req.body.predmet
        let p=await Predmeti.findOne({naziv:predmet})
        if(!p){
            Predmeti.insertMany({naziv:predmet,odobren:false}).then(
                data=>{
                    res.json({"message":"ok"})
                }
            )
        }else{
            res.json({"message":"Vec postoji taj predmet"})
        }
    }

    info = async (req: express.Request, res: express.Response) => {
        try {
          const totalStudents = await User.countDocuments({ tip: 'ucenik' });
          const totalActiveTeachers = await User.countDocuments({ tip: 'nastavnik', status: 'odobren' });
          const classesLastSevenDays = await Casovi.countDocuments({
            datum_od: { $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000) },
            razlog_otkazivanja:'',
            datum_do:{$lte:new Date()}
          });
          
          const classesLastThirtyDays = await Casovi.countDocuments({
            datum_od: { $gte: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000) },
            razlog_otkazivanja:'',
            datum_do:{$lte:new Date()}
          });
          const subjects = await Predmeti.find({});
          const engagedTeachersBySubject = await Predmeti.aggregate([
            {
              $lookup: {
                from: 'korisnici',
                localField: 'naziv',
                foreignField: 'predmeti',
                as: 'teachers',
              },
            },
            {
              $project: {
                _id: 0,
                subject: '$naziv',
                teachers: {
                  $filter: {
                    input: '$teachers',
                    as: 'teacher',
                    cond: {
                        $and: [
                          { $eq: ['$$teacher.tip', 'nastavnik'] },
                          { $eq: ['$$teacher.status', 'odobren'] }, // Dodajte uslov za status 'odobren'
                        ],
                      }
                    },
                },
              },
            },
          ]);
    
          res.status(200).json({
            totalStudents,
            totalActiveTeachers,
            classesLastSevenDays,
            classesLastThirtyDays,
            subjects,
            engagedTeachersBySubject,
          });
        } catch (error) {
          console.error('Error fetching dashboard data:', error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };
    
      raspodelaPoPolu=async (req:express.Request,res:express.Response)=>{
        const raspodelaNastavnikaPoPolu = await User.aggregate([
            {
              $match: {
                tip: 'nastavnik',
                status: 'odobren',
              },
            },
            {
              $group: {
                _id: '$pol',
                count: { $sum: 1 },
              },
            },
            {
              $project: {
                _id: 0,
                pol: '$_id',
                count: 1,
              },
            },
          ]);
          
          const raspodelaUcenikaPoPolu = await User.aggregate([
            {
              $match: {
                tip: 'ucenik'
              },
            },
            {
              $group: {
                _id: '$pol',
                count: { $sum: 1 },
              },
            },
            {
              $project: {
                _id: 0,
                pol: '$_id',
                count: 1,
              },
            },
          ]);
          // Dodajemo nulu za svaki pol ako ne postoji
        const dodajNuluZaNepostojece = (raspodela) => {
                const polovi = ['M', 'Z'];
                polovi.forEach((pol) => {
                if (!raspodela.find((item) => item.pol === pol)) {
                    raspodela.push({ pol, count: 0 });
                }
                });
                return raspodela;
            };
        res.json({
                nastavnici: dodajNuluZaNepostojece(raspodelaNastavnikaPoPolu),
                ucenici: dodajNuluZaNepostojece(raspodelaUcenikaPoPolu),
        });
      }

      odnosPredmetaKojeNekoDrziIKojeNikoNeDrzi=async (req:express.Request,res:express.Response) => {
        try {
          // Dobavi sve predmete
          const sviPredmeti = await Predmeti.find({ odobren: true });
      
          // Inicijalizuj brojače
          let brojPredmetaKojeNikoNeDrzi = 0;
          let brojPredmetaKojeNekoDrzi = 0;
      
          // Iteriraj kroz sve predmete
          for (const predmet of sviPredmeti) {
            // Proveri da li postoji nastavnik koji drži ovaj predmet
            const nastavnici = await User.find({
              tip: 'nastavnik',
              status: 'odobren',
              predmeti: predmet.naziv,
            });
      
            if (nastavnici.length > 0) {
              // Ako postoji bar jedan nastavnik koji drži predmet, inkrementiraj brojPredmetaKojeNekoDrzi
              brojPredmetaKojeNekoDrzi++;
            } else {
              // Ako ne postoji nastavnik koji drži predmet, inkrementiraj brojPredmetaKojeNikoNeDrzi
              brojPredmetaKojeNikoNeDrzi++;
            }
          }
      
          res.json({
            brojPredmetaKojeNikoNeDrzi,
            brojPredmetaKojeNekoDrzi,
          });
        } catch (error) {
          console.error(error);
          //throw new Error('Greška prilikom dobijanja broja predmeta.');
          res.status(500).json({ error: 'Internal Server Error' });
        }
      };

}