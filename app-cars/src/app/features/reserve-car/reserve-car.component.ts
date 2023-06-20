import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { carBrands } from 'src/app/features/car-list/carBrand-List';
import { UserI } from 'src/app/source/user-interface/user-interface';
import { CarI } from 'src/app/source/car-interface/car-interface';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { carData } from './reserve-car-logo';
import { ApiService } from 'src/core/services/api.service';

@Component({
  selector: 'app-reserve-car',
  templateUrl: './reserve-car.component.html',
  styleUrls: ['./reserve-car.component.scss'],
})
export class ReserveCarComponent implements OnInit {
  car?: CarI;
  public reactiveForm!: FormGroup;

  carBrands: string[] = [];
  selectedCarBrand?: string;
  users!: UserI[];
  userAdded?: boolean = false;
  carsOwner: any[] = [];
  public totalToPay?: number;
  public filterCarData?: any[] = [''];
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.reactiveForm = this.fb.group({
      username: new FormControl(null, [Validators.required]),
      avatar: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.email]),
      money_spent: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      reserved: new FormControl(null),
    });
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.route.params.subscribe((params) => {
      const carId = +params['id'];
      this.apiService.fetchVehicleById(carId).subscribe((car: CarI) => {
        this.car = car;
        this.carsOwner = []; // testing ,  cant have more than 1 owner :)
        this.carsOwner.push(car);
        this.selectedCarBrand = car.name;
        this.reactiveForm.patchValue(car);
        this.apiService.fetchUsers().subscribe((users: UserI[]) => {
          this.users = users;
          this.filterCarData = carData.filter(
            (x) => x.name.toLowerCase() === this.car?.name.toLowerCase()
          );
        });
      });
    });
  }

  onAdd() {
    if (this.reactiveForm?.valid) {
      const formData = {
        ...this.reactiveForm.value,
        name: this.reactiveForm?.value.username,
      };

      // upload new car :)
      this.http
        .post('https://6480ca19f061e6ec4d49e00a.mockapi.io/users/', formData)
        .subscribe(
          (response) => {
            this.reactiveForm.reset();
            this.reloadData();
            this.userAdded = true;
          },
          (error) => {
            this.userAdded = false;
          }
        );
      // update to true - reserve

      this.updateReservedStatus(Number(this.reloadData()));
    }
  }

  updateReservedStatus(carId: number) {
    const formData = { ...this.reactiveForm.value };
    formData.reserved = true;
    this.http
      .put(
        `https://6480ca19f061e6ec4d49e00a.mockapi.io/vehicle/${this.car?.id}`,
        formData
      )
      .subscribe(
        (response) => {},
        (error) => {}
      );
  }
}
