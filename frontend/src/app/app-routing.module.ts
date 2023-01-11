import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SalesComponent } from './sales/sales.component';
import { StocksComponent } from './stocks/stocks.component';

const routes: Routes = [
  {
    path:"home",
    component:HomeComponent
  },
  {
    path:'',
    redirectTo:'home',
    pathMatch:"full"
  },
  {
    path:'sales',
    component:SalesComponent
  },
  {
    path:'stocks',
    component:StocksComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
