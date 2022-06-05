import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route, Link, Router, Switch} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import App from "./App"
import Login from './components/login';
import Dashboard from './components/dashboard';
import Orders from './components/orders';
import Repairs from './components/repairs';
import Repair from "./components/repairs_dashboard";
import AddMachineData from "./components/AddMachineData";
import EditMachineData from "./components/EditMachineData";
import MachineDashboard from "./components/machine_dashboard";

ReactDOM.render(
    <BrowserRouter>
        <React.Fragment>


            <Routes>

                <Route exact path="/" element={<Login/>}/>



                <Route exact path="/dashboard" element={<Dashboard/>}/>
                <Route exact path="/machine/:id" element={<EditMachineData/>}/>
                <Route exact path="/machine/add" element={<AddMachineData/>}/>
                <Route exact path="/machine" element={<MachineDashboard/>}/>
                <Route exact path="/repairs" element={<Repair/>}/>

                <Route path="/orders/:id" element={<Orders/>}/>

                <Route path="/repairs/:id" element={<Repairs/>}/>

            </Routes>
        </React.Fragment>
    </BrowserRouter>,
    document.getElementById("root")
);

reportWebVitals();
