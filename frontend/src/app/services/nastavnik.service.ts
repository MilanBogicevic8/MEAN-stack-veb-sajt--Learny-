import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Korisnik } from '../models/Korisnik';
import { Message } from '../models/Message';
import { Cas } from '../models/Cas';
import { Zauzet } from '../models/Zauzet';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NastavnikService {

  uri:string="http://localhost:4000/nastavnik"
  constructor(private http:HttpClient) { }

  dohvatiUcenika(kor_ime:string){
    const data={
      kor_ime:kor_ime
    }
    return this.http.post<Korisnik>(`${this.uri}/dohvatiUcenika`,data)
  }

  otkaziCas(id:string,razlog:string){
    const data={
      id:id,
      razlog:razlog
    }

    return this.http.post<Message>(`${this.uri}/otkaziCas`,data);
  }

  casoviNastavnika(nastavnik:string){
    const data={
      kor_ime:nastavnik
    }
    return this.http.post<Korisnik[]>(`${this.uri}/casoviNastavnika`,data)
  }

  casoviUcenika(ucenik:string){
    const data={
      kor_ime:ucenik
    }
    return this.http.post<Cas[]>(`${this.uri}/casoviUcenika`,data)
  }

  nastavnikovKomentar(cas:Cas,ocena:number,komentar:string){
    const data={
      cas:cas,
      ocena:ocena,
      komentar:komentar
    }
    return this.http.post<Message>(`${this.uri}/nastavnikovKomentar`,data)
  }

  dodajZauzetost(kor_ime:string,datum_od:Date,datum_do:Date){
    const data={
      kor_ime:kor_ime,
      datum_od:datum_od,
      datum_do:datum_do
    }
    return this.http.post<Message>(`${this.uri}/dodajZauzetost`,data)
  }

  dohvatiZauzetost(kor_ime:string){
    const data={
      kor_ime:kor_ime
    }
    return this.http.post<Zauzet[]>(`${this.uri}/dohvatiZauzetost`,data)
  }
  najangazovaniji(){
    return this.http.post<any>(`${this.uri}/najangazovaniji`,{})
  }
  prosekPoDanu(){
    return this.http.get<any>(`${this.uri}/prosekPoDanu`)
  }

  nastavniciPoPredmetuPoUzrastu(){
    return this.http.get<any>(`${this.uri}/nastavniciPoPredmetuPoUzrastu`)
  }


  promenaPodataka(
    kor_ime:string,
    ime:string,
    prezime:string,
    telefon:string,
    adresa:string,
    mejl:string,
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
      predmeti:predmeti,
      uzrast:uzrast
    }
    return this.http.post<Message>(`${this.uri}/promenaPodataka`,data)
  }

  dohvatiCV(kor_ime:string):Observable<ArrayBuffer>{
    return this.http.get(`${this.uri}/dohvatiCV/${kor_ime}`,{ responseType: 'arraybuffer' })
  }
}
