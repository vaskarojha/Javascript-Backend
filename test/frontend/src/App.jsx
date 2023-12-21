import React, {useState} from "react"
import {Routes, Route} from 'react-router-dom'


import CreateUser from "./pages/CreateUser"
import EditUser from "./pages/EditUser"
import DeleteUser from "./pages/DeleteUser"
import Home from "./pages/Home"
import ShowUser from "./pages/ShowUser"

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
   <Routes>
    <Route path="/" element= {<Home/>}/>
    <Route path="/users/create" element= {<CreateUser/>}/>
    <Route path="/users/edit/:id" element= {<EditUser/>}/>
    <Route path="/users/details/:id" element= {<ShowUser/>}/>
    <Route path="/users/delete/:id" element= {<DeleteUser/>}/>
   </Routes>
   </>
  )
}

export default App
