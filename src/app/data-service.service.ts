import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataServiceService {

  private apiUrl='http://127.0.0.1:5000/api';
  constructor(private http:HttpClient) { }
  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/roles`);
  }

  getIndustries(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/industries`);
  }

  getCountries(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/countries`);
  }

  getCNAEs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cnaes`);
  }
  postDATA(filters:any): Observable<Blob>{
    return this.http.post(`${this.apiUrl}/filter-leads`, filters, { responseType: 'blob' });
    
  }  
}
