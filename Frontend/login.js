
import {createClient} from 'https://esm.sh/@supabase/supabase-js';

const sqlthing = createClient("https://vwfwcwvlrssfhqxgqyoz.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3Zndjd3ZscnNzZmhxeGdxeW96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4MTg0OTcsImV4cCI6MjA3MTM5NDQ5N30.aYVXMVzvLxhBT_o6pwlg75NLVlWppyTqjEy-8-L7mcE")




//login stuff
let login_email=document.getElementById("login_email").value;
let login_pass=document.getElementById("login_password").value;
const login_submit=document.getElementById("login_submit");
const error5c=document.getElementById("email_error_login");
let error5=document.getElementById("error5");
async function login(email,password) {
    let {data,error}= await sqlthing.auth.signInWithPassword({email,password});
    if (error){
        console.log("login error: ", error)
        error5.style.color = "red"
        error5c.style.borderColor = "red";
    }
    else{
        error5.style.color = "black";
        error5c.style.backgroundColor= "black";
        console.log("Successfully logged in: ",data);
        window.location.href='/Frontend/home.html';
        const token= data.session.access_token;
        await fetch('http://localhost:3000/auth',{
            method: 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            body:JSON.stringify({
                text: "Frontend-Backend"
            })
        });
    }
}
login_submit.addEventListener("click", ()=>{
    login_email=document.getElementById("login_email").value;
    login_pass=document.getElementById("login_password").value;
    login(login_email,login_pass);
})
console.log("login_submit element:", document.getElementById("login_submit"));