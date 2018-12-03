import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Observable } from 'rxjs';
import { NavigationPage, NavigationProvider } from '../providers/navigation/navigation';
import { TabsPage } from '../pages/tabs/tabs';
import { map } from 'rxjs/operators';

const sortPages = (page1: NavigationPage, page2: NavigationPage) => page1.sideMenuIndex - page2.sideMenuIndex;
const mapSort = (pages: NavigationPage[]) => pages.sort(sortPages);

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = TabsPage;

  pages$: Observable<NavigationPage[]> = this.navigationProvider.pagesList$.pipe(map(mapSort));

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public navigationProvider: NavigationProvider
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page: NavigationPage) {
    this.navigationProvider.openPage(page.componentName);
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // this.nav.setRoot(page.component);
  }
}
