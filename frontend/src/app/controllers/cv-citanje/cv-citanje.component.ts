import { Component, OnInit } from '@angular/core';
import { NastavnikService } from 'src/app/services/nastavnik.service';

@Component({
  selector: 'app-cv-citanje',
  templateUrl: './cv-citanje.component.html',
  styleUrls: ['./cv-citanje.component.css']
})
export class CvCitanjeComponent implements OnInit {

  constructor(private nastavnik:NastavnikService){}
  kor_ime:string=""
  cvdata:any
  ngOnInit(): void {
    let kor=localStorage.getItem("kor_ime")
    if(kor==null) return
    this.kor_ime=JSON.parse(kor)
    this.nastavnik.dohvatiCV(this.kor_ime).subscribe(
      data=>{
        console.log(data)
        this.cvdata=new Uint8Array(data)
      }
    )
  }

}
