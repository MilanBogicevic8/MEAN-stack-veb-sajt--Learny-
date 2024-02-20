import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/app/models/Korisnik';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent implements OnInit {

  constructor(private user:UserService,private router:Router){}
  korisnik:Korisnik=new Korisnik()
  ngOnInit(): void {
    let usr=localStorage.getItem("user")
    if(usr==null) return
    this.korisnik=JSON.parse(usr)
  }
  kor_ime:string=""
  staraLozinka:string=""
  novaLozinka:string=""
  potvrdaLozinke:string=""
  poruka:string=""
  potvrda1:string=""
  potvrda2:string=""
  successMessage:string=""
  promeniLozinku(){
    this.poruka=""
    this.successMessage=""
    if(this.kor_ime=="") this.poruka+="Morate uneti korisnicko ime \n"
    if(this.staraLozinka=="") this.poruka+="Morate uneti staru lozinku\n"
    if(this.novaLozinka=="") this.poruka+="Morate uneti novu lozinku\n"
    if(this.potvrda1=="" || this.potvrda2=="") this.poruka+="Morate ponovo uneti novu lozinku\n"
    if(this.novaLozinka!=this.potvrda1 || this.novaLozinka!=this.potvrda2) this.poruka+="Ponovljena lozinka se mora slagati sa novom lozinkom\n"
    if(!this.proveriLozinku(this.novaLozinka)) this.poruka+="Nova lozinka ne zadovoljava uslove za lozinku"
    if(this.poruka!="") return
    //treba dopuniti home komponentu
    this.user.promenaLozinke(this.kor_ime,this.staraLozinka,this.novaLozinka).subscribe(
      data=>{
        console.log(data)
        if(data.message!="ok"){
          this.poruka=data.message
          return
        }

        //alert("Vratili se")
        this.successMessage="Uspesna promena lozinke"
        this.router.navigate([""])
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
}
