import { Component, OnInit } from '@angular/core';
import { NastavnikService } from 'src/app/services/nastavnik.service';
import { EventSettingsModel, View } from '@syncfusion/ej2-angular-schedule';
import { Korisnik } from 'src/app/models/Korisnik';
import { UcenikService } from 'src/app/services/ucenik.service';
import { Cas } from 'src/app/models/Cas';
import { Zauzet } from 'src/app/models/Zauzet';

@Component({
  selector: 'app-nastavnik-kalendar',
  templateUrl: './nastavnik-kalendar.component.html',
  styleUrls: ['./nastavnik-kalendar.component.css']
})
export class NastavnikKalendarComponent implements OnInit {

  nastavnik:Korisnik=new Korisnik()
  subjects:string[]=[]
  casovi:Cas[]=[]
  zauzet:Zauzet[]=[]
  errorMessage:string=""
  constructor(private n:NastavnikService,private ucenik:UcenikService){}
  public eventObject:EventSettingsModel={
    dataSource:[],
    fields:{
      subject:{name:'Subject',default:'Zauzet'}
    }
  }


  ngOnInit(): void {
    console.log(this.eventObject)
    let usr = localStorage.getItem('user');
    if (usr == null) return;
    this.nastavnik = JSON.parse(usr);
    this.subjects=this.nastavnik.predmeti
    
    this.ucenik.casovi().subscribe((data) => {
      console.log(this.eventObject)
      //console.log(data)
      //console.log(this.nastavnik)
      this.casovi = data.filter((d) => d.nastavnik == this.nastavnik.kor_ime);
      //console.log(this.casovi)
      //console.log(new Date(this.casovi[0].datum_od))
      //console.log(new Date(this.casovi[0].datum_do))
      this.mapCasoviToEventObject();
    });

    this.n.dohvatiZauzetost(this.nastavnik.kor_ime).subscribe(
      data=>{
        this.zauzet=data
        console.log("z")
        console.log(this.zauzet)
        this.mapZauzetiToEventObject()
      }
    )
  }


  mapCasoviToEventObject(): void {
    
    let id=0
    for(let cas of this.casovi){
      if(cas.razlog_otkazivanja==''){
        const startTime = new Date(cas.datum_od);
        const endTime = new Date(cas.datum_do);
        id=id+1;
        (this.eventObject.dataSource as any[]).push( {
          StartTime: new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate(), startTime.getHours(), startTime.getMinutes()),
          EndTime: new Date(endTime.getFullYear(), endTime.getMonth(), endTime.getDate(), endTime.getHours(), endTime.getMinutes()),
          Subject: cas.teme,
          Predmet:cas.predmet,
          Id:id,
          IsBlock:true,
          PrimaryColor:"red",
          Potvrdjen:(cas.potvrdjen==true?"da":"ne")
        });
      }
    }

    console.log(this.eventObject.dataSource)
    //this.eventObject.fields = fields;
  }

  mapZauzetiToEventObject(){
    
    let id=1000
    for(let cas of this.zauzet){
        const startTime = new Date(cas.datum_od);
        const endTime = new Date(cas.datum_do);
        id=id+1;
        (this.eventObject.dataSource as any[]).push( {
          StartTime: new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate(), startTime.getHours(), startTime.getMinutes()),
          EndTime: new Date(endTime.getFullYear(), endTime.getMonth(), endTime.getDate(), endTime.getHours(), endTime.getMinutes()),
          Subject: "Zauzet",
          Id:id,
          IsBlock:true,
          PrimaryColor:"red",
          Potvrdjen:"nikako"
        });
      }
  }
  

  onActionComplete(args: any): void {
    this.errorMessage=""
    if (args && args.addedRecords && args.addedRecords.length > 0) {
      console.log(args.addedRecords[0].Subject);
      console.log(args.addedRecords[0].StartTime);
      console.log(args.addedRecords[0].EndTime);
      let datum_od=args.addedRecords[0].StartTime
      let datum_do=args.addedRecords[0].EndTime
      if(new Date(datum_od)<new Date()){
        this.errorMessage="Ne možete da dodajete zauzetost u prošlosti."
        location.reload()
        return
      }
      this.n.dodajZauzetost(this.nastavnik.kor_ime,datum_od,datum_do).subscribe(
        data=>{
          console.log("Uspelo")
          location.reload()
        }
      )
    } else {
      console.log('Nema dodatih zapisa.');
    }
  }

  proveriZauzetost(datum_od: Date, datum_do: Date): boolean {
    // Iteriraj kroz sve zauzete intervale
    for (const zauzetInterval of this.zauzet) {
      const zauzetDatumOd = new Date(zauzetInterval.datum_od);
      const zauzetDatumDo = new Date(zauzetInterval.datum_do);
  
      // Proveri da li postoji preklapanje između datuma_od i datum_do i zauzetog intervala
      if (
        (datum_od >= zauzetDatumOd && datum_od <= zauzetDatumDo) ||
        (datum_do >= zauzetDatumOd && datum_do <= zauzetDatumDo) ||
        (datum_od <= zauzetDatumOd && datum_do >= zauzetDatumDo)
      ) {
        // Postoji preklapanje, interval je zauzet
        return true;
      }
    }
  
    // Nema preklapanja, interval nije zauzet
    return false;
  }

  getFormattedTime(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }

  public getCssClasses(data: any): string {
    if (data.Potvrdjen === 'da') {
      return 'zelena';
    } else if (data.Potvrdjen === 'ne') {
      return 'zuta';
    } else if (data.Potvrdjen === 'nikako') {
      return 'crvena';
    } else {
      return '';
    }
  }
}
