import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Korisnik } from '../models/Korisnik';
import { Message } from '../models/Message';
import { Predmet } from '../models/Predmet';
import { Info } from '../models/Info';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri:string="http://localhost:4000/korisnik"
  constructor(private http:HttpClient) { }

  login(kor_ime:string,lozinka:string){
    const data={
      kor_ime:kor_ime,
      lozinka:lozinka
    }
    return this.http.post<Korisnik>(`${this.uri}/login`,data)
  }

  registracija_ucenik(
    ime:string,
    prezime:string,
    kor_ime:string,
    lozinka:string,
    pol:string,
    adresa:string,
    telefon:string,
    mejl:string,
    bezbednost:string,
    bezbednost_pitanje:string,
    slika:File,
    skola:string,
    razred:number
  ){
    const data={
      ime:ime,
      prezime:prezime,
      kor_ime:kor_ime,
      lozinka:lozinka,
      tip:"ucenik",
      pitanje:[lozinka],
      pol:pol,
      adresa:adresa,
      telefon:telefon,
      mejl:mejl,
      slika:slika,
      skola:skola,
      razred:razred
    }
    
    let p=[lozinka]
    const formData=new FormData()
    formData.append("ime",ime)
    formData.append("prezime",prezime)
    formData.append("kor_ime",kor_ime)
    formData.append("lozinka",lozinka)
    formData.append("tip","ucenik")
    formData.append("pitanje",lozinka)
    formData.append("pol",pol)
    formData.append("adresa",adresa)
    formData.append("telefon",telefon)
    formData.append("mejl",mejl)
    formData.append("bezbednost",bezbednost)
    formData.append("bezbednost_pitanje",bezbednost_pitanje)

    if(slika!=null){
      formData.append("photo",slika,slika.name)
    }
    // Kreirajte Blob objekat za CV
    formData.append("skola",skola)
    formData.append("razred",razred.toString())


    return this.http.post<Message>(`${this.uri}/registracijaUcenik`,formData)
  }
  registracija_nastavnik(
    ime:string,
    prezime:string,
    kor_ime:string,
    lozinka:string,
    pol:string,
    adresa:string,
    telefon:string,
    mejl:string,
    bezbednost:string,
    bezbednost_pitanje:string,
    slika:File,
    cv:File,
    predmeti:string[],
    uzrast:string[]
  ){

    const data={
      ime:ime,
      prezime:prezime,
      kor_ime:kor_ime,
      lozinka:lozinka,
      tip:"nastavnik",
      pitanje:[lozinka],
      pol:pol,
      adresa:adresa,
      telefon:telefon,
      mejl:mejl,
      photo:slika,
      cv:cv,
      predmeti:predmeti,
      uzrast:uzrast
    }
    let p=[lozinka]
    const formData=new FormData()
    formData.append("ime",ime)
    formData.append("prezime",prezime)
    formData.append("kor_ime",kor_ime)
    formData.append("lozinka",lozinka)
    formData.append("tip","nastavnik")
    formData.append("pitanje",lozinka)
    formData.append("pol",pol)
    formData.append("adresa",adresa)
    formData.append("telefon",telefon)
    formData.append("mejl",mejl)
    formData.append("bezbednost",bezbednost)
    formData.append("bezbednost_pitanje",bezbednost_pitanje)
    if(slika!=null){
      formData.append("photo",slika?slika:null,slika?slika.name:null)
    }
    // Kreiranje Blob objekat za CV
    if(cv!=null){
      const cvBlob = new Blob([cv], { type: 'application/pdf' });

      formData.append("cv", cvBlob, cv.name); // Dodavanje CV
    }
    //formData.append("cv",cv,cv.name)
    predmeti.forEach((predmet) => {
      formData.append("predmeti", predmet);
    });
    uzrast.forEach((uzrastItem) => {
      formData.append("uzrast", uzrastItem);
    });

    return this.http.post<Message>(`${this.uri}/registracijaNastavnik`,formData)
  }

  resetLozinke(kor_ime:string,lozinka:string){
    const data={
      kor_ime:kor_ime,
      lozinka:lozinka
    }
    return this.http.post<Message>(`${this.uri}/resetLozinke`,data)
  }

  promenaLozinke(kor_ime:string,stara_lozinka:string,nova_lozinka:string){
    const data={
      kor_ime:kor_ime,
      stara_lozinka:stara_lozinka,
      nova_lozinka:nova_lozinka
    }
    console.log(data)
    return this.http.post<Message>(`${this.uri}/promenaLozinke`,data)
  }
  korisnik(kor_ime:string){
    const data={
      kor_ime:kor_ime
    }
    return this.http.post<Korisnik>(`${this.uri}/korisnik`,data)
  }
  dohvatiPredmete(){
    return this.http.get<Predmet[]>(`${this.uri}/dohvatiPredmete`)
  }
  dodajPredmet(predmet:string){
    const data={
      predmet:predmet
    }
    return this.http.post<Message>(`${this.uri}/dodajPredmet`,data)
  }
  info(){
    return this.http.get<any>(`${this.uri}/info`)
  }
  raspodelaPoPolu(){
    return this.http.get<any>(`${this.uri}/raspodelaPoPolu`)
  }
  odnos(){
    return this.http.get<any>(`${this.uri}/odnos`)
  }
}
