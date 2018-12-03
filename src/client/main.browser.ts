import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { Pp2Module } from './app/pp2.module';
import { environment } from './environments/environment';

import 'hammerjs';

if (environment.production) {
	enableProdMode();
}

declare var require: any;

document.getElementById('mat-core-theme').innerHTML = require('./assets/scss/custom-theme.scss');
platformBrowserDynamic().bootstrapModule(Pp2Module)
	.catch(err => console.log(err));

window.document.addEventListener('PrebootComplete', () => {
	// put your code here that you want to run once preboot is complete
});