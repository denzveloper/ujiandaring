import { MenuController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

  public detail: any;
  public loaded: boolean = false;

  constructor(
    private store: Storage,
    private menu: MenuController,
    private nav: NavController,
    private router: Router
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

  pass(){
    // if(th)
    this.router.navigate(['/pass']);
  }

}
