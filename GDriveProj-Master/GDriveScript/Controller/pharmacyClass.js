/** 
** Class Pharmacy
**/
class SelectedPharmacy{
	constructor(selectedObj){
		if (SelectedPharmacy.instance) {
			return SelectedPharmacy.instance;
		}
		this.name = selectedObj.pharmname;
		this.addr = selectedObj.pharmaddr;
		this.city = selectedObj.pharmcity;
		this.zip = selectedObj.pharmzip;
		this.state = selectedObj.pharmstate;
		this.email = selectedObj.pharmemail;
		this.phone = selectedObj.pharmphone;
	}
	


	// save selected pharmcy to JSON
	saveSelectPharmInfo(){
		prescOrder.pharm_name = this.name;
		prescOrder.pharm_addr = this.addr;
		prescOrder.pharm_email = this.email;
		prescOrder.pharm_phone = this.phone;
	}	
	
	
	// display selected pharmacy info
	displaySelectPharmInfo(){
		
		document.getElementById("name").innerHTML = "Store: " + this.name;
		document.getElementById("address").innerHTML = "Address: "  + this.addr;
		document.getElementById("city").innerHTML = "City: " + this.city;
		document.getElementById("zipcode").innerHTML = "Zip Code: " + this.zip;
		document.getElementById("state").innerHTML = "State: "  + this.state;
		document.getElementById("email").innerHTML = "Email: "  + this.email;
		document.getElementById("phone").innerHTML = "Phone Number: "  + this.phone;
		
	}
	
}

