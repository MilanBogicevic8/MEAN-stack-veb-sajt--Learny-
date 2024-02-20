import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dijagram-piramida',
  templateUrl: './dijagram-piramida.component.html',
  styleUrls: ['./dijagram-piramida.component.css']
})
export class DijagramPiramidaComponent implements OnInit {
  public pyramidData?: Object[];
  public enableSmartLabels?: boolean;
  public title?:string
  public datalabel?:Object

  constructor(private user:UserService){}
  ngOnInit(): void {
    this.title="Odnos broja predmeta koje neko drži i koje niko ne drži"
    this.datalabel = { visible: true, name: 'value', position: 'Outside' };
    this.user.odnos().subscribe(
      data=>{
        let pom =[{ x: 'Broj predmeta koje neko drži', y: data["brojPredmetaKojeNekoDrzi"], text: 'Broj predmeta koje neko drži' },
                          { x: 'Broj predmeta koje niko ne drži', y: data["brojPredmetaKojeNikoNeDrzi"], text: 'Broj predmeta koje niko ne drži' },
                          ] ;
        this.pyramidData=pom
        console.log(data)
      }
    )
  }

}
