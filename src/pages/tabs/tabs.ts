import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';
import { NavigationProvider, NavigationPage } from '../../providers/navigation/navigation';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const sortPages = (page1: NavigationPage, page2: NavigationPage) => page1.tabsBarIndex - page2.tabsBarIndex;
const mapSort = (pages: NavigationPage[]) => pages.sort(sortPages);

const logIt = (pages: NavigationPage[]) => console.log('Got pages: ', pages);

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  // Get Tabs reference for it's select method
  @ViewChild(Tabs) tabs: Tabs;

  // Pages with TabBar Entry
  pages$: Observable<NavigationPage[]> = this.navigationProvider.tabsBarPages$.pipe(map(mapSort));

  // For handling the hidden nav-stack (the one for all hidden page)
  openPageHasNoTabsEntry: boolean;
  pageWithoutTabsEntry: NavigationPage;

  openPage$: Observable<NavigationPage> = this.navigationProvider.openPage$;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public navigationProvider: NavigationProvider,
    public changeDetection: ChangeDetectorRef
  ) {
    this.openPage$.subscribe((page: NavigationPage) => {
      if (page.hasTabsBarEntry) {
        this.tabs.select(page.tabsBarIndex + 1);
        this.pageWithoutTabsEntry = undefined;
        this.openPageHasNoTabsEntry = false;
      } else {
        this.pageWithoutTabsEntry = page;
        this.openPageHasNoTabsEntry = true;
        this.changeDetection.detectChanges();
        this.tabs.select(0);
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
