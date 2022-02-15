import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private subject = new Subject<any>()

  constructor() { }

  sendClickEvent(){
    this.subject.next()
  }
 

  getClickEvent(): Observable<any> {
    return this.subject.asObservable()
  }
}
