import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  Observable, Subscriber  } from 'rxjs';
import { Korisnik } from 'src/app/models/Korisnik';
import { Predmet } from 'src/app/models/Predmet';
import { NastavnikService } from 'src/app/services/nastavnik.service';
import { UcenikService } from 'src/app/services/ucenik.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nastavnik-promenapodataka',
  templateUrl: './nastavnik-promenapodataka.component.html',
  styleUrls: ['./nastavnik-promenapodataka.component.css']
})
export class NastavnikPromenapodatakaComponent implements OnInit {

  constructor(private user:UserService,private nastavnik:NastavnikService,private ucenik:UcenikService,private router:Router){}
  korisnik:Korisnik=new Korisnik()
  tip:string=""
  nastavnik_promena:Korisnik=new Korisnik()
  sviMoguciPredmeti:Predmet[]=[]
  successMessage:string=""

  //podaci nastavnik
  ime:string=""
  prezime:string=""
  mejl:string=""
  adresa:string=""
  telefon:string=""
  //za nastavnika
  cv:File
  predmeti:string[]=[]
  uzrast:string[]=[]
  //za sve
  myImage?: Observable<any>;
  slika:File
  file?:File
  errorMessage:string=""

  ngOnInit(): void {
    let usr=localStorage.getItem("user")
    if(usr==null) return
    this.korisnik=JSON.parse(usr)
    this.tip=this.korisnik.tip
    usr=localStorage.getItem("nastavnik_promena")
    if(usr==null) return
    this.nastavnik_promena=JSON.parse(usr)
    this.user.dohvatiPredmete().subscribe(
      data=>{
        this.sviMoguciPredmeti=data
      }
    )
  }

  promeniPodatke(){
    this.errorMessage=""
    this.successMessage=""
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

    if(this.predmeti.length!=0){
      this.korisnik.predmeti=this.predmeti
    }

    if(this.uzrast.length!=0){
      this.korisnik.uzrast=this.uzrast
    }
    if(this.tip=="nastavnik"){
      localStorage.setItem("user", JSON.stringify(this.korisnik));
    }

    this.nastavnik.promenaPodataka(this.nastavnik_promena.kor_ime,this.ime,this.prezime,this.telefon,this.adresa,this.mejl,this.predmeti,this.uzrast).subscribe(
      data=>{
        if(data.message=="ok"){
          this.successMessage="Podaci promenjeni"
        }else{
          this.errorMessage=data.message
        }
        
        console.log(data,"promena")
      }
    )
    
    if(this.file){
      this.ucenik.promenaSlike(this.nastavnik_promena.kor_ime,this.file).subscribe(
        data=>{
          console.log(data)
          if(data.message=="Promenjena profilna slika"){
            this.successMessage="Slika je updejtovana"
            return
          }
          this.errorMessage="Slika nije promenjena"
         // alert("Slika je updatana")
        }
      )
    }
  }



  onUpload($event: Event) {
    // Dobijanje izabranog fajla
    const target = $event.target as HTMLInputElement;
    this.file = (target.files as FileList)[0];

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

  nazad(){
    if(this.tip=="nastavnik"){
      this.router.navigate(["nastavnik_home"])
    }else{
      this.router.navigate(["home"])
    }
  }
}
