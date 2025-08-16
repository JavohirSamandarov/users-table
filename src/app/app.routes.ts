import { Routes } from '@angular/router';
import { DicUsers } from './pages/dic-users/dic-users';

export const routes: Routes = [
    { path: 'users', component: DicUsers },
    { path: '', redirectTo: '/users', pathMatch: 'full' }
];
