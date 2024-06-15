import axios from "axios";
import React, { useState } from 'react'
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Create = () => {
    const [show, setShow] = useState(false);
    const [website, setWebsite] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const { user } = useSelector((store) => store.user);

    const config = {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    }

    const submitHandler = () => {
        setError("");
        if (!website || !email || !password) {
            return setError("All fields are mandatory.");
        }
        axios.post("/password/create", { website, email, password, userid: user }, config).then((response) => {
            navigate("/");
        }).catch((error) => {
            if (error && error.response && error.response.data && error.response.data.error) {
                setError(error.response.data.error);

            } else {
                setError("Internal server error.")
            }
        });
    }

    return (
        <div className="w-full h-screen bg-[#C3BBBE] pt-16 font-poppins overflow-auto">
            <div className="w-full flex justify-center">
                <div className="w-[350px] sm:w-[500px] flex flex-col justify-center py-8 px-10">
                    <div className="flex justify-center">
                        <span className="text-xl font-bold">Store a New Password</span>
                    </div>
                    <div className="w-full mt-6">
                        {/* Website */}
                        <div className="w-full">
                            <input className="text-gray-600 w-full px-5 py-3 outline-none focus:border-2 focus:border-[#272123] border rounded-lg" placeholder="Website"
                                value={website} onChange={(e) => setWebsite(e.target.value)}>
                            </input>
                        </div>
                        {/* Username/Email */}
                        <div className="w-full mt-4">
                            <input className="text-gray-600 w-full px-5 py-3 outline-none focus:border-2 focus:border-[#272123] border rounded-lg" placeholder="Username / Email"
                                value={email} onChange={(e) => setEmail(e.target.value)}>
                            </input>
                        </div>
                        {/* Password */}
                        <div className="w-full mt-4 relative">
                            <input className="text-gray-600 w-full px-5 py-3 outline-none focus:border-2 focus:border-[#272123] border rounded-lg" placeholder="Password"
                                value={password} onChange={(e) => setPassword(e.target.value)} type={show ? "text" : "password"}>
                            </input>
                            <button onClick={() => setShow(!show)} className="absolute right-4 top-4">
                                {

                                    show ? <FiEyeOff></FiEyeOff> : <FiEye></FiEye>
                                }
                            </button>
                        </div>
                        {/* Button */}
                        <div className="w-full mt-6 flex">
                            <button className="w-full bg-[#F2F2F2] rounded-lg text-black py-3 font-semibold hover:opacity-75 mr-3"
                                onClick={() => navigate("/")}>
                                Cancel
                            </button>
                            <button className="w-full bg-[#018B78] rounded-lg text-white py-3 shadow-xl font-semibold hover:opacity-75 ms-2"
                                onClick={submitHandler}>
                                Submit
                            </button>
                        </div>
                        {
                            error && (
                                <div className="mt-4 bg-[#730202] text-[#fff] text-sm py-3 px-4">
                                    <span>{error}</span>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Create