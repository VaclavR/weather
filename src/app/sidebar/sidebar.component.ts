import { Component, OnInit } from '@angular/core';
import { Profile } from './profile.model';
import { ProfileService } from './profile.service';
import { WeatherService } from '../weather/weather.service';
import { WeatherItem } from '../weather/weather-item.model';
import 'rxjs/add/operator/retry';

@Component({
  selector: 'app-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.scss']
})

export class SidebarComponent implements OnInit{

  profiles: Profile[];

  constructor(private profileService: ProfileService,
              private weatherService: WeatherService) {}

  ngOnInit() {
    this.profiles = this.profileService.getProfiles();
  }

  onSaveNew() {
    const cities: string[] = this.weatherService.getWeatherItems()
      .map( (item: WeatherItem) => {
        return ' ' + item.cityName;
      });
    this.profileService.saveNewProfile(cities);
    this.weatherService.clearWeatherItems();

  }

  onLoadProfile(profile: Profile) {
    this.weatherService.clearWeatherItems();
    for (let i = 0; i < profile.cities.length; i++) {
      this.weatherService.searchWeatherData(profile.cities[i])
        .retry()
        .subscribe(
          data => {
            const weatherItem: WeatherItem = data;
            console.log(weatherItem);
            this.weatherService.addWeatherItem(weatherItem);
          }
        )
    }
  }

  onDeleteProfile(event: Event, profile: Profile) {
    event.stopPropagation();
    this.profileService.deleteProfile(profile);
  }

}
