import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ScheduleModule, RecurrenceEditorModule, DayService, WeekService, WorkWeekService, MonthService, MonthAgendaService, DragAndDropService, ResizeService} from '@syncfusion/ej2-angular-schedule'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './controllers/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './controllers/home/home.component';
import { LoginAdminComponent } from './controllers/login-admin/login-admin.component';
import { RegistracijaComponent } from './controllers/registracija/registracija.component';
import { ZaboravljenaLozinkaComponent } from './controllers/zaboravljena-lozinka/zaboravljena-lozinka.component';
import { PromenaLozinkeComponent } from './controllers/promena-lozinke/promena-lozinke.component';
import { NavbarComponent } from './controllers/navbar/navbar.component';
import { UserHomeComponent } from './controllers/user-home/user-home.component';
import { NastavnikHomeComponent } from './controllers/nastavnik-home/nastavnik-home.component';
import { PromenaPodatakaUcenikComponent } from './controllers/promena-podataka-ucenik/promena-podataka-ucenik.component';
import { UcenikoviNastavniciComponent } from './controllers/ucenikovi-nastavnici/ucenikovi-nastavnici.component';
import { NastavnikDetaljnoComponent } from './controllers/nastavnik-detaljno/nastavnik-detaljno.component';
import { InteraktivniKalendarComponent } from './controllers/interaktivni-kalendar/interaktivni-kalendar.component';
import { DatePipe } from '@angular/common';
import { UcenikoviCasoviComponent } from './controllers/ucenikovi-casovi/ucenikovi-casovi.component';
import { VideoKonferencijaComponent } from './controllers/video-konferencija/video-konferencija.component';
import { ObavestenjaUcenikaComponent } from './controllers/obavestenja-ucenika/obavestenja-ucenika.component';
import { NastavnikCasoviComponent } from './controllers/nastavnik-casovi/nastavnik-casovi.component';
import { NastavnikKalendarComponent } from './controllers/nastavnik-kalendar/nastavnik-kalendar.component';
import { NastavnikoviUceniciComponent } from './controllers/nastavnikovi-ucenici/nastavnikovi-ucenici.component';
import { DosijeUcenikaComponent } from './controllers/dosije-ucenika/dosije-ucenika.component';
import { ProbaComponent } from './controllers/proba/proba.component';
import { InfoComponent } from './controllers/info/info.component';
import { AccumulationAnnotationService, AccumulationChartModule, AccumulationDataLabelService, AccumulationLegendService, AccumulationTooltipService, BarSeriesService, CategoryService, ChartModule, ColumnSeriesService, DataLabelService, DateTimeService, LegendService, LineSeriesService, MultiColoredLineSeriesService, ParetoSeriesService, PieSeriesService, PyramidSeriesService, SplineAreaSeriesService, SplineSeriesService, StackingAreaSeriesService, StackingBarSeriesService, StackingLineSeriesService, StepLineSeriesService, TooltipService } from '@syncfusion/ej2-angular-charts';
import { DijagramLinijaComponent } from './controllers/dijagram-linija/dijagram-linija.component';
import { DijagramHistogramComponent } from './controllers/dijagram-histogram/dijagram-histogram.component';
import { DijagramPitaComponent } from './controllers/dijagram-pita/dijagram-pita.component';
import { DijagramBarComponent } from './controllers/dijagram-bar/dijagram-bar.component';
import { DijagramDonutComponent } from './controllers/dijagram-donut/dijagram-donut.component';
import { DijagramPiramidaComponent } from './controllers/dijagram-piramida/dijagram-piramida.component';
import { NastavnikPromenapodatakaComponent } from './controllers/nastavnik-promenapodataka/nastavnik-promenapodataka.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { ExamplePdfViewerComponent } from './example-pdf-viewer/example-pdf-viewer.component';
import { CvCitanjeComponent } from './controllers/cv-citanje/cv-citanje.component';
import { HeaderComponent } from './controllers/header/header.component';
import { FooterComponent } from './controllers/footer/footer.component';
import { ErrorComponent } from './controllers/error/error.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    LoginAdminComponent,
    RegistracijaComponent,
    ZaboravljenaLozinkaComponent,
    PromenaLozinkeComponent,
    NavbarComponent,
    UserHomeComponent,
    NastavnikHomeComponent,
    PromenaPodatakaUcenikComponent,
    UcenikoviNastavniciComponent,
    NastavnikDetaljnoComponent,
    InteraktivniKalendarComponent,
    UcenikoviCasoviComponent,
    VideoKonferencijaComponent,
    ObavestenjaUcenikaComponent,
    NastavnikCasoviComponent,
    NastavnikKalendarComponent,
    NastavnikoviUceniciComponent,
    DosijeUcenikaComponent,
    ProbaComponent,
    InfoComponent,
    DijagramLinijaComponent,
    DijagramHistogramComponent,
    DijagramPitaComponent,
    DijagramBarComponent,
    DijagramDonutComponent,
    DijagramPiramidaComponent,
    NastavnikPromenapodatakaComponent,
    ExamplePdfViewerComponent,
    CvCitanjeComponent,
    HeaderComponent,
    FooterComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DatePipe,
    ScheduleModule,RecurrenceEditorModule,
    ChartModule,AccumulationChartModule, NgxExtendedPdfViewerModule
    
  ],
  providers: [DayService,WeekService,WorkWeekService,MonthService,MonthAgendaService,DragAndDropService,ResizeService,LineSeriesService,CategoryService,LegendService,DataLabelService,TooltipService,StackingAreaSeriesService,
    //za histogram
    SplineAreaSeriesService, MultiColoredLineSeriesService, ParetoSeriesService, ColumnSeriesService,StepLineSeriesService, SplineSeriesService, StackingLineSeriesService, DateTimeService,
  //za pie chart
  PieSeriesService, AccumulationLegendService, AccumulationTooltipService, AccumulationDataLabelService,AccumulationAnnotationService,
  //za bar chart
  BarSeriesService, StackingBarSeriesService,
  //za donut chart nista
  //za piramidu
  PyramidSeriesService,
  //cv
  NgxExtendedPdfViewerModule
],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
