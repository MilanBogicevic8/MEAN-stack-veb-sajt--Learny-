import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { Predmet } from 'src/app/models/Predmet';
import { AdminService } from 'src/app/services/admin.service';
import { ThisReceiver } from '@angular/compiler';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  errorMessage:string=""
  successMessage:string=""
  //user: any = {}; // Definišite odgovarajući model
  tip:string="";
  isTeacher:boolean=false;
  //zajednicki podaci
  ime:string=""
  prezime:string=""
  kor_ime:string=""
  lozinka:string=""
  pol:string=""
  adresa:string=""
  telefon:string=""
  mejl:string=""
  bezbednost:string=""
  bezbednost_pitanje:string=""
  slika?:File
  //ucenik
  skola:string=""
  razred:number=0
  //nastavnik
  cv:File
  predmeti:string[]=[]
  uzrast:string[]=[]
  saznali:string=""
  //slika
  myImage?: Observable<any>;
  base64code: any;
  file: File;
  filecv:File
  sviMoguciPredmeti:Predmet[]=[]
  constructor(private userService: UserService,private admin:AdminService) {} 
  ngOnInit(): void {
    
    this.tip="ucenik"
    this.razred=1
    
    //console.log(this.proveriLozinku("miki123!"))
    this.userService.dohvatiPredmete().subscribe(
      data=>{
        console.log(data)
        this.sviMoguciPredmeti=data
      }
    )
  }

  proveriLozinku(lozinka: string): boolean {
      // Provera minimalne i maksimalne dužine
      if (lozinka.length < 6 || lozinka.length > 10) {
          return false;
      }

      // Provera bar jednog velikog slova
      if (!/[A-Z]/.test(lozinka)) {
          return false;
      }

      // Provera tri mala slova
      if (!/[a-z]{3,}/.test(lozinka)) {
          return false;
      }

      // Provera bar jednog broja
      if (!/\d/.test(lozinka)) {
          return false;
      }

      // Provera bar jednog specijalnog karaktera
      if (!/[@$!%*?&]/.test(lozinka)) {
          return false;
      }

      // Provera da lozinka počinje slovom
      if (!/^[A-Za-z]/.test(lozinka)) {
          return false;
      }

      // Ako prođe sve provere, vraća true
      return true;
  }


  submitForm() {
    this.errorMessage=""
    this.successMessage=""
    if(this.tip==""){
      alert("Morate izabrati tip korisnika")
      return;
    }else if(this.tip=="ucenik"){
      if(this.ime=="") this.errorMessage+="Morate uneti Vase ime \n"
      if(this.prezime=="") this.errorMessage+="Morate uneti Vase prezime \n"
      if(this.kor_ime=="") this.errorMessage+="Morate uneti Vase korisnicko ime \n"
      if(this.lozinka=="") this.errorMessage+="Morate unet lozinku \n"
      if(!this.proveriLozinku(this.lozinka)) this.errorMessage+="Lozinka nije u ispravnom formatu! Lozinka mora imati izmedju 6 i 10 slova, bar jedno veliko, bar tri mala slova, bar jedan specijalan karakter, bar jedan broj i mora počinjati slovom!"
      if(this.pol=="") this.errorMessage+="Morate uneti pol \n"
      if(this.adresa=="") this.errorMessage+="Morate uneti adresu \n"
      if(this.telefon=="") this.errorMessage+="Morate uneti Vas broj telefona \n"
      if(this.mejl=="") this.errorMessage+="Morate uneti Vas e-mail \n"
      if(this.bezbednost_pitanje=="") this.errorMessage+="Morate uneti bezbedonosno pitanje koje ce se koristiti ako zaboravite lozinku \n"
      if(this.bezbednost=="") this.errorMessage+="Morate uneti odgovor na bezbednosno pitanje"
      if(this.skola=="") this.errorMessage+="Morate uneti nivo skole koju pohadjate"
      if(this.razred==0) this.errorMessage+="Morate uneti razred koji pohadjate"
      if(this.skola=="osnovna" && (this.razred<1 || this.razred>8)) this.errorMessage+="Ukoliko idete u osnovnu skolu razredi su od 1. do 8."
      if(this.skola!="osnovna" && (this.razred<1 || this.razred>4)) this.errorMessage+="Ukoliko idete u srednu skolu razredi su od 1. do 4."
      if(this.validateEmail()==false){
        this.errorMessage="Emajl nije u ispravnom formatu"
        return
      }
      if(this.isValidPhoneNumber(this.telefon)==false){
        this.errorMessage="Broj telefona nije u ispravnom formatu. Broj moze pocinjati sa +, moze imati / i - i mora imati bar 6 cifara."
        return
      }
      if(this.errorMessage!="") return
      
      this.userService.registracija_ucenik(this.ime,this.prezime,this.kor_ime,this.lozinka,this.pol,this.adresa,this.telefon,this.mejl,this.bezbednost,this.bezbednost_pitanje,this.file,this.skola,this.razred).subscribe(
        data=>{
          if(data.message!="ok"){
            this.errorMessage+=data.message
          }else{
            //alert("ok")
            this.successMessage="Uspešna registracija"
          }
          //alert("Uspesno dodavanje")
          console.log(data)
        }
      )
    }else if(this.tip=="nastavnik"){
      if(this.isTeacher){
        if(this.ime=="") this.errorMessage+="Morate uneti Vase ime \n"
        if(this.prezime=="") this.errorMessage+="Morate uneti Vase prezime \n"
        if(this.kor_ime=="") this.errorMessage+="Morate uneti Vase korisnicko ime \n"
        if(this.lozinka=="") this.errorMessage+="Morate unet lozinku \n"
        if(!this.proveriLozinku(this.lozinka)) this.errorMessage+="Lozinka nije u ispravnom formatu! Lozinka mora imati izmedju 6 i 10 slova, bar jedno veliko, bar tri mala slova, bar jedan specijalan karakter, bar jedan broj i mora počinjati slovom!"
        if(this.pol=="") this.errorMessage+="Morate uneti pol \n"
        if(this.adresa=="") this.errorMessage+="Morate uneti adresu \n"
        if(this.telefon=="") this.errorMessage+="Morate uneti Vas broj telefona \n"
        if(this.mejl=="") this.errorMessage+="Morate uneti Vas e-mail \n"
        if(this.bezbednost_pitanje=="") this.errorMessage+="Morate uneti bezbedonosno pitanje koje ce se koristiti ako zaboravite lozinku \n"
        if(this.bezbednost=="") this.errorMessage+="Morate uneti odgovor na bezbednosno pitanje"
        if(!this.cv) this.errorMessage+="Morate dodati Vas CV \n"
        if(this.predmeti.length==0 && this.dodatanPredmet=="") this.errorMessage+="Morate dodati bar jedan predmet koji predajete \n"
        if(this.uzrast.length==0) this.errorMessage+="Morate odabrati bar jedan uzrast kome zelite da predajete \n"
        if(this.saznali=="") this.errorMessage+="Morate napisati odakle ste saznali za ovaj sajt\n"
        //if(!this.cv) this.errorMessage+="Morate uneti Vas CV"
        if(this.cv && this.cv.size>3*1024*1024) this.errorMessage+="Velicina CV-a mora biti manja od 3MB"
      }
      
      if(this.validateEmail()==false){
        this.errorMessage="Emajl nije u ispravnom formatu"
        return
      }
      if(this.isValidPhoneNumber(this.telefon)==false){
        this.errorMessage="Broj telefona nije u ispravnom formatu. Broj moze pocinjati sa +, moze imati / i - i mora imati bar 6 cifara."
        return
      }
      if(this.errorMessage!="") return;
      if(this.dodatanPredmet!="" ){
        this.predmeti.pop()
        this.predmeti.push(this.dodatanPredmet)
        this.admin.dodajNeodobrenPredmet(this.dodatanPredmet).subscribe(
          data=>{}
        )
      }
      
      console.log(this.file)
      console.log(this.filecv)
      this.userService.registracija_nastavnik(this.ime,this.prezime,this.kor_ime,this.lozinka,this.pol,this.adresa,this.telefon,this.mejl,this.bezbednost,this.bezbednost_pitanje,this.file,this.filecv,this.predmeti,this.uzrast).subscribe(
        data=>{
          if(data){
            //alert("Dodato")
            if(data.message!="ok"){
              this.errorMessage+=data.message
            }else{
              //alert("Uspesna registracija")
              this.successMessage="Uspešna registracija"
            }
            console.log(data)
          }
        }
      )
    }
  }

  promena1(){
    if(this.tip=="ucenik"){
      this.isTeacher=false;
    }else{
      this.isTeacher=true;
    }
  }
  dodatanPredmet:string=""
  dodatanIzbor:boolean=false
  promena2(){
    if(this.predmeti.some(p=>p=="nešto drugo")){
      //this.predmeti.push(this.dodatanPredmet)
      this.dodatanIzbor=true
    }
  }
  


  pom?:File
  onUpload($event: Event) {
      // Dobijanje izabranog fajla
      const target = $event.target as HTMLInputElement;
      this.pom =(target.files as FileList)[0];
      if(this.pom.type!="application/pdf"){
        this.file=this.pom
      }else{
        this.filecv=this.pom
      }
      console.log(target)
      
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
              console.log(img)
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

  onFileChаnge($event: Event): void {
    const input = $event.target as HTMLInputElement;
    
    if (input.files && input.files.length > 0) {
      this.cv = input.files[0];
      // Provera da li je uploаdovаni fаjl tipа PDF
      if (this.cv.type !== 'application/pdf') {
        alert('Molimo vas da izaberete PDF fаjl.');
        
        input.value = '';
        this.cv = null;
      }
    }
  }

  korak:boolean=false;
  drugiKorak(){
    this.korak=true;
  }

  validateEmail() {
    // Regex za proveru ispravnosti email formata
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailRegex.test(this.mejl)) {
      console.log('Email adresa je ispravna.');
      return true;
    } else {
      console.log('Unesite ispravnu email adresu.');
      return false;
    }
  }

  validatePhoneNumber() {
    // Regex za proveru ispravnosti formata broja telefona
    const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;

    if (phoneRegex.test(this.telefon)) {
      console.log('Broj telefona je ispravan.');
    } else {
      console.log('Unesite ispravan broj telefona.');
    }
  }

  isValidPhoneNumber(phoneNumber: string): boolean {
    const phoneNumberRegex = /^(\+\d{1})?[\/\d()\s-]{6,}$/;
    return phoneNumberRegex.test(phoneNumber);
  }
}
