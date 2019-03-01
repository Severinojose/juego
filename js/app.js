
// Titulo Match Game (cambio de color)
$(document).ready(function(){
	setInterval(function(){
    animateForever();
});
});


function animateForever(){
  var div = $('.main-titulo');
  var color1 = '#A333FF';
  var color2 = '#3BD6C6';
  
  div.animate({color: color1}, 500);
  div.animate({color: color2}, 500);
  
    
}

//****** variables*****//
var tp=0;
var i=0;
var contador=0;
var parada=0;
var puntos=0;
var mov=0;
var min=2;
var seg=0;
var MAX=0;
var MZ=0;
var INT=0;
var BORRAR=0;
var nuevosDulces=0;
var LC=["","","","","","",""];
var LS=["","","","","","",""];


 
  
//****** INICIAR JUEGO*****//

$(".btn-reinicio").click(function(){
	i=0;
	puntos=0;
	mov=0;
	$(".panel-puntos").css("width","25%");
	$(".panel-tablero").show();
	$(".time").show();
	$("#puntos-text").html("0");
	$("#movimientos-text").html("0");
	$(this).html("Reiniciar")
	clearInterval(INT);
	clearInterval(BORRAR);
	clearInterval(nuevosDulces);
	clearInterval(tp);
	min=2;
	seg=0;
	borrartotal();
	INT=setInterval(function(){
		desplazamiento()
	},500);
	tp=setInterval(function(){
		timer()
	},1000);
});


//******CRONOMETRO*****//

function timer(){
	if(seg!=0){
		seg=seg-1;}
	if(seg==0){
		if(min==0){
			clearInterval(BORRAR);
			clearInterval(nuevosDulces);
			clearInterval(INT);
			clearInterval(tp);
			$(".panel-tablero").hide("drop","slow",funcioncita);
			$(".time").hide();}
		seg=59;
		min=min-1;}
	$("#timer").html("0"+min+":"+seg);
};

//******COMENZAR JUEGO CON DULCES*****//

function desplazamiento(){
	i=i+1
	var numero=0;
	var imagen=0;
	$(".elemento").draggable({disabled:true});
	if(i<8){
		for(var j=1;j<8;j++){
			if($(".col-"+j).children("img:nth-child("+i+")").html()==null){
				numero=Math.floor(Math.random()*4)+1;
				imagen="image/"+numero+".png";
				$(".col-"+j).prepend("<img src="+imagen+" class='elemento'/>").css("justify-content","flex-start")
			}}}
	if(i==8){
	clearInterval(INT);
	BORRAR=setInterval(function(){
		BORRARhorver()
	},150);}
};

//******LIMPIAR TODO*****//

function borrartotal(){
	for(var j=1;j<8;j++){
		$(".col-"+j).children("img").detach();}
};


//******MOVIMIENTOS Y PUNTOS*****//

function funcioncita(){
	$( ".panel-puntos" ).animate({width:'100%'},3000);
};



//******BORRAR DULCES*****//

function BORRARhorver(){
	MZ=0;
	HD=horizontal();
	BV=vertical();
	for(var j=1;j<8;j++){
		MZ=MZ+$(".col-"+j).children().length;}

//******FUNCION VOLVER A COMPLETAR EL JUEGO*****//

	if(HD==0 && BV==0 && MZ!=49){
		clearInterval(BORRAR);
		ND=0;
		nuevosDulces=setInterval(function(){
			nuevosdulces()
		},600);}

	if(HD==1||BV==1){
		$(".elemento").draggable({disabled:true});
		$("div[class^='col']").css("justify-content","flex-end");
		$(".activo").hide("pulsate",1000,function(){
			var puntostmp=$(".activo").length;
			$(".activo").remove("img");
			puntos=puntos+puntostmp*10;
			$("#puntos-text").html(puntos);
		});
	}
	if(HD==0 && BV==0 && MZ==49){
		$(".elemento").draggable({
			disabled:false,
			containment:".panel-tablero",
			revert:true,
			revertDuration:0,
			snap:".elemento",
			snapMode:"inner",
			snapTolerance:40,
			start:function(event,ui){
				mov=mov+1;
				$("#movimientos-text").html(mov);}
		});
	}
	$(".elemento").droppable({
		drop:function (event,ui){
			var dropped=ui.draggable;
			var droppedOn=this;
			parada=0;
			do{
				parada=dropped.swap($(droppedOn));}
			while(parada==0);
			HD=horizontal();
			BV=vertical();
			if(HD==0 && BV==0){
				dropped.swap($(droppedOn));}
			if(HD==1 || BV==1){
				clearInterval(nuevosDulces);
				clearInterval(BORRAR);
				BORRAR=setInterval(function(){
					BORRARhorver()
				},150);}},
	});
};

//******INTERCAMBIO DE DULCES*****//

jQuery.fn.swap=function(b){
	b=jQuery(b)[0];
	var a=this[0];
	var t=a.parentNode.insertBefore(document.createTextNode(''),a);
	b.parentNode.insertBefore(a,b);
	t.parentNode.insertBefore(b,t);
	t.parentNode.removeChild(t);
	return this;
};



//******BUSQUEDA HORIZONTAL DULCES*****//

function horizontal(){
	var busHori=0;
	for(var j=1;j<8;j++){
		for(var k=1;k<6;k++){
			var res1=$(".col-"+k).children("img:nth-last-child("+j+")").attr("src");
			var res2=$(".col-"+(k+1)).children("img:nth-last-child("+j+")").attr("src");
			var res3=$(".col-"+(k+2)).children("img:nth-last-child("+j+")").attr("src");
			if((res1==res2) && (res2==res3) && (res1!=null) && (res2!=null) && (res3!=null)){
				$(".col-"+k).children("img:nth-last-child("+(j)+")").attr("class","elemento activo");
				$(".col-"+(k+1)).children("img:nth-last-child("+(j)+")").attr("class","elemento activo");
				$(".col-"+(k+2)).children("img:nth-last-child("+(j)+")").attr("class","elemento activo");
				busHori=1;
			}
		}
	}
	return busHori;
};

//******BUSQUEDA VERTICAL DULCES*****//

function vertical(){
	var busVerti=0;
	for(var l=1;l<6;l++){
		for(var k=1;k<8;k++){
			var res1=$(".col-"+k).children("img:nth-child("+l+")").attr("src");
			var res2=$(".col-"+k).children("img:nth-child("+(l+1)+")").attr("src");
			var res3=$(".col-"+k).children("img:nth-child("+(l+2)+")").attr("src");
			if((res1==res2) && (res2==res3) && (res1!=null) && (res2!=null) && (res3!=null)){
				$(".col-"+k).children("img:nth-child("+(l)+")").attr("class","elemento activo");
				$(".col-"+k).children("img:nth-child("+(l+1)+")").attr("class","elemento activo");
				$(".col-"+k).children("img:nth-child("+(l+2)+")").attr("class","elemento activo");
				busVerti=1;
			}
		}
	}
	return busVerti;
};

//******NUEVOS DULCES*****//

function nuevosdulces(){
	$(".elemento").draggable({disabled:true});
	$("div[class^='col']").css("justify-content","flex-start")
	for(var j=1;j<8;j++){
		LC[j-1]=$(".col-"+j).children().length;}
	if(ND==0){
		for(var j=0;j<7;j++){
			LS[j]=(7-LC[j]);}
		MAX=Math.max.apply(null,LS);
		contador=MAX;}
	if(MAX!=0){
		if(ND==1){
			for(var j=1;j<8;j++){
				if(contador>(MAX-LS[j-1])){
					$(".col-"+j).children("img:nth-child("+(LS[j-1])+")").remove("img");}}
		}
		if(ND==0){
			ND=1;
			for(var k=1;k<8;k++){
				for(var j=0;j<(LS[k-1]-1);j++){
					$(".col-"+k).prepend("<img src='' class='elemento' style='visibility:hidden'/>");}}
		}
		for(var j=1;j<8;j++){
			if(contador>(MAX-LS[j-1])){
				numero=Math.floor(Math.random()*4)+1;
				imagen="image/"+numero+".png";
				$(".col-"+j).prepend("<img src="+imagen+" class='elemento'/>");}
		}
	}
	if(contador==1){
		clearInterval(nuevosDulces);
		BORRAR=setInterval(function(){
			BORRARhorver()
		},150);
	}
	contador=contador-1;
};