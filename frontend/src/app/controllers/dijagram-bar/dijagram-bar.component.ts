import { Component, OnInit } from '@angular/core';
import { NastavnikService } from 'src/app/services/nastavnik.service';

@Component({
  selector: 'app-dijagram-bar',
  templateUrl: './dijagram-bar.component.html',
  styleUrls: ['./dijagram-bar.component.css']
})
export class DijagramBarComponent implements OnInit {

  public chartData: Object[]=[];
  primaryYAxis: any;
  primaryXAxis: any;
  public title?: string;
  constructor(private nastavnik: NastavnikService) {}

  ngOnInit(): void {
    this.primaryXAxis = {
      valueType: 'Category',
      title: 'Predmeti'
    };
    this.title="Broj nastavnika za svaki predmet za svaki uzrast"
    // Dohvati podatke od servera
    this.nastavnik.nastavniciPoPredmetuPoUzrastu().subscribe(
      (data: any) => {
        console.log(data);
        
        // Provera da li postoje podaci i da li su ključevi definisani
        if ( Object.keys(data).length > 0) {
          // Prolazak kroz ključeve objekta
          let i=0
          let pom=[]
          Object.keys(data).forEach(predmetNaziv => {
            const d = data[predmetNaziv];
            console.log(d);

            // Dodavanje podataka u chartData
            pom.push({
              x: predmetNaziv,
              y: d["Osnovna skola 1-4. razred"] || 0,
              y1: d["Osnovna skola 5-8. razred"] || 0,
              y2: d["Srednja skola"] || 0
            });
            i+=1
          });
          //this.chartData.splice(0,10)
          this.chartData=pom
          //console.log(this.chartData)
        } else {
          console.error('Podaci nisu u očekivanom formatu ili su prazni.');
        }
      }
    );
    
  }

}
