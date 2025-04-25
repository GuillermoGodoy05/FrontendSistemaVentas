import { ApplicationConfig, provideZoneChangeDetection, InjectionToken } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { environment } from '../environments/environment'; // Importa el objeto environment

import { provideHttpClient } from '@angular/common/http'; // Importa provideHttpClient

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    { provide: 'env', useValue: environment }, // Proporciona la configuración
    provideHttpClient(),
  ]
};

