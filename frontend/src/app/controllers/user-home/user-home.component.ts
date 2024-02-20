import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Korisnik } from 'src/app/models/Korisnik';
import { UcenikService } from 'src/app/services/ucenik.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  user:Korisnik=new Korisnik()
  loged:boolean=false
  slika:Blob
  constructor(private router:Router,private ucenik:UcenikService,private sanitizer: DomSanitizer){}
  ngOnInit(): void {
    let usr=localStorage.getItem("user")
    if(usr){
      this.user=JSON.parse(usr);console.log(this.user);
      this.loged=true
      this.ucenik.getSlikaNastavnika(this.user.kor_ime).subscribe(
        data=>{
          console.log(data)
          this.slika=data
        }
      )
    }else{
      this.loged=false
    }
  }

  logout(){
    localStorage.clear()
    this.router.navigate([""])
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
}
