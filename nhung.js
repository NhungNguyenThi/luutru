function nhung(){
	var name = document.forms["myForm"]["name"];
	var email = document.forms["myForm"]["email"];
	var phone = document.forms["myForm"]["phone"];
	var username = document.forms["myForm"]["username"];
	var password = document.forms["myForm"]["password"];

	if(name.value == ""){
		var iq = document.getElementsByClassName("test");
		iq[0].style.backgroundColor = "red";
		// var span = document.createElement("span");
		// var node = document.createTextNode("This is new.");
		// span.appendChild(node);
		name.focus();
		//return false;
	}

}
function print(){
	alert(document.forms["myForm"]["name"].value);
}