import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserI } from 'src/app/source/user-interface/user-interface';
import { CarI } from 'src/app/source/car-interface/car-interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  fetchVehicles(): Observable<CarI[]> {
    const apiUrl = 'https://6480ca19f061e6ec4d49e00a.mockapi.io/vehicle';

    return this.http.get<CarI[]>(apiUrl);
  }

  fetchUsers(): Observable<UserI[]> {
    const apiUrl = 'https://6480ca19f061e6ec4d49e00a.mockapi.io/users';

    return this.http.get<UserI[]>(apiUrl);
  }

  fetchVehicleById(id: number): Observable<CarI> {
    const apiUrl = 'https://6480ca19f061e6ec4d49e00a.mockapi.io';
    const url = `${apiUrl}/vehicle/${id}`; // Construct the URL to fetch the car details by ID
    return this.http.get<CarI>(url);
  }
}
