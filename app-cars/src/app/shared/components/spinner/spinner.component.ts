import { Component } from '@angular/core';
import { SpinnerService } from 'src/core/services/spinner.service';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-spinner',
  template: `
    <div class="container-spinner" *ngIf="isLoading$ | async">
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  `,
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
  isLoading$ = this.spinnerSvc.isLoading$;
  constructor(private spinnerSvc: SpinnerService) {}

  ngOnInit(): void {}
}
