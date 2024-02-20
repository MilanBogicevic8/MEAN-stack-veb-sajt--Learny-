import { Component, OnInit, ViewChild } from '@angular/core';
import { EventSettingsModel, ScheduleComponent } from '@syncfusion/ej2-angular-schedule';
import { Cas } from 'src/app/models/Cas';
import { Korisnik } from 'src/app/models/Korisnik';
import { Zauzet } from 'src/app/models/Zauzet';
import { NastavnikService } from 'src/app/services/nastavnik.service';
import { UcenikService } from 'src/app/services/ucenik.service';

@Component({
  selector: 'app-interaktivni-kalendar',
  templateUrl:'./interaktivni-kalendar.component.html',
  styleUrls: ['./interaktivni-kalendar.component.css'],
})
export class InteraktivniKalendarComponent implements OnInit {

  @ViewChild('scheduleObj') public scheduleObj: ScheduleComponent;

  minDate: Date = new Date(); // Set the minimum date to the current date
  maxDate: Date = new Date(2024, 11, 31); // Set the maximum date (adjust as needed)

  uc:Korisnik=new Korisnik()
  nastavnik: Korisnik = new Korisnik();
  casovi: Cas[] = [];
  subjects:string[]=[]
  zauzet:Zauzet[]=[]
  eventObject: EventSettingsModel = {
    dataSource: []
  };

  constructor(private n:NastavnikService,private ucenik: UcenikService) {}
  ngOnInit(): void {
    console.log(this.eventObject)
    let usr = localStorage.getItem('nastavnik_detaljno');
    if (usr == null) return;
    this.nastavnik = JSON.parse(usr);
    usr = localStorage.getItem('user');
    if (usr == null) return;
    this.uc = JSON.parse(usr);


    this.subjects=this.nastavnik.predmeti
    this.predmet=this.nastavnik.predmeti[0]
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
        this.mapZauzetiToEventObject()
      }
    )
  }

  datum_od:Date
  datum_do:Date
  opis:string=""
  predmet:string=""
  errorZakazivanje1:string=""
  onActionComplete(args: any): void {
    if (args && args.addedRecords && args.addedRecords.length > 0) {
      console.log(args.addedRecords[0].Subject);
      console.log(args.addedRecords[0].StartTime);
      console.log(args.addedRecords[0].EndTime);
      this.datum_od=args.addedRecords[0].StartTime
      this.datum_do=args.addedRecords[0].EndTime
      this.opis=args.addedRecords[0].Subject
      /** 
      this.n.dodajZauzetost(this.nastavnik.kor_ime,datum_od,datum_do).subscribe(
        data=>{
          console.log("Uspelo")
          location.reload()
        }
      )
      */
    } else {
      console.log('Nema dodatih zapisa.');
    }
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

  zakaziCas(){
    if(!this.datum_do || !this.datum_do){
      this.errorZakazivanje1="Morate izabrati datum od i do za odrzavanje casa"
      return
    }
    if(!this.predmet){
      this.errorZakazivanje1="Morate izabrati predmet koji cete slusati kod nastavnika"
      return
    }
    if(new Date(this.datum_od)<new Date()){
      this.errorZakazivanje1="Ne mozete zakazati čas u prošlosti"
      return
    }
    const razlikaVreme = Math.abs(this.datum_do.getTime() - this.datum_od.getTime());
    const razlikaSati = razlikaVreme / (1000 * 60 * 60);

    if (razlikaSati > 2 || razlikaSati<1) {
      this.errorZakazivanje1 = "Razlika između datuma od i datuma do mora biti manja od 2 sata i veca od 1.";
      
      return;
    }
    this.ucenik.zakazivanjeCasaInteraktivno(this.nastavnik.kor_ime,this.uc.kor_ime,this.datum_od,this.datum_do,this.opis,this.predmet).subscribe(
      data=>{
        console.log(data)
        if(data.message!="ok"){
          this.errorZakazivanje1=data.message
          return
        }
        location.reload()
        console.log("uspesno")
      }
    )
  }
}