
function abc(){
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
		span.appendChild(node);
		name.focus();
		//return false;
	}

}
function validateForm(){

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
		span.appendChild(node);
		name.focus();
		return false;
	}
	else if(email.value == ""){
		var iq = document.getElementsByClassName("test");
		iq[1].style.backgroundColor = "red";
		email.focus();
		return false;
	}
	else if(email.value.indexOf("@", 0) < 0){
		var iq = document.getElementsByClassName("test");
		iq[1].style.backgroundColor = "red";
		email.focus();
		return false;
	}
	else if(email.value.indexOf(".", 0) < 0){
		var iq = document.getElementsByClassName("test");
		iq[1].style.backgroundColor = "red";
		email.focus();
		return false;
	}
	else if(phone.value == ""){
		var iq = document.getElementsByClassName("test");
		iq[2].style.backgroundColor = "red";
		phone.focus();
		return false;
	}

	else if(username.value == ""){
		var iq = document.getElementsByClassName("test");
		iq[3].style.backgroundColor = "red";
		username.focus();
		return false;
	}
	
	else if(password.value == ""){
		var iq = document.getElementsByClassName("test");
		iq[4].style.backgroundColor = "red";
		password.focus();
		return false;
	}

	else {
		var infor = (name.value) \n (email.value) + "<br>" + (phone.value) + "<br>" + (username.value) + "br" + (password.value);
		alert(infor);
	}
	return true;
}

function set(){
	var iq = document.getElementsByClassName("test");
	for(var i=0; i< iq.length; i++){
		iq[i].style.backgroundColor = "white";
	}
}

 // var inputs = document.forms["myForm"].getElementsByTagName("input");
 // var onchange = false;
 // function validateForm(){
 // 	alert(inputs[0]);
 // 	var errors = false;
 // 	var reg_mail = /^[A-Za-z0-9]+([_\.\-]?[A-Za-z0-9])*@[A-Za-z0-9]+([\.\-]?[A-Za-z0-9]+)*(\.[A-Za-z]+)+$/;
 // 	for(var i=0; i<inputs.length; i++){
 // 		var value =inputs[i].value;
 // 		var id = inputs[i].getAttribute("id");

 // 		//tao phan tu luu thong loi
 // 		var span = document.createElement("span");
 // 		//span da ton tai thi remote
 // 		var p = inputs[i].parentNode;
 // 		if(p.lastChild.nodeName == "SPAN"){
 // 			p.removeChild(p.lastChild);
 // 		}


 // 		//kiem tra rong
 // 		if(value == ""){
 // 			span.innerHTML = "Accept information";
 // 		}
 // 		else{
 // 			//kiemtra cac truong hop khac
 // 			if(id == "email"){
 // 				if(reg_email.test(value) == false){
 // 					span.innerHTML = "Email errors(nhung@gmail.com)";
 // 				}
 // 					var email = value;
 // 				}
 			
 // 			if(id == "confirm_email" && value != email){
 // 				span.innerHTML="Email nhap lai chua dung";
 // 			}
 // 			if(id == "password"){
 // 				if(value.length < 6){
 // 					span.innerHTML = "Password phai tu 6 ki tu(nhung123)";
 // 				}
 // 					var password = value;
 // 				}
 // 			//kiem tra password nhap lai
 // 			if(id == "confirm_pass" && value != password){
 // 				span.innerHTML ="Password nhập lại chưa đúng";
 // 			}

 // 			if(id == "phone" && isNaN(value) == true){
 // 					span.innerHTML="This is a number (0979744591)";
 // 				}
 // 			}
 // 			//neu co loi thi chen ho so vao, chay onchange, submit return false, hightlight border
 // 			if(span.innerHTML != ""){
 // 				inputs[i].parentNode.appendChild(span);
 // 				errors = true;
 // 				onchange = true;
 // 				inputs[i].style.border ="1px solid red";
 // 				inputs[i].style.background = "#FF9999";
 // 			}
 // 		}//end for
 // 		if(errors == false){
 // 			alert("Suscessfull");
 // 			return !errors;
 // 		}//end validateForm

 // 		//chay ham kiem tra validateForm()
 // 		var validateForm = document.getElementById("submit");
 // 		myForm.onclick = function(){
 // 			return validateForm();
 // 		}
 // 		//kiem tra su kien onchange, goi ham validateForm()
 // 		for(var i=0; i<inputs.length; i++){
 // 			var id = inputs[i].getAttribute("id");
 // 			inputs[i].onchange = function(){
 // 				if(onchange == true){
 // 					this.style.border = "1px solid red";
 // 					this.style.background = "#FF9999";
 // 					validateForm();
 // 				}
 // 			}
 // 		}

 // }