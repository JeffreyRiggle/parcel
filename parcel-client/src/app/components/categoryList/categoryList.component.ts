import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { loadCategories } from 'src/app/data/actions/category.actions';
import { CategoryState } from 'src/app/data/reducers/category.reducer';

@Component({
  selector: 'category-list',
  templateUrl: './categoryList.component.html',
  styleUrls: ['./categoryList.component.scss']
})
export class CategoryListComponent implements OnDestroy, OnInit {
  public categories: string[];
  private subscription: Subscription;

  constructor(private store: Store<{ category: CategoryState}>, private router: Router) {
      this.categories = [];
      this.subscription = this.store.select('category').subscribe(state => {
          this.categories = state.categories;
      });
  }

  ngOnInit(): void {
      this.store.dispatch(loadCategories());
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
