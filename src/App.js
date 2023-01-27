import React from 'react'
import {AiOutlinePlus} from "react-icons/ai"
import { useState,useEffect } from "react"
import Todo from './Todo'
import { db } from './firebase'
import {
    collection,
    getDocs,
    updateDoc,
    doc,
    addDoc,
    deleteDoc
  } from "firebase/firestore";


const style={
    bg:`h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
    container:`bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4 mt-5`,
    header:`text-3xl font-bold text-center text-gray-800 p-2`,
    form:`flex justify-between`,
    input:`border p-2 w-full text-xl`,
    button:`border p-4 ml-2 bg-purple-500 text-slate-100`,
    count:`text-center p-2 text-m font-bold `,
    grid:`max-w-[400px] bg-black `

}

const App = () => {

    const [todos,setTodos]=useState([]);
    const [name,setName]=useState("")
    //console.log(name)

    const userscollectionref = collection(db,"todos");

    //create
    const createtodo=async(e)=>{
      e.preventDefault(e);
      if (name===""){
        alert("please enter valid todo")
        return
      }
      await addDoc(collection(db,"todos"),{
        text:name,
        completed:false
      })
      setName("")
    };

    //read todos
    useEffect(()=>{
      const getUsers = async () => {
        const data = await getDocs(userscollectionref);
        console.log(data);
        setTodos(data.docs.map((doc)=>({...doc.data(),id:doc.id})));
        };
        getUsers();
    });
    

    //Update
    const toggleComplete=async(todo)=>{
      await updateDoc(doc(db,'todos',todo.id),{
        completed:!todo.completed 
      })
    }
    
    
    //delete todos
    const deletetodo=async(id)=>{
      await deleteDoc(doc(db,"todos",id))
    }


  return (
    <div className={style.bg}>
        <div className={style.container}>
          <h3 className={style.header}>Todo List</h3>
          <form className={style.form} onSubmit={createtodo}>
              <input className={style.input} type="text" placeholder='Add your todo...'  value={name} onChange={(e)=>setName(e.target.value)}/>
              <button className={style.button} >{<AiOutlinePlus size={30}/>}</button>
          </form>
         
          {todos.length===0?  <p className={style.count}>No Todos Yet, Add Your Todos</p>: <p className={style.count}> You have {todos.length} Todo(s)</p>}
          {todos.length<7? <ui>
                {todos.map((todo,index)=>(
                    <Todo key={index} todo={todo} toggleComplete={toggleComplete} deletetodo={deletetodo}/>
                ))}
            </ui> : <div className="overflow-y-auto h-96"> <ui>
                {todos.map((todo,index)=>(
                    <Todo key={index} todo={todo} toggleComplete={toggleComplete} deletetodo={deletetodo}/>
                ))}
            </ui></div> }
          
            
          
        </div>
    </div>
  )
}
export default App