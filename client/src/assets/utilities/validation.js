function validatePhoneNum() {

    var numberString = document.getElementById("setCOntact").ariaValueMax;
    var phonePattern = / \d{11} /;

    if(!phonePattern.test(numberString)) {
        alert("Please input your number using the proper format.");
    }
    else {
        alert("");
    }
}

function validateBirthdate(){

    var bdayString = document.getElementById("setBirthdate").ariaValueMax;
    var bdayPattern = / (?<MM>[0-3][0-9])\/(?<DD>[0-3]?[0-9])\/(?<YYYY>[0-2][0-9][0-9][0-9]) / ;

    if(!bdayPattern.test(bdayString)){
        alert("Please input your birthday using the proper format.");
    }
    else {
        alert("");
    }
}

function validateEmail(){

    var emailString = document.getElementById("setEmail").ariaValueMax;
    var emailPattern = / ^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$ /;

    if(!emailPattern.test(emailString)){
        alert("Please use a correct email address.");
    }
    else {
        alert("");
    }
}

function validateSex() {

    var sexString = document.getElementById("setSex").ariaValueMax;
    var sexPattern = / ^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$ /;

    if(!sexPattern.test(sexString)) {
        alert("Female");
    }
    else {
        alert("Male");
    }
 
}