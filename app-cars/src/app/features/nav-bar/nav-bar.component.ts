import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JQueryStyleEventEmitter } from 'rxjs/internal/observable/fromEvent';
/// <reference types="jquery" />
declare var $: any;
import { WeatherDataI } from './navbarWeather-interface';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  standalone: true,
  imports: [RouterModule],
})
export class NavBarComponent implements OnInit {
  dataApi: any = [];
  dataApiByip?: any;

  // weather data manipultaion
  weatherDataArray: WeatherDataI[] = [];
  celsius?: number;
  celsiusF?: number;
  humidity?: number;
  speed?: number;
  //weather end
  
// ip
  async getApi(): Promise<void> {
    let secondApi = await fetch(`https://ipapi.co/json`);
    let data = await secondApi.json();
    this.dataApi = { ...data };

  }

  async getApiperIp(ip: string): Promise<void> {
    let secondApi = await fetch(`https://ipapi.co/${ip}/json/`);
    let data = await secondApi.json();
    this.dataApiByip = { ...data };
   
  }

  getWeather(ipAdress: string): void {
    const ip = ipAdress;
   
    $.get('https://ipapi.co/' + ip + '/latlong/', (response: any) => {
      const latlong = response.split(',');
      
      $.get(
        'http://api.openweathermap.org/data/2.5/weather?lat=' +
          latlong[0] +
          '&lon=' +
          latlong[1] +
          '&appid=60537cc278b42a0ae9cfc0c79896990b' +
          '&units=metric',
        (wResponse: any) => {
          
         this.celsius = Math.round(wResponse.main.temp);
         this.celsiusF = Math.round(wResponse.main.feels_like);
         this.humidity = wResponse.main.humidity;
         this.speed = Math.round(wResponse.wind.speed);

          this.weatherDataArray=  {...wResponse};
          
        }
      );
    });
  }
  

  async ngOnInit(): Promise<void> {
    await this.getApi();
     this.getWeather(this.dataApi.ip);
  }
}
