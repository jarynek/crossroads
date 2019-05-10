import {Component, OnDestroy, OnInit} from '@angular/core';
import {CrossroadsService} from '../crossroads.service';
import {Crossroads as InterfaceCrossroads} from '../crossroads';
import {takeUntil, map} from 'rxjs/operators';
import {Subject, Subscription} from 'rxjs';

interface InterfaceNavigationStatus {
    title: string;
    slug: string;
    active: boolean;
    items: InterfaceCrossroads[];
}

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {

    public navigation: InterfaceCrossroads[];
    public operatingStatusNavigation: InterfaceNavigationStatus[] = [
        {
            title: 'Ok',
            slug: 'Active',
            active: false,
            items: []
        },
        {
            title: 'Disconnect',
            slug: 'OutOfOrder',
            active: false,
            items: []
        }
    ];
    private unSubscribe: Subject<string> = new Subject();
    private sub: Subscription;

    constructor(private crossroadsService: CrossroadsService) {
    }

    ngOnInit() {
        this.setNavigation();

        this.operatingStatusNavigation.map((nav: InterfaceNavigationStatus) => {
            nav.items = [];
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    /**
     * Set crossroads map
     */
    private setCrossRoadsMap(ids): void {

        if (!ids) {
            throw new Error('ids not ids');
        } else if (typeof ids !== 'object') {
            throw new Error('ids id not object');
        }

        this.crossroadsService.getCrossRoadsMap()
            .pipe(
                map((response: InterfaceCrossroads[]) => {
                    response.filter((mapItem: InterfaceCrossroads) => {
                        mapItem.visible = ids.includes(mapItem.id);
                    });
                    return response;
                })
            )
            .subscribe(value => console.log(value));
    }

    /**
     * Set data for navigation
     */
    private setNavigation(): void {
        this.sub = this.crossroadsService.getCrossRoads()
            .pipe(
                takeUntil(this.unSubscribe),
                map((response: InterfaceCrossroads[]) => {
                    if (response) {
                        response.filter((item: InterfaceCrossroads) => {
                            item.active = false;
                            item.hidden = false;
                            this.operatingStatusNavigation.filter((nav: InterfaceNavigationStatus) => {
                                if (nav.slug === item.operatingStatus) {
                                    nav.items.push(item);
                                }
                            });
                        });
                        return response;
                    }
                })
            )
            .subscribe((response: InterfaceCrossroads[]) => this.navigation = response);
    }

    /**
     * reset Navigation
     */
    private resetNavigation(): void {
        this.navigation.map((nav: InterfaceCrossroads) => nav.active = false);
        this.operatingStatusNavigation.map((section: InterfaceNavigationStatus) => section.active = false);
    }

    /**
     * Filtering navigation
     */
    public filterNavigation(item): void {

        let ids = [];

        if (item.items && item.items.length > 0) {
            item.items.filter((itemId: InterfaceCrossroads) => {
                ids.push(itemId.id);
            });
        } else {
            ids = [item.id];
        }

        try {
            this.resetNavigation();
            this.setCrossRoadsMap(ids);
        } catch (e) {
            console.log(e.message);
        }

        item.active = true;

        this.crossroadsService.setCrossRoadsDetail(null);
        if (item.position) {
            this.crossroadsService.setCrossRoadsCoordinates(item.position.coordinates);
        }
    }

    /**
     * Collapse all -> rebuild data
     */
    public collapseNavigation(): void {
        this.crossroadsService.getCrossRoadsMap()
            .pipe(
                map((response: InterfaceCrossroads[]) => {
                    response.map((mapItem: InterfaceCrossroads) => mapItem.visible = true);
                })
            )
            .subscribe();
        this.resetNavigation();
    }
}
