import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'

import {Link} from 'react-router-dom'

function Home() {
    const [users, setUsers] = useState([]);
    const[loading, setLoading] = useState(false);
    
    useEffect(()=>{
        setLoading(true);
        axios.get('http://localhost:5000/users')
        .then((res)=>{
            setUsers(res.data.data);
        setLoading(false)
        }).catch((error)=>{
            console.log(error)
            setLoading(false)
        })
    }, [])
  return (
    <div className='p-5'>
        <div className='flex justify-between items-center'>
            <h1 className='text-2xl my-8'>List of existing user in Database</h1>
            <Link to='/users/create'>
                <button className='text-2xl bg-green-400 p-4'>Add more users</button>
            </Link>
        </div>
        {
            loading? (
                <Spinner/>
            ):(
                <table className='w-full border-saperate broder-spacing-1'>
                    <thead>
                        <tr>
                            <th className='border border-slate-300 '>SN</th>
                            <th className='border border-slate-300 '>Name</th>
                            <th className='border border-slate-300 '>Address</th>
                            <th className='border border-slate-300 '>Age</th>
                            <th className='border border-slate-300 '>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index)=>(
                            <tr>
                            <td className='text-xl border border-slate-300 text-center'>{index+1}</td>
                            <td className='text-xl border border-slate-300 text-center'>{user.name}</td>
                            <td className='text-xl border border-slate-300 text-center'>{user.address}</td>
                            <td className='text-xl border border-slate-300 text-center'>{user.age}</td>
                            <td className='text-xl border border-slate-300 text-center'>
                                <Link className='text-xl text-blue-500' to={`/users/details/${user._id}`}>Detail</Link>
                                <Link className='text-xl text-green-500' to={`/users/edit/${user._id}`}>{'  ||  '}Update{'  ||  '}</Link>
                                <Link className='text-xl text-red-500' to={`/users/delete/${user._id}`}>Delete</Link>
                            </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
        }
    </div>
  )
}

export default Home