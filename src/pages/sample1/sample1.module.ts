import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Sample1Page } from './sample1';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    Sample1Page,
  ],
  imports: [
    IonicPageModule.forChild(Sample1Page),
    ComponentsModule,
  ],
})
export class Sample1PageModule {}
