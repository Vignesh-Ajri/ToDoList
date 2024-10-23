import React, { useState , useEffect } from 'react';

function Todo(){

    const getInitialTodos = () =>{
        const savedTodo = localStorage.getItem('todos');
        return savedTodo ? JSON.parse(savedTodo) : [];
    }

    const [todos, setTodos] = useState(getInitialTodos);
    const [inputValue, setInputValue] = useState('');
    const [editIndex, setEditIndex] = useState(null);

    const AddTask =() => {
        if (inputValue) {
            if (editIndex !== null) { //code for edit of task
                const updatedTodos = [...todos];
                updatedTodos[editIndex] = inputValue;
                setTodos(updatedTodos);
                setEditIndex(null);
            } else {
                setTodos([...todos, inputValue]);
            }
            setInputValue('');
        }
    }

    const ClrTask = () => {
        setInputValue('');
    }

    const Delete = (index) =>{
        setTodos(todos.filter((_,i) => (i !== index)));
    }

    const Edit = (index) => {
        setInputValue(todos[index]);
        setEditIndex(index); 
    };

    const MvUp = (index) =>{
        if(index > 0){
            const todoAraay = [...todos];
            [todoAraay[index], todoAraay[index - 1]] = 
            [todoAraay[index - 1], todoAraay[index]];
            setTodos(todoAraay);
        }
    }

    const MvDown = (index) =>{
        if(index < todos.length -1){
            const todoAraay = [...todos];
            [todoAraay[index], todoAraay[index + 1]] = 
            [todoAraay[index + 1], todoAraay[index]];
            setTodos(todoAraay);
        }
    }

    useEffect(() =>{
        localStorage.setItem('todos', JSON.stringify(todos));
    },[todos]);

    useEffect(()=>{
        document.title = 'To-Do-App';
    })

    return(<>
        <div>
            <h1 className="to-do-header">To-Do List</h1>
            <div className="to-do">
                <input
                    placeholder=" Enter your task"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    id="task"
                />

                <button
                    className="add-task"
                    id="add-task"
                    onClick={AddTask}
                >
                    Add Task
                </button>

                <button
                    className="clr-task"
                    id="clear"
                    onClick={ClrTask}
                >
                    Clear
                </button>
            </div>
            <h1>My tasks</h1>
            <ul>
                { todos.map((task, index) => (
                    <li key={index}>
                        <span>{task}</span>
                        <button className='delete' onClick={() => Delete(index)}>Delete</button>
                        <button onClick={() => Edit(index)}>Edit</button>
                        <button onClick={() => MvUp(index)}>Move Up</button>
                        <button onClick={() => MvDown(index)}>Move Down</button>
                    </li>
                ))}
            </ul>
        </div>
    </>)
}

export default Todo