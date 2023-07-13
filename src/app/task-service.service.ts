import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {
  public taskItems :any =[];
  public tasks = new BehaviorSubject<any>([]);
 api = "../assets/data/taskDb.json"
  constructor( private http : HttpClient) { }
 
  viewTask(): Observable<any> {
   return this.http.get(`${this.api}`);
  }
  setTask(item : any){
    this.taskItems.push(...item);
    this.tasks.next(item);
  }
 addTask(item: any){
  this.taskItems.push(item);
  this.tasks.next(this.taskItems);
  console.log(this.taskItems);
 }
}
