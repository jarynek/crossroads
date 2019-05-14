import {Directive, ElementRef, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {Input} from '@angular/core';
import {CrossroadsService} from './crossroads.service';
import {Subject, Subscription} from 'rxjs';
import {NavigationTree as InterfaceTree} from './navigation-tree';
import {takeUntil} from 'rxjs/operators';

@Directive({
  selector: '[appToggleSection]'
})
export class ToggleSectionDirective implements OnInit {

  private _navigateTree: InterfaceTree[];
  private sub: Subscription;
  private unSubscribe: Subject<string> = new Subject();
  private collapseInit = false;

  constructor(private elementRef: ElementRef, private crossRoadService: CrossroadsService) {
  }

  @Input() section: InterfaceTree;
  @Output() updateCollapseInit = new EventEmitter();

  ngOnInit() {
    this.getNavigate();
  }

  /**
   * Get navigation (to service)
   */
  private getNavigate(): void {
    this.sub = this.crossRoadService.getCrossRoadsTree()
      .pipe(
        takeUntil(this.unSubscribe)
      )
      .subscribe((response: InterfaceTree[]) => this._navigateTree = response);
  }

  private updateCollapse(value: boolean): void {
    this.updateCollapseInit.next(value);
    this.collapseInit = false;
  }

  @HostListener('click')
  public onClick(): void {
    this._navigateTree.filter((nav: InterfaceTree) => {
      if (nav.slug === this.section.slug) {
        nav.open = !nav.open;
      }
      if (nav.open === true) {
        this.collapseInit = true;
      }
    });
    this.updateCollapse(this.collapseInit);
  }
}
