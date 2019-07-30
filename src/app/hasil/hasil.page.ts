import { MenuController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-hasil',
  templateUrl: './hasil.page.html',
  styleUrls: ['./hasil.page.scss'],
})
export class HasilPage implements OnInit {

  constructor(
    private menu: MenuController,
    private store: Storage,
    private nav: NavController,
  ) {
    this.menu.enable(false);
  }

  ngOnInit() {
    this.store.remove('user');
  }

}
