import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';
import { NavigationProvider, NavigationPage } from '../../providers/navigation/navigation';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const sortPages = (page1: NavigationPage, page2: NavigationPage) => page1.tabsBarIndex - page2.tabsBarIndex;
const mapSort = (pages: NavigationPage[]) => pages.sort(sortPages);

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  // Get Tabs reference for it's select method
  @ViewChild(Tabs) tabs: Tabs;

  pagesList$: Observable<NavigationPage[]> = this.navigationProvider.pagesList$.pipe(map(mapSort));
  openPageActions$: Observable<NavigationPage> = this.navigationProvider.openPageActions$;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public navigationProvider: NavigationProvider,
    public changeDetection: ChangeDetectorRef
  ) {
    this.openPageActions$.subscribe((page: NavigationPage) => {
      this.tabs.select(page.tabsBarIndex);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
