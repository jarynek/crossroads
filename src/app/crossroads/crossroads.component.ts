import {Component, OnInit, OnDestroy} from '@angular/core';
import {RestApiService} from '../rest-api.service';
import {CrossroadsService} from '../crossroads.service';
import {Crossroads as InterfaceCrossroads} from '../crossroads';
import {Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-crossroads',
  templateUrl: './crossroads.component.html',
  styleUrls: ['./crossroads.component.scss']
})
export class CrossroadsComponent implements OnInit, OnDestroy {

  private unSubscribe: Subject<string> = new Subject();
  private subInitRestData: Subscription;

  constructor(private restApi: RestApiService,
              private crossroadsService: CrossroadsService) {
  }

  ngOnInit() {
    this.initRestApiData();
  }

  ngOnDestroy(): void {
    this.subInitRestData.unsubscribe();
  }

  /**
   * Init rest Api crossroads data for navigate, map
   */
  private initRestApiData(): void {
    this.subInitRestData = this.restApi.apiCrossRoads()
      .pipe(
        takeUntil(this.unSubscribe)
      )
      .subscribe((response: InterfaceCrossroads[]) => {

        console.log(response);

        this.crossroadsService.setCrossRoads(response);
        this.crossroadsService.setCrossRoadsMap(response);
      });
  }
}
