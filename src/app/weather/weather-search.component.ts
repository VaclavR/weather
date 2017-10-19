import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { WeatherItem } from './weather-item.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-weather-search',
  template: `
    <section class="weather-search">
      <form (ngSubmit)="onSubmit(f)" #f="ngForm">
        <label for="city">City</label>
        <input type="text" 
               id="city" 
               name="city"
               #input
               ngModel 
               required 
               (input)="onInput(input.value)">
        <button type="submit">Add City</button>
      </form>
      <div>
        <span class="info">City found:</span> {{ data.cityName }}
      </div>
    </section>
  `
})
export class WeatherSearchComponent implements OnInit, OnDestroy {

  private searchStream = new Subject<string>();
  data: any = {};
  private subscription: Subscription;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.subscription = this.searchStream
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap((input: string) => this.weatherService.searchWeatherData(input))
      .subscribe(
      data => {
        console.log(data);
        this.data = data;
      }
    );
  }

  onInput(cityName: string) {
    if(cityName.length > 2) {
      this.searchStream.next(cityName);
    }
  }

  onSubmit(form: NgForm) {
    const weatherItem = new WeatherItem(this.data.cityName, this.data.description, this.data.temperature);
    this.weatherService.addWeatherItem(weatherItem);
    form.reset();
    this.data = {};
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
