import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { clearUser } from "../redux/user.js"
import Panel from "./Panel.js";


const Home = () => {
    const navigate = useNavigate();
    const [passwords, setPasswords] = useState([]);
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

    const config = {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    }

    useEffect(() => {
        axios.get("/password/", config).then((response) => {
            setPasswords(response.data.passwords);
        });
    }, [])


    const logOutHandler = () => {
        localStorage.removeItem("token");
        dispatch(clearUser());
        navigate("/signin");
    };

    return (
        <div className="w-full h-screen bg-[#C3BBBE] py-16 font-poppins overflow-auto">
            <div className="w-full flex justify-center">
                <div className="w-[350px] sm:w-[600px]">
                    <div className="bg-[#000] text-white flex px-4 sm:px-8 py-4 sm:py-6 rounded-2xl justify-between">
                        <div className="flex items-center">
                            <img alt="logo" src="./logo.jpg" className="w-8 h-8 mr-1"></img>
                            <span className="text-lg sm:text-xl font-bold">Password Manager</span>
                        </div>
                        <div className="flex justify-center">
                            <button onClick={logOutHandler} className="flex items-center justify-center hover:text-[#F8C351]">
                                <span className="mr-2">Logout</span>
                                <MdLogout className=""></MdLogout>
                            </button>
                        </div>
                    </div>
                    <div className="mt-4">
                        <Link to="/create">
                            <button className="bg-[#018B78] hover:opacity-75 rounded-lg px-4 py-2">
                                <span className="text-white font-medium">Add New Password</span>
                            </button>
                        </Link>
                    </div>
                    {
                        passwords.length > 0 && (
                            <div className="mt-4">
                                {
                                    passwords.map((password, index) => (
                                        <Panel password={password} key={index}></Panel>
                                    ))
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </div >
    )
}

export default Home