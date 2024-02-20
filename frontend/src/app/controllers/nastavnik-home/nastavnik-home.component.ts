import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cas } from 'src/app/models/Cas';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Korisnik } from 'src/app/models/Korisnik';
import { UcenikService } from 'src/app/services/ucenik.service';
import { NastavnikService } from 'src/app/services/nastavnik.service';

@Component({
  selector: 'app-nastavnik-home',
  templateUrl: './nastavnik-home.component.html',
  styleUrls: ['./nastavnik-home.component.css']
})
export class NastavnikHomeComponent implements OnInit{
  nastavnik:Korisnik=new Korisnik()
  slika:Blob

  constructor(private ucenik:UcenikService,private nast:NastavnikService,private router:Router,private sanitizer: DomSanitizer){}
  ngOnInit(): void {
    let usr=localStorage.getItem("user")
    if(usr==null) return
    this.nastavnik=JSON.parse(usr)
    console.log(this.nastavnik)
    this.ucenik.getSlikaNastavnika(this.nastavnik.kor_ime).subscribe(
      data=>{
        this.slika=data
      }
    )
  }

  promenaPodataka(){
    localStorage.setItem("nastavnik_promena",JSON.stringify(this.nastavnik))
  }

  logout(){
    localStorage.clear()
    this.router.navigate([''])
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

  promenaPod(){
    localStorage.setItem("nastavnik_promena",JSON.stringify(this.nastavnik))
  }
}
