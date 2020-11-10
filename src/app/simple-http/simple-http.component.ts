import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-simple-http',
  templateUrl: './simple-http.component.html',
  // styleUrls: ['./simple-http.component.css'] tutorial did not have this line
})
export class SimpleHttpComponent implements OnInit {

  data: Object;
  loading: Boolean; 

  constructor(private http: HttpClient) {
    
  }

  makeRequest(): void {
    this.loading = true;
    this.http
      .get('https://jsonplaceholder.typicode.com/posts/1')
      .subscribe(data => {
          this.data = data,
          this.loading = false;
      });
  }

  ngOnInit(): void {
  }

}
