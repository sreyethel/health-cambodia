import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl, FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { debounceTime, tap, switchMap } from "rxjs/operators";
import { AngularFirestore } from '@angular/fire/firestore';
import { AutoCompleteStore } from 'src/app/stores/autocompleted.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  searchTextBox = new FormControl("", []);
  searchData: any;
  process: boolean = true;
  item: any;
  formcontent: FormGroup
  top_view: any;

  form: FormGroup;
  search: AbstractControl;
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
    private autoStore: AutoCompleteStore,
    private fb: FormBuilder,
    private af: AngularFirestore,
    private router:Router
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      search: [null]
    });
   //search
   this.search = this.form.controls["search"];
   this.search.valueChanges
     .pipe(
       debounceTime(300),
       tap(() => false),
       switchMap(value =>
         this.autoStore.fetchSearch("content", "name", value, data => {
           if (data) {
             this.searchData = data;
           }
         })
       )
     )
     .subscribe(res => { });
  } // end ngOnInit
  

  displayItem(item: any): string {
    return item ? item.name : item;
  }

  selectionChange(event) {
    const { value } = event.option;
  }

  togglesidebar() {
    let body = document.getElementsByClassName("page-wrapper")[0];
    body.classList.toggle("toggled-sidebar");
  }
  scrollToTop() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 1)); // calculate for speed of scrolling 
      }
    })();
  }


  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }


  
  goDetail(slug){
    this.router.navigate(['detail/'+slug]);
  }
  

}
