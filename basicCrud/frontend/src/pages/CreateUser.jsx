import React ,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function CreateUser() {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [age, setAge] = useState('')
    const navigate = useNavigate()
    const handleCreateUser =()=>{
        const data = {
            name,
            address,
            age,
        };
        axios.post(`http://localhost:5000/users`, data)
        .then(()=>{
            navigate('/')
        }).catch((error)=>{
            alert("Error occured durring creating user!!")
            console.log(error)
        })
    }
  return (
    <div className='p-4'>
        <h1 className='text-2xl'>Create User</h1>
        <div className='my-5'>
        <label className='text-xl mx-10'>Name</label>
        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} 
        className='border-2 text-xl px=5'
        />
        </div>
        <div className='my-5'>
        <label className='text-xl mx-10'>Address</label>
        <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)} 
        className='border-2 text-xl px=5'
        />
        </div>
        <div className='my-5'>
        <label className='text-xl mx-10'>Age</label>
        <input type="number" value={age} onChange={(e)=>setAge(e.target.value)} 
        className='border-2 text-xl px=5'
        />
        </div>
        <button className='p-4 bg-green-300' onClick={handleCreateUser}>Create</button>

    </div>
  )
}

export default CreateUser