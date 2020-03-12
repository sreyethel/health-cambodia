import { Component, OnInit, HostListener } from '@angular/core';
import { TopView } from '../../stores/topviews.store';
import { ActivatedRoute, Router } from '@angular/router';
import { Adstore } from 'src/app/stores/ads.store';

@Component({
  selector: 'app-rightside',
  templateUrl: './rightside.component.html',
  styleUrls: ['./rightside.component.scss']
})
export class RightsideComponent implements OnInit {
  showScroll: boolean;
  showScrollHeight = 300;
  hideScrollHeight = 10;
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
    public store:TopView,
    public route:ActivatedRoute,
    private router:Router,
    public ads:Adstore
  ) { }

  ngOnInit() {
    this.route.params.subscribe((param:any)=>{
      const { key } = param;
      if(param){
        this.store.getTopView(key);
      }else{
        this.store.getTopView();
      }
    });
    this.ads.fetchRightSideAd();
  }

  goDetail(slug){
    this.router.navigate(['detail/'+slug]);
  }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }


}
