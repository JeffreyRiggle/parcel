import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'category-search-page',
  templateUrl: './categorySearch.component.html',
  styleUrls: ['./categorySearch.component.scss']
})
export class CategorySearchComponent implements OnInit {
  public category?: string | null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
      this.category = this.route.snapshot.paramMap.get('id');
  }
}
