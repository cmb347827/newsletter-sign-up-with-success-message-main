'use strict'; 

$(window).resize(function(){
	location.reload();
});

const primaryButton = document.querySelector('#btn-primary');
const email = document.querySelector('.email');
const confirmed = document.querySelector('.confirmed');
let check='';  let timer,timeoutVal=1000;

function enableButton(button){
	button.disabled = false;
}
function disableButton(button){
	button.disabled = true;
}

const onClick = (selector, handler1, handler2) => {
   document.querySelector(selector).addEventListener('click',handler1,false);
   document.querySelector(selector).addEventListener('click', handler2,false);
};


const hide = (event,element)=>{
	if(check){
	  event.preventDefault();
	  document.querySelector(element).style.display='none';
	}
}
const show = (event,element)=>{
	if(check){
	  event.preventDefault();
	  const text = document.createTextNode(email.value);
	  const a = document.createElement('a');
	  a.setAttribute('href', "mailto:email.value");
	  a.appendChild(text);
	  confirmed.appendChild(a);
	  document.querySelector(element).style.display='block';
	}
}

const reload = (event)=>{
	location.reload();
}
const keyUp = (event)=>{
	//The user may be done typing the email address , check to see if it's valid before enabling submit button
	window.clearTimeout(timer); // prevent errant multiple timeouts from being generated
    timer = window.setTimeout(() => {
       check = validateEmail(email);
	   //on check is true(valid email), enablebutton.
	   if(check){
		 enableButton(primaryButton);
		 $('.invalid-feedback').css('display','none');
		 $('input').removeClass('input-error');
	   }else{
		  disableButton(primaryButton);
		 $('.invalid-feedback').css('display','block');
		 $('input#inputEmail').removeClass('grey-input');
		 $('input#inputEmail').addClass('input-error');
	   }
    }, timeoutVal);
}
const keyPress =(event)=>{
	
	//The user may accidently delete part of the email after typing it, prevent submit even after button enabled
	window.clearTimeout(timer); // prevent errant multiple timeouts from being generated
	check = validateEmail(email);
	if(check){
	   $('.invalid-feedback').css('display','none');
	}else{
	   disableButton(primaryButton);
	}
}

$(window).on('load',function(){
	 
	 //User presses the disabled submit button , show error message.
	 $('.press').on('click',function(){
		 $('.invalid-feedback').css('display','block');
	 });
	 //User has pressed the keyboard ,and entered some data in the input field
	 email.addEventListener('keyup',keyUp);
	 email.addEventListener('keypress',keyPress);
	 
     
	 //If email input is valid display success message.
	 onClick('#btn-primary',(event)=>hide(event,'.hide'),(event)=>show(event,'.success'));
     
	 onClick('.btn-secondary',reload);
	 
});