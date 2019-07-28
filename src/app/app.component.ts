import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public detail: any;
  public appPages = [
    {
      title: 'Ujian',
      url: '/home',
      icon: 'ios-paper'
    },
    {
      title: 'Akun',
      url: '/pass',
      icon: 'ios-contact'
    },
    {
      title: 'About',
      url: '/list',
      icon: 'ios-information-circle'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private store: Storage,
    private nav: NavController,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#ffffff');
      this.splashScreen.hide();
    });
    this.store.get('user').then((user) => {
      this.detail = user.detail;
    });
  }

  logout(){
    console.log('Loging out');
    this.store.remove('user');
    this.nav.navigateRoot('/login');
  }
}
