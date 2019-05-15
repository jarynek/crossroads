import {Component, OnDestroy, OnInit} from '@angular/core';
import {CrossRoadsConfig} from '../internal';
import {CrossroadsService} from '../crossroads.service';
import {Crossroads as InterfaceCrossroads} from '../crossroads';
import {NavigationTree as InterfaceTree} from '../navigation-tree';
import {takeUntil, map} from 'rxjs/operators';
import {Subject, Subscription} from 'rxjs';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {

    public navigation: InterfaceCrossroads[];
    public navigationTree: InterfaceTree[] = CrossRoadsConfig.navigationTree;
    public collapseInit = false;
    private _map: InterfaceCrossroads[];
    private unSubscribe: Subject<string> = new Subject();
    private sub: Subscription;
    private subNav: Subscription;

    constructor(private crossroadsService: CrossroadsService) {
    }

    ngOnInit() {
        this.setNavigation();
        this.getMap();
        this.navigationTree.map((nav: InterfaceTree) => {
            nav.items = [];
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    /**
     * Get map
     */
    private getMap(): void {
        this.subNav = this.crossroadsService.getCrossRoadsMap()
            .pipe(
                takeUntil(this.unSubscribe)
            )
            .subscribe((response: InterfaceCrossroads[]) => this._map = response);
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

        this._map.filter((mapItem: InterfaceCrossroads) => {
            mapItem.visible = ids.includes(mapItem.id);
        });
    }

    /**
     * Get navigation (to service)
     */
    private setNavigation(): void {
        this.sub = this.crossroadsService.getCrossRoads()
            .pipe(
                takeUntil(this.unSubscribe),
            )
            .subscribe((response: InterfaceCrossroads[]) => {
                if (response) {
                    this.navigation = response;
                    this.setNavigationTree(this.navigation);
                }
            });
    }

    /**
     * Set navigation tree
     */
    private setNavigationTree(response: InterfaceCrossroads[]): void {
        response.map((item: InterfaceCrossroads) => {
            item.active = false;
            item.hidden = false;
            this.navigationTree.filter((nav: InterfaceTree) => {
                if (nav.slug === item.systemStatus) {
                    nav.items.push(item);
                }
            });
        });
        this.crossroadsService.setCrossRoadsTree(this.navigationTree);
    }

    /**
     * Reset Navigation
     * @param action: any
     */
    private resetNavigation(action: string = null): void {
        if (!this.navigation) {
            throw new Error('not navigation');
        } else if (!this.navigationTree) {
            throw new Error('not navigationTree');
        }

        this.navigation.map((nav: InterfaceCrossroads) => {
            nav.active = false;
            nav.focus = false;
            if (action && action === 'navigation') {
                nav.hidden = false;
            }
        });
        this.navigationTree.map((section: InterfaceTree) => {
            section.active = false;
        });
    }

    /**
     * Filtering navigation
     */
    public filterNavigation(item): void {

        const coordinates: string[] = !item.position
            ? CrossRoadsConfig.map.coordinates
            : item.position.coordinates;

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
        if (item.items) {
            item.items.filter((nav: InterfaceCrossroads) => nav.hidden = false);
        }

        this.crossroadsService.setCrossRoadsDetail(null);
        if (coordinates) {
            this.crossroadsService.setCrossRoadsCoordinates(coordinates);
        }
    }

    /**
     * Reset filter
     */
    public resetFilter(): void {
        this.crossroadsService.getCrossRoadsMap()
            .pipe(
                map((response: InterfaceCrossroads[]) => {
                    response.map((mapItem: InterfaceCrossroads) => mapItem.visible = true);
                })
            )
            .subscribe();

        try {
            this.resetNavigation('navigation');
            this.crossroadsService.setCoordinates(CrossRoadsConfig.map.coordinates);
        } catch (e) {
            console.log(e.message);
        }
    }

    /**
     * Collapse filter
     */
    public collapseFilter(): void {
        this.navigationTree.filter((tree: InterfaceTree) => tree.open = false);
        this.collapseInit = false;
    }

    /**
     * Collapse stet init
     * @param value: boolean
     */
    public collapseSetInit(value: boolean) {
        this.collapseInit = value;
    }
}
