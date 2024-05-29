import { Routes } from '@angular/router';
import { ListViewComponent } from './list-view/list-view.component';
import { EditFormComponent } from './edit-form/edit-form.component';


export const routes: Routes = [
    { path: '', component: ListViewComponent },
    { path: 'edit/:id', component: EditFormComponent },
    { path: '**', redirectTo: '' } // Redirect to list view if route not found
];
