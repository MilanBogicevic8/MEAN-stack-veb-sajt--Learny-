import { Component, OnInit } from '@angular/core';
import { UcenikService } from 'src/app/services/ucenik.service';

@Component({
  selector: 'app-dijagram-donut',
  templateUrl: './dijagram-donut.component.html',
  styleUrls: ['./dijagram-donut.component.css']
})
export class DijagramDonutComponent implements OnInit{

  public piedata?: Object[];
  public legendSettings?: Object;
  public datalabel?:Object
  public title?: string;

  constructor(private ucenik:UcenikService){}
  ngOnInit(): void {

    this.piedata = [];
    this.legendSettings = {
          visible: true
    };

    //console.log("iso")
    this.datalabel = { visible: true, name: 'text', position: 'Outside' };
    this.title="Broj časova koji su održani svakom učeniku"
    this.ucenik.brojCasovaZaSveUcenike().subscribe(
      data=>{
        console.log("nes")
        console.log(data)
        let pom=[]
        data.forEach(
          d=>{
            pom.push({
              x:d.ucenik,
              y:d.brojCasova
            })
          }
        )
        this.piedata=pom
      }
    )
  }

}
