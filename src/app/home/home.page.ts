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
  public readysoal: any = false;
  public hasil: boolean = false;

  constructor(
    private store: Storage,
    private menu: MenuController,
    private nav: NavController
  ) {
    this.menu.enable(true);
  }

  ngOnInit(){
    console.log(Math.floor(Date.now() / 1000));
    this.store.get('user').then(async (user) => {
      if(user == null){
        this.nav.navigateRoot('/login');
      }else{
        await this.store.get('times').then(async (time)=>{
          console.log("waktu"+time);
          if(time!=null){this.nav.navigateRoot('/soal');}
        });
        this.detail = user.detail;
        this.readysoal = user.data_soal;
        this.store.get('hasil').then((user) => {
          if(user == null){
            this.hasil = false;
          }else{
            this.hasil = true;
          }
        });
      }
    });
  }

  beginexam(){
    this.nav.navigateRoot('/soal');
  }

  showhasil(){
    this.nav.navigateRoot('/hasil');
  }
  
}