import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './controllers/login/login.component';
import { HomeComponent } from './controllers/home/home.component';
import { LoginAdminComponent } from './controllers/login-admin/login-admin.component';
import { RegistracijaComponent } from './controllers/registracija/registracija.component';
import { ZaboravljenaLozinkaComponent } from './controllers/zaboravljena-lozinka/zaboravljena-lozinka.component';
import { PromenaLozinkeComponent } from './controllers/promena-lozinke/promena-lozinke.component';
import { UserHomeComponent } from './controllers/user-home/user-home.component';
import { NastavnikHomeComponent } from './controllers/nastavnik-home/nastavnik-home.component';
import { PromenaPodatakaUcenikComponent } from './controllers/promena-podataka-ucenik/promena-podataka-ucenik.component';
import { UcenikoviNastavniciComponent } from './controllers/ucenikovi-nastavnici/ucenikovi-nastavnici.component';
import { NastavnikDetaljnoComponent } from './controllers/nastavnik-detaljno/nastavnik-detaljno.component';
import { InteraktivniKalendarComponent } from './controllers/interaktivni-kalendar/interaktivni-kalendar.component';
import { UcenikoviCasoviComponent } from './controllers/ucenikovi-casovi/ucenikovi-casovi.component';
import { VideoKonferencijaComponent } from './controllers/video-konferencija/video-konferencija.component';
import { ObavestenjaUcenikaComponent } from './controllers/obavestenja-ucenika/obavestenja-ucenika.component';
import { NastavnikCasoviComponent } from './controllers/nastavnik-casovi/nastavnik-casovi.component';
import { NastavnikKalendarComponent } from './controllers/nastavnik-kalendar/nastavnik-kalendar.component';
import { NastavnikoviUceniciComponent } from './controllers/nastavnikovi-ucenici/nastavnikovi-ucenici.component';
import { DosijeUcenikaComponent } from './controllers/dosije-ucenika/dosije-ucenika.component';
import { ProbaComponent } from './controllers/proba/proba.component';
import { InfoComponent } from './controllers/info/info.component';
import { DijagramLinijaComponent } from './controllers/dijagram-linija/dijagram-linija.component';
import { DijagramHistogramComponent } from './controllers/dijagram-histogram/dijagram-histogram.component';
import { DijagramPitaComponent } from './controllers/dijagram-pita/dijagram-pita.component';
import { DijagramBarComponent } from './controllers/dijagram-bar/dijagram-bar.component';
import { DijagramDonutComponent } from './controllers/dijagram-donut/dijagram-donut.component';
import { DijagramPiramidaComponent } from './controllers/dijagram-piramida/dijagram-piramida.component';
import { NastavnikPromenapodatakaComponent } from './controllers/nastavnik-promenapodataka/nastavnik-promenapodataka.component';
import { ExamplePdfViewerComponent } from './example-pdf-viewer/example-pdf-viewer.component';
import { CvCitanjeComponent } from './controllers/cv-citanje/cv-citanje.component';
import { HeaderComponent } from './controllers/header/header.component';
import { FooterComponent } from './controllers/footer/footer.component';
import { loginGuard } from './guards/login.guard';
import { userGuard } from './guards/user.guard';
import { ErrorComponent } from './controllers/error/error.component';

const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"home",component:HomeComponent,canActivate:[userGuard]},
  {path:"loginadmin",component:LoginAdminComponent},
  {path:"registracija",component:RegistracijaComponent},
  {path:"zaboravljena_lozinka",component:ZaboravljenaLozinkaComponent},
  {path:"promena_lozinke",component:PromenaLozinkeComponent},
  {path:"user_home",component:UserHomeComponent,canActivate:[userGuard]},
  {path:"nastavnik_home",component:NastavnikHomeComponent,canActivate:[userGuard]},
  {path:"promena_podataka_ucenik",component:PromenaPodatakaUcenikComponent,canActivate:[userGuard]},
  {path:"ucenikovi_nastavnici",component:UcenikoviNastavniciComponent,canActivate:[userGuard]},
  {path:"nastavnik_detaljno",component:NastavnikDetaljnoComponent,canActivate:[userGuard]},
  {path:"interaktivni_kalendar",component:InteraktivniKalendarComponent,canActivate:[userGuard]},
  {path:"ucenikovi_casovi",component:UcenikoviCasoviComponent,canActivate:[userGuard]},
  {path:"video_konferencija/:id",component:VideoKonferencijaComponent,canActivate:[userGuard]},
  {path:"obavestenje_ucenika",component:ObavestenjaUcenikaComponent,canActivate:[userGuard]},
  {path:"nastavnik_casovi",component:NastavnikCasoviComponent,canActivate:[userGuard]},
  {path:"nastavnik_kalendar",component:NastavnikKalendarComponent,canActivate:[userGuard]},
  {path:"nastavnikovi_ucenici",component:NastavnikoviUceniciComponent,canActivate:[userGuard]},
  {path:"dosije_ucenika",component:DosijeUcenikaComponent,canActivate:[userGuard]},
  {path:"proba",component:ProbaComponent},
  {path:"info",component:InfoComponent},
  {path:"dijagram_linija",component:DijagramLinijaComponent,canActivate:[userGuard]},
  {path:"dijagram_histogram",component:DijagramHistogramComponent,canActivate:[userGuard]},
  {path:"dijagram_pita",component:DijagramPitaComponent,canActivate:[userGuard]},
  {path:"dijagram_bar",component:DijagramBarComponent,canActivate:[userGuard]},
  {path:"dijagram_donut",component:DijagramDonutComponent,canActivate:[userGuard]},
  {path:"dijagram_piramida",component:DijagramPiramidaComponent,canActivate:[userGuard]},
  {path:"nastavnik_promenapodataka",component:NastavnikPromenapodatakaComponent,canActivate:[userGuard]},
  {path:"exam",component:ExamplePdfViewerComponent},
  {path:"citanje_cv", component:CvCitanjeComponent,canActivate:[userGuard]},
  {path:"header",component:HeaderComponent},
  {path:"footer",component:FooterComponent},
  {path:"error",component:ErrorComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
