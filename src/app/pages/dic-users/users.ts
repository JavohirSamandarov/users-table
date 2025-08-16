import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class Users {
  private baseUrl = `${environment.API_BASE_URL}/users`;

  constructor(private http: HttpClient) {}

  getUsers(page: number = 1, pageSize: number = 10, filter?: string, country?: string, fullName?: string): Observable<any> {
    let params = new HttpParams()
      .set('full', 'true')
      .set('page', page.toString())
      .set('page_size', pageSize.toString());

    if (filter) params = params.set('filter', filter);
    if (fullName) params = params.set('full_name', fullName);
    if (country) params = params.set('country', country);
    

     return this.http.get<any>(this.baseUrl, { params }).pipe(
      shareReplay(1)
    );
  }
}
