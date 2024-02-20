import { Component, OnInit } from '@angular/core';
import { Info } from 'src/app/models/Info';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit{
  info:any
  constructor(private user:UserService){}
  ngOnInit(): void {
    this.user.info().subscribe(
      data=>{
        this.info=data
        this.pom=this.info
        console.log(data)
      }
    )
  }

  getSubjectsArray(subjectsString: string): string[] {
    return subjectsString.split(', ');
  }


searchTerm: string = '';




sortAscIme(){
  this.info.engagedTeachersBySubject.forEach(
    e=>{
      e.teachers.sort((a,b)=>{return a.ime>b.ime?1:-1})
    }
  )
}
sortDescIme(){
  this.info.engagedTeachersBySubject.forEach(
    e=>{
      e.teachers.sort((a,b)=>{return a.ime>b.ime?-1:1})
    }
  )
}

sortAscPrezime(){
  this.info.engagedTeachersBySubject.forEach(
    e=>{
      e.teachers.sort((a,b)=>{return a.prezime>b.prezime?1:-1})
    }
  )
}
sortDescPrezime(){
  this.info.engagedTeachersBySubject.forEach(
    e=>{
      e.teachers.sort((a,b)=>{return a.prezime>b.prezime?-1:1})
    }
  )
}
sortAscPredmet(){
  this.info.engagedTeachersBySubject.sort((a,b)=>{return a.subject>b.subject?1:-1})
}
sortDescPredmet(){
  this.info.engagedTeachersBySubject.sort((a,b)=>{return a.subject>b.subject?-1:1})
}
pom:any
searchTeachers(): void {
  // Filtriraj nastavnike
  this.pom = this.info.engagedTeachersBySubject.filter(engagement => {
    if (engagement.teachers) {  
      const teachers = engagement.teachers.filter(teacher => {
        const fullName = `${teacher.ime} ${teacher.prezime}`.toLowerCase();
        const subject = engagement.subject.toLowerCase();

        return (
          fullName.includes(this.searchTerm.toLowerCase()) ||
          teacher.ime.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          teacher.prezime.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          subject.includes(this.searchTerm.toLowerCase())
        );
      });

      return teachers.length > 0;
    }
    return false;
  });
}

ime1:string=""
prezime1:string=""
predmet1:string=""

predmeti: any[] = []; // Koristite any[] umesto string[], jer ćete sad imati objekte sa 'predmet' i 'niz' svojstvima

ime() {
  this.predmeti=[]
  this.nastavnici=[]
  this.info.engagedTeachersBySubject.forEach(e => {
    if (e.teachers.some(i => i.ime.toLowerCase().includes(this.ime1.toLowerCase()))) {
      let js = {
        predmet: e.subject, // ispravljeno 'e.sbject' u 'e.subject'
        niz: [] // Inicijalizujte niz pre nego što počnete da dodajete elemente
      };

      e.teachers.forEach(i => {
        if (i.ime.toLowerCase().includes(this.ime1.toLowerCase())) {
          js.niz.push(i.ime + " " + i.prezime);
        }
      });
      js.niz=[...new Set(js.niz)]
      this.predmeti.push(js);
    }
  });
}
prezime(){
  this.predmeti=[]
  this.nastavnici=[]
  this.info.engagedTeachersBySubject.forEach(e => {
    if (e.teachers.some(i => i.prezime.toLowerCase().includes(this.prezime1.toLowerCase()))) {
      let js = {
        predmet: e.subject, // ispravljeno 'e.sbject' u 'e.subject'
        niz: [] // Inicijalizujte niz pre nego što počnete da dodajete elemente
      };

      e.teachers.forEach(i => {
        if (i.prezime.toLowerCase().includes(this.prezime1.toLowerCase())) {
          js.niz.push(i.ime + " " + i.prezime);
        }
      });
      js.niz=[...new Set(js.niz)]
      this.predmeti.push(js);
    }
  });
}
nastavnici:string[]=[]
predmet(){
  this.predmeti=[]
  this.nastavnici=[]
  this.info.engagedTeachersBySubject.forEach(
    e=>{
      if(e.subject.toLowerCase().includes(this.predmet1.toLowerCase())){
        e.teachers.forEach(n=>{
          this.nastavnici.push(n.ime+" "+n.prezime)
        })
      }
    }
  )
  this.nastavnici=[...new Set(this.nastavnici)]
}

pretragaGlobalno() {
  this.predmeti = [];
  this.nastavnici = [];
  
  console.log(this.ime1,this.prezime1,this.predmet1)
  if (this.info && this.info.engagedTeachersBySubject) {
    this.info.engagedTeachersBySubject.forEach(e => {
     // if(!this.predmet1 || ( this.predmet1!="" && e.subject==this.predmet1)){
        let js = {
          predmet: e.subject,
          niz: [] 
        };

        if (
          (!this.ime1 || e.teachers.some(i => i.ime && i.ime.toLowerCase().includes(this.ime1.toLowerCase()))) &&
          (!this.prezime1 || e.teachers.some(i => i.prezime && i.prezime.toLowerCase().includes(this.prezime1.toLowerCase()))) &&
          (!this.predmet1 || e.subject && e.subject.toLowerCase().includes(this.predmet1.toLowerCase()))
        ) {
          e.teachers.forEach(i => {
            let fullName = i.ime + " " + i.prezime;
            if ((!this.ime1 || (fullName.toLowerCase().includes(this.ime1.toLowerCase())))
                && (!this.prezime1 || fullName.toLowerCase().includes(this.prezime1.toLowerCase())) ) {
              js.niz.push(fullName);
            }
          });

          js.niz = [...new Set(js.niz)];
        
          this.predmeti.push(js);
          
        
        }
   // }
    });
  } else {
    // Greška - info ili engagedTeachersBySubject nije definisano
  }
  this.ime1=""
  this.prezime1=""
  this.predmet1=""
}

daLiJeOdobren(subj:string){
  let s=this.info.subjects.find(f=>f.naziv==subj)
  if(!s){
    return false;
  }else{
    if(s.odobren==true){
      return true;
    }else{
      return false;
    }
  }
}
}
