import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-request-landing',
  templateUrl: './request-landing.component.html',
  styleUrls: ['./request-landing.component.css']
})
export class RequestLandingComponent implements OnInit {

  constructor(private localStorage: LocalStorageService, private messageService : MessageService) { 
    console.log(this.messageService.getMessageByUserId(this.localStorage.retrieve('request').requestId));  
  }
  allMessages:any;
  displayedColumns=['sender','content'];
  ngOnInit(): void {

      console.log(this.localStorage.retrieve('request').requestId);
      console.log(this.messageService.getMessageByUserId(this.localStorage.retrieve('request').requestId));
      this.allMessages=this.messageService.getMessageByUserId(this.localStorage.retrieve('request').requestId);  

  }

}
