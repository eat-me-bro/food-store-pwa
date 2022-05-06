import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { FoodStore } from '../models/food-store';
import { apiHost } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class FoodStoreService {

  constructor(private http: HttpClient) { }

  private apiHeader(_bearer: string = 'APIKEY'): HttpHeaders {
    return new HttpHeaders({
      'Content-type': 'application/json'
      // 'Authorisation': 'Bearer ' + _bearer
    })
  }

  getFoodStores(fsData: FoodStore): Observable<FoodStore[]> {
    let apiRoute: string = `${apiHost.dns}/foodstores`
    console.log("API ROUT :", apiRoute);
    return this.http.post<FoodStore[]>(apiRoute, fsData, { headers: this.apiHeader() })    
  }

}
