import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  // inject router
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  doSearch(value: string) {
    console.log(`value=${value}`);
    // route data to "search" route
    // handled by ProductListComponent
    this.router.navigateByUrl(`/search/${value}`);
  }
}
