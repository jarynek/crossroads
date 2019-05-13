import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Crossroads as InterfaceCrossroads} from './crossroads';
import {NavigationTree as InterfaceTree} from './navigation-tree';

@Injectable({
  providedIn: 'root'
})
export class CrossroadsService {

  public crossRoads: BehaviorSubject<InterfaceCrossroads[]> = new BehaviorSubject(null);
  public crossRoadsMap: BehaviorSubject<InterfaceCrossroads[]> = new BehaviorSubject(null);
  public crossRoadsTree: BehaviorSubject<InterfaceTree[]> = new BehaviorSubject(null);
  public crossRoadsDetail: BehaviorSubject<InterfaceCrossroads> = new BehaviorSubject(null);
  public crossRoadsCoordinates: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([19.0580278, 52.65725]);

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
}
