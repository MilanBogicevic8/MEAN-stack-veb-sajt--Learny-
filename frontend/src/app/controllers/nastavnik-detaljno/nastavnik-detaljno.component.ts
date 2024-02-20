import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Cas } from 'src/app/models/Cas';
import { Korisnik } from 'src/app/models/Korisnik';
import { Zauzet } from 'src/app/models/Zauzet';
import { NastavnikService } from 'src/app/services/nastavnik.service';
import { UcenikService } from 'src/app/services/ucenik.service';

@Component({
  selector: 'app-nastavnik-detaljno',
  templateUrl: './nastavnik-detaljno.component.html',
  styleUrls: ['./nastavnik-detaljno.component.css']
})
export class NastavnikDetaljnoComponent implements OnInit {
  nastavnik:Korisnik=new Korisnik()
  student:Korisnik=new Korisnik()
  slika:Blob
  casovi:Cas[]=[]
  //kalendar
  events: any[] = []; //  događaji prema zauzetim terminima nastavnika
  viewDate: Date = new Date(); // trenutni datum
  //svi zauzeti termini
  zauzeti:Zauzet[]=[]
  success:string
  sviCasoviNastavnika:Cas[]=[]
  constructor(private ucenik:UcenikService,private sanitizer: DomSanitizer,private router:Router,private nast:NastavnikService){}
  ngOnInit(): void {
    
    let usr=localStorage.getItem("nastavnik_detaljno")
    if(usr==null) return
    this.nastavnik=JSON.parse(usr)
    console.log(this.nastavnik)
    this.predmet=this.nastavnik.predmeti[0]
    usr=localStorage.getItem("user")
    if(usr==null) return
    this.student=JSON.parse(usr)
    this.ucenik.getSlikaNastavnika(this.nastavnik.kor_ime).subscribe(
      (slika) => {
        this.slika=slika
      }
    )
    
    this.ucenik.casovi().subscribe(
      data=>{
        this.sviCasoviNastavnika=data.filter(f=>f.nastavnik==this.nastavnik.kor_ime)
        this.casovi=data.filter(f=>f.nastavnik==this.nastavnik.kor_ime && new Date(f.datum_do)<new Date() && f.komentar_ucenika!=null && f.ocena)
      }
    )
    
    this.nast.dohvatiZauzetost(this.nastavnik.kor_ime).subscribe(
      data=>{
        console.log("z")
        
        this.zauzeti=data
        console.log(this.zauzeti)
      }
    )
    

    // logika za dobijanje zauzetih termina nastavnika
    // i mapiranje događaja za kalendar
    this.events = [
      // Primer događaja (zauzetih termina)
      {
        start: new Date(), // Datum i vreme početka
        end: new Date(),   // Datum i vreme završetka
        title: 'Zauzeto',  // Naslov događaja
        color: { primary: '#e74c3c', secondary: '#c0392b' } // Boja događaja
      }
      // Dodajte ostale događaje prema zauzetim terminima nastavnika
    ];
  }

  prikaziSliku(): SafeUrl {
    if(!(this.slika instanceof Blob)) return null
    if (this.slika instanceof Blob) {
      const url: string = URL.createObjectURL(this.slika);
      return this.sanitizer.bypassSecurityTrustUrl(url);
    } else {
      console.error('Slika nije Blob objekat.');
      return ''; // ili bilo koja druga vrednost koja nam odgovara
    }
  }

  predmet: string = this.nastavnik.predmeti[0];
  datum: string = '';
  vreme: string = '';
  teme: string = '';
  dupliCas: boolean = false;
  errorZakazivanje1:string=""
  zakaziCas() {
    this.errorZakazivanje1=""
    this.success=""
     // Provere za polja
    if (!this.predmet) {
      this.errorZakazivanje1 = "Morate izabrati predmet.";
      return;
    }

    if (!this.datum) {
      this.errorZakazivanje1 = "Morate izabrati datum.";
      return;
    }

    if (!this.vreme) {
      this.errorZakazivanje1 = "Morate izabrati vreme.";
      return;
    }
    /** 
    if (!this.teme || this.teme.trim() === '') {
      this.errorZakazivanje1 = "Morate uneti teme.";
      return;
    }
    */
    
    this.errorZakazivanje1 = "";
    // Implementirajte logiku za zakazivanje časa
    console.log('Zakazivanje časa...');
    console.log('Predmet:', this.predmet);
    console.log('Datum:', this.datum);
    console.log('Vreme:', this.vreme);
    console.log('Teme:', this.teme);
    console.log('Dupli čas:', this.dupliCas);

    const dvs = new Date(`${this.datum}T${this.vreme}`);
    if(dvs<new Date()){
      this.errorZakazivanje1="Ne možete zakazivati časove u prošlosti."
      return
    }
    if(!this.proveraValidnosti()){
      this.errorZakazivanje1 = "Nastavnik je zauzet u datom vremenskom intervalu.(iako ne drži čas)"; //, prvi slobodan termin je:"+this.pronadjiPrviSlobodanTermin(new Date(dvs));
      return
    }
    if(!this.proveraValidnosti2()){
      this.errorZakazivanje1="Nastavnik ima već zauzet taj termin u tom intervalu" //, a prvi slobodan termin je:"+this.pronadjiPrviSlobodanTermin(new Date(dvs))
      return
    }
    //provera da li se zakazuje od 10 do 18 cas
    const datumVremeStart = new Date(`${this.datum}T${this.vreme}`);
    if(datumVremeStart.getHours()<10 || datumVremeStart.getHours()+(this.dupliCas==true?2:1)>18){
      this.errorZakazivanje1="Časovi traju od 10 do 18 časova"
      return
    }
    this.ucenik.zakazivanjeCasa(this.nastavnik.kor_ime,this.student.kor_ime,this.datum,this.vreme,this.teme,this.dupliCas,this.predmet).subscribe(
      data=>{
        if(data.message!="ok"){
          this.errorZakazivanje1=data.message
          //alert("Neuspesno zakazivanje zauzet termin")
        }else{
          ///alert("Uspesno zakazivanje")
          this.success="Uspesno zakazivanje"
          this.ngOnInit()
        }
        this.teme=""
      }
    )


    // Ažuriranje događaja u kalendaru nakon uspešnog zakazivanja
    this.events.push({
      start: new Date(`${this.datum}T${this.vreme}`),
      end: new Date(), // Postavite vreme završetka prema potrebi
      title: 'Zakazan čas',
      color: { primary: '#2ecc71', secondary: '#27ae60' }
    });

    
  }

  handleDayClick(event: any): void {
    // Implementirajte logiku koja treba da se izvrši kada korisnik klikne na određeni dan u kalendaru
    console.log('Kliknuto na dan:', event);
  }


  proveraValidnosti() {
    if (!this.datum || !this.vreme) {
      this.errorZakazivanje1 = "Morate izabrati datum i vreme.";
      return false;
    }
  
    // Konverzija datuma i vremena
    const datumVremeStart = new Date(`${this.datum}T${this.vreme}`);
    let datumVremeEnd = new Date(datumVremeStart); // Inicijalizujemo kraj sa početkom
  
    // Dodajemo 1 sat za običan čas ili 2 sata za dupli čas
    datumVremeEnd.setHours(datumVremeEnd.getHours() + (this.dupliCas ? 2 : 1));
    
    // Provera preklapanja sa zauzetim terminima
    const preklapanje = this.zauzeti.some(zauzetiTermin => {
      const zauzetiStart = new Date(zauzetiTermin.datum_od);
      const zauzetiEnd = new Date(zauzetiTermin.datum_do);
  
      // Provera da li se novi čas preklapa sa postojećim
      return (
        (datumVremeStart >= zauzetiStart && datumVremeStart < zauzetiEnd) ||
        (datumVremeEnd > zauzetiStart && datumVremeEnd <= zauzetiEnd) ||
        (datumVremeStart <= zauzetiStart && datumVremeEnd >= zauzetiEnd)
      );
    });
  
    
    if (preklapanje) {
      
      return false;
    }
    return true;
  }


  proveraValidnosti2() {
    if (!this.datum || !this.vreme) {
      this.errorZakazivanje1 = "Morate izabrati datum i vreme.";
      return false;
    }
  
    // Konverzija datuma i vremena
    const datumVremeStart = new Date(`${this.datum}T${this.vreme}`);
    let datumVremeEnd = new Date(datumVremeStart); // Inicijalizujemo kraj sa početkom
  
    // Dodajemo 1 sat za običan čas ili 2 sata za dupli čas
    datumVremeEnd.setHours(datumVremeEnd.getHours() + (this.dupliCas ? 2 : 1));
  
    // Provera preklapanja sa zauzetim terminima
    const preklapanje = this.sviCasoviNastavnika.some(cas => {
      const zauzetiStart = new Date(cas.datum_od);
      const zauzetiEnd = new Date(cas.datum_do);
      if(cas.razlog_otkazivanja!=''){
        return false
      }
      // Provera da li se novi čas preklapa sa postojećim
      return (
        (datumVremeStart >= zauzetiStart && datumVremeStart < zauzetiEnd) ||
        (datumVremeEnd > zauzetiStart && datumVremeEnd <= zauzetiEnd) ||
        (datumVremeStart <= zauzetiStart && datumVremeEnd >= zauzetiEnd)
      );
    });
  
    
    if (preklapanje) {
      
      return false;
    }
    return true;
  }



  pronadjiPrviSlobodanTermin(datumOd: Date): string | null {
    const radnoVremePocetak = 10; // Početak radnog vremena
    const radnoVremeKraj = 18; // Kraj radnog vremena
  
    // Kopirajte datumOd kako biste izbegli mutaciju originalnog objekta
    let trenutniDatum = new Date(datumOd);
  
    // Provera termina za naredne dane
    while (true) {
      // Postavite sat na početak radnog vremena
      trenutniDatum.setHours(radnoVremePocetak, 0, 0, 0);
  
      // Provera da li je trenutni datum veći od datuma od
      if (trenutniDatum.getTime() >= datumOd.getTime()) {
        // Provera da li je trenutni datum slobodan
        const slobodan = !this.pv3(trenutniDatum);
        
        if (slobodan) {
          // Ako je slobodan, kreirajte tekstualnu informaciju i vratite je
          const dan = trenutniDatum.toLocaleDateString('sr-RS', { weekday: 'long' });
          const datum = trenutniDatum.toLocaleDateString('sr-RS', { day: 'numeric', month: 'long', year: 'numeric' });
          const vreme = trenutniDatum.toLocaleTimeString('sr-RS', { hour: 'numeric', minute: 'numeric' });
  
          return `Prvi slobodan termin je ${dan}, ${datum} od ${vreme}.`;
        }
      }
  
      // Povećajte trenutni datum za 1 dan
      trenutniDatum.setDate(trenutniDatum.getDate() + 1);
  
      // Provera da li smo dostigli kraj radnog vremena za poslednji dan
      if (trenutniDatum.getHours() >= radnoVremeKraj) {
        // Ako jeste, idemo na naredni dan
        continue;
      }
    }
  }

  pv3(trenutni_datum:Date){
  
    // Konverzija datuma i vremena
    const datumVremeStart = trenutni_datum
    let datumVremeEnd = new Date(datumVremeStart); // Inicijalizujemo kraj sa početkom
  
    // Dodajemo 1 sat za običan čas ili 2 sata za dupli čas
    datumVremeEnd.setHours(trenutni_datum.getHours() + (this.dupliCas ? 2 : 1));
    
    // Provera preklapanja sa zauzetim terminima
    let preklapanje = this.zauzeti.some(zauzetiTermin => {
      const zauzetiStart = new Date(zauzetiTermin.datum_od);
      const zauzetiEnd = new Date(zauzetiTermin.datum_do);
  
      // Provera da li se novi čas preklapa sa postojećim
      return (
        (datumVremeStart >= zauzetiStart && datumVremeStart < zauzetiEnd) ||
        (datumVremeEnd > zauzetiStart && datumVremeEnd <= zauzetiEnd) ||
        (datumVremeStart <= zauzetiStart && datumVremeEnd >= zauzetiEnd)
      );
    });
  
    
    if (preklapanje) {
      
      return false;
    }

    // Provera preklapanja sa zauzetim terminima
    preklapanje = this.sviCasoviNastavnika.some(cas => {
      const zauzetiStart = new Date(cas.datum_od);
      const zauzetiEnd = new Date(cas.datum_do);
      if(cas.razlog_otkazivanja!=''){
        return false
      }
      // Provera da li se novi čas preklapa sa postojećim
      return (
        (datumVremeStart >= zauzetiStart && datumVremeStart < zauzetiEnd) ||
        (datumVremeEnd > zauzetiStart && datumVremeEnd <= zauzetiEnd) ||
        (datumVremeStart <= zauzetiStart && datumVremeEnd >= zauzetiEnd)
      );
    });

    if (preklapanje) {
      
      return false;
    }

    return true;
  }
}
