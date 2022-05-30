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

class Repair extends Component {
    state = {
        orders: [],
        startDate: new Date(),
        endDate: new Date(),
        startDate2: new Date(),
        endDate2: new Date(),
        filteredOrders: [],
        filterOn: false,
        filterOn2: false,
        repairs: [],
        filteredRepairs: [],
        repair_count: 0,
        total_machines: 0,
        rented_machines: 0,
        filterText: "Filter",
        filterText2: "Filter",
        filterResetText: "Reset",
        filterResetText2: "Reset",
        user_count: 0
    };

    handleRowClick = (id) => {
        window.location.href = "/orders/search?id=" + id;
    }

    handleRowClick2 = (id) => {
        window.location.href = "/repairs/search?id=" + id;
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

    setEndDate2 = (edate) => {
        this.setState({endDate2: edate})
    }

    handleDateChange = (date) => {
        this.state.startDate = date;
    }

    logOut =  async (e) => {
        sessionStorage.clear();
        window.location.href = "/";
    }

    filterHandler = async (e) => {
        e.preventDefault();
        // this.state.filterOn = !this.state.filterOn;
        //
        // if (this.state.filterOn == true) {
        let orderFilter = {
            endDate: this.state.endDate,
            startDate: this.state.startDate
        };
        let {data} = await axios.post("https://ensolapi.herokuapp.com/admin/order/filter", orderFilter, {
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("token")
            },
        });

        let filteredList = data.data.orders.map((order) => {
            if (order.orderStatus == 0) {
                order.orderStatus = "Cancelled";
                order.color = "#F44336";
            } else if (order.orderStatus == 1) {
                order.orderStatus = "Completed";
                order.color = "#4CAF50";
            } else if (order.orderStatus == 2) {
                order.orderStatus = "Accepted";
                order.color = "#3F51B5";
            } else if (order.orderStatus == 3) {
                order.orderStatus = "Pending";
                order.color = "#FF5722";
            }
            return {
                id: order.id,
                username: order.user.name,
                address: order.user.address,
                telephone: order.user.telephone,
                price: order.price,
                status: order.orderStatus,
                color: order.color
            };
        });

        this.setState({filteredOrders: filteredList})
        // } else {
        //     this.setState({filteredOrders: this.state.orders, filterText: "Filter"})
        // }
    }
    filterReset = async (e) => {
        e.preventDefault();
        this.state.filterOn = false;


        this.setState({filteredOrders: this.state.orders})

    }

    filterHandler2 = async (e) => {
        e.preventDefault();
        this.state.filterOn2 = !this.state.filterOn2;

        if (this.state.filterOn2 == true) {
            let repairFilter = {
                endDate: this.state.endDate2,
                startDate: this.state.startDate2
            };
            let {data} = await axios.post("https://ensolapi.herokuapp.com/admin/repair/filter", repairFilter, {
                headers: {
                    "Authorization": "Bearer " + sessionStorage.getItem("token")
                },
            });

            let filteredList = data.data.repairs.map((repair) => {
                if (repair.status == 0) {
                    repair.status = "Cancelled";
                    repair.color = "#F44336";
                } else if (repair.status == 1) {
                    repair.status = "Completed";
                    repair.color = "#4CAF50";
                } else if (repair.status == 2) {
                    repair.status = "Accepted";
                    repair.color = "#3F51B5";
                } else if (repair.status == 3) {
                    repair.status = "Pending";
                    repair.color = "#FF5722";
                }
                return {
                    id: repair.id,
                    description: repair.description,
                    username: repair.order.user.name,
                    address: repair.order.user.address,
                    telephone: repair.order.user.telephone,
                    status: repair.status,
                    color: repair.color
                };
            });

            this.setState({filteredRepairs: filteredList, filterText2: "View all"})
        } else {
            this.setState({filteredRepairs: this.state.repairs, filterText2: "Filter"})
        }
    }


    render() {
        function s(){

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


                                            <NavDropdown.Item onClick={this.logOut} >Logout</NavDropdown.Item>


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
                                            <h4 class="font-weight-bold mb-0">Repairs</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div style={{textAlign: 'right'}}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Start Date"
                                        value={this.state.startDate2}
                                        onChange={date => this.setStartDate2(date)}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>

                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        id="date-picker-inline2"
                                        label="End Date"
                                        value={this.state.endDate2}
                                        onChange={date => this.setEndDate2(date)}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>

                                <button style={{marginTop: 15, color: 'white'}} type="submit"
                                        class="btn btn-warning me-2"
                                        onClick={this.filterHandler2}>{this.state.filterText2}</button>

                            </div>

                            <div class="row">
                                <div class="col-md-12 grid-margin stretch-card">
                                    <div class="card position-relative">
                                        <div class="card-body">
                                            <p class="card-title mb-0">Repairs</p>
                                            <div class="table-responsive">
                                                <table class="table table-hover">
                                                    <thead>
                                                    <tr>
                                                        <th>Repair Id</th>
                                                        <th>Description</th>
                                                        <th>Customer</th>
                                                        <th>Customer address</th>
                                                        <th>Telephone</th>
                                                        <th>Repair status</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>

                                                    {this.state.filteredRepairs ? this.state.filteredRepairs.map((repair) => (
                                                        <tr key={repair.id}
                                                            onClick={() => this.handleRowClick2(repair.id)}>
                                                            <td>{repair.id}</td>
                                                            <td>{repair.description.substring(0, 20)}</td>
                                                            <td>{repair.username}</td>
                                                            <td>{repair.address}</td>
                                                            <td>{repair.telephone}</td>
                                                            <td><Button style={{
                                                                backgroundColor: repair.color,
                                                                borderColor: repair.color,
                                                                color: 'white',
                                                                width: '125px'
                                                            }}>{repair.status}</Button></td>
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
        let {data} = await axios.get("https://ensolapi.herokuapp.com/admin/dashboardValues", {
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("token")
            },
        });

        let allOrders = data.data.orders.map((order) => {
            if (order.orderStatus == 0) {
                order.orderStatus = "Cancelled";
                order.color = "#F44336";
            } else if (order.orderStatus == 1) {
                order.orderStatus = "Completed";
                order.color = "#4CAF50";
            } else if (order.orderStatus == 2) {
                order.orderStatus = "Accepted";
                order.color = "#3F51B5";
            } else if (order.orderStatus == 3) {
                order.orderStatus = "Pending";
                order.color = "#FF5722";
            }
            return {
                id: order.id,
                username: order.user.name,
                address: order.user.address,
                telephone: order.user.telephone,
                price: order.price,
                status: order.orderStatus,
                color: order.color
            };
        });

        let allRepairs = data.data.repairs.map((repair) => {
            if (repair.status == 0) {
                repair.status = "Cancelled";
                repair.color = "#F44336";
            } else if (repair.status == 1) {
                repair.status = "Completed";
                repair.color = "#4CAF50";
            } else if (repair.status == 2) {
                repair.status = "Accepted";
                repair.color = "#3F51B5";
            } else if (repair.status == 3) {
                repair.status = "Pending";
                repair.color = "#FF5722";
            }
            return {
                id: repair.id,
                description: repair.description,
                username: repair.order.user.name,
                address: repair.order.user.address,
                telephone: repair.order.user.telephone,
                status: repair.status,
                color: repair.color
            };
        });

        this.setState({
            orders: allOrders,
            filteredOrders: allOrders,
            repairs: allRepairs,
            filteredRepairs: allRepairs,
            repair_count: data.data.top_values.repair_count,
            total_machines: data.data.top_values.total_machines,
            rented_machines: data.data.top_values.rented_machines,
            user_count: data.data.top_values.user_count
        });
    }
}

window.addEventListener("pageshow", function (event) {
    var historyTraversal = event.persisted || (typeof window.performance != "undefined" && window.performance.navigation.type === 2);
    if (historyTraversal) {
        window.location.reload();
    }
});

export default Repair;