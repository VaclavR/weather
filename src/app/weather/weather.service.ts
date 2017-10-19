import { Injectable } from '@angular/core';
import { WEATHER_ITEMS } from './weather.data';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { WeatherItem } from './weather-item.model';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/throw';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class WeatherService {
  private apiKey: string = '4cd1d5746c2c5bc0834863f7f9cf236d';
  private url: string = 'http://api.openweathermap.org/data/2.5/weather?q=';
  private params = new HttpParams()

  constructor(private http: Http) {}
  getWeatherItems() {
    return WEATHER_ITEMS;
  }

  addWeatherItem(weatherItem: WeatherItem) {
    WEATHER_ITEMS.push(weatherItem);
  }

  clearWeatherItems() {
    WEATHER_ITEMS.splice(0);
  }

  searchWeatherData(city: string): Observable<any> {
    return this.http.get(this.url + city + '&units=metric&APPID=' + this.apiKey)
      .map((response) => {
        const jsonedData = response.json();
        const weatherItem: WeatherItem = new WeatherItem(jsonedData.name, jsonedData.weather[0].description, jsonedData.main.temp);
        return weatherItem;
      }).catch(error => {
      console.log(error);
      return Observable.throw(error.json());
      });
  }

}
