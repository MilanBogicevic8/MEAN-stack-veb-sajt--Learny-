import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Korisnik } from '../models/Korisnik';
import { Message } from '../models/Message';
import { Predmet } from '../models/Predmet';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  uri:string="http://localhost:4000/admin"
  constructor(private http:HttpClient) { }

  login(kor_ime:string,lozinka:string){
    const data={
      kor_ime:kor_ime,
      lozinka:lozinka
    }
    return this.http.post<Korisnik>(`${this.uri}/login`,data)
  }
  svi(){
    return this.http.get<Korisnik[]>(`${this.uri}/svi`)
  }

  promenaStatusa(n:Korisnik,status:string){
    const data={
      nastavnik:n,
      status:status
    }
    return this.http.post<Message>(`${this.uri}/promenaStatusa`,data)
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
  dodajNeodobrenPredmet(predmet:string){
    const data={
      predmet:predmet
    }
    return this.http.post<Message>(`${this.uri}/dodajNeodobrenPredmet`,data)
  }
  odobriPredmet(p:Predmet){
    const data={
      predmet:p
    }
    return this.http.post<Message>(`${this.uri}/odobriPredmet`,data)
  }
}
