import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cas } from 'src/app/models/Cas';
import { Korisnik } from 'src/app/models/Korisnik';
import { UcenikService } from 'src/app/services/ucenik.service';

@Component({
  selector: 'app-ucenikovi-casovi',
  templateUrl: './ucenikovi-casovi.component.html',
  styleUrls: ['./ucenikovi-casovi.component.css']
})
export class UcenikoviCasoviComponent implements OnInit {
  casovi:Cas[]=[]
  student:Korisnik=new Korisnik()
  odrzani:Cas[]=[]
  zakazani:Cas[]=[]
  gostujuciCas:Cas[]=[]
  errorMessage:string=""

  constructor(private ucenik:UcenikService,private router:Router){}
  ngOnInit(): void {
    let usr=localStorage.getItem("user")
    if(usr==null) return
    this.student=JSON.parse(usr)
    console.log(this.student)
    this.ucenik.casovi().subscribe(
      data=>{
        console.log(data)
        this.casovi=data.filter(d=>d.ucenik.some(ucen=>ucen==this.student.kor_ime))
        console.log(this.casovi)
        this.gostujuciCas=data.filter(d=>!d.ucenik.some(ucen=>ucen==this.student.kor_ime))
        console.log("!",this.gostujuciCas)
        this.gostujuciCas=this.gostujuciCas.filter(g=>(new Date(g.datum_do) > new Date())&& g.broj_ucesnika<=5)
        console.log("~",this.gostujuciCas)
        this.gostujuciCas=this.gostujuciCas.filter(g=>this.showStartButton(g.datum_od, g.datum_do))
        console.log(",",this.gostujuciCas)
        this.odrzani=this.casovi.filter(c=>c.razlog_otkazivanja=='' && new Date(c.datum_do)<new Date() && c.potvrdjen==true)
        this.odrzani.sort((a,b)=>{return a.datum_od>b.datum_od?-1:1})
        console.log(this.odrzani)
        this.zakazani=this.casovi.filter(c=>c.odrzan==false && new Date(c.datum_do)>new Date() && c.razlog_otkazivanja=="")
        console.log(this.zakazani)
        console.log(this.casovi)
      }
    )
  }

  
  selectedCas: Cas | null = null; // Track the selected class for rating
  ratingForm: { comments: string; rating: number } = { comments: '', rating: 0 }; // Form model for rating

  // Star rating configuration
  stars: number[] = [1, 2, 3, 4, 5];
  hoverRating: number = 0; // Declare hoverRating property



  openRatingForm(cas: Cas): void {
    this.selectedCas = cas;
    this.resetRatingForm();
    // Implement logic to open the rating form
    // You can use a modal or any other UI component for the form
    console.log("Open rating form for:", cas);
  }

  resetRatingForm(): void {
    this.ratingForm = { comments: '', rating: 0 };
  }

  setRating(rating: number): void {
    this.ratingForm.rating = rating;
  }

  submitRating(): void {
    // Implement logic to submit the rating
    if (this.selectedCas) {
      console.log('Comments:', this.ratingForm.comments);
      console.log('Rating:', this.ratingForm.rating);
      if(this.ratingForm.comments=='') this.errorMessage+="Morate uneti komentar \n"
      if(this.ratingForm.rating==0) this.errorMessage+="Morate uneti neku ocenu"
      if(this.errorMessage!="") return

      // Update the selectedCas with the comments and rating
      this.selectedCas.komentar_ucenika = this.ratingForm.comments;
      this.selectedCas.ocena = this.ratingForm.rating;

      // You can send the updated data to your backend or perform any other necessary actions
      this.ucenik.ocena(this.selectedCas._id,this.ratingForm.comments,this.ratingForm.rating).subscribe(
        data=>{
          if(data.message!="ok"){
            this.errorMessage=data.message
          }
          console.log(data)
          this.ngOnInit()
        }
      )
      // Close the form and reset the selectedCas
      this.selectedCas = null;
      this.resetRatingForm();
    }
  }

  showStartButton(datumOd: Date,datumDo:Date): boolean {
    
    // Pretvori string u Date objekat
    const startDateTime = new Date(datumOd);
    
    // Postavi vreme prikazivanja dugmeta na 15 minuta pre početka časa
    const timeToShowButton = new Date(startDateTime.getTime() -15* 60 * 1000);
    const endCas=new Date(datumDo)
    // Usporedi trenutno vreme sa vremenom prikazivanja dugmeta
    //console.log("--",new Date())
    //console.log("??",timeToShowButton)
    //console.log("//",new Date() >= timeToShowButton)
    return new Date() >= timeToShowButton && endCas>new Date();
  }
  
  startClass(z: any) {
    // Implementacija logike za pokretanje časa
    try{
    console.log("Započni čas: ", z);
    localStorage.setItem("predmet",JSON.stringify(z))
    localStorage.setItem("ucenik",JSON.stringify(this.student))
    //this.router.navigate([`video_konferencija/${z._id}`])
    //this.router.navigate(["meet.jit.si/"+z.nastavnik])
    // Otvori novi prozor sa zadatim URL-om
    window.open(`https://meet.jit.si/${z.nastavnik}`, '_blank');
    }catch(err){
      alert("Nastavik jos nije dosao na cas")
    }
  }

  gostClass(z:Cas){
    console.log("Gost usao u cas")
    this.ucenik.povecanjeBrojUcesnikaCasa(z).subscribe(
      data=>{
        //this.router.navigate([`video_konferencija/${z._id}`])
        try{
        //this.router.navigate(["meet.jit.si/"+z.nastavnik])
        // Otvori novi prozor sa zadatim URL-om
        window.open(`https://meet.jit.si/${z.nastavnik}`, '_blank');
        }catch(err){
          alert("Nastavnik jos nije dosao na cas")
        }
      }
    )
  }
}
