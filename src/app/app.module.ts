import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { MaqueeComponent } from './shared/maquee/maquee.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AdvComponent } from './shared/adv/adv.component';
import { HomeComponent } from './pages/home/home.component';
import { DetailComponent } from './pages/detail/detail.component';
import { ConcateComponent } from './pages/concate/concate.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './shared/nav/nav.component';
import { SlideComponent } from './shared/slide/slide.component';
import { RightsideComponent } from './shared/rightside/rightside.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { MaterialModule } from './modules/material';
import { APP_STORES } from './stores/app.store';
import { StrHtmlPipe } from './pipes/str-html.pipe';
import { ToCalendarPipe } from './pipes/to-calendar.pipe';
import { CondatePipe } from './pipes/condate.pipe';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MetaModule, MetaLoader, MetaStaticLoader, PageTitlePositioning } from '@ngx-meta/core';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { TrustHtmlPipe } from './pipes/trust-html.pipe';
import { DocRefPipe } from './pipes/doc-ref.pipe';
import { AngularResizedEventModule } from 'angular-resize-event';
import { TrustStylePipe } from './pipes/trust-style.pipe';

export function metaFactory(): MetaLoader {
  return new MetaStaticLoader({
    pageTitlePositioning: PageTitlePositioning.PrependPageTitle,
    pageTitleSeparator: ' - ',
    applicationName: 'Business Healthy',
    defaults: {
      title: 'Business Healthy ',
      'og:image': '../../src/assets/img/Khmer-Family.png',
      description: 'Cambodia most reliable health website aiming to help Cambodian people spend less and live more out of life.',
      'og:type': 'website',

    }
  });
}

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    MaqueeComponent,
    HeaderComponent,
    FooterComponent,
    AdvComponent,
    HomeComponent,
    DetailComponent,
    ConcateComponent,
    NavComponent,
    SlideComponent,
    RightsideComponent,
    StrHtmlPipe,
    ToCalendarPipe,
    CondatePipe,
    TrustHtmlPipe,
    DocRefPipe,
    TrustStylePipe,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    InfiniteScrollModule,
    AngularFireModule.initializeApp(environment.firebase, 'my-app-name'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    CarouselModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,

    MetaModule.forRoot({
      provide: MetaLoader,
      useFactory: (metaFactory)
    }),
    AngularResizedEventModule

  ],
  providers: [APP_STORES],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ?
      'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);
  }
}
