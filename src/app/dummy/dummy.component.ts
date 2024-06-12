import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.scss']
})
export class DummyComponent implements OnInit, OnDestroy {
  dummyURL = environment.dummyURL;
  dummyData: any[] = [];
  limit: number = 20;
  offset: number = 0;
  allDataLoaded: boolean = false;
  private subscription: Subscription | undefined;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchData();
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription?.unsubscribe();
    }
  }

  fetchData(){
    this.subscription = this.http.get(`${this.dummyURL}?_limit=${this.limit}&_start=${this.offset}`)
    .subscribe((data: any) => {
      if (data.length < this.limit) {
        this.allDataLoaded = true;
      }
      this.dummyData = this.dummyData.concat(data);
      this.offset += this.limit;
    });
  }

  deleteItem(index: number){
    this.dummyData.splice(index, 1);
  }

  trackById(index: number, item: any){
    return item.id;
  }

}
