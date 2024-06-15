import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaRegCopy } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import axios from "axios";

const Panel = (props) => {
    const { password } = props;
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [showPopup, setShowpopup] = useState(false);

    const config = {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    }

    const deleteHandler = (id) => {
        axios.post(`/password/delete/${id}`, {}, config).then((response) => {
            window.location.reload()
        });
    };

    return (
        <div className="bg-white mt-4 px-4 sm:px-8 py-3 rounded-2xl">
            <div className=" border-b-2 pb-1 flex justify-between">
                <div>
                    <span className="font-semibold">{password.website}</span>
                </div>
                <div>
                    <button className="mr-3 bg-[#018B78] p-1 rounded-full text-white hover:opacity-85" title="Edit"
                        onClick={() => navigate(`/edit/${password.id}`)}>
                        <MdModeEdit></MdModeEdit>
                    </button>
                    <button className="bg-[#018B78] p-1 rounded-full text-white hover:opacity-85" title="Delete"
                        onClick={() => {
                            deleteHandler(password.id)
                        }}>
                        <MdDelete></MdDelete>
                    </button>
                </div>
            </div>
            <div className="mt-1 text-sm text-gray-600 font-medium">
                <div>
                    <span>{password.email}</span>
                </div>
                <div className="flex items-center mt-1">
                    <div className="mr-8 flex items-center">
                        <span>
                            {
                                show ? password.password : "*".repeat(password.password.length)
                            }
                        </span>
                    </div>

                    <div className="flex justify-center relative">
                        <button className="mr-2 hover:text-[#018B78]" title="Copy to Clipboard"
                            onClick={() => {
                                navigator.clipboard.writeText(password.password);
                                setShowpopup(true);
                                setTimeout(() => {
                                    setShowpopup(false);
                                }, 1200)
                            }}>
                            <FaRegCopy></FaRegCopy>
                        </button>
                        <button onClick={() => setShow(!show)} className="hover:text-[#018B78]" title="Show/Hide">
                            {

                                show ? <FiEyeOff></FiEyeOff> : <FiEye></FiEye>
                            }
                        </button>
                        {
                            showPopup && (
                                <div className="absolute -top-8 left-4 flex w-60 bg-black opacity-75 text-white px-2 py-1 rounded-md">
                                    <span>Password copied to clipbaord</span>
                                </div>
                            )
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Panel