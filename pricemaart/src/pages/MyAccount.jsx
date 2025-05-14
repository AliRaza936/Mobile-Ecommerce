import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../App";
import { useDispatch } from "react-redux";

import axios from "axios";
import BASE_URL from "../../apiConfig";

const MyAccount = () => {
    const [activeTab, setActiveTab] = useState("details");
    // const dispatch = useDispatch();
    const context = useContext(MyContext);
  
    const [loading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState("");
  
    // State for user details
    const [formField, setFormField] = useState({
      name: '',
      email:'',
      phone:'',
    });
  
    // State for password change
    const [passwordData, setPasswordData] = useState({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  
    // Update state when userData is available

  
    // Handle form input changes
    const handleChange = (e) => {
      setFormField({ ...formField, [e.target.name]: e.target.value });
    };
  
    // Handle password input changes
    const handlePasswordChange = (e) => {
      setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };
  
    // Handle user detail update
    let singleUserData = async () => {
   
      let userId = JSON.parse(localStorage.getItem('user')).userId


          if(userId){
             try {
          let result = await axios.get(
            `${BASE_URL}/user/single/${userId}`,

           
            {
             
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
         setFormField(result?.data?.user)
         
        } catch (error) {
          console.log(error);
    
    
        }
        
          }
       
      } ;
    let handleSubmit = async (e) => {
        e.preventDefault();
      let userId = JSON.parse(localStorage.getItem('user')).userId

        setIsLoading(true)


        
        try {
          let result = await axios.put(
            `${BASE_URL}/user/update/${userId}`,
            formField,
            {
             
                  
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log(result)
          setIsLoading(false)
         context.setOpen({open:true,message:result?.data?.message,severity:'success'})
        
         
     
          
        } catch (error) {
          console.log(error);
       context. setOpen({open:true,message:error.response.data.message,severity:'error'})

          setIsLoading(false)
    
        }
        
      } ;

        let handleChangePassword = async(e)=>{

          e.preventDefault();
          setIsLoading(true)
          
      let userId = JSON.parse(localStorage.getItem('user')).userId

          
          try {
            let result = await axios.put(
              `${BASE_URL}/user/changePassword/${userId}`,
              passwordData,
              {
              
                    
                withCredentials: true,
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            console.log(result)
            setIsLoading(false)
           context.setOpen({open:true,message:result?.data?.message,severity:'success'})
           setPasswordData({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
           
       
            
          } catch (error) {
            console.log(error);
         context. setOpen({open:true,message:error.response.data.message,severity:'error'})
  
            setIsLoading(false)
      
          }

        }
      useEffect(()=>{
        singleUserData()
      },[])
  
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10 mb-4">
      <div className="flex justify-between border-b pb-2 mb-4">
        <button
          onClick={() => setActiveTab("details")}
          className={`px-4 py-2 ${activeTab === "details" ? "border-b-2 border-primary text-primary" : "text-gray-600"}`}
        >
          Account Details
        </button>
        <button
          onClick={() => setActiveTab("password")}
          className={`px-4 py-2 ${activeTab === "password" ? "border-b-2 border-primary text-primary" : "text-gray-600"}`}
        >
          Change Password
        </button>
      </div>

      {activeTab === "details" ? (
       <form onSubmit={handleSubmit}>
         <div className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={ formField.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formField.email}
              disabled
              className="w-full px-3 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={formField.phone}

              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <button className="w-full bg-primary text-white py-2 rounded-lg mt-4">{loading ? 'Save Changing...' : 'Save Changes'}</button>
        </div>
       </form>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700">Old Password</label>
            <input
              type="text"
              name="oldPassword"
              value={passwordData.oldPassword}
              onChange={handlePasswordChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <button onClick={handleChangePassword} className="w-full bg-primary text-white py-2 rounded-lg mt-4">Update Password</button>
        </div>
      )}
    </div>
  );
};

export default MyAccount;
