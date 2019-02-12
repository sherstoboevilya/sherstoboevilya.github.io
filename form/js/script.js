var arrDate;
var male;
var arrIIN = "";
var inpIIN;


function chkAll(){
	chkErrorEmpty("#chsDate", "Заполните данные!");
	chkGender();
	splitArr();
	conIIN();
	chkIIN();
}



function chkGender(){
	if(!!$("#blckGender > #textError").html()) $("#blckGender > #textError").remove();
	if($("#selectGender").val() == "gender"){
		$("#selectGender").attr("style", "border: 1px solid #ff1e1e");
		$("<p style='margin: 0; color:red; text-align: right' id='textError'>Выберите ваш пол!</p>").insertAfter($("#selectGender"));
	} else {
		$("#selectGender").removeAttr("style");
		male = $("#selectGender option:selected").val();
		return;
	}
}



function splitArr(){
	if($("#chsDate").val())
	{
		arrDate = $("#chsDate").val().split('-');

		(function(){
			if(arrDate[1] <= 9 && arrDate[1].length != 2)
			{
				arrDate[1] = 0 + "" + arrDate[1];
			} 
			else if (arrDate[2] <= 9 && arrDate[2].length != 2)
			{
				arrDate[2] = 0 + "" + arrDate[2];
			}
		})();
		arrIIN = arrDate.join("").slice(2);
	}
	compArrs();
}



function compArrs(){
	if(arrDate == undefined) return;
	var dateToday = new Date();
	var dateBirthday = new Date(arrDate[0], --arrDate[1], arrDate[2]);
	dateToday = new Date(dateToday - dateBirthday);

	dateBirthday = dateToday.getUTCFullYear() - 1970;

	if(dateBirthday < 18){
		chkErrorAge("#chsDate", "Меньше 18");
	} else if(dateBirthday > 63){
		chkErrorAge("#chsDate", "Больше 63");
	}

	return (dateBirthday);
}



function conIIN(){
	if(arrDate == undefined) return console.log("нет даты");
	var num;
	if(arrDate[0] <= 2000 && male == "male")
	{
		num = 3;
	} 
	else if (arrDate[0] <= 2000 && male == "female")
	{
		num = 4;
	} 
	else if (arrDate[0] >= 2001 && male == "male")
	{
		num = 5;
	} 
	else if (arrDate[0] >= 2001 && male == "female")
	{
		num = 6;
	} 
	else 
	{
		return console.log("ошибка при выборе пола")
	}

	arrIIN += num;
}



function chkIIN(){
	inpIIN = $("#IIN").val();
	$("#IIN").next().remove();

	if(inpIIN.length < 12){
		$("#IIN").attr("style", "border: 1px solid #ff1e1e");
		$("<p style='margin: 0; color:red; text-align: right' id='textError'>Заполните данные!</p>").insertAfter($("#IIN"));
	} else {
		$("#IIN").removeAttr("style");
	}

	for(var i = 0; i < arrIIN.length; i++){
		if(arrIIN[i] != inpIIN[i]) {
			chkErrorIIN();
		}
	}
	chkLastNum(1);
};



function chkErrorIIN(){
	$("#IIN").next().remove();
	$("#IIN").attr("style", "border: 1px solid #ff1e1e");
	$("<p style='margin: 0; color:red; text-align: right' id='textError'>ИИН не совпадает</p>").insertAfter($("#IIN"));
}



function chkLastNum(j){
	var sum = 0;
	for(var i = 0; i < 11; i++)
	{
		sum += +inpIIN[i] * j;

		j++;
		if(j > 11) j = 1;
	}

	sum = sum %= 11;
	if(sum == 10){
		chkLastNum(3);
	} else if(inpIIN[11] != (sum % 11)){
		chkErrorIIN();
	}
	
	return sum;
}



function chkErrorEmpty(elem, text){
	this.text = "<p style='margin: 0; color:red; text-align: right' id='textError'>" + text + "</p>";
	if(!!$(elem).next().html()) $(elem).next().remove();
	if(!$(elem).val()){
		$(elem).attr("style", "border: 1px solid #ff1e1e");
		$(this.text).insertAfter($(elem));
	} else {
		$(elem).removeAttr("style");
	}
}

function chkErrorAge(elem, text){
	this.text = "<p style='margin: 0; color:red; text-align: right' id='textError'>" + text + "</p>";
	if(!!$(elem).next().html()) $(elem).next().remove();
	$(elem).attr("style", "border: 1px solid #ff1e1e");
	$(this.text).insertAfter($(elem));
}
