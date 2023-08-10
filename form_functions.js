function validateEmail(email){
    //assuming an email containing charcters : a-z , A-Z, 0-9 and underscore. And from either a .com or .net account
	const regex = /^\w+@\w+\.{1}(com|net){1}$/;
	//get email entered by user input value
	const val = email.value;
    //check the validy of the email 
    const check = regex.test(val);
	return check;
}