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
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatInputModule, MatIconModule, MatRadioModule} from '@angular/material';
import {NgxMapboxGLModule} from 'ngx-mapbox-gl';

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
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    MatRadioModule,
    NgxMapboxGLModule.withConfig({
      accessToken: 'pk.eyJ1Ijoibm92bzMyIiwiYSI6ImNpcnJneWFncTAwZDRocW0xbXc1bms4enkifQ.LPu4CnsewasKfUdARljoSw',
      geocoderAccessToken: 'pk.eyJ1Ijoibm92bzMyIiwiYSI6ImNpcnJneWFncTAwZDRocW0xbXc1bms4enkifQ.LPu4CnsewasKfUdARljoSw'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
