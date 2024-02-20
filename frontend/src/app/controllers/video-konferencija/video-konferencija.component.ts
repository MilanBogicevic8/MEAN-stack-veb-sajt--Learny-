import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Cas } from 'src/app/models/Cas';
import { Korisnik } from 'src/app/models/Korisnik';
import { UcenikService } from 'src/app/services/ucenik.service';

declare var JitsiMeetExternalAPI: any;
@Component({
  selector: 'app-video-konferencija',
  templateUrl: './video-konferencija.component.html',
  styleUrls: ['./video-konferencija.component.css']
})
export class VideoKonferencijaComponent implements OnInit, AfterViewInit{
  
    domain: string = "meet.jit.si"; // For self hosted use your domain
    room: any;
    options: any;
    api: any;
    user: any;

    // For Custom Controls
    isAudioMuted = false;
    isVideoMuted = false;
    cas:Cas=null
    ucenik:Korisnik=new Korisnik()
    nastavnik:Korisnik=new Korisnik()
    constructor(
        private u:UcenikService,
        private router: Router
    ) { }

    ngOnInit(): void {
        let pom=localStorage.getItem("nastavnik")
        if(pom!=null){
            this.nastavnik=JSON.parse(pom)
        }
        pom=localStorage.getItem("predmet")
        if(pom!=null){
            this.cas=JSON.parse(pom)
        }
        pom=localStorage.getItem("ucenik")
        if(pom!=null){
            this.ucenik=JSON.parse(pom)
        }
        
        this.room = this.nastavnik?this.nastavnik.kor_ime:"Predavanje"; // Set your room name
        this.user = {
            name: this.nastavnik?this.nastavnik.kor_ime:(this.ucenik?this.ucenik.kor_ime:"Ucionica") // Set your username
        }
    }

    ngAfterViewInit(): void {
      this.options = {
          roomName: this.room,
          width: 900,
          height: 500,
          configOverwrite: { prejoinPageEnabled: false },
          interfaceConfigOverwrite: {
              // overwrite interface properties
          },
          parentNode: document.querySelector('#jitsi-iframe'),
          userInfo: {
              displayName: this.user.name
          }
      }

      this.api = new JitsiMeetExternalAPI(this.domain, this.options);

       // Event handlers
      this.api.addEventListeners({
          readyToClose: this.handleClose,
          participantLeft: this.handleParticipantLeft,
          participantJoined: this.handleParticipantJoined,
          videoConferenceJoined: this.handleVideoConferenceJoined,
          videoConferenceLeft: this.handleVideoConferenceLeft,
          audioMuteStatusChanged: this.handleMuteStatus,
          videoMuteStatusChanged: this.handleVideoStatus
      });

  }

    handleClose = () => {
        alert("handleClose")
      console.log("handleClose");
    }

    handleParticipantLeft = async (participant) => {
        console.log("handleParticipantLeft", participant); // { id: "2baa184e" }
        const data = await this.getParticipants();
    }

    handleParticipantJoined = async (participant) => {
        console.log("handleParticipantJoined", participant); // { id: "2baa184e", displayName: "Shanu Verma", formattedDisplayName: "Shanu Verma" }
        const data = await this.getParticipants();
    }

    handleVideoConferenceJoined = async (participant) => {
        console.log("handleVideoConferenceJoined", participant); 
        const data = await this.getParticipants();
    }

    handleVideoConferenceLeft = () => {
        //alert("left:")
        console.log("handleVideoConferenceLeft");
        if(this.ucenik!=null){
            this.router.navigate(['/thank_tou'])
        }
        ;
    }

    handleMuteStatus = (audio) => {
        console.log("handleMuteStatus", audio); // { muted: true }
    }

    handleVideoStatus = (video) => {
        console.log("handleVideoStatus", video); // { muted: true }
    }

    getParticipants() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.api.getParticipantsInfo()); // get all participants
            }, 500)
        });
  }

  executeCommand(command: string) {
    this.api.executeCommand(command);
    
    if(command == 'hangup') {
        this.router.navigate(['/thank_you']);
        return;
    }

    if(command == 'toggleAudio') {
        this.isAudioMuted = !this.isAudioMuted;
    }

    if(command == 'toggleVideo') {
        this.isVideoMuted = !this.isVideoMuted;
    }
}

        smanjenjeBrojUcesnikaCasa(){
           if(this.cas!=null && this.cas.broj_ucesnika>2){
                this.u.smanjenjeBrojUcesnikaCasa(this.cas).subscribe(
                    data=>{}
                )
           } 
        }
}
