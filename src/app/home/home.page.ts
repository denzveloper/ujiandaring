import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public detail: any;

  constructor(
    private store: Storage,
    private menu: MenuController,
    private nav: NavController
  ) {
    this.menu.enable(true);
  }

  ngOnInit(){
    this.store.get('user').then(user => {
      if(user == null){
        this.nav.navigateRoot('/login');
      }else{
          this.store.get('user').then((user) => {
            this.detail = user.detail;
          });
      }
    });
  }

  beginexam(){
    this.nav.navigateRoot('/soal');
  }
  
}
