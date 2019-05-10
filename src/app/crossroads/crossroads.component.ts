import {Component, OnInit, OnDestroy} from '@angular/core';
import {RestApiService} from '../rest-api.service';
import {CrossroadsService} from '../crossroads.service';
import {Crossroads as InterfaceCrossroads} from '../crossroads';
import {Subject, Subscription} from 'rxjs';
import {takeUntil, map} from 'rxjs/operators';

@Component({
    selector: 'app-crossroads',
    templateUrl: './crossroads.component.html',
    styleUrls: ['./crossroads.component.scss']
})
export class CrossroadsComponent implements OnInit, OnDestroy {

    private unSubscribe: Subject<string> = new Subject();
    private subNav: Subscription;
    private subMap: Subscription;
    private subCollapse: Subscription;

    constructor(private restApi: RestApiService,
                private crossroadsService: CrossroadsService) {
    }

    ngOnInit() {

        this.initDataNavigation();
        this.initDataMap();
    }

    ngOnDestroy(): void {
        this.subNav.unsubscribe();
        this.subMap.unsubscribe();
        this.subCollapse.unsubscribe();
    }

    /**
     * Init data navigation
     */
    private initDataNavigation(): void {
        this.subNav = this.restApi.apiCrossRoads()
            .pipe(
                takeUntil(this.unSubscribe)
            )
            .subscribe((response: InterfaceCrossroads[]) => {
                this.crossroadsService.setCrossRoads(response);
            });
    }

    private initDataMap(): void {
        this.subMap = this.restApi.apiCrossRoads()
            .pipe(
                takeUntil(this.unSubscribe),
                map((response: InterfaceCrossroads[]) => {
                    response.map((item: InterfaceCrossroads) => item.visible = true);
                    return response;
                })
            )
            .subscribe((response: InterfaceCrossroads[]) => {
                this.crossroadsService.setCrossRoadsMap(response);
            });
    }
}
