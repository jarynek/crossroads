import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CrossroadsComponent} from './crossroads/crossroads.component';

const routes: Routes = [
    {path: 'crossroads', component: CrossroadsComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
