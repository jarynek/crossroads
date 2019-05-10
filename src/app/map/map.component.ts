import {Component, OnInit} from '@angular/core';
import {Crossroads as InterfaceCrossroads} from '../crossroads';
import {CrossroadsService} from '../crossroads.service';
import {Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  public map: InterfaceCrossroads[];
  private unSubscribe: Subject<string> = new Subject();

  constructor(private crossroadsService: CrossroadsService) {
  }

  ngOnInit() {
    this.initMapData();
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

  /**
   * Filter detail
   */
  public filterDetail(point): void {
    this.crossroadsService.setCrossRoadsDetail(point);
  }
}
