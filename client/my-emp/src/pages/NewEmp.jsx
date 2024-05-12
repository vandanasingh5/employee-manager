import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddNewEmp = () => {
  const [newEmp, setNewEmp] = useState({
    id: '',
    name: '',
    email: '',
    gender: '',
    phone: '',
    department: '',
    company: '',
    city: '',
  });

  const [focusedField, setFocusedField] = useState('');

  const addEmp = async () => {
    try {
      if (
        !newEmp.name ||
        !newEmp.email ||
        !newEmp.department ||
        !newEmp.company ||
        !newEmp.city ||
        !newEmp.gender 
        
      ) {
        toast.error('Please fill in all fields');
        return;
      }

      await axios.post('http://localhost:5000/employees', newEmp);
      setNewEmp({
        id: '',
        name: '',
        email: '',
        gender: '',
        phone: '',
        department: '',
        company: '',
        city: '',
      });
      toast.success('Employee added successfully');
    } catch (error) {
      console.error('Error adding employee:', error);
      toast.error('Error adding employee');
    }
  };

  return (
    <div className="white h-screen">
      <ToastContainer />
      <nav className="bg-gray-800 p-4 fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between">
            <div>
              <Link to="/" className="text-white text-xl font-bold">
                Employee Management System
              </Link>
            </div>
            <div>
              <Link to="/" className="text-white hover:underline">
                Employee Data
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-gray-100 shadow-md p-8 rounded-md max-w-md m-auto mt-20">
          <h1 className="text-2xl font-bold mb-4 text-center">Add New Employee</h1>
          <div className=" rounded-md p-4 mb-4">
            <table className="min-w-full">
              <tbody>
                <tr>
                  <td>Name:</td>
                  <td>
                    <input
                      type="text"
                      value={newEmp.name}
                      onChange={(e) => setNewEmp({ ...newEmp, name: e.target.value })}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField('')}
                      className={`border  rounded-md p-2 mb-2 w-full `}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td>
                    <input
                      type="email"
                      value={newEmp.email}
                      onChange={(e) => setNewEmp({ ...newEmp, email: e.target.value })}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField('')}
                      className={`border  rounded-md p-2 mb-2 w-full`}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Gender:</td>
                  <td>
                    <input
                      type="text"
                      value={newEmp.gender}
                      onChange={(e) => setNewEmp({ ...newEmp, gender: e.target.value })}
                      onFocus={() => setFocusedField('gender')}
                      onBlur={() => setFocusedField('')}
                      className={`border  rounded-md p-2 mb-2 w-full`}
                    />
                  </td>
                </tr>
                
                <tr>
                  <td>Department:</td>
                  <td>
                    <input
                      type="text"
                      value={newEmp.department}
                      onChange={(e) => setNewEmp({ ...newEmp, department: e.target.value })}
                      onFocus={() => setFocusedField('department')}
                      onBlur={() => setFocusedField('')}
                      className={`border  rounded-md p-2 mb-2 w-full`}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Company:</td>
                  <td>
                    <input
                      type="text"
                      value={newEmp.company}
                      onChange={(e) => setNewEmp({ ...newEmp, company: e.target.value })}
                      onFocus={() => setFocusedField('company')}
                      onBlur={() => setFocusedField('')}
                      className={`border  rounded-md p-2 mb-2 w-full`}
                    />
                  </td>
                </tr>
                <tr>
                  <td>City:</td>
                  <td>
                    <input
                      type="text"
                      value={newEmp.city}
                      onChange={(e) => setNewEmp({ ...newEmp, city: e.target.value })}
                      onFocus={() => setFocusedField('city')}
                      onBlur={() => setFocusedField('')}
                      className={`border rounded-md p-2 mb-2 w-full`}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-center">
            <button
              onClick={addEmp}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              New Employee
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewEmp;
