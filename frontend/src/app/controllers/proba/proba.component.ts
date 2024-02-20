import { Component, OnInit } from '@angular/core';
import { EventSettingsModel, View } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-proba',
  templateUrl: './proba.component.html',
  styleUrls: ['./proba.component.css']
})
export class ProbaComponent implements OnInit {
  ngOnInit(): void {
    // Primer korišćenja funkcije:
  const phoneNumber1 = "+12/3456789";  // ispravan format
  const phoneNumber2 = "+123-456-789"; // ispravan format
  const phoneNumber3 = "123";      // neispravan format
  
  console.log(this.isValidPhoneNumber(phoneNumber1)); // true
  console.log(this.isValidPhoneNumber(phoneNumber2)); // true
  console.log(this.isValidPhoneNumber(phoneNumber3)); // false
  }
  
  isValidPhoneNumber(phoneNumber: string): boolean {
    const phoneNumberRegex = /^(\+\d{1})?[\/\d()\s-]{6,}$/;
    return phoneNumberRegex.test(phoneNumber);
  }
  
  
  public eventObject:EventSettingsModel={
    dataSource:[{
      Subject:"Testing",
      StartTime:new Date(2024,0,17,15,4,0),
      EndTime:new Date(2024,0,17,16,0,4),
      //IsReadonly:true,
      cssClass:'zelena'
    }],
    fields:{
      subject:{name:'Subject',default:'Cas nema odredjenu temu'}
    }
  }

  public setViews:View[]=["Day","Week"];
  onChange(args: any): void {
    //console.log('change', args);
  }

  onEventClick(args: any): void {
    //console.log('eventClick', args);
  }

  onEventRendered(args: any): void {
    //console.log('eventRendered', args);
  }

  onActionBegin(args: any): void {
    //console.log('actionBegin', args);
  }

  onActionComplete(args: any): void {
    if (args && args.addedRecords && args.addedRecords.length > 0) {
      console.log(args.addedRecords[0].Subject);
      console.log(args.addedRecords[0].StartTime);
      console.log(args.addedRecords[0].EndTime);
    } else {
      console.log('Nema dodatih zapisa.');
    }
  }

  onDataBound(args: any): void {
    //console.log('dataBound', args);
  }

  onDragStop(args: any): void {
    //console.log('dragStop', args);
  }

  onResizeStop(args: any): void {
    //console.log('resizeStop', args);
  }
  
  
  updateDatabase(subject: string, startTime: Date, endTime: Date): void {
    // Ovde implementiraj logiku za ažuriranje baze podataka
    // Možete koristiti servis ili izvršiti HTTP zahtev do servera
    // da biste poslali podatke u bazu podataka
    console.log('Ažuriranje baze podataka:', subject, startTime, endTime);
  }

  getFormattedTime(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }
}
