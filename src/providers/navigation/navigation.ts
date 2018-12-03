import { Injectable } from '@angular/core';
import { HomePage } from '../../pages/home/home';
import { ListPage } from '../../pages/list/list';
import { Sample1Page } from '../../pages/sample1/sample1';
import { Sample3Page } from '../../pages/sample3/sample3';
import { Sample2Page } from '../../pages/sample2/sample2';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface NavigationPage {
  componentName: any;
  displayName: string;
  hasSideMenuEntry?: boolean;
  sideMenuIndex?: number;
  hasTabsBarEntry?: boolean;
  tabsBarIndex?: number;
  displayIcon?: string;
  data?: any;
}

const onlySideMenuPages = (page: NavigationPage) => page.hasSideMenuEntry;
const onlyTabsBarPages = (page: NavigationPage) => page.hasTabsBarEntry;

const mapOnlySideMenuPages = (pages: NavigationPage[]) => pages.filter(onlySideMenuPages);
const mapOnlyTabsBarPages = (pages: NavigationPage[]) => pages.filter(onlyTabsBarPages);

const findByComponentName = (componentName: any) => (page: NavigationPage) => page.componentName === componentName;

/*
  Generated class for the NavigationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NavigationProvider {

  private pages: NavigationPage[] = [
    {componentName: HomePage, displayName: 'Home', displayIcon: 'home', hasSideMenuEntry: true, sideMenuIndex: 0, hasTabsBarEntry: true, tabsBarIndex: 0},
    {componentName: ListPage, displayName: 'List', displayIcon: 'home', hasSideMenuEntry: true, sideMenuIndex: 1, hasTabsBarEntry: true, tabsBarIndex: 1},
    {componentName: Sample1Page, displayName: 'Sample 1', displayIcon: 'add', hasSideMenuEntry: true, sideMenuIndex: 2, hasTabsBarEntry: false},
    {componentName: Sample2Page, displayName: 'Sample 2', displayIcon: 'alarm', hasSideMenuEntry: false, hasTabsBarEntry: true, tabsBarIndex: 2},
    {componentName: Sample3Page, displayName: 'Sample 3', displayIcon: 'add-circle'},
  ];

  private pagesNotifier: BehaviorSubject <NavigationPage[]>;
  private openNotifier: Subject <NavigationPage>;

  pages$: Observable<NavigationPage[]>;
  sideMenuPages$: Observable<NavigationPage[]>;
  tabsBarPages$: Observable<NavigationPage[]>;

  openPage$: Observable<NavigationPage>;

  constructor() {
    console.log('Hello NavigationProvider Provider');
    this.pagesNotifier = new BehaviorSubject(this.pages);
    this.openNotifier = new Subject;
    this.pages$ = this.pagesNotifier.asObservable();
    this.sideMenuPages$ = this.pages$.pipe(map(mapOnlySideMenuPages));
    this.tabsBarPages$ = this.pages$.pipe(map(mapOnlyTabsBarPages));
    this.openPage$ = this.openNotifier.asObservable();
  }

  private nofify() {
    this.pagesNotifier.next(this.pages);
  }

  changes(page: NavigationPage) {
    const index = this.pages.findIndex((page: NavigationPage) => page.componentName === page.componentName);
    if (index < 0) {
      throw new Error(`Page (${page.displayName}) not found in NavigationProvider@pages.`);
    }
    this.pages[index] = page;
  }

  open(componentName: any) {
    const page: NavigationPage = this.pages.find(findByComponentName(componentName));
    if (!page) {
      throw new Error(`Page (${componentName ? componentName.toString() : 'Unknow'}) not found in NavigationProvider@pages.`);
    }
    this.openNotifier.next(page);
  }

}
