import {Component, OnInit, OnDestroy} from '@angular/core';
import {CrossRoadsConfig} from '../internal';
import {CrossroadsService} from '../crossroads.service';
import {Crossroads as InterfaceCrossroads} from '../crossroads';
import {NavigationTree as InterfaceTree} from '../navigation-tree';
import {Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  private _navigate: InterfaceCrossroads[];
  private _tree: InterfaceTree[];
  private _map: InterfaceCrossroads[];
  private _filterMapPoints;
  private unSubscribe: Subject<string> = new Subject();
  private subNav: Subscription;
  public reset: boolean;
  public query: string;

  constructor(private crossroadsService: CrossroadsService) {
  }

  ngOnInit() {
    try {
      this.getNavigate();
      this.getTree();
      this.getMap();
    } catch (e) {
      console.log(e.message);
    }
  }

  ngOnDestroy(): void {
    this.subNav.unsubscribe();
  }

  /**
   * Get navigation (to service)
   */
  private getNavigate(): void {
    this.subNav = this.crossroadsService.getCrossRoads()
      .pipe(
        takeUntil(this.unSubscribe)
      )
      .subscribe((response: InterfaceCrossroads[]) => this._navigate = response);
  }

  /**
   * Reset navigate
   */
  private resetNavigate(): void {
    this._navigate.map((item: InterfaceCrossroads) => {
      item.hidden = false;
      item.active = false;
    });
  }

  /**
   * Get tree
   */
  private getTree(): void {
    this.subNav = this.crossroadsService.getCrossRoadsTree()
      .pipe(
        takeUntil(this.unSubscribe)
      )
      .subscribe((tree: InterfaceTree[]) => this._tree = tree);
  }

  /**
   * Reset navigate
   */
  private resetTree(): void {
    this._tree.map((tree: InterfaceTree) => tree.open = true);
  }

  /**
   * Get map (to service)
   */
  private getMap(): void {
    this.subNav = this.crossroadsService.getCrossRoadsMap()
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
      this.crossroadsService.setCoordinates(this._filterMapPoints[0]);
      this.crossroadsService.resetDetail();
    } catch (e) {
      console.log(e.message);
    }
  }

  /**
   * Reset search
   */
  public resetSearch(): void {
    this.resetNavigate();
    this.resetTree();
    this.resetMap();

    try {
      this.crossroadsService.resetDetail();
      this.crossroadsService.setCoordinates(CrossRoadsConfig.map.coordinates);
      this.crossroadsService.setZoom(CrossRoadsConfig.map.zoom);
    } catch (e) {
      console.log(e.message);
    }

    this.query = '';
    this.reset = false;
  }
}
