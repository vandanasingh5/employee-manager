import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

const EmployeePage = () => {
  const [employees, setEmployees] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleEdit = (id) => {
    const employee = employees.find((emp) => emp._id === id);
    setSelectedEmployee(employee);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/employees/${id}`);
      fetchEmployees();
      toast.success("Employee deleted successfully");
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast.error("Error deleting employee");
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleUpdateEmployee = async () => {
    try {
      await axios.put(
        `http://localhost:5000/employees/${selectedEmployee._id}`,
        selectedEmployee
      );
      fetchEmployees();
      setIsEditModalOpen(false);
      setSelectedEmployee(null);
      toast.success("Employee updated successfully");
    } catch (error) {
      console.error("Error updating employee:", error);
      toast.error("Error updating employee");
    }
  };

  return (
    <div className="relative">
      <ToastContainer />
      <nav className="bg-blue-500 p-4 flex justify-between items-center">
  <div>
    <Link to="/" className="text-white text-xl font-bold">
      Employee Management System
    </Link>
  </div>
  <div className="flex justify-start space-x-4 items-center">
  
    <Link to="/newemp" className="text-white hover:underline">
      New Employees
    </Link>
  </div>
  <div className="flex items-center">
    <input
      type="text"
      placeholder="Search..."
      className="border border-gray-300 rounded-md p-2 mr-2"
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-gray-400 cursor-pointer"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.5 17.5l4.5 4.5"
      />
    </svg>
  </div>
</nav>

      <div className="max-w-7xl mx-auto px-4 mt-8">
        <h1 className="text-2xl font-bold mb-4 text-center">Employees List</h1>

        <div className="overflow-x-auto">
        
<table className="min-w-full bg-gray-200 rounded-md">
  <thead>
    <tr>
      <th className="px-6 py-3 bg-gray-400 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
        S.No
      </th>
      <th className="px-6 py-3 bg-gray-400 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
        Name
      </th>
      <th className="px-6 py-3 bg-gray-400 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
        Email
      </th>
      <th className="px-6 py-3 bg-gray-400 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
        Department
      </th>
      <th className="px-6 py-3 bg-gray-400 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
        Company
      </th>
      <th className="px-6 py-3 bg-gray-400 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
        City
      </th>
      <th className="px-6 py-3 bg-gray-400 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
        Gender
      </th>
      
      <th className="px-6 py-3 bg-gray-400 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
        Actions
      </th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-300">
    {employees.map((employee, index) => (
      <tr key={employee._id} className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}>
        <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
        <td className="px-6 py-4 whitespace-nowrap">{employee.name}</td>
        <td className="px-6 py-4 whitespace-nowrap">{employee.email}</td>
        <td className="px-6 py-4 whitespace-nowrap">{employee.department}</td>
        <td className="px-6 py-4 whitespace-nowrap">{employee.company}</td>
        <td className="px-6 py-4 whitespace-nowrap">{employee.city}</td>
        <td className="px-6 py-4 whitespace-nowrap">{employee.gender}</td>
        
        <td className="px-6 py-4 whitespace-nowrap">
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
            onClick={() => handleEdit(employee._id)}
          >
            Edit
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
            onClick={() => handleDelete(employee._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>


        </div>
      </div>

    <div className=" absolute top-0 left-0">
    <Modal
        isOpen={isEditModalOpen}
        onRequestClose={handleCloseEditModal}
        className="modal absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-slate-100"
        overlayClassName="overlay"
      >
        <div className="bg-white rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Edit Employee</h2>
          <input
            type="text"
            placeholder="Name"
            value={selectedEmployee?.name || ""}
            onChange={(e) =>
              setSelectedEmployee({ ...selectedEmployee, name: e.target.value })
            }
            className="border border-gray-300 rounded-md p-2 mb-2 w-full"
          />
          <input
            type="email"
            placeholder="Email"
            value={selectedEmployee?.email || ""}
            onChange={(e) =>
              setSelectedEmployee({
                ...selectedEmployee,
                email: e.target.value,
              })
            }
            className="border border-gray-300 rounded-md p-2 mb
            -2 w-full"
            />
            <input
              type="text"
              placeholder="Department"
              value={selectedEmployee?.department || ""}
              onChange={(e) =>
                setSelectedEmployee({
                  ...selectedEmployee,
                  department: e.target.value,
                })
              }
              className="border border-gray-300 rounded-md p-2 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Company"
              value={selectedEmployee?.company || ""}
              onChange={(e) =>
                setSelectedEmployee({
                  ...selectedEmployee,
                  company: e.target.value,
                })
              }
              className="border border-gray-300 rounded-md p-2 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="City"
              value={selectedEmployee?.city || ""}
              onChange={(e) =>
                setSelectedEmployee({ ...selectedEmployee, city: e.target.value })
              }
              className="border border-gray-300 rounded-md p-2 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Gender"
              value={selectedEmployee?.gender || ""}
              onChange={(e) =>
                setSelectedEmployee({
                  ...selectedEmployee,
                  gender: e.target.value,
                })
              }
              className="border border-gray-300 rounded-md p-2 mb-2 w-full"
            />
         
            <div className="flex justify-end">
              <button
                onClick={handleUpdateEmployee}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Update
              </button>
              <button
                onClick={handleCloseEditModal}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
    </div>
      </div>
    );
  };
  
  export default EmployeePage;
  