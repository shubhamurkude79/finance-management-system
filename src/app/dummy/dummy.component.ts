import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.scss']
})
export class DummyComponent implements OnInit {
  dummyURL = environment.dummyURL;
  dummyData: any[] = [];
  limit: number = 20;
  offset: number = 0;
  allDataLoaded: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(){
    this.http.get(`${this.dummyURL}?_limit=${this.limit}&_start=${this.offset}`)
    .subscribe((data: any) => {
      if (data.length < this.limit) {
        this.allDataLoaded = true; // If less data is fetched than the limit, all data is loaded
      }
      this.dummyData = this.dummyData.concat(data); // Append new data to existing data
      this.offset += this.limit; // Update the offset for the next fetch
      console.log(this.dummyData);
    });
  }

}
