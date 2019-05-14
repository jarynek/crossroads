import {Component, OnDestroy, OnInit} from '@angular/core';
import {Crossroads as InterfaceCrossroads} from '../crossroads';
import {NavigationTree as InterfaceTree} from '../navigation-tree';
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
    private _tree: InterfaceTree[];
    private _map: InterfaceCrossroads[];
    private unSubscribe: Subject<string> = new Subject();
    private subNav: Subscription;
    private sub: Subscription;

    constructor(private crossroadsService: CrossroadsService) {
    }

    ngOnInit() {
        this.sub = this.crossroadsService.getCrossRoadsDetail()
            .pipe(
                takeUntil(this.unSubscribe)
            )
            .subscribe((response: InterfaceCrossroads) => {
                this.detail = response;
            });

        this.getNavigateTree();
        this.getMap();
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    /**
     * Get navigation (to service)
     */
    private getNavigateTree(): void {
        this.subNav = this.crossroadsService.getCrossRoadsTree()
            .pipe(
                takeUntil(this.unSubscribe)
            )
            .subscribe((tree: InterfaceTree[]) => this._tree = tree);
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
     * Reset detail
     */
    public resetDetail(): void {
        this.crossroadsService.resetDetail();
        this.crossroadsService.resetMap(this._map);
      }
}
