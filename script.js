const form = document.querySelector('form')
const obbligatorio = document.querySelector('.obbligatorio')
const vpass = document.getElementById('password_repeat')
const inputs = document.querySelectorAll('input')
const corrects = document.querySelectorAll('.correct')
const wrongs = document.querySelectorAll('.error')
const btn = document.querySelector('.btn')

const regole = document.querySelectorAll('.regola')



// Controllo costante input

inputs.forEach((input)=>{
    input.addEventListener('keyup',() => {
        getInputs()
        input.classList.add('wrong')
    })
})

inputs.forEach((input)=>{
    input.addEventListener('change',() => {
        getInputs()
    })
})

corrects.forEach((correct) =>{
    correct.style.display = "block"
    correct.style.color = "#fff"
})

wrongs.forEach((wrong) =>{
    wrong.style.display = "none"
})

//conferma finale
btn.addEventListener("click", () => {
    let confirmation = document.querySelectorAll(".right")
    finalConfirm(confirmation)
})
// Disabilita l'incolla 
vpass.addEventListener('paste', (e) => e.preventDefault())


function getInputs(){
    const renumbers = /\d/
    let nome = document.getElementById('name').value
    let cognome = document.getElementById('surname').value
    let email = document.getElementById('email').value
    let pass = document.getElementById('password').value
    let cpass = document.getElementById('password_repeat').value

    let address = document.getElementById('address').value
    nameCheck(nome,0)
    nameCheck(cognome,1)
    checkEmail(email,2)
    addressCheck(address)


    //Controlli Password
    isEmpty(pass) ?  wrong(4) : right(4)
    pass.length < 10 ? ruleColorWrong(0) : ruleColorRight(0)
    renumbers.test(pass) ? ruleColorRight(1) : ruleColorWrong(1)
    pass.indexOf(' ') >= 0 ? ruleColorWrong(3) : ruleColorRight(3)
    specialCount(pass)
    passNameSurnamecheck(pass,nome,cognome)
    checkPass()

    //match conferma
    pass === cpass ?  right(5) : wrong(5)


}


function nameCheck(name, i){
    if(isEmpty(name)){
        wrong(i)
    }else{
        right(i)
    }
}



function checkEmail(email,i){
    if(validateEmail(email)){
        right(i)
    }else{
        wrong(i)
    }
}



function addressCheck(address){
    //controlla se la stringa è composta solo da spazi
    if(!address.trim().length){
        address = ""
        corrects[3].style.color = "#2ecc71"
    }
    
    //controlli normali
    if(address.length === 0 || address.length >= 10){
        wrongs[3].style.display = "none"
        corrects[3].style.display = "block"
        corrects[3].style.color = "#2ecc71"
        inputs[3].classList.remove('wrong')
        inputs[3].classList.add('right')
    }else{
        wrongs[3].style.display = "block"
        corrects[3].style.display = "none"
        inputs[3].classList.remove('right')
        inputs[3].classList.add('wrong')
    }

}

//controlla se la stringa è composta solo da spazi
function isEmpty(s){
    if(!s.trim().length){
        s = ""
        return true
    }else{
        return false
    }
}

//Email Validator con RegEx è comunque solo un controllo basilare
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email.toLowerCase())
}


//utilities
function right(i){
    wrongs[i].style.display = "none"
    corrects[i].style.display = "block"
    corrects[i].style.color = "#2ecc71"
    inputs[i].classList.remove('wrong')
    inputs[i].classList.add('right')
}

function wrong(i){
    wrongs[i].style.display = "block"
    corrects[i].style.display = "none"
    inputs[i].classList.remove('right')
    inputs[i].classList.add('wrong')
}

//utilities for password
function checkPass(){
    const done = document.querySelectorAll('.done')
    if(done.length === 5){
        wrongs[4].style.display = "none"
        corrects[4].style.display = "block"
        corrects[4].style.color = "#2ecc71"
        inputs[4].classList.remove('wrong')
        inputs[4].classList.add('right')
    }else{
        wrongs[4].style.display = "block"
        corrects[4].style.display = "none"
        inputs[4].classList.remove('right')
        inputs[4].classList.add('wrong')
    }
}

//contatore per almeno 3 caratteri speciali
function specialCount(pass){
    const specialchars = new RegExp("[A-Za-zÀ-ȕ0-9 ]")
    let passcheck = pass.split("")
    let filterpass = passcheck.filter((c) => !specialchars.test(c))
    filterpass.length >= 3 ? ruleColorRight(2) : ruleColorWrong(2)
    
}


function passNameSurnamecheck(pass,name,surname){
    const namecheck = name.toLowerCase().trim()
    const surnamecheck = surname.toLowerCase().trim()
    const passcheck = pass.toLowerCase()


    if(passcheck.includes(namecheck) || passcheck.includes(surnamecheck)){
        ruleColorWrong(4)
    }else{
        ruleColorRight(4)
    }
}


function ruleColorRight(i){
    regole[i].classList.add('done')
}

function ruleColorWrong(i){
    regole[i].classList.remove('done')
}


function finalConfirm(list){
    if(list.length === 6){
        alert("Il suo account è stato creato correttamente")
        window.location.reload()
    }else{
        alert("Ci sono degli errori")
        return
    }
}

//avevo problemi con il mostra password ne ho dovuto fare uno autonomo
function togglePass() {
    const pw_ele = document.getElementById('password')
    if (pw_ele.type === "password") {
        pw_ele.type = "text";
    } else {
        pw_ele.type = "password";
    }
}

//avevo problemi con il mostra password ne ho dovuto fare uno autonomo
function togglecPass() {
    const pw_ele = document.getElementById('password_repeat')
    if (pw_ele.type === "password") {
        pw_ele.type = "text";
    } else {
        pw_ele.type = "password";
    }
}