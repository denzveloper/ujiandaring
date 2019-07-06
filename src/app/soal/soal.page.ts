import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MenuController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-soal',
  templateUrl: './soal.page.html',
  styleUrls: ['./soal.page.scss'],
})
export class SoalPage implements OnInit {

  public soal: any;
  public x: any;
  public y: any;
  public obj = {};

  constructor(
    private menu: MenuController,
    private store: Storage,
    private nav: NavController,
    private toast: ToastController
  ) {
    this.menu.enable(false);
  }

  async toastmsg() {
    const toast = await this.toast.create({
      message: 'Kamu sudah disoal pertama',
      duration: 2000,
      position: "top"
    });
    toast.present();
  }

  ngOnInit() {
    this.store.get('user').then(user => {
      if(user == null){
        this.nav.navigateRoot('/login');
      }else{
        this.x = parseInt(localStorage.getItem("num"));
        this.y = this.x+1;
        this.store.get('user').then((user) => {
          this.obj = user.soal;
          this.soal = this.obj[this.x];
        });
      }
    });
  }

  next(){
    var tmp = this.x+1;
    console.log(this.x);
    if(this.obj[tmp] != null){
      console.log("show a:"+tmp);
      this.x = this.x+1;
      localStorage.setItem('num', this.x.toString());
      this.ngOnInit();
    }else{
      this.nav.navigateRoot('/nilai');
    }
  }

  back(){
    var tmp = this.x-1;
    console.log(this.x);
    if(this.obj[tmp] != null){
      console.log("show a:"+tmp);
      this.x = this.x-1;
      localStorage.setItem('num', this.x.toString());
      this.ngOnInit();
    }else{
      this.toastmsg();
    }
  }

  finish(){
    this.nav.navigateRoot('/nilai');
  }

}
