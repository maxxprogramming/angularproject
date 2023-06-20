import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/core/services/api.service';
import { CarI } from 'src/app/source/car-interface/car-interface';
import { UserI } from 'src/app/source/user-interface/user-interface';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent {
  vehicles?: CarI[] = [];
  lengthVehicles?: number;
  users?: UserI[] = [];
  lastuser?: any;
  lastcar?: any;
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.apiService.fetchVehicles().subscribe((vehicles: CarI[]) => {
      this.vehicles = vehicles;
      this.lengthVehicles = this.vehicles.length;
      this.lastcar = vehicles[vehicles.length - 1];
    });

    this.apiService.fetchUsers().subscribe((users: UserI[]) => {
      this.users = users;
      this.lastuser = users[users.length - 1];
    });
  }
}
