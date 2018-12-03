import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

/**
 * Generated class for the HeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent {
  
  @Input() isPushed: boolean;
  @Input() title: string;

  constructor(public navCtrl: NavController) {
    console.log('Hello HeaderComponent Component');
  }

  goBack() {
    if (this.navCtrl.canGoBack) {
      this.navCtrl.pop();
    }
  }

}
