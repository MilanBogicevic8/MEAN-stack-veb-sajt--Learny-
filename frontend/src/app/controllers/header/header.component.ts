import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{
  constructor(private router:Router,private route:ActivatedRoute){}
  prikazi() {
    // Provera da li postoji url niz
  
    let currentRoute=window.location.pathname
    if (currentRoute === "/registracija" || currentRoute === "/zaboravljena_lozinka" || currentRoute === "/promena_lozinke" || currentRoute=="/user_home" || currentRoute=="/nastavnik_home") {
        return false;
    }
  
    return true;
  }

  logout(){
    
    let usr=localStorage.getItem("user")
    if(usr==null) return
    let user=JSON.parse(usr)
    localStorage.clear();
    if(user.tip=="admin"){
      this.router.navigate(["loginadmin"])
    }else{
      this.router.navigate([''])
    }
    
  }
}
