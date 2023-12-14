import React ,{useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'


function EditUser() {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [age, setAge] = useState('')
    const navigate = useNavigate()

    const {id} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:5000/users/${id}`)
        .then((res)=>{
            setName(res.data.name);
            setAddress(res.data.address);
            setAge(res.data.age)
        }).catch((error)=>{
            alert("Error occured on editing user!!")
            console.log(error)
        });
    },[])

    const handleEditUser =()=>{
        const data = {
            name,
            address,
            age,
        };
        axios.put(`http://localhost:5000/users/${id}`, data)
        .then(()=>{
            navigate('/')
        }).catch((error)=>{
            alert("Error occured durring creating user!!")
            console.log(error)
        })
    }
  return (
    <div className='p-4'>
        <h1 className='text-2xl'>Edit User</h1>
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
        <button className='p-4 bg-green-300' onClick={handleEditUser}>Update</button>

    </div>
  )
}

export default EditUser