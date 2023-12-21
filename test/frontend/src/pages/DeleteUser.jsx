import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

function DeleteUser() {
    const navigate = useNavigate()
    const {id} = useParams()
    const handleUserDelete = ()=>{
        axios.delete(`http://localhost:5000/users/${id}`)
        .then(()=>{
            navigate('/')
        }).catch((error)=>{
            alert('Error on deleting user!!');
            console.log(error)
        })
    }


  return (
    <div className='p-10'>
        <h1 className='text-3xl text-center my-10'>Delete user from Database</h1>
        <div className='flex flex-col items-center border-2 border-red-400 p-10 mx-auto'>
            <h2 className='text-3xl my-10 text-red-500'>Warning!! User info will be parmenently deleted.</h2>
            <button className='p-5 bg-red-500 text-white mx-auto w-40 text-xl' onClick={handleUserDelete}>Delete Now</button>
        </div>
    </div>
  )
}

export default DeleteUser