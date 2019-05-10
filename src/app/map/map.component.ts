import {Component, OnInit} from '@angular/core';
import {Crossroads as InterfaceCrossroads} from '../crossroads';
import {CrossroadsService} from '../crossroads.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

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
        this.crossroadsService.getCrossRoadsMap()
            .pipe(
                takeUntil(this.unSubscribe)
            )
            .subscribe((response: InterfaceCrossroads[]) => this.map = response);
    }

    /**
     * Filter detail
     */
    public filterDetail(point): void {
        this.crossroadsService.setCrossRoadsDetail(point);
    }
}
