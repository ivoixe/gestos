var app= {
	inicio:function(){
		this.iniciarBotones();
		this.iniciarFastClick();
		this.iniciarHammer();
	},
	iniciarBotones:function(){
		var btnClaro = document.querySelector('#claro');
		var btnOscuro = document.querySelector('#oscuro');
		btnClaro.addEventListener('click',app.ponloClaro,false);
		btnOscuro.addEventListener('click',app.ponloOscuro,false);
	},
	iniciarFastClick:function(){
		FastClick.attach(document.body);
	},
	iniciarHammer:function(){
		var zona = document.getElementById('zona-gestos');/*esta es la zona la que va actuar el hammer*/
		var hammertime = new Hammer(zona);
		/* Para quitar la clase que añadimos cuando acaba la animacion */
		zona.addEventListener('webkitAnimationEnd' ,function(e){
			zona.className="";
		});
		/*por defecto estan desactivados el pinch y rotate*/
		hammertime.get('pinch').set({enable: true});
		hammertime.get('rotate').set({enable: true});
		/*vamos a quitar pan y pinch poque enmascara a swipe y rotate*/
		hammertime.on('tap doubletap  swipe press  rotate', function(ev){
			/*ev tambien tiene info de cooredenadas , speed tec..*/
			document.querySelector('#info').innerHTML = ev.type+'!';
		});
		/*con esto activamos el css keyframes******************************/
		hammertime.on('doubletap', function(ev){
			zona.className="doubletap";
		});
		hammertime.on('press', function(ev){
			zona.className="press";
		});
		hammertime.on('swipe', function(ev){
			
			var clase="";
			/*direccion del swipe es con numero  */
			var direccion= ev.direction;
			if(direccion == 4){
				clase="swipe-derecha";
			}
			if(direccion == 2){
				clase="swipe-izquierda";
			}
			zona.className=clase;
			document.querySelector('#info').innerHTML = direccion;
		});
		hammertime.on('rotate', function(ev){
			var umbral= 25;
			if(ev.distance > umbral) zona.className = "rotate";
			
		});
		
	},
	ponloClaro :function(){
		 document.body.className ="claro";
	},
	ponloOscuro :function(){
		 document.body.className ="oscuro";
	}
};
if('addEventListener' in document){
	
	document.addEventListener('DOMContentLoaded', function(){
			FastClick.attach(document.body);
			app.inicio();
		}, false);
	
}