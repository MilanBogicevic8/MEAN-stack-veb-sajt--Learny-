import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {

  constructor(private admin:AdminService,private router:Router){}
  kor_ime:string=""
  lozinka:string=""
  errorMessage:string=""
  login(){
    this.errorMessage=""
    if(this.kor_ime=="") this.errorMessage+="Morate uneti korisicko ime \n"
    if(this.lozinka=="") this.errorMessage+="Morate uneti lozinku"
    if(this.errorMessage!="") return
    console.log(this.kor_ime,this.lozinka)
    this.admin.login(this.kor_ime,this.lozinka).subscribe(
      data=>{
        if(data){
          localStorage.setItem("user",JSON.stringify(data))
          this.router.navigate(["home"])//posle se vrv pravi posebna komponenta
        }else{
          this.errorMessage="Niste uneli dobro korisnicko ime ili lozinku"
        }
      }
    )
  }

}
