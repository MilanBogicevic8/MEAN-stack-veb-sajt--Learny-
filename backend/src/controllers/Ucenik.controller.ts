import express from 'express'
import path from "path"
import multer from "multer"
import fs from "fs";
import Korisnik from '../models/Korisnik';
import Casovi from '../models/Casovi';
import Zauzeti from '../models/Zauzeti';
import Otkazani from '../models/Otkazani';

export class Ucenik{

    promenaSlike=async (req,res:express.Response)=>{
        let kor_ime=req.body.kor_ime
        let user=await Korisnik.findOne({kor_ime:kor_ime});
        console.log(user)
        if(user.slika!="default.jpg"){
            fs.unlinkSync(path.join(__dirname,"../../uploads",user.slika))
        }
        //postavljanje nove slike
        console.log(req.files,req.files.photo[0].filename)
        if(req.files && req.files.photo){ 
            user.slika=req.files.photo[0].filename
        }

        await user.save()
        res.json({"message":"Promenjena profilna slika"})
    }

    promenaPodataka=async (req:express.Request,res:express.Response)=>{
        let kor_ime=req.body.kor_ime
        let ime=req.body.ime
        let prezime=req.body.prezime
        let mejl=req.body.mejl
        let telefon=req.body.telefon
        let skola=req.body.skola
        let razred=req.body.razred
        let adresa=req.body.adresa
        let predmeti=req.body.predmeti
        let uzrast=req.body.uzrast
        let data= await Korisnik.findOne({kor_ime:kor_ime})
            if(!data){
                res.json({"message":"Nema tog korisnika"})
                return
            }
            if(mejl!=""){
                let kor=await Korisnik.findOne({mejl:mejl})
                if(kor) return res.json({"message":"Mejl je zauzet"})
                data.mejl=mejl
            }
            if(ime!=""){
                data.ime=ime
            }

            if(prezime!=""){
                data.prezime=prezime
            }
            
            if(telefon!=""){
                data.telefon=telefon
            }
            if(skola!=""){
                data.skola=skola
            }
            if(razred!="" && razred!="0"){
                data.razred=razred
            }
            if(adresa!=""){
                data.adresa=adresa
            }
            if(predmeti.length!=0){
                data.predmeti=predmeti
            }
            if(uzrast.length!=0){
                data.uzrast=uzrast
            }
            await data.save()
            res.json({"message":"ok"})
    }

    nastavnici=(req:express.Request,res:express.Response)=>{
        Korisnik.find({tip:"nastavnik",status:"odobren"}).then(
            data=>{
                //console.log(data)
                res.json(data)
            }
        )
    }


    slikaNastavnika = async (req: express.Request, res: express.Response) => {
        try {
            const kor_ime = req.body.kor_ime;
            const user = await Korisnik.findOne({ kor_ime: kor_ime });
    
            if (!user) {
                return res.json({ message: "Korisnik nije pronađen." });
            }
    
            const slika = user.slika;
    
            if (typeof slika === "string") {
                console.log("Slika is a string:", slika);
                let filePath = path.join(__dirname, "../../uploads", slika);
                console.log("FilePath:", filePath);
    
                if (!fs.existsSync(filePath)) {
                    console.log("File does not exist:", filePath);
                    return res.status(404).json({ message: "Slika nije pronađena." });
                }
    
                const ext = path.extname(slika);
                let contentType = "image/png"; // Podešavanje podrazumevanog tipa slike na PNG
    
                // Dodaj dodatne uslove za različite tipove slika
                if (ext === ".jpg" || ext === ".jpeg") {
                    contentType = "image/jpeg";
                } else if (ext === ".gif") {
                    contentType = "image/gif";
                }
    
                fs.readFile(filePath, (err, content) => {
                    if (err) {
                        return res.json({ message: "Greška prilikom čitanja slike." });
                    }
    
                    res.status(200).contentType(contentType).send(content);
                });
            } else {
                console.log("Slika is not a string:", slika);
                return res.json({ message: "Slika nije pronađena." });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error." });
        }
    };

    zakazivanjeCasa=async (req:express.Request,res:express.Response)=>{
        try {
            const { nastavnik, ucenik, datum, vreme, teme, dupli_cas,predmet } = req.body;
    
            // Implementirajte provere za dostupnost časa ovde
            // Npr. provera da li je nastavnik dostupan tada, da li je uopšte moguće zakazati čas itd.
    
            // Računanje vremena završetka časa
            const datum_od_vreme = new Date(`${datum} ${vreme}`);
            const trajanje = dupli_cas ? 120 : 60; // Dupli čas traje 120 minuta, inače 60 minuta
            const datum_do_vreme = new Date(datum_od_vreme.getTime() + trajanje * 60000);
            
            console.log(datum_od_vreme,"-",datum_do_vreme)
            
            //provera da li cas pocinje na pun sat ili pola
            const sat = datum_od_vreme.getHours();
            const minut = datum_od_vreme.getMinutes();
            if (!(minut === 0 || minut === 30) || !(sat=>10 && sat<=17)) {
                // Čas počinje na pun sat ili na pola sata
                console.log('Čas počinje na pun sat ili pola sata.',minut,sat);
                return res.json({"message":"Čas počinje na pun sat ili na pola sata i mora biti ujutru od 10 do popodne u 18"});
            } 
            
            
            const cas = new Casovi({
                datum_od:datum_od_vreme,
                datum_do:datum_do_vreme,
                ucenik: [ucenik],
                nastavnik:nastavnik,
                teme:teme,
                potvrdjen:false,
                odrzan:false,
                predmet:predmet,
                komentar_nastavnika:"",
                komentar_ucenika:"",
                ocena:0,
                datum_potvrde:null,
                datum_citanja:null,
                razlog_otkazivanja:"",
                broj_ucesnika:2
            });
    
            await cas.save();
    
            res.json({ message: 'ok' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }


    zakazivanjeCasaInteraktivno=async (req:express.Request,res:express.Response)=>{
        const { nastavnik, ucenik, datum_od, datum_do, teme,predmet } = req.body;
        // Provera da li postoji čas za nastavnika u datom vremenskom intervalu
        const postojeciCas = await Casovi.findOne({
            nastavnik:nastavnik,razlog_otkazivanja:'',
            $or: [
                { datum_od: { $gte: datum_od, $lt: datum_do } }, // Novi čas počinje unutar postojećeg
                { datum_do: { $gt: datum_od, $lte: datum_do } }  // Novi čas se završava unutar postojećeg
            ]
        });

        if (postojeciCas) {
            return res.json({ "message": 'Već postoji zakazan čas za nastavnika u datom vremenskom intervalu.' });
        }

        // Provera zauzetih termina
        const zauzetiTermini = await Zauzeti.findOne({
            nastavnik: nastavnik,
            $or: [
                { datum_od: { $gte: datum_od, $lt: datum_do } }, // Novi čas počinje unutar postojećeg
                { datum_do: { $gt: datum_od, $lte: datum_do } }  // Novi čas se završava unutar postojećeg
            ]
        });

        if (zauzetiTermini) {
            return res.json({ "message": 'Nastavnik je već zauzet u datom vremenskom intervalu.' });
        }

        const cas = new Casovi({
            datum_od:datum_od,
            datum_do:datum_do,
            ucenik: [ucenik],
            nastavnik:nastavnik,
            teme:teme,
            potvrdjen:false,
            odrzan:false,
            predmet:predmet,
            komentar_nastavnika:"",
            komentar_ucenika:"",
            ocena:0,
            datum_potvrde:null,
            datum_citanja:null,
            razlog_otkazivanja:"",
            broj_ucesnika:2
        });

        await cas.save();

        res.json({ "message": 'ok' });
    }


    casovi=(req:express.Request,res:express.Response)=>{
        Casovi.find({}).then(
            data=>{
                res.json(data)
            }
        )
    }

    ocena=async (req:express.Request,res:express.Response)=>{
        let id=req.body.id
        let komenatar=req.body.komentar
        let ocena=req.body.ocena

        console.log(req.body)
        let cas=await Casovi.findOne({_id:id})
        let nastavnik=cas.nastavnik
        cas.komentar_ucenika=komenatar
        cas.ocena=ocena
        await cas.save()
        //console.log(cas)
        let nas=await Korisnik.findOne({kor_ime:nastavnik})
        nas.ocene.push(ocena)
        nas.save()
        res.json({"message":"ok"})
    }

    brojCasovaZaSveUcenike = async (req:express.Request,res:express.Response) => {
        try {
          // Dobavi sve učenike
          const sviUcenici = await Korisnik.find({ tip: 'ucenik' });
          const sad=new Date()
          // Iteriraj kroz sve učenike i dobavi broj časova za svakog
          const rezultati = await Promise.all(
            sviUcenici.map(async (ucenik) => {
              const brojCasova = await Casovi.countDocuments({
                ucenik: ucenik.kor_ime,
                potvrdjen: true,/////////////////////////////treba dodati i odrzan=true to kasnije kad dodas to u bazu da moze
                razlog_otkazivanja: '',
                datum_do:{$lt:sad}
              });
      
              return {
                ucenik: ucenik.kor_ime,
                brojCasova,
              };
            })
          );
      
          res.json(rezultati)
        } catch (error) {
          console.error(error);
          //throw new Error('Greška prilikom dobijanja broja časova za sve učenike.');
          res.status(500).json({ error: 'Internal Server Error' });
        }
      };

      obavestenja=async (req:express.Request,res:express.Response)=>{
        let kor_ime=req.body.kor_ime
        let casovi=await Casovi.find({ucenik:kor_ime})
        res.json(casovi)
      }

      oznaciProcitano=async (req:express.Request,res:express.Response)=>{
        let cas=req.body.cas
        let c=await Casovi.findOne({_id:cas._id})
        c.datum_citanja=new Date()
        await c.save()
        res.json({"message":"ok"})
      }
      potvrdiZahtev=async (req:express.Request,res:express.Response)=>{
        let cas=req.body.cas
        let c=await Casovi.findOne({_id:cas._id})
        c.potvrdjen=true
        c.datum_potvrde=new Date()
        await c.save()
        res.json({message:"ok"})
      }
      otkaziZahtev=async (req:express.Request,res:express.Response)=>{
        let cas=req.body.cas
        let razlog=req.body.razlog
        let c=await Casovi.findOne({_id:cas._id})
        c.razlog_otkazivanja=razlog
        c.datum_potvrde=new Date()
        await c.save()
    
        res.json({"message":"ok"})
      }

      otkaziCas=(req:express.Request,res:express.Response)=>{
        let cas=req.body.cas
        /**nastavi  */
      }


    povecanjeBrojUcesnikaCasa=async(req:express.Request,res:express.Response)=>{
        let c=req.body.cas
        let cas=await Casovi.findOne({_id:c._id})
        cas.broj_ucesnika=cas.broj_ucesnika+1
        await cas.save()
        res.json({"message":"ok"})
    }

    smanjenjeBrojUcesnikaCasa=async(req:express.Request,res:express.Response)=>{
        let c=req.body.cas
        let cas=await Casovi.findOne({_id:c._id})
        cas.broj_ucesnika=cas.broj_ucesnika-1
        await cas.save()
        res.json({"message":"ok"})
    }
}