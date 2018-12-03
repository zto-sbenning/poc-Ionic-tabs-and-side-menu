import { Injectable } from '@angular/core';
import { HomePage } from '../../pages/home/home';
import { ListPage } from '../../pages/list/list';
import { Sample1Page } from '../../pages/sample1/sample1';
import { Sample3Page } from '../../pages/sample3/sample3';
import { Sample2Page } from '../../pages/sample2/sample2';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

export interface NavigationPage {
  componentName: any;
  displayName: string;
  displayIcon?: string;
  data?: any;
  sideMenuIndex?: number;
  tabsBarIndex?: number;
  showInSideMenu?: boolean;
  showInTabsBar?: boolean;
}

const findByComponentName = (componentName: any) => (page: NavigationPage) => page.componentName === componentName;

/*
  Generated class for the NavigationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NavigationProvider {

  private pages: NavigationPage[] = [
    {componentName: HomePage, displayName: 'Home', displayIcon: 'home', sideMenuIndex: 0, tabsBarIndex: 0, showInSideMenu: true, showInTabsBar: true},
    {componentName: ListPage, displayName: 'List', displayIcon: 'home', sideMenuIndex: 1, tabsBarIndex: 1, showInSideMenu: true, showInTabsBar: true},
    {componentName: Sample1Page, displayName: 'Sample 1', displayIcon: 'add', sideMenuIndex: 2, tabsBarIndex: 2, showInSideMenu: true, showInTabsBar: true},
    {componentName: Sample2Page, displayName: 'Sample 2', displayIcon: 'alarm', sideMenuIndex: 3, tabsBarIndex: 3, showInSideMenu: false, showInTabsBar: true},
    {componentName: Sample3Page, displayName: 'Sample 3', displayIcon: 'add-circle', sideMenuIndex: 4, tabsBarIndex: 4, showInSideMenu: true, showInTabsBar: false},
  ];

  // Replay last emission to each new subscriber on subscription
  private pagesListNotifier: BehaviorSubject <NavigationPage[]>;
  // Subscribers get only emission that happens after it's subscription
  private openPageActionsNotifier: Subject <NavigationPage>;

  pagesList$: Observable<NavigationPage[]>;
  openPageActions$: Observable<NavigationPage>;

  constructor() {
    console.log('Hello NavigationProvider Provider');
    this.pagesListNotifier = new BehaviorSubject(this.pages);
    this.openPageActionsNotifier = new Subject;
    this.pagesList$ = this.pagesListNotifier.asObservable();
    this.openPageActions$ = this.openPageActionsNotifier.asObservable();
  }

  openPage(componentName: any) {
    const page: NavigationPage = this.pages.find(findByComponentName(componentName));
    if (!page) {
      throw new Error(`Page (${componentName ? componentName.toString() : 'Unknow'}) not found in NavigationProvider@pages.`);
    }
    this.openPageActionsNotifier.next(page);
  }

}
