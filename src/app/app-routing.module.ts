import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailComponent } from './pages/detail/detail.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { ConcateComponent } from './pages/concate/concate.component';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [
  {
    path: "", component: LayoutComponent, children: [
      { path: "", component: HomeComponent },
      { path: "detail/:slug", component: DetailComponent },
    ]
  },

  {
    path: "post", component: LayoutComponent, children: [
      { path: ":key", component: ConcateComponent },
    ]
  },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
