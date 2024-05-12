import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EmpolyeePage from './pages/Employees'
import AddNewEmp from './pages/NewEmp';


const App = () => {
  return (
    <div>
   <BrowserRouter>
   <Routes>
   <Route path="/"  element={<EmpolyeePage />} />
   <Route path="/newemp" element={<AddNewEmp />} />
   </Routes>
   </BrowserRouter>
    </div>
  )
}

export default App