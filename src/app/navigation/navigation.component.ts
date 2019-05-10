import {Component, OnDestroy, OnInit} from '@angular/core';
import {CrossroadsService} from '../crossroads.service';
import {Crossroads as InterfaceCrossroads} from '../crossroads';
import {takeUntil, map} from 'rxjs/operators';
import {Subject, Subscription} from 'rxjs';

interface InterfaceNavigationStatus {
  title: string;
  slug: string;
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
      items: []
    },
    {
      title: 'Disconnect',
      slug: 'OutOfOrder',
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
   * Set data for navigation
   */
  private setNavigation(): void {
    this.sub = this.crossroadsService.getCrossRoads()
      .pipe(
        takeUntil(this.unSubscribe),
        map((response: InterfaceCrossroads[]) => {
          if (response) {
            response.filter((item: InterfaceCrossroads) => {
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
   * Filtering navigation
   */
  public filterNavigation(item): void {
    this.crossroadsService.getCrossRoadsMap()
      .pipe(
        map((response: InterfaceCrossroads[]) => {
          response.filter((mapItem: InterfaceCrossroads) => {
            mapItem.visible = mapItem.id === item.id;
          });
        })
      )
      .subscribe();
    this.crossroadsService.setCrossRoadsDetail(null);
    this.crossroadsService.setCrossRoadsCoordinates(item.position.coordinates);
  }

  /**
   * Collapse all -> rebuild data
   */
  public collapseAll(): void {
    this.crossroadsService.getCrossRoadsMap()
      .pipe(
        map((response: InterfaceCrossroads[]) => {
          response.map((mapItem: InterfaceCrossroads) => mapItem.visible = true);
        })
      )
      .subscribe();
  }
}
