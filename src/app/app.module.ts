import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NavigationProvider } from '../providers/navigation/navigation';
import { TabsPageModule } from '../pages/tabs/tabs.module';
import { Sample1PageModule } from '../pages/sample1/sample1.module';
import { Sample2PageModule } from '../pages/sample2/sample2.module';
import { Sample3PageModule } from '../pages/sample3/sample3.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    TabsPageModule,
    Sample1PageModule,
    Sample2PageModule,
    Sample3PageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NavigationProvider
  ]
})
export class AppModule {}
