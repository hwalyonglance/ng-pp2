import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

// import { ServerPrebootModule } from 'preboot/server';

import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { Pp2Module } from './pp2.module';
import { Pp2Component } from './pp2.component';

var eventSelectors = [
	// for recording changes in form elements
	{ selector: '*', events: [
						'keypress', 'keyup', 'keydown', 'input', 'change', 'focus', 'drop',
						'focusin', 'focusout', 'mousedown', 'mouseup', 'click', 'submit',
						'beforeunload', 'blur', 'close', 'copy', 'cut', 'dblclick', 'drag',
						'error', 'load', 'mousemove', 'mouseleave', 'mouseout', 'mouseover',
						'offline', 'online', 'paste', 'pointerdown', 'pointerup', 'push',
						'pointermove', 'pointerleave', 'pointerout', 'pointerover',
						'progress', 'resize', 'select', 'unload', 'success', 'scroll'
					] },
	{ selector: 'select,option', events: ['change'] },
	// when user hits return button in an input box
	{ selector: 'input', events: ['keyup'], preventDefault: true, keyCodes: [13], freeze: true },
	// when user submit form (press enter, click on button/input[type="submit"])
	{ selector: 'form', events: ['submit'], preventDefault: true, freeze: true },
	// for tracking focus (no need to replay)
	{ selector: 'input,textarea', events: ['focusin', 'focusout', 'mousedown', 'mouseup'], noReplay: true },
	// user clicks on a button
	{ selector: 'button', events: ['click'], preventDefault: true, freeze: true }
];

@NgModule({
	imports: [
		Pp2Module,
		ServerModule,
		ModuleMapLoaderModule,
		// ServerPrebootModule.recordEvents({
		// 	appRoot: 'app-root',
		// 	eventSelectors
		// })
	],
	providers: [],
	bootstrap: [Pp2Component]
})
export class Pp2ServerModule { }
