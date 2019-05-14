import {Injectable} from '@angular/core';
import {CrossRoadsConfig} from './internal';
import {BehaviorSubject, Observable} from 'rxjs';
import {Crossroads as InterfaceCrossroads} from './crossroads';
import {NavigationTree as InterfaceTree} from './navigation-tree';
import * as mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class CrossroadsService {

  public crossRoads: BehaviorSubject<InterfaceCrossroads[]> = new BehaviorSubject(null);
  public crossRoadsMap: BehaviorSubject<InterfaceCrossroads[]> = new BehaviorSubject(null);
  public crossRoadsTree: BehaviorSubject<InterfaceTree[]> = new BehaviorSubject(null);
  public crossRoadsDetail: BehaviorSubject<InterfaceCrossroads> = new BehaviorSubject(null);
  public crossRoadsCoordinates: BehaviorSubject<number[]> = new BehaviorSubject<number[]>(CrossRoadsConfig.map.coordinates);
  public crossRoadsZoom: BehaviorSubject<number> = new BehaviorSubject(CrossRoadsConfig.map.zoom);

  constructor() {
  }

  /**
   * Set cross rest api data
   */
  public setCrossRoads(value): void {
    this.crossRoads.next(value);
  }

  /**
   * Get cross rest api data
   */
  public getCrossRoads(): Observable<InterfaceCrossroads[]> {
    return this.crossRoads;
  }

  /**
   * Set map data
   */
  public setCrossRoadsMap(value): void {
    this.crossRoadsMap.next(value);
  }

  /**
   * Get map data
   */
  public getCrossRoadsMap(): Observable<InterfaceCrossroads[]> {
    return this.crossRoadsMap;
  }

  /**
   * Set detail
   */
  public setCrossRoadsDetail(value): void {
    this.crossRoadsDetail.next(value);
  }

  /**
   * Get detail
   */
  public getCrossRoadsDetail(): Observable<InterfaceCrossroads> {
    return this.crossRoadsDetail;
  }


  /**
   * Get map tree
   */
  public getCrossRoadsTree(): Observable<InterfaceTree[]> {
    return this.crossRoadsTree;
  }

  /**
   * Set map tree
   */
  public setCrossRoadsTree(value): void {
    this.crossRoadsTree.next(value);
  }

  /**
   * Set cross roadsCoordinates
   */
  public setCrossRoadsCoordinates(value): void {
    this.crossRoadsCoordinates.next(value);
  }

  /**
   * Get cross roadsCoordinates
   */
  public getCrossRoadsCoordinates(): Observable<number[]> {
    return this.crossRoadsCoordinates;
  }

  /**
   * Set zoom
   */
  public setCrossRoadsZoom(value: number): void {
    this.crossRoadsZoom.next(value);
  }

  /**
   * Get zoom
   */
  public getCrossRoadsZoom(): Observable<number> {
    return this.crossRoadsZoom;
  }

  /**
   * Set zooming
   * @param arg: number
   */
  public setZoom(arg: number): void {

    if (!arg) {
      throw new Error('not arg for zooming');
    } else if (typeof arg !== 'number') {
      throw new Error('not type number');
    }

    this.setCrossRoadsZoom(arg);
  }

  /**
   * Reset detail
   */
  public resetDetail(): void {
    this.setCrossRoadsDetail(null);
  }

  /**
   * Set coordinates
   * @param arg: object
   */
  public setCoordinates(arg: number[]) {

    if (!arg) {
      throw new Error('not arg for setCoordinates');
    } else if (typeof arg !== 'object') {
      throw new Error('not type number');
    }

    this.setCrossRoadsCoordinates(arg);
  }

  /**
   * Reset map
   * @param args: InterfaceCrossroads[]
   */
  public resetMap(args: InterfaceCrossroads[]): void {

    if (!args) {
      throw new Error('not arg for resetMap');
    }

    args.map((item: InterfaceCrossroads) => {
      item.focus = false;
      item.active = false;
      item.visible = true;
    });

    this.setCrossRoadsMap(args);
  }
}
