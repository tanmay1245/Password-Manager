import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute";
import Home from "./Components/Home";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup.js"
import Create from "./Components/Create.js";
import Edit from "./Components/Edit.js"
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PrivateRoute />}>
                    <Route path="/" element={<Home></Home>}></Route>
                    <Route path="/create" element={<Create></Create>}></Route>
                    <Route path="/edit/:id" element={<Edit></Edit>}></Route>
                </Route>
                <Route path="/signin" element={<Signin></Signin>}></Route>
                <Route path="/Signup" element={<Signup></Signup>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
