import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdministrationPanelRoutingModule } from './administration-panel-routing.module';
import { AdministrationPanelComponent } from './administration-panel.component';
import { BrowserAnimationsModule } from  
    '@angular/platform-browser/animations'; 
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';  

@NgModule({
  declarations: [
    AdministrationPanelComponent
  ],
  imports: [
    CommonModule,
    AdministrationPanelRoutingModule,
    ReactiveFormsModule,
    MatButtonModule, 
    MatSnackBarModule, 
    BrowserAnimationsModule 
  ]
})
export class AdministrationPanelModule { }
