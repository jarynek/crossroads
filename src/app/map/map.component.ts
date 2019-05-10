import {Component, OnDestroy, OnInit} from '@angular/core';
import {Crossroads as InterfaceCrossroads} from '../crossroads';
import {CrossroadsService} from '../crossroads.service';
import {Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {

  public map: InterfaceCrossroads[];
  public coordinates;
  public styleMap = 'basic';
  private stylesMap = ['basic', 'streets', 'bright', 'light', 'dark', 'satellite'];
  private unSubscribe: Subject<string> = new Subject();

  constructor(private crossroadsService: CrossroadsService) {
  }

  ngOnInit() {
    this.initMapData();
    this.setCoordinates();
  }

  ngOnDestroy(): void {
  }

  /**
   * Init data for map
   */
  private initMapData(): void {
    this.crossroadsService.getCrossRoadsMap()
      .pipe(
        takeUntil(this.unSubscribe),
        map((response: InterfaceCrossroads[]) => {
          if (response) {
            response.map((item: InterfaceCrossroads) => item.visible = true);
            return response;
          }
        })
      )
      .subscribe((response: InterfaceCrossroads[]) => {
        this.map = response;
      });
  }

  /***
   * Set coordinates
   */
  private setCoordinates() {
    this.crossroadsService.getCrossRoadsCoordinates().subscribe((response) => this.coordinates = response);
  }

  /**
   * Set map style
   */
  public setStyleMap(style): void {
    this.styleMap = style;
  }

  /**
   * Filter detail
   */
  public filterDetail(point): void {
    this.crossroadsService.setCrossRoadsDetail(point);
  }
}
