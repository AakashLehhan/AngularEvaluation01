import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardDetailsCrudService {

  url: string = 'http://localhost:3000/PaymentDetails';

  private messageSource = new BehaviorSubject<number>(0);
  updateID = this.messageSource.asObservable();


  constructor(private http: HttpClient) {}

  resetId(id: number) {
    this.messageSource.next(0);
  }

  populateForm(id: number) {
    this.messageSource.next(id);
  }

  getList() {
    return this.http.get(this.url);
  }
  postDetails(data: any) {
    return this.http.post(this.url, data);
  }
  deleteDetails(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  getDetails(id: number) {
    return this.http.get(`${this.url}/${id}`);
  }
  updateDetails(id: number, data: any) {
    return this.http.put(`${this.url}/${id}`, data);
  }
}
