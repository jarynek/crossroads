import {Component, OnInit, OnDestroy} from '@angular/core';
import {CrossroadsService} from '../crossroads.service';
import {Crossroads as InterfaceCrossroads} from '../crossroads';
import {Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

    private _navigate: InterfaceCrossroads[];
    private _map: InterfaceCrossroads[];
    private _filterMapPoints;
    private unSubscribe: Subject<string> = new Subject();
    private sub: Subscription;
    public reset: boolean;
    public query: string;

    constructor(private crossroadsService: CrossroadsService) {
    }

    ngOnInit() {
        this.getNavigate();
        this.getMap();
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    /**
     * Get navigation (to service)
     */
    private getNavigate(): void {
        this.sub = this.crossroadsService.getCrossRoads()
            .pipe(
                takeUntil(this.unSubscribe)
            )
            .subscribe((response: InterfaceCrossroads[]) => this._navigate = response);
    }

    private resetNavigate(): void {
        this._navigate.map((item: InterfaceCrossroads) => {
            item.hidden = false;
            item.active = false;
        });
    }

    /**
     * Get map (to service)
     */
    private getMap(): void {
        this.sub = this.crossroadsService.getCrossRoadsMap()
            .pipe(
                takeUntil(this.unSubscribe)
            )
            .subscribe((response: InterfaceCrossroads[]) => this._map = response);
    }

    /**
     * Reset map
     */
    private resetMap(): void {
        this._map.map((item: InterfaceCrossroads) => item.visible = true);
        this.crossroadsService.setCrossRoadsCoordinates([19.0580278, 52.65725]);
    }

    /**
     * Filtering navigation (to service)
     */
    private filterNavigation(value: string): void {
        this._navigate.filter((nav: InterfaceCrossroads) => {
            nav.hidden = !nav.name.toLocaleLowerCase().includes(value.toLocaleLowerCase());
        });
    }

    /**
     * Filtering navigation (to service)
     */
    private filterMap(value: string): void {
        this._filterMapPoints = [];
        this._map.filter((nav: InterfaceCrossroads) => {
            nav.visible = true;
            if (!nav.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())) {
                nav.visible = false;
            } else {
                if (nav.position) {
                    this._filterMapPoints.push(nav.position.coordinates);
                }
            }
        });
    }

    /**
     * Reset detail
     */
    private resetDetail(): void {
        this.crossroadsService.setCrossRoadsDetail(null);
    }

    /**
     * Set coordinates
     */
    private setCoordinates(filterMapPoints: InterfaceCrossroads[]) {
        this.crossroadsService.setCrossRoadsCoordinates(filterMapPoints[0]);
    }

    /**
     * Search
     */
    public search(event: KeyboardEvent): void {
        this.reset = false;
        const value = (event.target as HTMLInputElement).value;
        if (value) {
            this.reset = true;
        }

        try {
            this.filterNavigation(value);
            this.filterMap(value);
            this.setCoordinates(this._filterMapPoints);
            this.resetDetail();
        } catch (e) {
            console.log(e.message);
        }
    }

    /**
     * Reset search
     */
    public resetSearch(): void {
        this.resetNavigate();
        this.resetMap();
        this.resetDetail();
        this.query = '';
        this.reset = false;
    }
}
