import React from 'react';
import { Header } from '../components';
import { useSelector, useDispatch } from "react-redux";
import {useNavigate} from "react-router";
import { deleteUser , addUser } from '../service/userService';

const Customers = () => {
  const users = useSelector(state => state.userReducer.users)
  const role = localStorage.getItem('role')
  console.log(users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleCreateCustomer = (data) => {
    addUser(data, dispatch);
    navigate(`/admin/customers/create`);
}
const handleDelete = (id) => {
  const confirmDelete =   window.confirm("Bạn muốn xóa chứ !")
  if(confirmDelete){
    deleteUser(id, dispatch);
  }
}

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <button onClick={handleCreateCustomer} className="bg-yellow-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Create Customer</button>
      <Header category="Page" title="Custommer" />
      <table className="min-w-full leading-normal ">
        <thead>
          <tr>
            <td className="px-5 py-2 border-b-2  border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</td>
            <td className="px-2 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Email</td>
            <td className="px-2 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Phone</td>
            <td className="px-2 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Dob</td>
            <td className="px-2 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Gender</td>
            <td className="px-2 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Address</td>
            <td colSpan={2} className=" text-center px-4 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider colSpan={'2'}"  >Action</td>
          </tr>
        </thead>
        <tbody>
          {role &&
            users.map((user, index) => (
              <tr key = {user._id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{user.name}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{user.email}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{user.phone} </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{user.dob} </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{user.gender} </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{user.address} </td>
                <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm" >  <button style={{ position: "relative", left: "10px" }} className="bg-yellow-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                  Update
                </button> </td>
                <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">  <button style={{ position: "relative", left: "10px" }} className="bg-yellow-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full"  onClick={()=>{handleDelete(user._id)}}>
                  Delete
                </button> </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default Customers;
