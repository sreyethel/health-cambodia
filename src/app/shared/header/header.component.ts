import { Component, OnInit } from '@angular/core';
import { Adstore } from 'src/app/stores/ads.store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public ads:Adstore
  ) { }

  ngOnInit() {
    this.ads.fetchTopHeaderAd();
  }

}
