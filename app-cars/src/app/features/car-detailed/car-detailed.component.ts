import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/core/services/api.service';
import { CarI } from 'src/app/source/car-interface/car-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-detailed',
  templateUrl: './car-detailed.component.html',
  styleUrls: ['./car-detailed.component.scss'],
})
export class CarDetailedComponent implements OnInit {
  car: CarI | undefined;

  carColor: string = 'null';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const carId = +params['id']; // Retrieve the vehicle ID from the route parameter

      this.apiService.fetchVehicleById(carId).subscribe((car: CarI) => {
        this.car = car;
        console.log(car);
      });
    });
  }

  public goToAdministration(id?: string): void {
    this.router.navigate(['admin', id]);
  }
}
