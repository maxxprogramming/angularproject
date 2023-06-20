import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {  HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterLink, RouterModule, Routes  } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { CarListComponent } from './features/car-list/car-list.component';
import { AdministrationPanelComponent } from './features/administration-panel/administration-panel.component';
import { AboutUsComponent } from './features/about-us/about-us.component';
import { NavBarComponent } from './features/nav-bar/nav-bar.component';
import { FormsModule } from '@angular/forms';
import { CarDetailedComponent } from './features/car-detailed/car-detailed.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReserveCarComponent } from './features/reserve-car/reserve-car.component';
import { FooterComponent } from './features/footer/footer.component';
import { KmsAscendingPipe } from './source/pipes/kmsAscending.pipe';
import { KmsDescendingPipe } from './source/pipes/kms-descending.pipe';
import { ShowLimitElementsPipe } from './source/pipes/show-limit-elements.pipe';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerInterceptor } from 'src/core/interceptor/spinner.interceptor';









const appRouter:Routes = [
  {path: '' , component:HomeComponent},
  {path: 'carlist', component:CarListComponent},
  {path: 'admin/:id', component:AdministrationPanelComponent},
  {path: 'admin-panel', component:AdministrationPanelComponent},
  {path: 'aboutus', component:AboutUsComponent},
  {path: 'navbar', component:NavBarComponent},
  {path: 'navbar', component:NavBarComponent},
  {path: 'car-detailed/:id' , component:CarDetailedComponent},
  {path: 'reserve-car/:id', component:ReserveCarComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    CarListComponent,
    AdministrationPanelComponent,
    HomeComponent,
    CarDetailedComponent,
    ReserveCarComponent,
    FooterComponent,
    KmsAscendingPipe,
    KmsDescendingPipe,
    ShowLimitElementsPipe,
    SpinnerComponent

    
  
 
  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(appRouter),
    RouterLink,
    NavBarComponent,
    FormsModule,
    ReactiveFormsModule,
 


  
 
  
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass:SpinnerInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
