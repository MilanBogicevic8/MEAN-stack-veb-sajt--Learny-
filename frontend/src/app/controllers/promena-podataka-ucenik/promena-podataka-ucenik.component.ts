import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { Korisnik } from 'src/app/models/Korisnik';
import { UcenikService } from 'src/app/services/ucenik.service';

@Component({
  selector: 'app-promena-podataka-ucenik',
  templateUrl: './promena-podataka-ucenik.component.html',
  styleUrls: ['./promena-podataka-ucenik.component.css']
})
export class PromenaPodatakaUcenikComponent implements OnInit {
  korisnik:Korisnik=new Korisnik()
  tip:string=""
  constructor(private ucenik:UcenikService,private router:Router){}

  ngOnInit(): void {
    this.razred=0
    let usr=localStorage.getItem("user")
    if(usr==null) return
    this.korisnik=JSON.parse(usr)
    this.tip=this.korisnik.tip
  }

  ime:string=""
  prezime:string=""
  mejl:string=""
  adresa:string=""
  telefon:string=""
  //za ucenika
  skola:string=""
  razred:number=0
  //za nastavnika
  predmeti:string[]=[]
  uzrast:string[]=[]
  //za sve
  myImage?: Observable<any>;
  slika:File
  file?:File
  errorMessage:string=""
  succes:string=""

  promeniPodatke() {
    this.errorMessage=""
    this.succes=""
    if(this.tip=="ucenik"){
      if(this.skola!="" || this.razred!=0){
        if(this.skola==""){
          this.errorMessage="Unesite tip škole"
          return
        }
        if(this.razred==0){
          this.errorMessage="Unesite razred"
          return
        }
        console.log(this.korisnik.skola,this.korisnik.razred,this.skola,this.razred)
          if(this.korisnik.skola=="osnovna" && this.korisnik.razred<8 && this.skola!="osnovna"){
            this.errorMessage="Ne možete preći u srednju školu ako pre toga niste bili osmak"
            this.skola=""
            this.razred=0
            return
          }
          if(this.korisnik.skola=="osnovna" && this.skola!="osnovna" && this.korisnik.razred==8 && (this.razred!=1)){
            this.errorMessage="Ako prelazite iz osnovne u srednju školu morate upisati prvi razred "
            this.skola=""
            this.razred=0
            return
          }
          if (this.skola === "osnovna" && this.korisnik.skola !== "osnovna") {
            this.errorMessage = "Nemoguće je preći iz srednje škole u osnovnu školu.";
            this.skola=""
            this.razred=0
            return;
          }

          if (this.skola != "osnovna" && this.korisnik.skola == "osnovna") {
            // Korisnik prelazi iz osnovne u srednju školu
            if (this.razred !== 1) {
              this.errorMessage = "Ako prelazite iz osnovne u srednju školu, morate upisati prvi razred.";
              this.skola=""
              this.razred=0
              return;
            }
          }

          if (this.razred <= this.korisnik.razred && this.skola === this.korisnik.skola) {
            this.errorMessage = "Razred mora biti inkrementalan, osim pri prelasku iz osmog u prvi razred srednje škole.";
            this.skola=""
            this.razred=0
            return;
          }

          // provera razreda
        if (this.razred < 0) {
          this.errorMessage = "Razred ne može biti negativan.";
          this.skola=""
          this.razred=0
          return;
        }

        if(this.razred!=0){
          //provera razreda osnovna
          if ((this.skola === "osnovna" || this.korisnik.skola=="osnovna") && (this.razred!=0 &&(this.razred > 8 || this.razred < 1))) {
            this.errorMessage = "Razred u osnovnoj školi mora biti između 1 i 8.";
            this.skola=""
            this.razred=0
            return;
          }

          //provera razreda
          if ((this.skola != "osnovna"|| this.korisnik.skola!="osnovna") && (this.razred!=0 && (this.razred > 4 || this.razred < 1))) {
            this.errorMessage = "Razred u srednjoj školi mora biti između 1 i 4.";
            this.skola=""
            this.razred=0
            return;
          }
          if(this.skola=="osnovna" && this.razred!=this.korisnik.razred+1){
            this.errorMessage="Razredi moraju da idu inkrementalno: npr. ako prelazite iz 5. razreda mozete samo u 6."
            this.skola=""
            this.razred=0
            return
          }
          if(this.korisnik.skola!="osnovna" && this.razred!=this.korisnik.razred+1){
            console.log(this.korisnik.razred,this.razred)
            this.errorMessage="Razredi moraju da idu inkrementalno:npr. ako ste ucenik 1. razreda srednje skole mozete upisati samo 2. razred."
            this.skola=""
            this.razred=0
            return
          }
      }
    }
    }else if(this.tip=="nastavnik"){
      //moze i da ostavi neka polja prazna
    }
    // Ako su provere prošle, resetujte poruku o grešci
    this.errorMessage = "";

    // Ažuriranje lokalnog objekata korisnika
    if (this.ime !== "") {
      this.korisnik.ime = this.ime;
    }

    if (this.prezime !== "") {
      this.korisnik.prezime = this.prezime;
    }

    if (this.mejl !== "") {
      this.korisnik.mejl = this.mejl;
    }

    if (this.adresa !== "") {
      this.korisnik.adresa = this.adresa;
    }

    if (this.telefon !== "") {
      this.korisnik.telefon = this.telefon;
    }

    if (this.skola !== "") {
      this.korisnik.skola = this.skola;
    }

    if (this.razred !== 0) {
      this.korisnik.razred = this.razred;
    }

    if(this.predmeti.length!=0){
      this.korisnik.predmeti=this.predmeti
    }

    if(this.uzrast.length!=0){
      this.korisnik.uzrast=this.uzrast
    }

    // Ažuriranje localStorage
    localStorage.setItem("user", JSON.stringify(this.korisnik));
    
    this.ucenik.promenaPodataka(this.korisnik.kor_ime,this.ime,this.prezime,this.telefon,this.adresa,this.mejl,this.skola,this.razred,this.predmeti,this.uzrast).subscribe(
      data=>{
        console.log(data)
        //alert("Promenjeno")
        this.succes="Podaci su promenjeni"
        this.razred=0
        this.skola=""
        this.ime=""
        this.prezime=""
        this.mejl=""
        this.adresa=""
        this.telefon=""
      }
    )
    
    if(this.file){
      this.ucenik.promenaSlike(this.korisnik.kor_ime,this.file).subscribe(
        data=>{
          console.log(data)
          //alert("Slika je updatana")
          this.succes+="Promenjena slika"
          
        }
      )
    }
  }



  onUpload($event: Event) {
    // Dobijanje izabranog fajla
    const target = $event.target as HTMLInputElement;
    this.file = (target.files as FileList)[0];
    console.log(this.file)
    // Kreiranje observable-a za čitanje fajla
    const observable = new Observable((subscriber: Subscriber<any>) => {
        try {
            // Kreiranje FileReader objekta
            const filereader = new FileReader();

            // Čitanje sadržaja fajla kao Data URL
            filereader.readAsDataURL(this.file);

            // Postavljanje handlers-a za onload i onerror događaje
            filereader.onload = () => {
                // Kada je čitanje završeno uspešno, poziva se next() sa rezultatom
                subscriber.next(filereader.result);
                subscriber.complete();
            };

            filereader.onerror = () => {
                // Ako dođe do greške, poziva se error()
                subscriber.error();
                subscriber.complete();
            };
        } catch {
            // Ako dođe do greške pri kreiranju FileReader-a, postavlja se prazna poruka o grešci
            this.errorMessage = '';
        }
    });

    // Pretplata na observable i obrada rezultata
    observable.subscribe((d) => {
        // Postavljanje rezultata u promenljivu za prikazivanje slike
        this.myImage = d;

        // Kreiranje Image objekta radi provere dimenzija slike
        var img = new Image();

        img.onload = () => {
            // Ako su dimenzije slike van određenog opsega, postavlja se poruka o grešci
            let width = img.width;
            let height = img.height;

            if (width < 100 || width > 300 || height < 100 || height > 300) {
                this.errorMessage = 'Image size must be between 100x100px and 300x300px.';
                this.myImage = null;
                return;
            }

            // Ako su dimenzije u odgovarajućem opsegu, prazni se poruka o grešci
            this.errorMessage = '';
        };

        // Postavljanje source atributa Image objekta radi učitavanja slike
        img.src = this.myImage.toString();
    });
}

logout(){
 // localStorage.clear()
}
}
