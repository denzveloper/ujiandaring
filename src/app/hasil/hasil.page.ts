import { MenuController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-hasil',
  templateUrl: './hasil.page.html',
  styleUrls: ['./hasil.page.scss'],
})
export class HasilPage implements OnInit {
  public hasil: any;

  constructor(
    private menu: MenuController,
    private store: Storage,
    private nav: NavController,
  ) {
    this.menu.enable(false);
  }

  ngOnInit() {
    this.store.get('user').then(user => {
      this.store.get('hasil').then(data => {
      if(user == null || data == null){
        this.nav.navigateRoot('/login');
      }else{
        this.store.get('hasil').then((data) => {
          this.hasil = data;
        });
        this.store.remove('soal');
        this.store.remove('times');
        this.store.get('user').then((data) => {
          var temp = {
            detail: data.detail,
            soal: null
          };
          this.store.set('user', temp);
        });
      }
    });
    });
  }

  gohome(){
    this.nav.navigateRoot('/home');
  }

}
