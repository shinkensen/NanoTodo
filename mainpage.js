const token=localStorage.getItem('jwt');
if (!token){
    window.location.href = '/NanoTodo/signin.html';
}
const names = document.getElementById("hello");
const todoList = document.getElementById('todo-list');
const addForm = document.getElementById('submit');
const addInput = document.getElementById('input-text');
const logout = document.getElementById('out')

text =  localStorage.getItem('name').split("@")[0];
names.textContent ="Hello " + text + " 👋";
async function fetchTodos() {
    try {
        const res = await fetch('https://nanotodo.onrender.com/todos', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const result = await res.json();
        if (result.success) {
            renderTodos(result.todo);
        } else {
            console.error(result.error);
        }
    } catch (err) {
        console.error('Error fetching todos:', err);
    }
}

function renderTodos(todos) {
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        const textSpan = document.createElement('span');
        textSpan.textContent = `${todo.rank}. ${todo.text}`;

        const deleteBtn  = document.createElement('span');
        deleteBtn.innerHTML = '🗑️';
        deleteBtn.style.cursor = 'pointer';
        deleteBtn.marginLeft = '10px';
        deleteBtn.title = 'Delete Task';

        deleteBtn.addEventListener('click', async() =>{
            try {
                const res =await fetch('https://nanotodo.onrender.com/del',{
                    method: 'DELETE',
                    headers:{
                        'Content-Type' : 'application/json',
                        'Authorization' :  `Bearer ${token}`
                    },
                    body: JSON.stringify({rank: todo.rank})
                });
                const result= await res.json();
                if (result.error) {
                    console.log(result.error);
                } else{
                    fetchTodos();
                }
            } catch (err){
                console.log("Error deleting: ", err);
            }
        });
        li.appendChild(textSpan);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
}
addForm.addEventListener('click', async (e) => {
    console.log("clicked")
    e.preventDefault();
    const text = addInput.value.trim();
    if (!text) return;
    try {
        const res = await fetch('https://nanotodo.onrender.com/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ text })
        });
        console.log("pushed");
        const result = await res.json();
        console.log('Server result:', result);
        if (result.success) {
            addInput.value = '';
            fetchTodos();
            console.log("success");
        } else {
            console.error(result.error);
        }
    } catch (err) {
        console.error('Error adding todo:', err);
    }
});
fetchTodos();

logout.addEventListener('click',() =>{
    localStorage.removeItem('jwt');
    localStorage.removeItem('name');
    window.location.href='/NanoTodo/signin.html';
})