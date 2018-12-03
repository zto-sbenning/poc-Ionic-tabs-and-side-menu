import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Sample3Page } from './sample3';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    Sample3Page,
  ],
  imports: [
    IonicPageModule.forChild(Sample3Page),
    ComponentsModule,
  ],
})
export class Sample3PageModule {}
