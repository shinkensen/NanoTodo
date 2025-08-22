import {createClient} from 'https://esm.sh/@supabase/supabase-js';
const sqlthing = createClient("https://vwfwcwvlrssfhqxgqyoz.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3Zndjd3ZscnNzZmhxeGdxeW96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4MTg0OTcsImV4cCI6MjA3MTM5NDQ5N30.aYVXMVzvLxhBT_o6pwlg75NLVlWppyTqjEy-8-L7mcE")
async function signUp(email,password) {
    let {data,error} = await sqlthing.auth.signUp({email,password});
    if (error){
        console.log(error);
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