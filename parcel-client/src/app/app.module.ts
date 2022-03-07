import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './root/pages/home/homePage.component';
import { UserEffects } from './root/data/effects/user.effects';
import { userReducer } from './root/data/reducers/user.reducer';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppSearchComponent } from './root/components/appSearch/appSearch.component';
import { CategoryListComponent } from './root/components/categoryList/categoryList.component';
import { categoryReducer } from './root/data/reducers/category.reducer';
import { CategoryEffects } from './root/data/effects/cateogry.effects';
import { CategoryItemComponent } from './root/components/categoryItem/categoryItem.component';
import { CategorySearchComponent } from './root/pages/categorySearch/categorySearch.component';
import { AppListComponent } from './root/components/appList/appList.component';
import { appsReducer } from './root/data/reducers/app.reducer';
import { AppEffects } from './root/data/effects/app.effects';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AppSearchComponent,
    CategoryListComponent,
    CategoryItemComponent,
    CategorySearchComponent,
    AppListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({ user: userReducer as any, category: categoryReducer as any, apps: appsReducer as any }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([UserEffects, CategoryEffects, AppEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
