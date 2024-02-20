import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dijagram-pita',
  templateUrl: './dijagram-pita.component.html',
  styleUrls: ['./dijagram-pita.component.css']
})
export class DijagramPitaComponent implements OnInit {

  public piedata?: Object[];
  public legendSettings?: Object;
  public piedata2?:Object[]
  public datalabel?: Object;
  
  constructor(private user:UserService){}
  ngOnInit(): void {
    this.user.raspodelaPoPolu().subscribe(
      data=>{
        console.log(data)
        let muskoN=(data.nastavnici[0].pol=='M'?data.nastavnici[0].count:data.nastavnici[1].count)
        let zenskoN=(data.nastavnici[0].pol=='Z'?data.nastavnici[0].count:data.nastavnici[1].count)
        this.piedata = [{ x: 'Musko', y: muskoN }, { x: 'Zensko', y: zenskoN }];
        

        let muskoU=(data.ucenici[0].pol=='M'?data.ucenici[0].count:data.ucenici[1].count)
        let zenskoU=(data.ucenici[0].pol=='Z'?data.ucenici[0].count:data.ucenici[1].count)
        this.piedata2 = [{ x: 'Musko', y: muskoU }, { x: 'Zensko', y: zenskoU }];
        this.datalabel = { visible: true, name: 'text', position: 'Outside' };
        
        this.legendSettings = {
            visible: true
    };
      }
    )

    
  }

  

}
