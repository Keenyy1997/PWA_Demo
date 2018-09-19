
// SI SOPORTA "serviceWorker" in navigator
if( 'serviceWorker' in navigator)
{	
	window.addEventListener('load',()=>
	{
		navigator.serviceWorker.register('sw.js')
			.then( registration =>
			{
				console.log("Service Worker Installing")
			})
			.catch( error =>
			{
				console.log(error)
			})

		navigator.serviceWorker.ready.then(function(registration) {
           console.log('Service Worker Ready');
        })
	})
}

if( window.Notification && Notification.permission !== 'denied' )
{
	// if(Notification.permission !== 'granted')
	// {
		Notification.requestPermission(status => 
		{
			console.log(status)
		})
	// }
}

window.addEventListener('beforeinstallprompt',(event)=>
{
	event.prompt()
})

window.addEventListener('appinstalled',(event)=>
{
	alert("Gracias por instalar la app!")
})

const NotificationTest = () =>
{
	new Notification("Hi!")
}

function formatMoney(number) {
  return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}