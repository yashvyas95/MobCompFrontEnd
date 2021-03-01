import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChatMessageDto} from '../model/ChatMessageDto';
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private httpClient: HttpClient) { }

  getMessageByUserId(requestId:number){
    const params = new HttpParams().append('requestId',requestId.toString());
    console.log("GetMESSAGEBYUSERID"+params);
     this.httpClient.get('http://localhost:8080/api/request/getmessages/',{params:params}).subscribe(
       (response)=>{
         console.log(response);
         return response;
       }
     );
  }

}
