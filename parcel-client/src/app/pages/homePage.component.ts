import { Component } from '@angular/core';

// Notes
// If no JWT token show login button
// If no JWT no profile button
// If not JWT no upload options
// Always show a list of apps
@Component({
  selector: 'home-page',
  templateUrl: './homePage.component.html',
  styleUrls: ['./homePage.component.scss']
})
export class HomePageComponent {
}
