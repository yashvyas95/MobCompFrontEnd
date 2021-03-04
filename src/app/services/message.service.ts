import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatMessageDto} from '../model/ChatMessageDto';
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private httpClient: HttpClient) { }
  
  getMessageByRequestId(requestId:number):Observable<any>{
    const params = new HttpParams().append('requestId',requestId.toString());
    console.log("GetMESSAGEBYUSERID"+params);
     return this.httpClient.get('http://localhost:8080/api/request/getmessages/',{params:params});
  }

}
