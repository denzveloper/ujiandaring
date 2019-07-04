import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-soal',
  templateUrl: './soal.page.html',
  styleUrls: ['./soal.page.scss'],
})
export class SoalPage implements OnInit {

  constructor(
    private menu: MenuController,
    private store: Storage,
    private nav: NavController
  ) {
    this.menu.enable(false);
  }

  ngOnInit() {
    this.store.get('user').then(user => {
      if(user == null){
        this.nav.navigateRoot('/login');
      }
    });
  }

  next(){
    //
  }

  back(){
    //
  }

}
