import express,{json} from 'express'
import User from '../models/Korisnik'
import Casovi from '../models/Casovi'
import Korisnik from '../models/Korisnik'
import Zauzeti from '../models/Zauzeti'
import * as _ from 'lodash';
import path from "path"
import fs from "fs";
import Predmeti from '../models/Predmeti'

export class Nastavnik{
    dohvatiUcenika=(req:express.Request,res:express.Response)=>{
        let kor_ime=req.body.kor_ime
        User.findOne({kor_ime:kor_ime}).then(
            data=>{
                res.json(data)
            }
        )
    }
    
    otkaziCas= async (req:express.Request,res:express.Response)=>{
        let id=req.body.id
        let razlog=req.body.razlog
        let cas=await Casovi.findOne({_id:id})
        cas.razlog_otkazivanja=razlog
        cas.odrzan=false
        cas.datum_potvrde=new Date()
        cas.datum_citanja=null
        await cas.save()
        res.json({"message":"ok"})
    }

    casoviNastavnika = async (req: express.Request, res: express.Response) => {
        try {
          const nastavnikKorIme = req.body.kor_ime;
    
          // Pronađi sve casove gde je nastavnik održao čas
          let casovi = await Casovi.find({ nastavnik: nastavnikKorIme,razlog_otkazivanja:'' });
          casovi=casovi.filter(f=>new Date()>new Date(f.datum_do))
          // Izdvoji korisnička imena svih učenika koji su prisustvovali časovima
          const ucenikKorImena = casovi.reduce((acc, cas) => {
            return acc.concat(cas.ucenik);
          }, []);
    
          // Pronađi podatke o svakom učeniku
          const ucenici = await User.find({ kor_ime: { $in: ucenikKorImena } });
    
          // Sada imamo podatke o svakom učeniku koji je prisustvovao časovima
          const podaciOUcenicima = ucenici.map(ucenik => ({
            ime: ucenik.ime,
            prezime: ucenik.prezime,
            kor_ime: ucenik.kor_ime,
          }));
    
          res.status(200).json(podaciOUcenicima);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      };
    
      casoviUcenika = async (req: express.Request, res: express.Response) => {
        try {
          const ucenikKorIme = req.body.kor_ime;
    
          // Pronađi sve casove gde je učenik prisustvovao
          const casovi = await Casovi.find({ ucenik: { $in: [ucenikKorIme] } });
    
          // Sada imamo podatke o svim časovima gde je učenik prisustvovao
          res.status(200).json(casovi);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
    };
    
    nastavnikovKomentar= async (req:express.Request,res:express.Response)=>{
        let cas=req.body.cas
        let ocena=req.body.ocena
        let komentar=req.body.komentar

        let c=await Casovi.findOne({_id:cas._id})
        let u=c.ucenik
        let ucenik=await Korisnik.findOne({kor_ime:u})
        ucenik.ocene.push(ocena)
        await ucenik.save()
        c.komentar_nastavnika=komentar
        await c.save()
        res.json({"message":"ok"})
    }

    dodajZauzetost=async (req:express.Request,res:express.Response)=>{
      let kor_ime=req.body.kor_ime
      let datum_od=req.body.datum_od
      let datum_do=req.body.datum_do
      let data={
        kor_ime,
        datum_od,
        datum_do
      }

      await new Zauzeti(data).save()
      res.json({"message":"ok"})
    }

    dohvatiZauzete=async (req:express.Request,res:express.Response)=>{
      let kor_ime=req.body.kor_ime
      let zauzeti=await Zauzeti.find({kor_ime:kor_ime})
      return res.json(zauzeti)
    }

    najAngazovanijiNastavnici = async (req: express.Request, res: express.Response) => {
      try {
        // Pronađi nastavnike čiji je status odobren
        const odobreniNastavnici = await Korisnik.find({ status: 'odobren', tip: 'nastavnik' });
    
        // Inicijalizuj niz za podatke o nastavnicima
        const podaciONastavnicima = [];
    
        // Iteriraj kroz sve nastavnike
        for (const nastavnik of odobreniNastavnici) {
          const korIme = nastavnik.kor_ime;
          console.log(korIme);
    
          // Pronađi sve časove nastavnika u 2023. godini
          const casovi = await Casovi.find({
            nastavnik: korIme,
            potvrdjen: true,
            razlog_otkazivanja: '',
            datum_od: { $gte: new Date('2023-01-01'), $lt: new Date('2025-01-01') },
          });
          console.log("----", casovi);
    
          // Inicijalizuj objekat sa brojem časova po mesecima
          const brojCasovaPoMesecima: { [mesec: string]: number } = {
            'Jan': 0, 'Feb': 0, 'Mar': 0, 'Apr': 0, 'May': 0, 'Jun': 0,
            'Jul': 0, 'Aug': 0, 'Sep': 0, 'Oct': 0, 'Nov': 0, 'Dec': 0,
          };
    
          // Popuni broj časova po mesecima
          casovi.forEach((cas) => {
            const mesec = new Date(cas.datum_od).toLocaleString('default', { month: 'short' });
            brojCasovaPoMesecima[mesec] += 1;
          });
    
          // Sumiraj ukupan broj časova
          const ukupnoCasova = Object.values(brojCasovaPoMesecima).reduce((acc, brojCasova) => acc + brojCasova, 0);
    
          // Dodaj podatke o nastavniku u niz
          podaciONastavnicima.push({
            kor_ime: korIme,
            ukupno_casova: ukupnoCasova,
            casovi_po_mesecima: brojCasovaPoMesecima,
          });
        }
    
        console.log("pod", podaciONastavnicima);
    
        // Sortiraj nastavnike po ukupnom broju časova u opadajućem redosledu
        const sortiraniNastavnici = podaciONastavnicima.sort((a, b) => b.ukupno_casova - a.ukupno_casova).slice(0, 10);
    
        res.status(200).json(sortiraniNastavnici);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    };

    prosecniBrojCasovaPoDanu = async (req: express.Request, res: express.Response) => {
      try {
    
        // Pronađi sve časove nastavnika u 2023. godini
        const casovi = await Casovi.find({
          datum_od: { $gte: new Date('2023-01-01'), $lt: new Date('2025-01-01') }////////////////////!Isto vrati na 2024 i odrzan treba da bude true i to dodaj
        });
    
        //console.log('Casovi:', casovi); 
    
        // Grupiši časove po danima
        const grupisaniCasoviPoDanu = _.groupBy(casovi, (cas) => {
          const dan = new Date(cas.datum_od).getDay();
          console.log('Dan:', dan); // Dodajte ovu liniju za proveru
          // Povratna vrednost je dan u nedelji (0 - Nedelja, 1 - Ponedeljak, ..., 6 - Subota)
          return dan;
        });
    
        console.log('Grupisani casovi:', grupisaniCasoviPoDanu); // Dodajte ovu liniju za proveru
    
        // Izračunaj prosečan broj časova po danu
        const prosecniBrojCasovaPoDanu = _.mapValues(grupisaniCasoviPoDanu, (casoviPoDanu) => {
          const ukupanBrojCasova = casoviPoDanu.length;
          // Broj dana u nedelji
          const brojDana = 7;
          return ukupanBrojCasova / brojDana;
        });
    
        //console.log('Prosečni broj časova po danu:', prosecniBrojCasovaPoDanu);
        res.status(200).json(prosecniBrojCasovaPoDanu);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    };

    nastavniciPoUzrastimaZaSvePredmete = async (req: express.Request, res: express.Response) => {
      try {
        // Pronađi sve odobrene nastavnike
        const odobreniNastavnici = await Korisnik.find({ status: 'odobren', tip: 'nastavnik' });
    
        // Dohvati sve odobrene predmete
        const odobreniPredmeti = await Predmeti.find({ odobren: true });
    
        // Inicijalizuj objekat za čuvanje raspodele po predmetima i uzrastima
        const raspodelaPoPredmetimaUzrastima: { [predmet: string]: { [uzrast: string]: number } } = {};
        
        odobreniPredmeti.forEach((predmet) => {
          // Inicijalizuj objekat za uzraste za trenutni predmet ako nije već postavljen
          
          if (!raspodelaPoPredmetimaUzrastima[predmet.naziv]) {
            raspodelaPoPredmetimaUzrastima[predmet.naziv] = {};
          }
        
          // Dodaj uzraste u objekat za trenutni predmet
          // Ovde možete postaviti podrazumevane vrednosti za sve uzraste
          raspodelaPoPredmetimaUzrastima[predmet.naziv] = {
            'Osnovna skola 1-4. razred': 0,
            'Osnovna skola 5-8. razred': 0,
            'Srednja skola': 0,
            // Dodajte druge uzraste po potrebi
          };
        });
        // Iteriraj kroz sve odobrene nastavnike
        odobreniNastavnici.forEach((nastavnik) => {
          const uzrasti = nastavnik.uzrast;
          const predmeti = nastavnik.predmeti; // Dobavi nazive odobrenih predmeta
    
          // Iteriraj kroz sve uzraste i predmete za dati nastavnika
          uzrasti.forEach((uzrast) => {
            predmeti.forEach((predmet) => {
              // Inicijalizuj brojač za dati predmet i uzrast ako nije već postavljen
              if (raspodelaPoPredmetimaUzrastima[predmet]) {
                //raspodelaPoPredmetimaUzrastima[predmet] = {};
              
                  if (!raspodelaPoPredmetimaUzrastima[predmet][uzrast]) {
                    raspodelaPoPredmetimaUzrastima[predmet][uzrast] = 0;
                  }
        
                  // Inkrementiraj brojač za dati predmet i uzrast
                  raspodelaPoPredmetimaUzrastima[predmet][uzrast]++;
              }
            });
          });
        });
    
        res.status(200).json(raspodelaPoPredmetimaUzrastima);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    };

    promenaPodataka=async (req:express.Request,res:express.Response)=>{
      let kor_ime=req.body.kor_ime
        let ime=req.body.ime
        let prezime=req.body.prezime
        let mejl=req.body.mejl
        let telefon=req.body.telefon
        
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

    dohvatiCV=(req:express.Request,res:express.Response)=>{
      const kor_ime = req.params.kor_ime;

      User.findOne({ kor_ime: kor_ime })
        .then((user) => {
          if (!user) {
            res.status(404).json({ message: "Korisnik nije pronađen" });
            return;
          }

          // Pretpostavljamo da putanja do CV dokumenta čuva u polju "files.cv[0].filename"
          const cvPath = user.files && user.files.cv ? user.files.cv[0].filename : null;

          if (!cvPath) {
            res.status(404).json({ message: "CV nije pronađen" });
            return;
          }

          // Dohvatanje binarnih podataka CV dokumenta
          const cvData = fs.readFileSync(path.join(__dirname, "../../uploads", cvPath));
          console.log(cvData)
          res.setHeader("Content-Type", "application/pdf");
          res.setHeader("Content-Disposition", `inline; filename=${cvPath}`);
          res.send(cvData);
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ message: "Internal Server Error" });
        });
    }
}