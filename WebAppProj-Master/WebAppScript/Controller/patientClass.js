/**
** Singleton Patient class
**/
class SingletonPatient {
	
	constructor(Obj) {
		if (SingletonPatient.instance) {
			SingletonPatient.instance = null;
		}
		
		this.id = Obj.user_id;
		this.name = Obj.user_name;
		this.email = Obj.user_mail;
		this.phone = Obj.user_phone;
		this.token = Obj.user_token;
	}

	static getInstance(Obj) {

		return SingletonPatient.instance = new SingletonPatient(Obj);

    }
	
	savePatienInfo(){
		prescOrder.custom_id = this.id;
		prescOrder.custom_name = this.name;
		prescOrder.custom_email = this.email;
		prescOrder.custom_phone = this.phone;
		prescOrder.custom_token = this.token;
	}
	
	displayPatientInfo(){
		
		document.getElementById("pname").innerHTML = "Patient Name:"  + " " + this.name;
		document.getElementById("pmail").innerHTML = "Patient Email:" + " " + this.email;
		document.getElementById("pphone").innerHTML = "Patient Phone Number:" + " " + this.phone;
		
	}
}