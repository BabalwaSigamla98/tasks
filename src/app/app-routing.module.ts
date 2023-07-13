import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddTaskComponent } from './add-task/add-task.component';

const routes: Routes = [
  { path: 'tasks', component: AddTaskComponent },
 
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
