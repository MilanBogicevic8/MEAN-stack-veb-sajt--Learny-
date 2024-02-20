import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../models/Message';
import { Korisnik } from '../models/Korisnik';
import { Observable } from 'rxjs';
import { Cas } from '../models/Cas';

@Injectable({
  providedIn: 'root'
})
export class UcenikService {

  uri:string="http://localhost:4000/ucenik"
  constructor(private http:HttpClient) { }

  promenaPodataka(
    kor_ime:string,
    ime:string,
    prezime:string,
    telefon:string,
    adresa:string,
    mejl:string,
    skola:string,
    razred:number,
    predmeti:string[],
    uzrast:string[]
  ){
    const data={
      kor_ime:kor_ime,
      ime:ime,
      prezime:prezime,
      telefon:telefon,
      adresa:adresa,
      mejl:mejl,
      skola:skola,
      razred:razred,
      predmeti:predmeti,
      uzrast:uzrast
    }
    return this.http.post<Message>(`${this.uri}/promenaPodataka`,data)
  }

  promenaSlike(kor_ime:string,file:File){
    let formData=new FormData()
    formData.append("kor_ime",kor_ime)
    formData.append("photo",file,file.name)

    return this.http.post<Message>(`${this.uri}/promenaSlike`,formData)
  }

  nastavnici(){
    return this.http.get<Korisnik[]>(`${this.uri}/nastavnici`)
  }

  getSlikaNastavnika(kor_ime: string): Observable<Blob> {
    const body = { kor_ime };
    return this.http.post<Blob>(`${this.uri}/slikaNastavnika`, body, { responseType: 'blob' as 'json' });
  }
  slika(kor_ime: string): Observable<Blob> {
    const body = { kor_ime };
    return this.http.post<Blob>(`${this.uri}/slikaNastavnika`, body, { responseType: 'blob' as 'json' });
  }

  zakazivanjeCasa(nastavnik:string,ucenik:string,datum:string,vreme:string,teme:string,dupliCas:boolean,predmet:string){
    const data={
      nastavnik:nastavnik,
      ucenik:ucenik,
      datum:datum,
      vreme:vreme,
      teme:teme,
      dupli_cas:dupliCas,
      predmet:predmet
    }
    return this.http.post<Message>(`${this.uri}/zakazivanjeCasa`,data)
  }

  zakazivanjeCasaInteraktivno(nastavnik:string,ucenik:string,datum_od:Date,datum_do:Date,teme:string,predmet:string){
    const data={
      nastavnik:nastavnik,
      ucenik:ucenik,
      datum_od:datum_od,
      datum_do:datum_do,
      teme:teme,
      predmet:predmet
    }
    return this.http.post<Message>(`${this.uri}/zakazivanjeCasaInteraktivno`,data)
  }
  casovi(){
    return this.http.get<Cas[]>(`${this.uri}/casovi`)
  }

  ocena(id:string,komenatar:string,ocena:number){
    const data={
      id:id,
      komentar:komenatar,
      ocena:ocena
    }
    console.log(data)
    return this.http.post<Message>(`${this.uri}/ocena`,data)
  }
  brojCasovaZaSveUcenike(){
    return this.http.get<any>(`${this.uri}/brojCasovaZaSveUcenike`)
  }
  obavestenja(kor_ime:string){
    const data={
      kor_ime:kor_ime
    }
    return this.http.post<Cas[]>(`${this.uri}/obavestenja`,data)
  }
  oznaciProcitano(c:Cas){
    const data={
      cas:c
    }
    return this.http.post<Message>(`${this.uri}/oznaciProcitano`,data)
  }
  potvrdiCas(cas:Cas){
    const data={
      cas:cas
    }
    return this.http.post<Message>(`${this.uri}/potvrdiZahtev`,data)
  }
  otkaziCas(cas:Cas,razlog:string){
    const data={
      cas:cas,
      razlog:razlog
    }
    return this.http.post<Message>(`${this.uri}/otkaziZahtev`,data)
  }

  povecanjeBrojUcesnikaCasa(cas:Cas){
    const data={
      cas:cas
    }
    return this.http.post<Message>(`${this.uri}/povecanjeBrojUcesnikaCasa`,data)
  }

  smanjenjeBrojUcesnikaCasa(cas:Cas){
    const data={
      cas:cas
    }
    
    return this.http.post<Message>(`${this.uri}/smanjenjeBrojUcesnikaCasa`,data)
  }
}

