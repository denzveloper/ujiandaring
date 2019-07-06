import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MenuController, NavController, ToastController, AlertController } from '@ionic/angular';

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
    private toast: ToastController,
    private alertController: AlertController
  ) {
    this.menu.enable(false);
  }

  async presentAlert() {
    let choice
    const alert = await this.alertController.create({
        header: "Konfirmasi",
        message: "Ujian selesai?",
        buttons: [{
            text: 'Ya',
            handler: () => {
                alert.dismiss(true)
                return false
            }
        }, {
            text: 'Belum',
            handler: () => {
                alert.dismiss(false);
                return false;
            }
        }]
    });

    await alert.present();
    await alert.onDidDismiss().then((data) => {
        choice = data
    })
    return choice;
  }

  async toastmsg() {
    const toast = await this.toast.create({
      message: 'Sudah Disoal Pertama',
      duration: 1500,
      position: "top",
      mode: "md",
      color: "dark",
      showCloseButton: true
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
      this.presentAlert().then((res) => {
        if(res.data){
          this.nav.navigateRoot('/hasil');
        }
      });
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
    this.presentAlert().then((res) => {
      console.log(res);
      if(res.data){
        this.nav.navigateRoot('/hasil');
      }
    });
  }

}
