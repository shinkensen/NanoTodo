import {createClient} from 'https://esm.sh/@supabase/supabase-js';
const sqlthing = createClient("https://vwfwcwvlrssfhqxgqyoz.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3Zndjd3ZscnNzZmhxeGdxeW96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4MTg0OTcsImV4cCI6MjA3MTM5NDQ5N30.aYVXMVzvLxhBT_o6pwlg75NLVlWppyTqjEy-8-L7mcE")






async function signUp(email,password) {
    let {data,error} = await sqlthing.auth.signUp({email,password});
    if (error){
        console.log("sign up error",error);
    }
    else{
        console.log("Signed up:" + data);
    }
}

async function addTask(text) {
    const user = (await sqlthing.auth.getUser()).data.user;

    await sqlthing.from('tasks')
    .insert({text,done:false,user_id:user.id});
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
let email=document.getElementById("email").value;
let pass=document.getElementById("password").value;

const submit=document.getElementById("submitt");
submit.addEventListener("click", ()=>{
    email=document.getElementById("email").value;
    pass=document.getElementById("password").value;
    console.log(email);
    console.log(pass);
    if (email_error(email)&&pass_error(pass)) {
        signUp(email,pass);
        error_email.style.border="4px solid black";
        document.getElementById("error1").style.color="black";
        error_pass.style.border="4px solid black";
        document.getElementById("error2").style.color="black";
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


//login stuff
let login_email=document.getElementById("login_email").value;
let login_pass=document.getElementById("login_password").value;
let login_submit=document.getElementById("login_submit");
let error5=document.getElementById("error5");
async function login(email,password) {
    let {data,error}= await sqlthing.auth.signInWithPassword({email,password});
    if (error){
        console.log("login error: ", error)
        error5.style.color = "red"
    }
    else{
        error5.style.color = "black"
        console.log("Successfully logged in: ",data)
    }
}
login_submit.addEventListener("click",()=>{
    login_email=document.getElementById("login_email").value;
    login_pass=document.getElementById("login_password").value;
    login(login_email,login_pass);
})