let registration = undefined,
	isSubsscribed = undefined;
function registerServiceWorker() {
	if ('serviceWorker' in navigator && 'PushManager' in window) {
		navigator.serviceWorker
			.register('/sw.js')
			.then(reg => {
				registration = reg;
				initializeUI()
				swLog('Registration successful', registration);
				registration.onupdatefound = () => checkServiceWorkerStateChange();
			})
			.catch(e =>
				console.error('Error during service worker registration:', e)
			);
	} else {
		console.warn('Service Worker is not supported');
	}
}
function checkServiceWorkerStateChange() {
	const installingWorker = registration.installing;
	installingWorker.onstatechange = () => {
		switch (installingWorker.state) {
			case 'installed':
				if (navigator.serviceWorker.controller) {
					swLog('New or updated content is available', installingWorker);
				} else {
					swLog('Content is now available offline', installingWorker);
				}
				break;
			case 'redundant':
				console.error(
					'The installing service worker became redundant',
					installingWorker
				);
				break;
			default:
				swLog(installingWorker.state);
				break;
		}
	};
}
function initializeUI() {
	registration.pushManager.getSubscription().then(subscription => {
		isSubscribed = !(subscription === null);
		console.log(`User ${isSubscribed ? 'IS' : 'is NOT'} subscribed.`);
	});
}
function swLog(eName, e) {
	console.log('Service Worker - ' + eName);
	if (e) {
		console.log(e)
	}
}
const applicationServerPublicKey =
	'BNKV7LJ5IFajn46I7FWroeSCMKtyOQPAGguMCn_-mVfyVjr_pvvQn0lW_KMoOAMqEAd4qhFHZhG6GEsDTPSJJ8I';
function subscribeUser() {
	const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
	registration.pushManager
		.subscribe({
			userVisibleOnly: true,
			applicationServerKey: applicationServerKey
		})
		.then(subscription => {
			console.log('User is subscribed.');
			updateSubscriptionOnServer(subscription);
			isSubscribed = true;
		})
		.catch(err => {
			console.log('Failed to subscribe the user: ', err);
		});
}
function urlB64ToUint8Array(base64String) {
	const padding = '='.repeat((4 - base64String.length % 4) % 4);
	const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);
	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}
registerServiceWorker()
setTimeout(function () {
	subscribeUser()
}, 20000)
