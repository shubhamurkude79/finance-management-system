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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(){
    this.http.get(this.dummyURL)
      .subscribe((data: any) => {
        this.dummyData = data;
        console.log(this.dummyData)
      })
  }

}
