
// SI SOPORTA "serviceWorker" in navigator
if( 'serviceWorker' in navigator)
{	
	window.addEventListener('load',()=>
	{
		navigator.serviceWorker.register('./scripts/sw.js')
			.then( registration =>
			{
				console.log("ServiceWorker Registrado! <3")
			})
			.catch( error =>
			{
				console.log(error)
			})
	})
}

if( window.Notification && Notification.permission !== 'denied' )
{
	if(Notification.permission !== 'granted')
	{
		Notification.requestPermission(status => 
		{
			alert("Notifications:", status)
		})
	}
}

const NotificationTest = ()=>
{
	alert("Hello?")
	let n = new Notification("Sample Notification Title!",
	{
		body:"Sample Body Content!",
		icon:"./img/favicon-96x96.png"
	})
}
