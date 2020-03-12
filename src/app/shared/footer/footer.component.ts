import { Component, OnInit, HostListener } from '@angular/core';
import { Adstore } from '../../stores/ads.store';
import { ResizedEvent } from 'angular-resize-event';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  showScroll: boolean;
  showScrollHeight = 300;
  hideScrollHeight = 10;
  adHeight:number;
  // @HostListener('window:scroll')
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if ((window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) > this.showScrollHeight) {
      this.showScroll = true;
    }
    else if (this.showScroll && (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) < this.hideScrollHeight) {
      this.showScroll = false;
    }
  }
  constructor(
    public adsfooter:Adstore
  ) { }

  ngOnInit() {
    this.adsfooter.fetchFooterAd()
  }
  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  onAdReside(e: ResizedEvent){
    this.adHeight = e.newHeight;
  }

}
