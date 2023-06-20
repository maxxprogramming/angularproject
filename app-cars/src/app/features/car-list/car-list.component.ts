import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/core/services/api.service';
import { CarI } from 'src/app/source/car-interface/car-interface';
import { UserI } from 'src/app/source/user-interface/user-interface';
import { Router } from '@angular/router';
import { carBrands } from './carBrand-List';



@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss'],
})
export class CarListComponent implements OnInit {
  vehicles!: CarI[];
  users!: UserI[];
  selectedBrand: string = '';
  filteredVehicles: CarI[] = [];
  showDetails: boolean = false;
  carBrands:string[] = [];
  nameFilter: string = '';
  kmsDescendingPipe: any;
  isDivHidden: boolean = false;
  isDivHiddenDesc: boolean = true;

  displayLimit: number = 9;


  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.carBrands = carBrands;
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


// pipe descending by button click
getDescendingVehicles(vehicles: CarI[]): CarI[] {
  return this.kmsDescendingPipe.transform(vehicles);
}


applyFilter() {
  this.filteredVehicles = this.getDescendingVehicles(this.vehicles);


}



hideDiv() {
  this.isDivHidden = true;
  this.isDivHiddenDesc = false;
}


//pipe elements per one click

showMore() {
  this.displayLimit += 9; 
}

}


