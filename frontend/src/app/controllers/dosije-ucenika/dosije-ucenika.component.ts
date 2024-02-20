import { Component, OnInit } from '@angular/core';
import { Cas } from 'src/app/models/Cas';
import { NastavnikService } from 'src/app/services/nastavnik.service';

@Component({
  selector: 'app-dosije-ucenika',
  templateUrl: './dosije-ucenika.component.html',
  styleUrls: ['./dosije-ucenika.component.css']
})
export class DosijeUcenikaComponent implements OnInit {
  casovi:Cas[]=[]
  successMessage:string=""
  kor_ime_nastavnika:string=""
  constructor(private nastavnik:NastavnikService){}
  ngOnInit(): void {
    let usr=localStorage.getItem("dosije")
    if(usr==null) return
    let kor_ime=JSON.parse(usr)
    usr=localStorage.getItem("user")
    if(usr==null) return
    this.kor_ime_nastavnika=JSON.parse(usr).kor_ime
    console.log(this.kor_ime_nastavnika)
    this.nastavnik.casoviUcenika(kor_ime).subscribe(
      data=>{
        this.casovi=data
        this.casovi=this.casovi.filter(f=>new Date(f.datum_do)<new Date() && f.razlog_otkazivanja=='' && f.potvrdjen==true)
        this.casovi.forEach(c=>{c.novaOcena=0; c.noviKomentar=""})
        this.casovi.sort((a,b)=>{return a.predmet>b.predmet?1:-1})
        console.log(this.casovi)
      }
    )
  }

  
  errorKomentar:string=""
  dodajOcenuIKomentar(cas:Cas){
    this.errorKomentar=""
    this.successMessage=""
    let novaOcena=cas.novaOcena
    let noviKomentar=cas.noviKomentar
    if(novaOcena==0){
      this.errorKomentar="Morate da unesete ocenu"
      return
    }
    
     //komentar je opcion
    if(noviKomentar==""){
      noviKomentar="Nije prokomentarisao ovaj čas."
      //!!!!!!!!!!!!moze da e pamti o ocena noviKomentar+='/'
      //noviKomentar+=novaOcena--------------------------------------posle vidi
    }

    console.log(novaOcena,noviKomentar)
    this.nastavnik.nastavnikovKomentar(cas,novaOcena,noviKomentar).subscribe(
      data=>{
        this.successMessage="Ocena je uneta"
        this.ngOnInit()
      }
    )
  }
}
