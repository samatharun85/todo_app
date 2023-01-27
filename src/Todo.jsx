import React from 'react'
import {FaRegTrashAlt} from "react-icons/fa"

const style={
    li:`flex justify-between bg-slate-200 p-4 my-2 capitalize`,
    licomplete:`flex justify-between bg-slate-400 p-4 my-2 capitalize`,
    row:`flex`,
    text:`ml-2 curser-poiner cursor-pointer`,
    textcomplete:`ml-2 curser-poiner line-through cursor-pointer`,
    button:`cursor-pointer flex items-center`
}

const Todo = ({todo,toggleComplete,deletetodo}) => { 
  return (
    <li className={todo.completed?style.licomplete:style.li}>
        <div className={style.row}>
            <input onChange={()=>{toggleComplete(todo)}} type="checkbox" checked={todo.completed ? "checked":""}/>
            <p className={todo.completed?style.textcomplete:style.text} onClick={()=>{toggleComplete(todo)}}>{todo.text} </p>
        </div>
        <button onClick={()=>deletetodo(todo.id)}>{<FaRegTrashAlt/>}</button>
    </li>
    )
}
export default Todo