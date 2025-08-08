import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {provideClientHydration, withEventReplay} from '@angular/platform-browser';
import {RECAPTCHA_V3_SITE_KEY} from 'ng-recaptcha';
import {environment} from '../environments/environment';
import {provideHttpClient} from "@angular/common/http";
import {provideTranslateService} from "@ngx-translate/core";
import {provideTranslateHttpLoader} from "@ngx-translate/http-loader";
import {provideMarkdown} from "ngx-markdown";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideClientHydration(withEventReplay()),
    provideMarkdown(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/assets/i18n/',
        suffix: '.json'
      }),
      fallbackLang: 'en',
      lang: 'en'
    }),
    {provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.recaptcha}
  ]
};
