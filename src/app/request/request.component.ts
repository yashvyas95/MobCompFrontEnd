import { Component, OnInit , NgZone} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {Request} from '../model/Request';
import {RequestForSending} from '../model/RequestForSending';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink} from '@angular/router';
import { trigger } from '@angular/animations';
//import { AuthenticationService } from '../services/authentication.service';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { VictimServicesService } from '../services/victim-services.service';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {


  isHidden=true;
  request: Request = new Request(0,false,false,false);
  //requestSending: RequestForSending = new RequestForSending("","","",0,);
  invalid = true;
  requestForm = new FormGroup({
    name:new FormControl(),
    people:new FormControl(),
    fire:new FormControl(),
    medical:new FormControl(),
    crime:new FormControl(),
    location:new FormControl(),
  })
  message="THIS IS MESSAGE";
 // username='user';
 // password='user';
  invalidLogin = false;
  chatService: any;

  constructor(private ngZone: NgZone,private localStorage: LocalStorageService,private vicService: VictimServicesService,private FormBuilder:FormBuilder, private http: HttpClient, private router : Router) { 
    
  }

  ngOnInit(): void {
    //this.loginService.authenticate("user","user");
  }

  onSubmit(requestData:any){
    var counter = 0;
    if(requestData.fire){
      counter++;
    }
    else if(requestData.medical){
      counter++;
    }
    else if(requestData.crime){
      counter++;
    }
    else{
      counter=-1;
    }
    console.log(requestData.name);
    console.log("Name Holder");
    var rSending = new RequestForSending(requestData.name,requestData.people,"Test",requestData.location,0,"ON");
    this.vicService.addRequest(rSending).subscribe(
      (data:any)=>{
        console.log(data);
        this.localStorage.store('request',data);
        this.ngZone.run(() => this.router.navigateByUrl('requestLanding'))

      },
      (error)=>console.log(error)
    );
    
  }
  redirectToLobby() : void {
    this.router.navigate(['lobby']);
}
  returnData(response : any){
      if(response.id!=null){
          this.router.navigate(['/lobby',response.id]);
      }
     console.log(response.id);
  }

 
/*
onSubmit(userData:any){
  console.log("IN onSubmit method");
  this.http.get('http://localhost:8080/findByEmail/{email}', userData).subscribe(
  (response) => this.checkEmail(response,userData),
  (error) => console.log(error))
}

checkEmail(response:any,userData:any){
    if(response.email == userData.email && response.password==userData.password){
        this.reDirect();  
    }
}
*/

showRequestForm():void{
     // this.loginService.authenticate("user","user");
      if(this.isHidden==true){
          this.isHidden=false;
      }
      else{this.isHidden=true;}
}

  redirectToLogin() : void {
    this.router.navigate(['./login']);
}

sendMessage() {
  this.chatService.sendMessage(this.message);
  this.message = '';
}
}

