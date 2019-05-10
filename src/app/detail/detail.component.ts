import {Component, OnDestroy, OnInit} from '@angular/core';
import {Crossroads as InterfaceCrossroads} from '../crossroads';
import {CrossroadsService} from '../crossroads.service';
import {Subject, Subscription} from 'rxjs';
import {takeUntil, map} from 'rxjs/operators';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {

    public detail: InterfaceCrossroads;
    private unSubscribe: Subject<string> = new Subject();
    private sub: Subscription;

    constructor(private crossroadsService: CrossroadsService) {
    }

    ngOnInit() {
        this.sub = this.crossroadsService.getCrossRoadsDetail()
            .pipe(
                takeUntil(this.unSubscribe)
            )
            .subscribe((response: InterfaceCrossroads) => this.detail = response);
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    public setNavigation(): void {
        this.crossroadsService.getCrossRoadsMap()
            .subscribe((response: InterfaceCrossroads[]) => {
                this.crossroadsService.setCrossRoads(response);
            });
    }

}
