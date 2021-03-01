import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
//import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { RescueTeam } from '../model/RescueTeam';
//import {  } from '../services/authentication.service';
import {MatDialog ,MatDialogConfig,MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { RescueTeamDialogComponent} from '../rescue-team-dialog/rescue-team-dialog.component';
import { RescueTeamInfoDialogComponent} from '../rescue-team-info-dialog/rescue-team-info-dialog.component';
import { EmployesInfoDialogComponent } from "../employes-info-dialog/employes-info-dialog.component";
import * as Stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  rescueTeamId=0;
  password = 'user';
  user:any;
  rescueTeam:any;
  requestAssignedToUser:any;
  AllUsers:any;
  newMessages:any;
  requestDialogOpen=false;
  rescueInfoDialogOpen=false;
  employeeInfoDialogOpen=false;
  ws: any;

  displayedColumns=['sender','content'];
  constructor(private router : Router,private localStorage: LocalStorageService, private http: HttpClient,public dialog: MatDialog) { 
    console.log(this.localStorage.retrieve('username'));
    this.connect();
    this.newMessages=[];
  }
  
  ngOnInit(): void {
        console.log(this.localStorage.retrieve('username'));
        if(this.localStorage.retrieve('username')==null){this.router.navigate(['/']);}
        const params = new HttpParams().append('username',this.localStorage.retrieve('username')); 
        this.http.get('http://localhost:8080/api/auth/userByUsername',{params:params}).subscribe(
          (response)=>{
            console.log(response),
            this.user = response,
            console.log(this.user.rescueTeamId);
            let params2 = new HttpParams().append('id',this.user.rescueTeamId);
        this.http.get('http://localhost:8080/api/rescueTeam/getById/',{params:params2}).subscribe(
          (response)=>{
            this.rescueTeam=[response],
            console.log(this.rescueTeam);
            this.http.get('http://localhost:8080/api/rescueTeam/getRequestByRescueTeamId/',{params:params2}).subscribe(
                (response)=>{this.requestAssignedToUser=response;console.log(response)},
                (error)=>console.log(error)
            );
          },
          (error)=>console.log(error)
        );
          },
          (error)=>console.log(error)
        );
        
        this.http.get('http://localhost:8080/api/auth/getAllEmp').subscribe(
          (response)=>this.AllUsers=response,
          (error)=>console.log(error)
        );

        this.connect();
    
  }
  
  openRescueDialog(): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data=this.requestAssignedToUser;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
   // dialogConfig.height="500px";
    dialogConfig.width="40%";
    dialogConfig.position={top:"100px",left:""}
    if(!this.requestDialogOpen){this.dialog.open(RescueTeamDialogComponent,dialogConfig);this.requestDialogOpen=true;}
    else{this.dialog.closeAll();this.requestDialogOpen=false;} 
}

  openRescueTeamInfo():void{

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = this.rescueTeam;
    dialogConfig.autoFocus = true;
    
    dialogConfig.position={top:"100px",left:""}
    if(!this.rescueInfoDialogOpen){this.dialog.open(RescueTeamInfoDialogComponent,dialogConfig);this.rescueInfoDialogOpen=true;}
    else{this.dialog.closeAll();this.rescueInfoDialogOpen=false;} 
  }

  openEmployeesInfoDialog():void{

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = this.AllUsers;
    dialogConfig.autoFocus = true;
    dialogConfig.position={top:"100px",left:""};
    if(!this.employeeInfoDialogOpen){this.dialog.open(EmployesInfoDialogComponent,dialogConfig);this.employeeInfoDialogOpen=true;}
    else{this.dialog.closeAll();this.employeeInfoDialogOpen=false;} 
  }

  openChatLobby():void{
        this.router.navigate(['chatLobby']);
  }

  connect(){
    let socket = new SockJS("http://localhost:8080/socket");
    this.ws = Stomp.Stomp.over(socket);
    this.ws.connect({}, (frame: any)=>{
      this.ws.subscribe("/topic/chat",(message: { body: string; }) => {
        var MessageReceived=JSON.parse(message.body);
        this.newMessages.push(MessageReceived);
        console.log("ALL MESSAGES"+MessageReceived.content);
        this.
      });
      
    });

    
  }
}
