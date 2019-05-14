import {Component, OnDestroy, OnInit} from '@angular/core';
import {Crossroads as InterfaceCrossroads} from '../crossroads';
import {CrossroadsService} from '../crossroads.service';
import {Subject, Subscription} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {

    private _navigate: InterfaceCrossroads[];
    public map: InterfaceCrossroads[];
    public coordinates;
    public styleMap = 'basic';
    public zoom: number;
    private stylesMap = ['basic', 'streets', 'bright', 'light', 'dark', 'satellite'];
    private sub: Subscription;
    private unSubscribe: Subject<string> = new Subject();

    constructor(private crossroadsService: CrossroadsService) {
    }

    ngOnInit() {
        this.getMap();
        this.getNavigate();
        this.setCoordinates();
        this.getZoom();
    }

    ngOnDestroy(): void {
    }

    /**
     * Init data for map
     */
    private getMap(): void {
        this.crossroadsService.getCrossRoadsMap()
            .pipe(
                map((response: InterfaceCrossroads[]) => {
                    if (response) {
                        response.map((item: InterfaceCrossroads) => {
                          item.visible = true;
                          console.log(item.visible);
                        });
                        return response;
                    }
                })
            )
            .subscribe((response: InterfaceCrossroads[]) => {
                this.map = response;
            });
    }

    private getZoom(): void {
        this.crossroadsService.getCrossRoadsZoom()
            .pipe(
                takeUntil(this.unSubscribe)
            )
            .subscribe((zoom: number) => {
              this.zoom = zoom;
              console.log(this.zoom);
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
     * Get navigation (to service)
     */
    private getNavigate(): void {
        this.sub = this.crossroadsService.getCrossRoads()
            .pipe(
                takeUntil(this.unSubscribe)
            )
            .subscribe((response: InterfaceCrossroads[]) => this._navigate = response);
    }

    /**
     * Filter navigate
     */
    private filterNavigate(point: InterfaceCrossroads): void {
        this._navigate.filter((nav: InterfaceCrossroads) => (nav.active = nav.id === point.id));
    }

    /**
     * Filter detail
     */
    public filterDetail(point): void {
        this.crossroadsService.setCrossRoadsDetail(point);
        this.filterNavigate(point);
        this.map.filter((item: InterfaceCrossroads) => item.focus = item.id === point.id);
    }
}
