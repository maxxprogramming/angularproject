import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarI } from 'src/app/source/car-interface/car-interface';
import { UserI } from 'src/app/source/user-interface/user-interface';
import { ApiService } from 'src/app/source/services/ApiService';

@Component({
  selector: 'app-car-list-render',
  templateUrl: './car-list-render.component.html',
  styleUrls: ['./car-list-render.component.scss']
})
export class CarListComponent implements OnInit {
  vehicles!: CarI[];
  users!: UserI[];
  selectedBrand: string = '';
  filteredVehicles: CarI[] = [];
  showDetails: boolean = false;
  carBrands:string[] = [];
  nameFilter: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.carBrands = this.carBrands;
    this.apiService.fetchVehicles().subscribe((vehicles: CarI[]) => {
      this.vehicles = vehicles;
  
    });

    this.apiService.fetchUsers().subscribe((users: UserI[]) => {
      this.users = users;
    });
  }

  public filter(): void {
    this.filteredVehicles = this.vehicles.filter(
      (vehicle: CarI) => vehicle.name === this.selectedBrand
    );
  }





  public goToCarDetails(id: string): void {
    this.router.navigate(['car-detailed', id]);
  }

  public goToReserve(id: string | undefined): void {
    this.router.navigate(['reserve-car', id]);
  }

  public toggleDetails() {
    this.showDetails = !this.showDetails;
  }

  public sortByPrice(): void {
    this.filteredVehicles = this.filterCarsByPrice(this.vehicles);
  }



 private filterCarsByPrice(cars: CarI[]): CarI[] {
  return cars.sort((a, b) => a.price - b.price);
}
  




public filterCarsByName(cars: CarI[], fuelFilter: string): CarI[] {
  if (!fuelFilter) {
    return this.filteredVehicles;
  } 

  const filterValue = fuelFilter.toLowerCase().trim();
  return cars.filter((car) => car.fuel.toLowerCase().includes(filterValue));
}


public applyNameFilter(): void {
  this.filteredVehicles = this.filterCarsByName(this.vehicles, this.nameFilter);
}



}


