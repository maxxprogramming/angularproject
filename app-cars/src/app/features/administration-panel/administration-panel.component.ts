import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/core/services/api.service';
import { CarI } from 'src/app/source/car-interface/car-interface';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { carBrands } from 'src/app/features/car-list/carBrand-List';
import { UserI } from 'src/app/source/user-interface/user-interface';
import { carFuels } from '../car-list/carFuels-List';

@Component({
  selector: 'app-administration-panel',
  templateUrl: './administration-panel.component.html',
  styleUrls: ['./administration-panel.component.scss'],
})
export class AdministrationPanelComponent implements OnInit {
  car?: CarI;
  carColor: string = 'null';
  public reactiveForm!: FormGroup;
  carBrands: string[] = [];
  carFuels: string[] = [];
  selectedCarBrand?: string;
  users!: UserI[];
  carsOwner: any[] = [];
  public totalToPay?: number;
  public messageToUserOK?: string = '';
  public messageToUser?: boolean = false;
  public messageToUserError?: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.reactiveForm = this.fb.group({
      name: new FormControl(null, [Validators.required]),
      model: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      fuel: new FormControl(null, [Validators.required]),
      kms: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      shop_location: new FormControl(null, [Validators.required]),
      shop_name: new FormControl(null, [Validators.required]),
      color: new FormControl(null, [Validators.required]),
      dgt_reg: new FormControl(null, [Validators.required]),
      reserved: new FormControl(null),
      images: new FormControl([]),
      user: new FormControl([]),
      gallery: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit() {
    this.carBrands = carBrands;
    this.carFuels = carFuels;
    this.reloadData();
  }

  public goToAdministration(id: string | undefined): void {
    this.router.navigate(['admin', id]);
  }

  onEdit() {

    if (this.reactiveForm?.valid) {
      const formData = {
        ...this.reactiveForm.value,
        name: this.reactiveForm?.value.name,
        images: [this.reactiveForm.value.images],
        gallery: this.convertInputToArray(this.inputText),
      };

      // va el update de cars

      this.http
        .put(
          `https://6480ca19f061e6ec4d49e00a.mockapi.io/vehicle/${this.car?.id}`,
          formData
        )
        .subscribe(
          (response) => {
            this.reloadData();
            this.messageToUser = true;
          },
          (error) => {}
        );
    }
  }

  onAdd() {
    if (this.reactiveForm?.valid) {
      const formData = {
        ...this.reactiveForm.value,
        name: this.reactiveForm?.value.name,
        images: [this.reactiveForm.value.images],
        gallery: this.convertInputToArray(this.inputText),
      };

      // upload new car :)
      this.http
        .post('https://6480ca19f061e6ec4d49e00a.mockapi.io/vehicle/', formData)
        .subscribe(
          (response) => {
            this.reactiveForm.reset();
            this.reloadData();
          },
          (error) => {}
        );
    }
  }

  onReset() {
    this.messageToUserOK = 'Operation done succesufully';
    this.reactiveForm.reset();

    this.carsOwner = [''];
    this.previewImg = [];
  }

  onDelete() {
    const formData = {
      ...this.reactiveForm.value,
      name: this.reactiveForm?.value.name,
    };

    // va el update de cars

    this.http
      .delete(
        `https://6480ca19f061e6ec4d49e00a.mockapi.io/vehicle/${this.car?.id}`,
        formData
      )
      .subscribe(
        (response) => {
          this.messageToUserOK = 'Operation done succesfully';

          this.onReset();
        },
        (error) => {}
      );
  }

  onReserved() {
    if (this.reactiveForm?.valid) {
      const formData = {
        ...this.reactiveForm.value,
        owner: this.reactiveForm?.value.user,
      };

      if (this.reactiveForm?.value.user === 'none') {
        formData.reserved = false;
      } else if (this.reactiveForm?.value.reserved === false) {
        formData.owner = '';
      }

      this.http
        .put(
          `https://6480ca19f061e6ec4d49e00a.mockapi.io/vehicle/${this.car?.id}`,
          formData
        )
        .subscribe(
          (response) => {
            this.messageToUserOK = 'Opearation done succesfuly';
            this.reloadData(); // Reload data after updating reservation status
          },
          (error) => {}
        );
    }
  }

  reloadData() {
    this.route.params.subscribe((params) => {
      const carId = +params['id'];
      this.apiService.fetchVehicleById(carId).subscribe((car: CarI) => {
        this.car = car;
        this.carsOwner = []; // cant have more than 1 owner :)
        this.carsOwner.push(car);
        this.selectedCarBrand = car.name;
        this.reactiveForm.patchValue(car);
        this.apiService.fetchUsers().subscribe((users: UserI[]) => {
          this.users = users;
       
        });
      });
    });
  }

  get reserved() {
    return this.reactiveForm.get('reserved');
  }

  get user() {
    return this.reactiveForm.get('user');
  }

  get gallery() {
    return this.reactiveForm.get('gallery');
  }

  public inputText: string = '';
  public previewImg: string[] = [];
  public messageButtons: string = '';

  convertInputToArray(inputText: string): string[] {
    const words = inputText
      .split(',')
      .map((word) => word.trim())
      .filter((word) => word !== '');
  
    if (words.length === 0) {
      return [];
    }
  
    return words;
  }

  onInputChange() {
    this.previewImg = this.convertInputToArray(this.inputText);
  }

  // message for users

  checkError() {
    if (this.reactiveForm.status === 'INVALID') {
      this.messageToUser = false;
      this.messageToUserOK = 'Please check your fields!';
    } else {
      this.messageToUserOK = 'Operation done succesufully';
    }
  }
}
