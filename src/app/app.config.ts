import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withInMemoryScrolling} from '@angular/router';
import {routes} from './app.routes';
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {provideHttpClient} from "@angular/common/http";
import {provideTranslateService} from "@ngx-translate/core";
import {provideTranslateHttpLoader} from "@ngx-translate/http-loader";
import {provideMarkdown} from "ngx-markdown";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({eventCoalescing: true}),
    // scrollt beim Navigieren nach oben
    provideRouter(routes, withInMemoryScrolling({
      scrollPositionRestoration: 'top', // scrolls to top
    })),
    provideHttpClient(),
    provideAnimationsAsync(),
    // provideClientHydration(withEventReplay()),
    provideMarkdown(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/assets/i18n/',
        suffix: '.json'
      }),
      fallbackLang: 'en',
      lang: 'en'
    }),
    // {provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.recaptcha}
  ]
};
