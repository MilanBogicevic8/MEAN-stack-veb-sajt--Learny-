import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cas } from 'src/app/models/Cas';
import { Korisnik } from 'src/app/models/Korisnik';
import { NastavnikService } from 'src/app/services/nastavnik.service';
import { UcenikService } from 'src/app/services/ucenik.service';

@Component({
  selector: 'app-nastavnik-casovi',
  templateUrl: './nastavnik-casovi.component.html',
  styleUrls: ['./nastavnik-casovi.component.css']
})
export class NastavnikCasoviComponent implements OnInit {
  nastavnik:Korisnik=new Korisnik()
  mojiCasovi:Cas[]=[]
  sviCasovi:Cas[]=[]
  nepotvrdjeniCas:Cas[]=[]
  constructor(private ucenik:UcenikService,private n:NastavnikService,private router:Router){}
  ngOnInit(): void {
    let usr=localStorage.getItem("user")
    if(usr==null) return
    this.nastavnik=JSON.parse(usr)
    console.log(this.nastavnik)
    this.ucenik.casovi().subscribe(
      data=>{
        console.log("pocetak")
        console.log(data)
        this.sviCasovi=data.filter(f=>f.potvrdjen==true && f.nastavnik==this.nastavnik.kor_ime && f.razlog_otkazivanja=="")
        console.log(this.sviCasovi)
        //console.log(this.sviCasovi)
        this.nepotvrdjeniCas=data.filter(f=>f.nastavnik==this.nastavnik.kor_ime && f.razlog_otkazivanja=="" && f.potvrdjen==false && new Date()<=new Date(f.datum_od))
        this.mojiCasovi=this.sviCasovi
        this.brojCasova="5"
        this.prikaziCasove()
        for(let c of data){
          c.razlog_otkazivanja=""
          this.n.dohvatiUcenika(c.ucenik[0]).subscribe(
            data=>{
              //console.log(data)
              c.ime_ucenika=data.ime
              c.prezime_ucenika=data.prezime
              c.ocene_ucenika=data.ocene
            }
          )
        }
      }
    )
  }

  brojCasova:string=""
  prikaziCasove(): void {
    const trenutnoVreme = new Date();
    const narednaTriDana = new Date();
    
    narednaTriDana.setDate(narednaTriDana.getDate() + 3);
    //console.log(trenutnoVreme)
    console.log(narednaTriDana)
    // Filtriranje časova u naredna tri dana i sortiranje rastuće po datumu
    const casoviZaNarednaTriDana = this.sviCasovi.filter(
      cas => new Date(cas.datum_do) >= trenutnoVreme && new Date(cas.datum_do) <= narednaTriDana
    ).sort((a, b) => new Date(a.datum_od).getTime() - new Date(b.datum_od).getTime());
  
    // Odabir određenog broja časova
    if (this.brojCasova === "5") {
      this.mojiCasovi=[]
      let i=(casoviZaNarednaTriDana.length>5?5:casoviZaNarednaTriDana.length)
      for(let j=0;j<i;j++){
        this.mojiCasovi.push(casoviZaNarednaTriDana[j])
      }
      
    } else if (this.brojCasova === "10") {
      this.mojiCasovi = casoviZaNarednaTriDana.slice(0, 10);
    } else {
      this.mojiCasovi = this.sviCasovi.filter(
        cas => new Date(cas.datum_od) >= trenutnoVreme
      ).sort((a, b) => new Date(a.datum_od).getTime() - new Date(b.datum_od).getTime()<0?1:-1);
    }
  }
  prikaziDugmeZaPrijavu(cas: Cas): boolean {
    const trenutnoVreme = new Date();
    const datumPrijavljivanja = new Date(cas.datum_od);
    const datumDo=new Date(cas.datum_do)
    trenutnoVreme.setMinutes(trenutnoVreme.getMinutes() + 15); // Prikazi dugme 15 minuta pre početka časa
    //console.log("..",trenutnoVreme)
    //console.log("??",datumPrijavljivanja)
    //console.log(cas.potvrdjen, !cas.odrzan, trenutnoVreme >= datumPrijavljivanja)
    return cas.potvrdjen==true && trenutnoVreme >= datumPrijavljivanja && datumDo>=trenutnoVreme;
  }

  prijaviSeNaCas(cas: Cas): void {
    // Implementirajte logiku za prijavljivanje na čas
    // Možete otvoriti poseban prozor ili obavestenje za priključivanje na čas
    //console.log(`Prijavljeni ste na čas: ${cas.predmet} - ${cas.datum_od}`);
    window.open(`https://meet.jit.si/${cas.nastavnik}`, '_blank');
    this.router.navigate([`video_konferencija/${cas._id}`])
  }

  errorOtkazivanje:string=""
  otkazi_cas(cas:Cas){
    this.errorOtkazivanje=""
    const trenutnoVreme=new Date()
    const datumDrzanja=new Date(cas.datum_od)
    datumDrzanja.setHours(datumDrzanja.getHours()-4)
    if(trenutnoVreme>datumDrzanja){
      this.errorOtkazivanje="Ne mozete otkazati cas za manje od 4 sata pre pocetka"
      return
    }
    console.log(cas.razlog_otkazivanja)
    if(cas.razlog_otkazivanja===""){
      this.errorOtkazivanje="Ako zelite da otkazete cas morate navesti dobar razlog"
      return
    }
    this.n.otkaziCas(cas._id,cas.razlog_otkazivanja).subscribe(
      data=>{
        console.log(data)
        this.ngOnInit()
      }
    )
  }
  //rad sa zahtevima
  potvrdiZahtev(zahtev: Cas): void {
    this.ucenik.potvrdiCas(zahtev).subscribe(
      data=>{
        this.ngOnInit()
      }
    )
    console.log(`Zahtev potvrđen: ${zahtev.ime_ucenika} - ${zahtev.predmet}`);
  }
  
  odbijZahtev(zahtev: Cas): void {
    this.errorOtkazivanje=""
    if(zahtev.razlog_otkazivanja==""){
      this.errorOtkazivanje="Morate da navedete razlog odustanka od držanja časa."
      return
    }
    this.ucenik.otkaziCas(zahtev,zahtev.razlog_otkazivanja).subscribe(
      data=>{
        this.ngOnInit()
      }
    )
    
    console.log(`Zahtev odbijen: ${zahtev.ime_ucenika} - ${zahtev.predmet}`);
  }
  prosek(ocene:number[]){
    let i=0
    for(let o of ocene){
      i+=o
    }
    return i/ocene.length
  }

  dozvoliOtkaz(cas:Cas){
    const datum_od=new Date(cas.datum_od)
    const datum_do=new Date(cas.datum_do)
    const sad=new Date()
    sad.setHours(sad.getHours()+4)
    if(sad<datum_od){
      return true
    }else{
      return false
    }

  }
}
