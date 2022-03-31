import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './components/page/error/error.component';
import { HelpComponent } from './components/page/help/help.component';
import { HomeComponent } from './components/page/home/home.component';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'help', component: HelpComponent },

  { path: '404', component: ErrorComponent },
  { path: '**', redirectTo: '/404' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
