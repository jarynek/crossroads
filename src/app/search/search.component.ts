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

    private navigate: InterfaceCrossroads[];
    private map: InterfaceCrossroads[];
    private unSubscribe: Subject<string> = new Subject();
    private sub: Subscription;
    public reset: boolean;

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
            .subscribe((response: InterfaceCrossroads[]) => this.navigate = response);
    }

    /**
     * Get map (to service)
     */
    private getMap(): void {
        this.sub = this.crossroadsService.getCrossRoadsMap()
            .pipe(
                takeUntil(this.unSubscribe)
            )
            .subscribe((response: InterfaceCrossroads[]) => this.map = response);
    }

    /**
     * Filtering navigation (to service)
     */
    private filterNavigation(value: string): void {
        this.navigate.filter((nav: InterfaceCrossroads) => {
            nav.hidden = !nav.name.toLocaleLowerCase().includes(value.toLocaleLowerCase());
        });
    }

    /**
     * Filtering navigation (to service)
     */
    private filterMap(value: string): void {
        this.map.filter((nav: InterfaceCrossroads) => {
            nav.visible = !!nav.name.toLocaleLowerCase().includes(value.toLocaleLowerCase());
        });
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
        this.filterNavigation(value);
        this.filterMap(value);
    }

    public resetSearch(): void {
        console.log('resetSearch');
    }
}
