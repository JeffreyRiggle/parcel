import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './appSearch.component.html',
  styleUrls: ['./appSearch.component.scss']
})
export class AppSearchComponent {
  constructor(private router: Router) { }

  public search() {
      this.router.navigate(['search']);
  }
}
