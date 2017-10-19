import { Component, OnDestroy, OnInit } from "@angular/core";
import { WeatherItem } from './weather-item.model';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-weather-list',
  template: `
        <section class="weather-list">
            <app-weather-item *ngFor="let weatherItem of weatherItems" [weatherItem]="weatherItem"></app-weather-item>
        </section>
    `
})
export class WeatherListComponent implements OnInit {
  weatherItems: WeatherItem[];

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {

    this.weatherItems = this.weatherService.getWeatherItems();
  }

}
