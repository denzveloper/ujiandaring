import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-soal',
  templateUrl: './soal.page.html',
  styleUrls: ['./soal.page.scss'],
})
export class SoalPage implements OnInit {

  public soal: any;
  private x: any;
  public y: any;

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
      }else{
        this.store.get('num').then((num) => {
          this.x = num;
        });
        this.y = this.x++;
        console.log(this.y);
        console.log(this.x);
        this.store.get('user').then((user) => {
          var obj = {};
          obj = user.soal;
          this.soal = obj[this.x];
        });
      }
    });
  }

  next(){
    this.x++;
    if(this.soal.x != null){
      this.store.set('num', this.x);
      this.nav.navigateRoot('/soal');
    }else{
      this.nav.navigateRoot('/nilai');
    }
  }

  back(){
    this.x--;
    if(this.soal.x != null){
      this.store.set('num', this.x);
      this.nav.navigateRoot('/soal');
    }
  }

}
