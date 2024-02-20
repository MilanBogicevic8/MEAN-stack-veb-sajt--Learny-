import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-zaboravljena-lozinka',
  templateUrl: './zaboravljena-lozinka.component.html',
  styleUrls: ['./zaboravljena-lozinka.component.css']
})
export class ZaboravljenaLozinkaComponent {
  constructor(private user:UserService,private router:Router){}
  firstPage:boolean=true;
  secondPage:boolean=false;
  thirdPage:boolean=false;
  errorMessage:string=""
  kor_ime:string=""
  odg:string=""
  //odgovor-pitanje
  pitanje:string=""
  odgovor:string=""
  //promena
  novaLozinka:string=""
  ponovo1:string=""
  ponovo2:string=""

  next(){
    this.errorMessage=""
    if(this.firstPage==true){
      if(this.kor_ime=="") this.errorMessage="Morate uneti korisničko ime"
      if(this.errorMessage!="") return

      this.user.korisnik(this.kor_ime).subscribe(
        data=>{
          if(data){
            if(data.status=="neodobren"){
              this.errorMessage="Niste odobreni u sistemu"
              return
            } 
            this.pitanje=data.bezbednost_pitanje
            this.odgovor=data.bezbednost
            console.log(data)
            this.firstPage=false;
            this.secondPage=true;
            return
          }else{
            this.errorMessage="Ne postoji korisnik sa tim imenom u sistemu"
            return
          }
        }
      )

      
    }

    if(this.secondPage==true){
      console.log(this.odg)
      if(this.odg!=this.odgovor){
        this.errorMessage="Vaš odgovor je različit od onog pri registraciji."
        console.log("Vas odgovor je razlicit od onog pri registraciji")
        return
      }
      this.secondPage=false;
      this.thirdPage=true;
      return
    }
    if(this.thirdPage==true){
      
      if(this.ponovo1!=this.ponovo2) this.errorMessage+="Ponovljene lozinke se ne slazu \n"
      if(this.novaLozinka!=this.ponovo1) this.errorMessage+="Ponovljena lozinka se ne slaze sa novom\n"
      if(!this.proveriLozinku(this.novaLozinka)) this.errorMessage+="Nova lozinka ne odgovara pravilima za definisanje lozinke\n"
      //console.log("dosao")
      if(this.errorMessage!="") return
      //console.log("poslao")
      this.user.resetLozinke(this.kor_ime,this.novaLozinka).subscribe(
        data=>{
          console.log(data)
          alert("Promenjena lozinka")
          this.router.navigate([""])
        }
      )
      
    }
  }
  
  submit(){

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
}
