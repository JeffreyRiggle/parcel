import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'category-item',
  templateUrl: './categoryItem.component.html',
  styleUrls: ['./categoryItem.component.scss']
})
export class CategoryItemComponent {
  @Input() public category!: string;

  constructor(private router: Router) {
  }

  public routeToCategory() {
      this.router.navigate(['category', this.category]);
  }
}
