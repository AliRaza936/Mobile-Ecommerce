import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";

import React, { useContext, useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";

import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { MyContext } from "../App";

import { MdDelete, MdEdit } from "react-icons/md";
import BASE_URL from "../../apiConfig";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
        theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[800];
    return {
        backgroundColor,
        height: theme.spacing(3),
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        "&:hover, &:focus": {
            backgroundColor: emphasize(backgroundColor, 0.06),
            color: "#5fd90d",
        },
        "&:active": {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(backgroundColor, 0.12),
        },
    };
});

const ProductRam = () => {
    const [open, setOpen] = React.useState({ open: false, message: '', severity: '' });
    let context = useContext(MyContext)
    let [allRms, setallRms] = useState({});
    const [isUpdate, setIsUpdate] = useState(false);
const [updateId, setUpdateId] = useState(null);



    let [inputField, setInputField] = useState({
        name: ''
    });


    let [isLoading, setIsLoading] = useState(false)




    let handleChange = (e) => {
        setInputField(() => ({
            ...inputField,
            [e.target.name]: e.target.value,
        }));
    };


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    let allRams = async () => {
        try {
            let result = await axios.get(`${BASE_URL}/product/productRam/all`, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            })

            setallRms(result.data)



        } catch (error) {
            console.log(error)
            setOpen({ open: true, message: error.response.data.message, severity: 'error' })


        }
    }
    let handleDelete = async (id) => {
         if (context.role !== 'admin') {
    // If the role is not admin, show an alert
            setOpen({open:true,message: 'Only admin can use this resource',severity:'error'})

    return ; // Optionally return null to prevent rendering the resource
  }

        try {
            let result = await axios.delete(`${BASE_URL}/product/productRam/delete/${id}`, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                }
            })
            setOpen({ open: true, message: result?.data?.message, severity: 'success' })


            allRams()
        } catch (error) {
            console.log(error)
            setOpen({ open: true, message: error.response.data.message, severity: 'error' })
        }
    }
    let handleSubmit = async (e) => {
       
        e.preventDefault();


        console.log(inputField)
        if (inputField.name === '') {
            setOpen({ open: true, message: 'please add product ram', severity: 'error' })
            return

        }
 if (context.role !== 'admin') {
    // If the role is not admin, show an alert
            setOpen({open:true,message: 'Only admin can use this resource',severity:'error'})

    return ; // Optionally return null to prevent rendering the resource
  }
        setIsLoading(true)
        context.setProgress(30)
            if(isUpdate){
                hanldeUpdate(updateId)
            }
            else{
                try {
            let result = await axios.post(
                `${BASE_URL}/product/productRam/create`,
                inputField,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            setInputField(prevState => ({
                ...prevState,
                name: ''
            }))
            setIsLoading(false)
            setOpen({ open: true, message: result?.data?.message, severity: 'success' })
            context.setProgress(100)

            allRams()


        } catch (error) {


            setIsLoading(false)
            context.setProgress(100)

            setOpen({ open: true, message: error.response.data.message, severity: 'error' })
        }
            }
        
    };


    let getSingleRam = async (id) => {
        try {
            let result = await axios.get(
                `${BASE_URL}/product/productRam/single/${id}`,

                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );


            console.log(result)
            setInputField({
                name : result?.data?.ram?.name
            })
            setIsUpdate(true);
            setUpdateId(id);
         



        } catch (error) {
            console.log(error);
            setIsLoading(false)

        }
    }

    let hanldeUpdate = async (id) => {
 if (context.role !== 'admin') {
    // If the role is not admin, show an alert
            setOpen({open:true,message: 'Only admin can use this resource',severity:'error'})

    return ; // Optionally return null to prevent rendering the resource
  }

        context.setProgress(30)
        setIsLoading(true)
        try {
            let result = await axios.put(
                `${BASE_URL}/product/productRam/update/${id}`,
                inputField,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            setIsLoading(false)
            setOpen({ open: true, message: result?.data?.message, severity: 'success' })
            context.setProgress(100)
            allRams()
            setIsUpdate(false);
            setUpdateId(null);
            setInputField((prevState) => ({ ...prevState, name: "" }));


        } catch (error) {
            console.log(error);
            context.setProgress(100)

            setOpen({ open: true, message: error.response.data.message, severity: 'error' })

            setIsLoading(false)

        }
    }
    const inputRef = useRef(null);

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, [inputField.name]);
    useEffect(() => {
        window.scrollTo(0, 0)
        allRams()
    }, [])
    return (
        <div className="p-4 ">
          <div className="w-full flex flex-col sm:flex-row justify-between p-4 sm:p-5 rounded-lg bg-white">
  <div>
    <h3 className="text-lg sm:text-xl font-semibold">Add Product Ram</h3>
  </div>
  <div role="presentation" className="mt-2 sm:mt-0">
    <Breadcrumbs aria-label="breadcrumb" className="text-sm sm:text-base">
      <StyledBreadcrumb
        sx={{ cursor: "default" }}
        component="a"
        href="#"
        label="Dashboard"
      />
      <StyledBreadcrumb sx={{ cursor: "default" }} label="Category" />
      <StyledBreadcrumb sx={{ cursor: "default" }} label="Add Product Ram" />
    </Breadcrumbs>
  </div>
</div>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mt-5 w-[70%] xs:w-full rounded-lg overflow-hidden">
                    <div className="bg-white flex flex-col gap-5 p-4">

                        <div className="flex gap-2 flex-col">
                            <label
                                htmlFor="sub"
                                className="text-[15px] font-semibold text-gray-700"
                            >
                                Product Ram
                            </label>
                            <input
                                type="text"
                                id="sub"
                                className="py-4 outline-none border border-gray-500 px-3 rounded-lg bg-gray-100 "
                                placeholder="Enter ram"
                                name="name"
                                ref={inputRef}
                                value={inputField.name}
                                onChange={handleChange}
                            />
                        </div>


                        <div className="w-full bg-green-500 rounded-md hover:bg-green-600 transition-all duration-300">
                            <Button type="submit" className="w-full flex gap-3">
                                {" "}
                                <span className="text-white text-3xl">
                                    <FaCloudUploadAlt />
                                </span>{" "}
                                <p className="text-white flex items-centerm gap-2 text-lg font-semibold">
                                    {isLoading === false ? "publish and view " : <CircularProgress color="inherit " className="loader" />}


                                </p>
                            </Button>
                        </div>
                    </div>
                </div>
            </form>


            <div className="px-3 pb-6 md:w-[70%] xs:[100%] min-h-[140px] bg-white rounded-md mt-6">
                <div className="relative  pt-5  ">

                    <table className="w-full table table-auto text-sm text-left  rtl:text-right">
                        <thead className=" text-white uppercase bg-green-500 ">
                            <tr>

                                <th scope="col" className="px-6 py-3">
                                    PRODUCT RAM
                                </th>


                                <th scope="col" className="px-6 py-3">
                                    ACTION
                                </th>

                            </tr>
                        </thead>

                        <tbody className="relative">
                            {

                                allRms?.rams?.length === 0 ? <div className=" absolute left-[50%] translate-x-[-50%] ">
                                    <h2 className="text-xl font-semibold mt-5 text-red-500">No Data Available</h2>
                                </div>
                                    :
                                    (

                                        allRms.rams &&
                                        allRms.rams
                                            .map((ram, index) => {
                                                return (
                                                    <tr key={index} className="bg-gray-50  hover:bg-green-100 bg-w border-b">



                                                        <td className="p-4 uppercase pl-4 text-gray-700 font-semibold text-[15px] ">
                                                            {ram.name}
                                                        </td>



                                                        <td className="px-6   ">
                                                            <div className="flex">

                                                                <button onClick={() => getSingleRam(ram._id)} className="bg-green-600 p-2 rounded-lg scale-90"><MdEdit className="text-[16px] text-white" /></button>
                                                                <button onClick={() => handleDelete(ram._id)} className="bg-red-500 p-2 rounded-lg scale-90"><MdDelete className="text-[16px] text-white" />


                                                                </button>

                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })


                                    )
                            }


                        </tbody>
                    </table>
                </div>
            </div>
            <Snackbar open={open.open} autoHideDuration={2000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={open.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {open.message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default ProductRam