import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private storage: Storage,
    private menu: MenuController,
    private nav: NavController
  ) {
    this.menu.enable(true);
  }

  ngOnInit(){
    this.storage.get('user').then(user => {
      if(user == null){
        this.nav.navigateRoot('/login');
      }
    });
  }

  
}
