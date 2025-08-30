import {createClient} from '@supabase/supabase-js';
const supabase = createClient("https://vwfwcwvlrssfhqxgqyoz.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3Zndjd3ZscnNzZmhxeGdxeW96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4MTg0OTcsImV4cCI6MjA3MTM5NDQ5N30.aYVXMVzvLxhBT_o6pwlg75NLVlWppyTqjEy-8-L7mcE")
import express from 'express';
const connect= express();
connect.use(express.json());


connect.post('/auth' , async (req,res) => {
    const authHeader = req.headers['authorization'];
    const token=authHeader?.split(' ')[1];
    if (!token){
        return res.status(401).json({error : 'No Token Given'});
    }

    const {data: { user },error: userError} =await supabase.auth.getUser(token);

    if (userError || !user){
        return res.status(401).json({ error : "Invalid Token"});
    }
    const { text } = req.body;
    const {data, error} = await supabase
        .from('todos')
        .insert([{
            userid: (await supabase.auth.getUser()).data.user.id,
            rank: 1,
            text
        }])
    if (error) return res.status.json({ error });
    res.json({ success : true, todo: data});

})
app.listen(3000, () => console.log('Server running on port 3000!'))