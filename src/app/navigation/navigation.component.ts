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
  private unSubscribe: Subject<string> = new Subject();
  private sub: Subscription;

  constructor(private crossroadsService: CrossroadsService) {
  }

  ngOnInit() {
    this.setNavigation();
    this.navigationTree.map((nav: InterfaceTree) => {
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
   */
  private resetNavigation(): void {

    if (!this.navigation) {
      throw new Error('not navigation');
    } else if (!this.navigationTree) {
      throw new Error('not navigationTree');
    }

    this.navigation.map((nav: InterfaceCrossroads) => {
      nav.active = false;
      nav.hidden = false;
      nav.focus = false;
    });
    this.navigationTree.map((section: InterfaceTree) => {
      section.active = false;
    });
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
      this.resetNavigation();
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
