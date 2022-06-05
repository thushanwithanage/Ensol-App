import React, {Component} from "react";
import axios from "axios";

import {Button, Nav, NavDropdown} from 'react-bootstrap';
import "../vendors/ti-icons/css/themify-icons.css";
import "../vendors/base/vendor.bundle.base.css";
import "../css/style.css";
import logo from "../images/company_logo.png";


import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {Link, useNavigate} from "react-router-dom";

class MachineDashboard extends Component {
    state = {
        machines: [],
        filteredMachines: [],
        startDate: new Date(),
        endDate: new Date(),

        filterOn: false,

        addText: "Add a Machine",
    };


    handleRowClick = (id) => {
        window.location.href = "/machine/search?id=" + id;
    }

    setStartDate = (sdate) => {
        this.setState({startDate: sdate})
    }

    setEndDate = (edate) => {
        this.setState({endDate: edate})
    }

    setStartDate2 = (sdate) => {
        this.setState({startDate2: sdate})
    }
    handleDateChange = (date) => {
        this.state.startDate = date;
    }

    logOut = async (e) => {
        sessionStorage.clear();
        window.location.href = "/";
    }
    filterReset = async (e) => {
        e.preventDefault();
        this.state.filterOn = false;


        this.setState({filteredOrders: this.state.machines})

    }

    machineAddHandler = async (e) => {
        e.preventDefault();

        window.location.href = "/machine/add";


    }


    render() {
        function s() {

        }

        return (
            <div class="container-scroller">

                <nav class="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">

                    <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                        <img style={{width: 70, height: 70}} src={logo}/>
                    </div>
                    <div class="navbar-menu-wrapper d-flex align-items-center justify-content-end">


                        <ul class="navbar-nav navbar-nav-right">
                            <li class="nav-item nav-profile dropdown">
                                <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" id="profileDropdown">
                                    <Nav>
                                        <NavDropdown title={sessionStorage.getItem("email")}>


                                            <NavDropdown.Item onClick={this.logOut}>Logout</NavDropdown.Item>


                                        </NavDropdown>
                                    </Nav>

                                </a>
                            </li>
                        </ul>
                        <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button"
                                data-toggle="offcanvas">
                            <span class="ti-view-list"/>
                        </button>
                    </div>
                </nav>
                <div class="container-fluid page-body-wrapper">
                    <nav class="sidebar sidebar-offcanvas" id="sidebar">
                        <ul class="nav">
                            <li class="nav-item">
                                <a class="nav-link" href="/dashboard">
                                    <i class="ti-shield menu-icon"/>
                                    <span class="menu-title">Dashboard</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" data-bs-toggle="collapse" href="/machine" aria-expanded="false"
                                   aria-controls="ui-basic">
                                    <i class="ti-plug menu-icon"/>
                                    <span class="menu-title">Machines</span>

                                </a>

                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/repairs">
                                    <i className="ti-settings menu-icon"/>
                                    <span class="menu-title">Repairs</span>
                                </Link>

                            </li>
                        </ul>
                    </nav>
                    <div class="main-panel">
                        <div class="content-wrapper">
                            <div class="row">
                                <div class="col-md-12 grid-margin">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h4 class="font-weight-bold mb-0">Machines</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div style={{textAlign: 'right'}}>


                                <button style={{marginTop: 15, color: 'white',marginBottom:15}} type="submit"
                                        class="btn btn-warning me-2"
                                        onClick={this.machineAddHandler}>{this.state.addText}</button>

                            </div>

                            <div class="row">
                                <div class="col-md-12 grid-margin stretch-card">
                                    <div class="card position-relative">
                                        <div class="card-body">

                                            <div class="table-responsive">
                                                <table class="table table-hover">
                                                    <thead>
                                                    <tr>
                                                        <th>Machine Id</th>
                                                        <th>Machine Type</th>
                                                        <th>Description</th>
                                                        <th>Rent Price(LKR)</th>
                                                        <th>Available Quantity</th>
                                                        <th>Image</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>

                                                    {this.state.filteredMachines ? this.state.filteredMachines.map((machine) => (
                                                        <tr key={machine.id}
                                                            onClick={() => this.handleRowClick(machine.id)}>
                                                            <td>{machine.id}</td>
                                                            <td>{machine.machineType}</td>
                                                            <td>{machine.description.substring(0, 20)}</td>
                                                            <td>{machine.rentPrice}</td>
                                                            <td>{machine.availableQuantity}</td>
                                                            <td>
                                                                <img style={{height: 100, width: 100}}
                                                                     alt="machine image" src={machine.image}/>

                                                            </td>
                                                        </tr>
                                                    )) : null}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <footer class="footer">
                            <div class="d-sm-flex justify-content-center justify-content-sm-between">
                                <span class="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © RWP 2022</span>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        );
    }


    async componentDidMount() {
        let {data} = await axios.get("https://ensolapi.herokuapp.com/machine", {
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("token")
            },
        });

        let machines = data.data.map((machine) => {

            return {
                id: machine.id,
                machineType: machine.machineType,
                description: machine.description,
                rentPrice: machine.rentPrice,
                availableQuantity: machine.availableQty,
                image: JSON.parse(machine.images)[0]
            };
        });


        this.setState({
            machines: machines,
            filteredMachines: machines
        });
    }
}

window.addEventListener("pageshow", function (event) {
    const historyTraversal = event.persisted || (typeof window.performance != "undefined" && window.performance.navigation.type === 2);
    if (historyTraversal) {
        window.location.reload();
    }
});

export default MachineDashboard;