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
async function login(email,password) {
    let {data,error}= await sqlthing.auth.signInWithPassword({email,password});
    if (error){
        console.log("login error: ", error)
    }
    else{
        console.log("Successfully logged in: ",data)
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

console.log("hello");
let email=document.getElementById("email").value;
let pass=document.getElementById("password").value;
const submit=document.getElementById("submitt");
submit.addEventListener("click", ()=>{
    email=document.getElementById("email").value;
    pass=document.getElementById("password").value;
    console.log(email);
    console.log(pass);
    if (email_error(email)) {
        signUp(email,pass);
    }
})
let error_email=document.getElementById("email_error");
let error_pass=document.getElementById("email_pass");

function email_error(email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
