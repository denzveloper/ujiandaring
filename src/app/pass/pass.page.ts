import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-pass',
  templateUrl: './pass.page.html',
  styleUrls: ['./pass.page.scss'],
})
export class PassPage implements OnInit {

  public detail: any;
  public loaded;
  form = {
    pasb: '',
    pasn: '',
    pasc: '',
  }

  constructor(
    private store: Storage,
    private menu: MenuController,
    private nav: NavController,
  ) { 
    this.menu.enable(true);
  }

  ngOnInit() {
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

}
