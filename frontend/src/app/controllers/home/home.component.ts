import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Korisnik } from 'src/app/models/Korisnik';
import { UcenikService } from 'src/app/services/ucenik.service';
import * as Chart from 'chart.js/auto';
import { AdminService } from 'src/app/services/admin.service';
import { Predmet } from 'src/app/models/Predmet';
import { Router } from '@angular/router';
import { NastavnikService } from 'src/app/services/nastavnik.service';
import { DomSanitizer,SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  svi: Korisnik[] = [];
  nastavnici:Korisnik[]=[]
  ucenici:Korisnik[]=[]
  predmeti:Predmet[]=[]
  dijagram:number
  constructor(private admin: AdminService,private nast:NastavnikService,private ucen:UcenikService,private router:Router,private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.dijagram=1
    this.admin.svi().subscribe(
      data=>{
        this.svi=data
        this.nastavnici=this.svi.filter(f=>f.tip=="nastavnik")
        this.ucenici=this.svi.filter(f=>f.tip=="ucenik")
        console.log(this.svi)
        for(let s of this.svi){
          this.ucen.slika(s.kor_ime).subscribe(
            data=>{
              console.log(data)
              s.slikaDohvacena=data
            }
          )
        }
      }
    )
    this.admin.dohvatiPredmete().subscribe(
      data=>{
        this.predmeti=data
      }
    )

  }

  aktiviraj(n:Korisnik){
    this.admin.promenaStatusa(n,"odobren").subscribe(
      data=>{
        this.ngOnInit()
      }
    )
  }
  deaktiviraj(n:Korisnik){
    this.admin.promenaStatusa(n,"neodobren").subscribe(
      data=>{
        this.ngOnInit()
      }
    )
  }

  odobriPredmet(p:Predmet){
    this.admin.odobriPredmet(p).subscribe(
      data=>{
        this.ngOnInit()
      }
    )
  }

  predmet:string=""
  errorMessage:string=""
  dodajPredmet(){
    this.errorMessage=""
    if(this.predmet==""){
      this.errorMessage="Morate dati naziv predmetu koji dodajete"
      return
    }
    this.admin.dodajPredmet(this.predmet).subscribe(data=>{
      if(data.message!="ok"){
        this.errorMessage="Vec postoji takav predmet u bazi"
        return
      }
      this.ngOnInit()
    }
    )
  }

  promena(n:Korisnik){
    localStorage.setItem("nastavnik_promena",JSON.stringify(n))
    this.router.navigate(["nastavnik_promenapodataka"])
  }

  cv(kor_ime:string){
    localStorage.setItem("kor_ime",JSON.stringify(kor_ime))
    this.router.navigate(["citanje_cv"])
  }

  prikaziSliku(slika:Blob): SafeUrl {
    if(!(slika instanceof Blob)) return null
    if (slika instanceof Blob) {
      const url: string = URL.createObjectURL(slika);
      return this.sanitizer.bypassSecurityTrustUrl(url);
    } else {
      console.error('Slika nije Blob objekat.');
      return ''; // ili bilo koja druga vrednost koja vam odgovara
    }
  }

  postaviDijagram(d:number){
    this.dijagram=d
  }
  logout(){
    localStorage.clear()
    this.router.navigate(['loginadmin'])
  }
}