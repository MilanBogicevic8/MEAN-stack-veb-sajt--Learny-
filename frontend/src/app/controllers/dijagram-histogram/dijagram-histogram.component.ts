import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NastavnikService } from 'src/app/services/nastavnik.service';


@Component({
  selector: 'app-dijagram-histogram',
  templateUrl: './dijagram-histogram.component.html',
  styleUrls: ['./dijagram-histogram.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DijagramHistogramComponent implements OnInit {
  primaryXAxis: Object = {};
  chartData: any;
  title: string = "";
  pointColorMapping = "";
  public legendSettings = {};
  constructor(private nastavnik:NastavnikService){}


  ngOnInit() {
    this.nastavnik.prosekPoDanu().subscribe(
      data=>{
        console.log(data)
        this.chartData = [
          { dan: "PON", prosek: data['1'], color: "blue" },
          { dan: "UTO", prosek: data['2'], color: "blue" },
          { dan: "SRE", prosek: data['3'], color: "blue" },
          { dan: "ČET", prosek: data['4'], color: "blue" },
          { dan: "PET", prosek: data['5'], color: "blue" },
          { dan: "SUB", prosek: 0, color: "blue" },
          { dan: "NED", prosek: 0, color: "blue" }
        ];
      }
    )

    this.primaryXAxis = {
      valueType: "Category",
      title: "Dani u nedelji",
      visible: true
    };
    this.title = "Prosečan broj časova u 2023.";
    
    this.pointColorMapping = "color";
    this.legendSettings = { visible: true, position: "Right" };
  }
    
}
