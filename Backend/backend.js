import {createClient} from '@supabase/supabase-js';

const supabase = createClient("https://vwfwcwvlrssfhqxgqyoz.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3Zndjd3ZscnNzZmhxeGdxeW96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4MTg0OTcsImV4cCI6MjA3MTM5NDQ5N30.aYVXMVzvLxhBT_o6pwlg75NLVlWppyTqjEy-8-L7mcE");
import express from 'express';
import cors from 'cors';
const connect= express();
connect.use(express.json());
connect.use(cors({origin:'*'}));

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
    const {data:existing, error:rankError} =await supabase
        .from('todos')
        .select('rank')
        .eq('userid' , user.id)
        .order('rank', {ascending: false})
        .limit(1);
    if (rankError) return res.status(500).json({ error: rankError });

    const nextRank = existing.length ? existing[0].rank + 1 : 1;


    const {data, error} = await supabase
        .from('todos')
        .insert([{
            userid: user.id,
            rank: nextRank,
            text
        }])
        .select()
    if (error) return res.status(500).json({ error });
    res.json({ success : true, todo: data});

})
connect.get('/todos', async (req,res) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    if (!token){
        return res.status(401).json({error : "No token"});
    }
    const {data : {user},error: userError} = await supabase.auth.getUser(token);
    if (userError || !user){
        return res.status(401).json({error : "Incorrect Token"})
    }
    const {data, error} = await supabase
        .from('todos')
        .select('*')
        .eq('userid',user.id)
        .order('rank', {ascending: true});
    if (error) return res.status(500).json({ error });
    res.json({ success : true, todo: data});
})
connect.delete('/del', async(req,res)=>{
    const authHeader = req.headers['authorization'];
    const token= authHeader?.split(' ')[1];
    if (!token){
        return res.status(401).json({error : "Missing Token"});
    }
    const {data : {user}, error: userError} = await supabase.auth.getUser(token);
    if (userError || !user){
        return res.status(401).json({error : "Incorrect Token"})
    }
    const {rank} = req.body;
    const {data,error} = await supabase
        .from('todos')
        .delete()
        .eq('userid',user.id)
        .eq('rank', rank)
    if (error){
        return res.status(500).json({ error });
    }
    res.json({success :true, deleted: data})
})
connect.listen(3000, () => console.log('Server running on port 3000!'))