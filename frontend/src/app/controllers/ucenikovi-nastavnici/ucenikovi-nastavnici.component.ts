import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/app/models/Korisnik';
import { UcenikService } from 'src/app/services/ucenik.service';

@Component({
  selector: 'app-ucenikovi-nastavnici',
  templateUrl: './ucenikovi-nastavnici.component.html',
  styleUrls: ['./ucenikovi-nastavnici.component.css']
})
export class UcenikoviNastavniciComponent implements OnInit {
  constructor(private ucenik:UcenikService,private router:Router){}
  nastavnici:Korisnik[]=[]
  korisnik:Korisnik=new Korisnik()
  i:number=0
  ngOnInit(): void {
    this.i=0
    let usr=localStorage.getItem("user")
    if(usr==null) return
    this.korisnik=JSON.parse(usr)
    this.ucenik.nastavnici().subscribe(
      data => {
        //console.log(this.korisnik)
        //console.log("uso");
        //console.log(data);
  
        if (this.korisnik.razred >= 1 && this.korisnik.razred <= 4 && this.korisnik.skola == "osnovna") {
          //console.log("prva");
          this.nastavnici = data.filter(nas => nas.uzrast.some(n => n == "Osnovna skola 1-4. razred"));
        } else if (this.korisnik.razred >= 5 && this.korisnik.razred <= 8 && this.korisnik.skola == "osnovna") {
          //console.log("druga");
          this.nastavnici = data.filter(nas => nas.uzrast.some(n => n == "Osnovna skola 5-8. razred"));
        } else if (this.korisnik.razred >= 1 && this.korisnik.razred <= 4 && this.korisnik.skola != "osnovna") {
          //console.log("treca");
          this.nastavnici = data.filter(nas => nas.uzrast.some(n => n == "Srednja skola"));
        }else{
          //this.nastavnici = data.filter(nas => nas.uzrast.some(n => n == "Srednja skola"));
        }
      }
    );
  }

  imePretraga: string = "";
  prezimePretraga: string = "";
  predmetPretraga: string = "";
  sortiranje: string = "ime";

  filtriraniNastavnici(): Korisnik[] {
    if(this.imePretraga=='' && this.prezimePretraga=='' && this.predmetPretraga==''){
      return this.nastavnici
    }
    return this.nastavnici
      .filter(nas => nas.ime.toLowerCase().includes(this.imePretraga.toLowerCase()))
      .filter(nas => nas.prezime.toLowerCase().includes(this.prezimePretraga.toLowerCase()))
      .filter(nas => nas.predmeti.join(', ').toLowerCase().includes(this.predmetPretraga.toLowerCase()))
      .sort((a, b) => (a[this.sortiranje] > b[this.sortiranje]) ? 1 : -1);
  }

  sortiraj(kriterijum: string): void {
    // Postavi kriterijum sortiranja
    this.sortiranje = kriterijum;
  }

  oceneToStars(ocena: number): number[] {
    // Pretvori ocenu u niz zvezdica (recimo da 5 zvezdica predstavlja najvišu ocenu)
    const maksimalnaOcena = 5;
    const zaokruzenaOcena = Math.round(ocena);
    return Array(zaokruzenaOcena).fill(0);
  }

  prosecnaOcena(nastavnik: Korisnik): number {
    const ocene = nastavnik.ocene;
  
    //return 1
    // Prosečna ocena
    if (ocene.length > 0) {
      const sumaOcena = ocene.reduce((total, ocena) => total + ocena, 0);
      let s=sumaOcena / ocene.length;
      return parseFloat(s.toFixed(2));
    } else {
      return 0; // Ako nema ocena, vraćamo 0
    }
  }

  detaljnije(nastavnik:Korisnik){
    localStorage.setItem("nastavnik_detaljno",JSON.stringify(nastavnik))
    this.router.navigate(["nastavnik_detaljno"])
  }
  
  imeFlag: number = 1;
  prezimeFlag: number = 1;
  predmetFlag: number = 1;

sortiranjeNastavnika() {
  if (this.sortiranje === 'ime') {
    this.imeFlag = 1 - this.imeFlag;
    this.nastavnici.sort((a, b) => {
      return this.imeFlag === 0 ? a.ime.localeCompare(b.ime) : b.ime.localeCompare(a.ime);
    });
  } else if (this.sortiranje === 'prezime') {
    this.prezimeFlag = 1 - this.prezimeFlag;
    this.nastavnici.sort((a, b) => {
      return this.prezimeFlag === 0 ? a.prezime.localeCompare(b.prezime) : b.prezime.localeCompare(a.prezime);
    });
  } else if (this.sortiranje === 'predmet') {
    this.predmetFlag = 1 - this.predmetFlag;
    this.nastavnici.sort((a, b) => {
      return this.predmetFlag === 0 ? a.predmeti.join(', ').localeCompare(b.predmeti.join(', ')) : b.predmeti.join(', ').localeCompare(a.predmeti.join(', '));
    });
  }

  
}

sortiranjePoImenuRastuce(){
    this.nastavnici.sort((a,b)=>a.ime>b.ime?1:-1)
}
sortiranjePoImenuOpadajuce(){
  this.nastavnici.sort((a,b)=>a.ime>b.ime?-1:1)
}
sortiranjePoPrezimenuRastuce(){
  this.nastavnici.sort((a,b)=>a.prezime>b.prezime?1:-1)
}
sortiranjePoPrezimenuOpadajuce(){
  this.nastavnici.sort((a,b)=>a.prezime>b.prezime?-1:1)
}
sortiranjePoPredmetuRastuce(){
  this.nastavnici.sort((a,b)=>a.predmeti>b.predmeti?1:-1)
}
sortiranjePoPredmetuOpadajuce(){
  this.nastavnici.sort((a,b)=>a.predmeti>b.predmeti?-1:1)
}
}
