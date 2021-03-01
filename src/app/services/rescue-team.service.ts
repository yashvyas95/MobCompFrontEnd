import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RescueTeam } from '../model/RescueTeam';

@Injectable({
  providedIn: 'root'
})
export class RescueTeamService {

  constructor(private httpClient: HttpClient) { }

  getRescueTeam(id: string): Observable<any>{
    const params = new HttpParams().append('id',id);
    return this.httpClient.get('http://localhost:8080/api/rescueTeam/getById/',{params:params});
  }
/*
  getmembers(id:number):Observable<any>{
    const params = new HttpParams().append('id',id.toString());
    return this.httpClient.get('http://localhost:8080/api').subscribe();
  }
*/
 
}
