import { Component, OnInit } from '@angular/core';
import { NastavnikService } from 'src/app/services/nastavnik.service';

@Component({
  selector: 'app-dijagram-linija',
  templateUrl: './dijagram-linija.component.html',
  styleUrls: ['./dijagram-linija.component.css']
})
export class DijagramLinijaComponent implements OnInit {
  public data?:Object[][]=[];
  public xAxis: Object;
  public yAxis: Object;
  public chartTitle: string;
  public legend: Object;
  public markerSettings: Object;
  public tooltipSettings: Object;

  constructor(private nastavnik: NastavnikService) {
    this.chartTitle = "Analiza održanih časova nastavnika po mesecima";
    this.tooltipSettings = {
      enable: true
    };
    this.markerSettings = {
      visible: true,
      dataLabel: {
        visible: true
      }
    };
    this.legend = {
      visible: true
    };
    this.yAxis = {
      title: 'Broj časova'
    };
    this.xAxis = {
      title: 'mesec',
      valueType: 'Category'
    };
  }

  //obj:any=[]
  pom0?:Object
  pom1?:Object
  pom2?:Object
  pom3?:Object
  pom4?:Object

  pom5?:Object
  pom6?:Object
  pom7?:Object
  pom8?:Object
  pom9?:Object
  

  ngOnInit(): void {
    this.nastavnik.najangazovaniji().subscribe(
      (dat: any[]) => {
        // Uzmi sve dostupne podatke ili prvih 10
        //this.data = [dat.slice(0, 10).map(item => ({ month: item.mesec, sales: item.ukupno_casova }))];
        //console.log(dat)
        let i=0
        
        for (let d of dat) {
          console.log(d);
          
          // Deklaracija obj unutar petlje
          let obj = [];
        
          obj.push({ mesec: 'Jan', broj: d.casovi_po_mesecima['Jan'] });
          obj.push({ mesec: 'Feb', broj: d.casovi_po_mesecima['Feb'] });
          obj.push({ mesec: 'Mar', broj: d.casovi_po_mesecima['Mar'] });
          obj.push({ mesec: 'Apr', broj: d.casovi_po_mesecima['Apr'] });
          obj.push({ mesec: 'May', broj: d.casovi_po_mesecima['May'] });
          obj.push({ mesec: 'Jun', broj: d.casovi_po_mesecima['Jun'] });
          obj.push({ mesec: 'Jul', broj: d.casovi_po_mesecima['Jul'] });
          obj.push({ mesec: 'Aug', broj: d.casovi_po_mesecima['Aug'] });
          obj.push({ mesec: 'Sep', broj: d.casovi_po_mesecima['Sep'] });
          obj.push({ mesec: 'Oct', broj: d.casovi_po_mesecima['Oct'] });
          obj.push({ mesec: 'Nov', broj: d.casovi_po_mesecima['Nov'] });
          obj.push({ mesec: 'Dec', broj: d.casovi_po_mesecima['Dec'] });
        
          this.data[i] = obj;
          console.log(this.data[i])
          if(i==0){
            this.pom0=obj
          }else if(i==1){
            this.pom1=obj
          }else if(i==2){
            this.pom2=obj
          }else if(i==3){
            this.pom3=obj
          }else if(i==4){
            this.pom4=obj
          }else if(i==5){
            this.pom5=obj
          }else if(i==6){
            this.pom6=obj
          }else if(i==7){
            this.pom7=obj
          }else if(i==8){
            this.pom8=obj
          }else if(i==9){
            this.pom9=obj
          }
          i += 1;
        }}
    );
  }
}
