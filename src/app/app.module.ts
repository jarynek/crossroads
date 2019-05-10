import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CrossroadsComponent} from './crossroads/crossroads.component';
import {NavigationComponent} from './navigation/navigation.component';
import {MapComponent} from './map/map.component';
import {DetailComponent} from './detail/detail.component';

@NgModule({
    declarations: [
        AppComponent,
        CrossroadsComponent,
        NavigationComponent,
        MapComponent,
        DetailComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
