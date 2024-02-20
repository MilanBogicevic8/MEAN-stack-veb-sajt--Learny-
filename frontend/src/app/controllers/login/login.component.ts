import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  kor_ime:string=""
  lozinka:string=""
  errorMessage:string=""
  constructor(private user:UserService,private router:Router){}
  ngOnInit(): void {
    
  }

  login(){
    if(this.kor_ime==""){
      this.errorMessage="Niste uneli korisničko ime"
      return
    }
    if(this.lozinka==""){
      this.errorMessage="Niste uneli lozinku"
      return
    }
    //console.log("uso")
    this.user.login(this.kor_ime,this.lozinka).subscribe(
      data=>{
        //console.log(data)
        if(data && data.message=="Netacna sifra!"){
          this.errorMessage="Netacna sifra!"
          return
        }
        if(data && data.message=="Nije pronadjen korisnik sa tim imenom."){
          this.errorMessage="Nije pronadjen korisnik sa tim imenom."
          return
        }
        if(data && data.message=="Administrator još uvek nije odobrio Vaš nalog, sačekajte..."){
          this.errorMessage="Administrator još uvek nije odobrio Vaš nalog, molimo Vas da sačekate..."
          return
        }
        if(data){
          localStorage.setItem("user",JSON.stringify(data))
          if(data.tip=="ucenik"){
            this.router.navigate(["user_home"])
          }else if(data.tip=="nastavnik"){
            this.router.navigate(["nastavnik_home"])
          }
          
        }else{
          this.errorMessage="Pogresni korisnicko ime ili lozinka."
        }
      }
  )
  }

  info(){
    this.router.navigate(["info"])
  }
}
