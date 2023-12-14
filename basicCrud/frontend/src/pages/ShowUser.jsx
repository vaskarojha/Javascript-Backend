import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'


function ShowUser() {
    const [user, setUser] = useState({})
    const{id} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:5000/users/${id}`)
        .then((res)=>{
            setUser(res.data);
        }).catch((error)=>{
            console.log(error);
        })
    }, [])

  return (
    <div className='p-5 '>
        <h1 className='text-2xl my-4'>User detail</h1>
        <div className='flex flex-col border-1 border-green=400 w-fit p-5'>
            <div className='my-5'>
                <span className='text-xl mr-4'>User Id</span>
                <span>{user._id}</span>
            </div>
            <div className='my-5'>
                <span className='text-xl mr-4'>User Name</span>
                <span>{user.name}</span>
            </div>
            <div className='my-5'>
                <span className='text-xl mr-4'>User Address</span>
                <span>{user.address}</span>
            </div>
            <div className='my-5'>
                <span className='text-xl mr-4'>User Created on</span>
                <span>{new Date(user.createdAt).toString()}</span>
            </div>
            <div className='my-5'>
                <span className='text-xl mr-4'>User Last Updated date </span>
                <span>{new Date(user.updatedAt).toString()}</span>
            </div>
        </div>
    </div>
  )
}

export default ShowUser