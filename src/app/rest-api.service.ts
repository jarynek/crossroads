import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  private apiUrl = 'https://wloclawek.invipo.partners/api/services/items?classes=CctvCamera&expand=meta';
  private apiToken = 'Token 30240093-3b33-449d-8a62-e2de3ce9a633';
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
  }

  public apiCrossRoads() {
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Authorization', this.apiToken);
    return this.http
      .get<[]>(this.apiUrl, {headers: this.headers})
      .pipe(
        catchError((err) => {
          throw err;
        })
      );
  }
}
