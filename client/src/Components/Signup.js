import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { addUser } from "../redux/user.js";
import { useDispatch } from "react-redux"

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signUpHandler = () => {
        setError("");
        if (!username || !email || !password) {
            return setError("All three fields are mandatory.")
        }
        axios.post("/auth/signup", { username, email, password }).then((response) => {
            if (response && response.data && response.data.success) {
                localStorage.setItem("token", response.data.token);
                dispatch(addUser(response.data.id));
                navigate("/");
            }
        }).catch((error) => {
            if (error && error.response && error.response.data && error.response.data.errno === 1062) {
                setError("Username or email already exist.")
            } else {
                setError("Internal server error.")
            }

        })
    }

    return (
        <div className="bg-[#F3F9FF] h-screen w-full overflow-auto font-poppins">
            <div className="w-full flex justify-center">
                <div className="mt-32 w-[350px] sm:w-[430px] bg-[#fff] shadow-xl shadow-[#DFE4EA] rounded-lg">
                    <div className="py-8 px-10">
                        <div className="w-full flex justify-center">
                            <span className="text-xl font-bold">Sign Up</span>
                        </div>
                        <div className="w-full mt-6">
                            {/* Username */}
                            <div className="w-full">
                                <input className="text-gray-600 w-full px-4 py-2 outline-none focus:border-1 focus:border-[#005EE1] border shadow-md shadow-[#efefef] rounded-md" placeholder="Username"
                                    value={username} onChange={(e) => setUsername(e.target.value)}>
                                </input>
                            </div>
                            {/* Email */}
                            <div className="w-full mt-4">
                                <input className="text-gray-600 w-full px-4 py-2 outline-none focus:border-1 focus:border-[#005EE1] border shadow-md shadow-[#efefef] rounded-md" placeholder="Email"
                                    value={email} onChange={(e) => setEmail(e.target.value)}>
                                </input>
                            </div>
                            {/* Password */}
                            <div className="w-full mt-4 relative">
                                <input className="text-gray-600 w-full px-4 py-2 outline-none focus:border-1 focus:border-[#005EE1] border shadow-md shadow-[#efefef] rounded-md" placeholder="Password"
                                    value={password} onChange={(e) => setPassword(e.target.value)} type={show ? "text" : "password"}>
                                </input>
                                <button onClick={() => setShow(!show)} className="absolute right-4 top-3">
                                    {

                                        show ? <FiEyeOff></FiEyeOff> : <FiEye></FiEye>
                                    }
                                </button>
                            </div>
                            {/* Sign In */}
                            <div className="w-full mt-3 flex justify-end">
                                <div className="text-sm text-gray-500">
                                    Already have an Account? <Link to="/signin" className="text-[#005EE1] font-medium hover:underline">Sign In</Link>
                                </div>
                            </div>
                            {/* Button */}
                            <div className="w-full mt-6">
                                <button className="w-full bg-[#005EE1] rounded-md text-white py-2 shadow-xl font-semibold hover:opacity-75"
                                    onClick={signUpHandler}>
                                    Sign Up
                                </button>
                            </div>
                            {
                                error && (
                                    <div className="mt-2 bg-[#730202] text-[#fff] text-sm py-3 px-4">
                                        <span>{error}</span>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup