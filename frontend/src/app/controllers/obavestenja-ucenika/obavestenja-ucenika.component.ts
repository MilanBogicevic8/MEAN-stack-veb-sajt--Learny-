import { Component, OnInit } from '@angular/core';
import { Cas } from 'src/app/models/Cas';
import { Korisnik } from 'src/app/models/Korisnik';
import { UcenikService } from 'src/app/services/ucenik.service';

@Component({
  selector: 'app-obavestenja-ucenika',
  templateUrl: './obavestenja-ucenika.component.html',
  styleUrls: ['./obavestenja-ucenika.component.css']
})
export class ObavestenjaUcenikaComponent implements OnInit {
  casovi:Cas[]=[]
  otkazani:Cas[]=[]
  potvrdjeni:Cas[]=[]
  nakonCasaKomentar:Cas[]=[]
  uce:Korisnik=new Korisnik()
  constructor(private ucenik:UcenikService){}
  ngOnInit(): void {
    let usr=localStorage.getItem("user")
    if(usr==null) return
    this.uce=JSON.parse(usr)
    this.ucenik.obavestenja(this.uce.kor_ime).subscribe(
      data=>{
        this.casovi=data
        this.otkazani=this.casovi.filter(f=>f.razlog_otkazivanja!='')
        this.potvrdjeni=this.casovi.filter(f=>f.potvrdjen==true && f.razlog_otkazivanja=='')
        this.nakonCasaKomentar=this.casovi.filter(f=>f.komentar_nastavnika!='')
        
      }
    )
  }

  proveraCitanja(c:Cas){
    if(c.datum_citanja==null){
      return true
    }else{
      return false
    }
  }


  otkazaniSectionOpen: boolean = false;
  potvrdjeniSectionOpen: boolean = false;
  nakonCasaKomentarSectionOpen: boolean = false;

  toggleSection(section: string): void {
    if (section === 'otkazani') {
      this.otkazaniSectionOpen = !this.otkazaniSectionOpen;
      this.otkazani.forEach(o=>{
        this.ucenik.oznaciProcitano(o).subscribe(data=>{})
      })
    } else if (section === 'potvrdjeni') {
      this.potvrdjeni.forEach(p=>{
        this.ucenik.oznaciProcitano(p).subscribe(data=>{})
      })
      this.potvrdjeniSectionOpen = !this.potvrdjeniSectionOpen;
    } else if (section === 'nakonCasaKomentar') {
      this.nakonCasaKomentar.forEach(nck=>{
        this.ucenik.oznaciProcitano(nck).subscribe(data=>{})
      })
      this.nakonCasaKomentarSectionOpen = !this.nakonCasaKomentarSectionOpen;
    }
  }
}
