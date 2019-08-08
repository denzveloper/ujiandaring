import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MenuController, NavController, AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-pass',
  templateUrl: './pass.page.html',
  styleUrls: ['./pass.page.scss'],
})
export class PassPage implements OnInit {
  form = {
    pasb: '',
    pasn: '',
    pasc: '',
  }

  isLoading = false;
  data: any;

  constructor(
    private store: Storage,
    private menu: MenuController,
    private nav: NavController,
    private route: Router,
    private alert: AlertController,
    private toast: ToastController,
    private auth: AuthService,
    private loading: LoadingController,
  ) { 
    this.menu.enable(false);
  }

  ngOnInit() {
    this.store.get('user').then(async user => {
      if(user == null){
        this.nav.navigateRoot('/login');
      }
    });
  }

  back(){
    this.route.navigate(['/profil']);
  }

  gantimodal(){
    this.presentAlert().then((res) =>{
      if(res.data){
        this.auth.doupasw(this.form).subscribe(data => {
          this.data = data;
          if(this.data.meta.status == 200){
            this.presentLoadingDiss();
            this.store.set('hasil', this.data.data);
            this.nav.navigateRoot('/hasil');
          }else{
            this.presentLoadingDiss();
            this.Alert({
              header: "Error",
              message: this.data.meta.message
            });
          }
        }, error => {
          this.presentLoadingDiss();
          this.Alert({
            header: "Error",
            message: "Tidak dapat koneksi ke server!"
          });
          console.log(error);
        });
      }else{
        this.form.pasb = '';
        this.form.pasn = '';
        this.form.pasc = '';
        this.toastmsg("Kambali ke pengaturan profil");
        this.route.navigate(['/profil']);
      }
    });
  }

  async presentAlert() {
    let choice
    const alert = await this.alert.create({
        header: "Konfirmasi",
        message: "Yakin Ganti?",
        buttons: [{
            text: 'Ya',
            handler: () => {
                alert.dismiss(true)
                return false
            }
        }, {
            text: 'Tidak',
            handler: () => {
                alert.dismiss(false);
                return false;
            }
        }]
    });
    await alert.present();
    await alert.onDidDismiss().then((data) => {
      choice = data;
    });
    return choice;
  }

  async toastmsg(msg) {
    const toast = await this.toast.create({
      message: msg,
      duration: 2000,
      mode: "md",
      closeButtonText: "X",
      showCloseButton: true,
      color: "dark",
      translucent: true,
    });
    toast.present();
  }

  async Alert(msg) {
    const alert = await this.alert.create({
      header: msg.header,
      message: msg.message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentLoading() {
    this.isLoading = true;
    return await this.loading.create({
      translucent: true,
      keyboardClose: false,
      spinner: 'crescent',
      message: "Loading"
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async presentLoadingDiss() {
    this.isLoading = false;
    return await this.loading.dismiss().then(() => console.log('dismissed'));
  }
}
