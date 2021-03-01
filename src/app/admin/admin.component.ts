import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { EmployesInfoDialogComponent } from '../employes-info-dialog/employes-info-dialog.component';
import { User } from '../model/User';
import { RescueTeamDialogComponent } from '../rescue-team-dialog/rescue-team-dialog.component';
//import { RescueTeamInfoDialogComponent } from '../rescue-team-info-dialog/rescue-team-info-dialog.component';
import { RescueTeamInfoAdminDialogComponent} from '../rescue-team-info-admin-dialog/rescue-team-info-admin-dialog.component';
import { AuthService } from '../services/auth.service';
import { CreateRescueTeamDialogComponent } from '../create-rescue-team-dialog/create-rescue-team-dialog.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
  
})
export class AdminComponent implements OnInit {
  rescueTeamId=0;
  password = 'user';
  user:any;
  rescueTeam:any;
  AllUsers:any;
  request:any
  requestDialogOpen=false;
  rescueInfoDialogOpen=false;
  employeeInfoDialogOpen=false;

  
  constructor(private router : Router,private localStorage: LocalStorageService, private http: HttpClient,public dialog: MatDialog) { 
    console.log(this.localStorage.retrieve('username'));
  }
  
  ngOnInit(): void {
        console.log(this.localStorage.retrieve('username'));
        const params = new HttpParams().append('username',this.localStorage.retrieve('username')); 

         this.http.get('http://localhost:8080/api/request/getAll/').subscribe(
          (response)=>{this.request=response,console.log(this.rescueTeam)},
          (error)=>{console.log(error);}
         );

        this.http.get('http://localhost:8080/api/rescueTeam/getAll/').subscribe(
          (response)=>{
            this.rescueTeam=response,
            console.log(this.rescueTeam);
          },
          (error)=>console.log(error)
        );

        
        this.http.get('http://localhost:8080/api/auth/getAllEmp').subscribe(
          (response)=>this.AllUsers=response,
          (error)=>console.log(error)
        );
        
        
  }
  
  openRescueDialog(): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data=this.request;
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.position={top:"100px",left:""};
    if(!this.requestDialogOpen){this.dialog.open(RescueTeamDialogComponent,dialogConfig);this.requestDialogOpen=true;}
    else{this.dialog.closeAll();this.requestDialogOpen=false;} 
}

  openRescueTeamInfo():void{

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = this.rescueTeam;
    dialogConfig.autoFocus = true;
    if(!this.rescueInfoDialogOpen){this.dialog.open(RescueTeamInfoAdminDialogComponent,dialogConfig);this.rescueInfoDialogOpen=true;}
    else{this.dialog.closeAll();this.rescueInfoDialogOpen=false;} 
  }

  openEmployeesInfoDialog():void{

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = this.AllUsers;
    dialogConfig.autoFocus = true;
    if(!this.employeeInfoDialogOpen){this.dialog.open(EmployesInfoDialogComponent,dialogConfig);this.employeeInfoDialogOpen=true;}
    else{this.dialog.closeAll();this.employeeInfoDialogOpen=false;} 
  }

  openChatLobby(){
    this.router.navigate(['chatLobby']);
    
  }

  createRescueTeam():void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    if(!this.employeeInfoDialogOpen){this.dialog.open(CreateRescueTeamDialogComponent,dialogConfig);this.employeeInfoDialogOpen=true;}
    else{this.dialog.closeAll();this.employeeInfoDialogOpen=false;}
  }

}
