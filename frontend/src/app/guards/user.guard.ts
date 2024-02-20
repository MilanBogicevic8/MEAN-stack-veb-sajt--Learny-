import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userGuard: CanActivateFn = (route, state) => {

  const currentMenu=route.url[0].path
  const router=inject(Router)
  if(
    localStorage.getItem("user")==null
  ) return false;
  else {
    //alert("Nije Vam dozvoljen pristup bez logovanja")
    //return false;
    let usr=localStorage.getItem("user")
    let user=JSON.parse(usr)
    let tip=user.tip
    // Definisanje ruta koje su dozvoljene za sve tipove korisnika
    let dozvoljeneRute = ['', 'loginadmin', 'registracija', 'zaboravljena_lozinka', 'promena_lozinke', 'proba', 'info', 'exam', 'header', 'footer', 'error'];

    // Dodatne rute za admina, nastavnika i učenika
    let admin = ['home', 'dijagram_linija', 'dijagram_histogram', 'dijagram_pita', 'dijagram_bar', 'dijagram_donut', 'dijagram_piramida', 'promena_podataka_ucenik', 'nastavnik_promenapodataka', 'citanje_cv'];
    let nastavnik = ['nastavnik_home', 'video_konferencija', 'nastavnik_casovi', 'nastavnik_kalendar', 'nastavnikovi_ucenici', 'dosije_ucenika','nastavnik_promenapodataka'];
    let ucenik = ['user_home', 'promena_podataka_ucenik','video_konferencija', 'ucenikovi_nastavnici','nastavnik_casovi', 'nastavnik_detaljno', 'interaktivni_kalendar', 'ucenikovi_casovi', 'obavestenje_ucenika'];

    // Provera tipa korisnika i odabir odgovarajućih ruta
    switch (tip) {
      case 'admin':
        dozvoljeneRute = [...dozvoljeneRute, ...admin];
        break;
      case 'nastavnik':
        dozvoljeneRute = [...dozvoljeneRute, ...nastavnik];
        break;
      case 'ucenik':
        dozvoljeneRute = [...dozvoljeneRute, ...ucenik];
        break;
      default:
        // Neki podrazumevani skup ruta ako tip nije prepoznat
        break;
    }

    // Provera da li je trenutna ruta dozvoljena za tip korisnika
    if (!dozvoljeneRute.includes(currentMenu)) {
      // Ruta nije dozvoljena, preusmeriti na error stranu
      router.navigate(['error'])
      return false;
    }

    return true;}
};
