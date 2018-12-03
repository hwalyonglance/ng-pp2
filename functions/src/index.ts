import * as bodyParser from 'body-parser';
import * as functions from 'firebase-functions';
import * as express from 'express';

import { enableProdMode } from '@angular/core';

import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { writeFileSync } from 'fs';
import { join, normalize } from 'path';
import { tmpdir } from 'os';

enableProdMode();

const app = express();

app.use((req, res, next) => {
	res.set({
		'Access-Control-Allow-Headers': '*',
		'Access-Control-Allow-Methods': 'POST,GET,PUT,DELETE',
		'Access-Control-Allow-Origin': '*'
	})
	next()
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const { Pp2ServerModuleNgFactory, Pp2ServerModule, LAZY_MODULE_MAP } = require('./main.bundle');

import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

function generatePDF(req, res) {

}

app.post('generate/pdf', generatePDF)

app.engine('html', ngExpressEngine({
	bootstrap: Pp2ServerModuleNgFactory,
	providers: [
		provideModuleMap(LAZY_MODULE_MAP)
	]
}));

app.set('view engine', 'html');
app.set('views', join(__dirname, '..', 'public'));

export const main = functions.https.onRequest(app);
