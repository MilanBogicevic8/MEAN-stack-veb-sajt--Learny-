import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/app/models/Korisnik';
import { NastavnikService } from 'src/app/services/nastavnik.service';

@Component({
  selector: 'app-nastavnikovi-ucenici',
  templateUrl: './nastavnikovi-ucenici.component.html',
  styleUrls: ['./nastavnikovi-ucenici.component.css']
})
export class NastavnikoviUceniciComponent implements OnInit {
  ucenici:Korisnik[]=[]
  nastavnik:Korisnik=new Korisnik()
  constructor(private n:NastavnikService,private router:Router){}
  ngOnInit(): void {
    let usr=localStorage.getItem("user")
    if(usr==null) return
    this.nastavnik=JSON.parse(usr)
    console.log(this.nastavnik)
    this.n.casoviNastavnika(this.nastavnik.kor_ime).subscribe(
      data=>{
        this.ucenici=data
        console.log(this.ucenici)
      }
    )
  }

  dosije(korisnik:string){
    localStorage.setItem("dosije",JSON.stringify(korisnik))
    this.router.navigate(["dosije_ucenika"])
  }
}
