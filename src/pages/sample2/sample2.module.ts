import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Sample2Page } from './sample2';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    Sample2Page,
  ],
  imports: [
    IonicPageModule.forChild(Sample2Page),
    ComponentsModule,
  ],
})
export class Sample2PageModule {}
