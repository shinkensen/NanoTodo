import {createClient} from 'https://esm.sh/@supabase/supabase-js';
const sqlthing = createClient("https://vwfwcwvlrssfhqxgqyoz.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3Zndjd3ZscnNzZmhxeGdxeW96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4MTg0OTcsImV4cCI6MjA3MTM5NDQ5N30.aYVXMVzvLxhBT_o6pwlg75NLVlWppyTqjEy-8-L7mcE")


document.addEventListener('DOMContentLoaded',function(){



async function signUp(email,password) {
    let {data,error} = await sqlthing.auth.signUp({email,password});
    if (error){
        console.log("sign up error",error);
    }
    else{
        console.log("Signed up:" + data);
    }
    window.location.href="/NanoTodo/signin.html";
}
async function getCurrentUser() {
    const { data: { user } } = await sqlthing.auth.getUser();
    if (user) {
    console.log("Already signed in as:", user.email);
    } else {
    console.log("No active session");
    }
}
let error_email=document.getElementById("email_error");
let error_pass=document.getElementById("pass_error");


//sign up stuff
console.log("hello");
let email=document.getElementById("email");
let pass=document.getElementById("password");

const submit=document.getElementById("submitt");
submit.addEventListener("click", ()=>{
    email=document.getElementById("email").value;
    pass=document.getElementById("password").value;
    console.log(email);
    console.log(pass);
    if (email_error(email)&&pass_error(pass)) {
        error_email.style.border="4px solid black";
        document.getElementById("error1").style.color="black";
        error_pass.style.border="4px solid black";
        document.getElementById("error2").style.color="black";
        signUp(email,pass);
    }
    else if (!email_error(email)){
        error_email.style.border="4px solid red";
        document.getElementById("error1").style.color="red";
    }
    else if(!pass_error(pass)){
        error_pass.style.border="4px solid orange";
        document.getElementById("error2").style.color="orange";
    }
})
function email_error(email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function pass_error(password){
    password=password.toString();
    if (password.length<6){
        return false;
    }
    return true;
}
})