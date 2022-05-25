import React, { Component } from "react";
import axios from "axios";

import { Button} from 'react-bootstrap';
import "../vendors/ti-icons/css/themify-icons.css";
import "../vendors/base/vendor.bundle.base.css";
import "../css/style.css";
import { DatePickerInput } from 'carbon-components-react';
import logo from "../images/company_logo.png";

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

class Dashboard extends Component {
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
    user_count: 0
  };

  handleRowClick = (id) => {
    window.location.href = "/orders/search?id=" +id;
  }

  handleRowClick2 = (id) => {
    window.location.href = "/repairs/search?id=" +id;
  }

  setStartDate = (sdate) => {
    this.setState({ startDate: sdate })
  }

  setEndDate = (edate) => {
    this.setState({ endDate: edate })
  }

  setStartDate2 = (sdate) => {
    this.setState({ startDate2: sdate })
  }

  setEndDate2 = (edate) => {
    this.setState({ endDate2: edate })
  }

  handleDateChange = (date) => {
    this.state.startDate = date;
  }

  filterHandler = async (e) => {
    e.preventDefault();
    this.state.filterOn = !this.state.filterOn;

    if(this.state.filterOn == true)
    {
      let orderFilter = {
        endDate: this.state.endDate,
        startDate: this.state.startDate
      };
      let { data } = await axios.post("https://ensolapi.herokuapp.com/admin/order/filter", orderFilter, {
        headers: {
          "Authorization": "Bearer " + sessionStorage.getItem("token")
        },
      });
  
      let filteredList = data.data.orders.map((order) => {
        if(order.orderStatus == 0)
        {
          order.orderStatus = "Cancelled";
          order.color = "#F44336";
        }
        else if(order.orderStatus == 1)
        {
          order.orderStatus = "Completed";
          order.color = "#4CAF50";
        }
        else if(order.orderStatus == 2)
        {
          order.orderStatus = "Accepted";
          order.color = "#3F51B5";
        }
        else if(order.orderStatus == 3)
        {
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
  
      this.setState({ filteredOrders: filteredList, filterText: "View all" })
    }
    else
    {
      this.setState({ filteredOrders: this.state.orders, filterText: "Filter" })
    }
  }

  filterHandler2 = async (e) => {
    e.preventDefault();
    this.state.filterOn2 = !this.state.filterOn2;

    if(this.state.filterOn2 == true)
    {
      let repairFilter = {
        endDate: this.state.endDate2,
        startDate: this.state.startDate2
      };
      let { data } = await axios.post("https://ensolapi.herokuapp.com/admin/repair/filter", repairFilter, {
        headers: {
          "Authorization": "Bearer " + sessionStorage.getItem("token")
        },
      });
  
      let filteredList = data.data.repairs.map((repair) => {
        if(repair.status == 0)
        {
          repair.status = "Cancelled";
          repair.color = "#F44336";
        }
        else if(repair.status == 1)
        {
          repair.status = "Completed";
          repair.color = "#4CAF50";
        }
        else if(repair.status == 2)
        {
          repair.status = "Accepted";
          repair.color = "#3F51B5";
        }
        else if(repair.status == 3)
        {
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
  
      this.setState({ filteredRepairs: filteredList, filterText2: "View all" })
    }
    else
    {
      this.setState({ filteredRepairs: this.state.repairs, filterText2: "Filter" })
    }
  }


  render() {

    return (
        <div class="container-scroller">
    
    <nav class="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">

      <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        <img style={{width:70, height:70}} src={logo}/>
      </div>
      <div class="navbar-menu-wrapper d-flex align-items-center justify-content-end">

        
        <ul class="navbar-nav navbar-nav-right">
          <li class="nav-item nav-profile dropdown">
            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" id="profileDropdown">
            <img alt="profile" src='https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'/>
            </a>
          </li>
        </ul>
        <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
          <span class="ti-view-list"></span>
        </button>
      </div>
    </nav>
    <div class="container-fluid page-body-wrapper">
      <nav class="sidebar sidebar-offcanvas" id="sidebar">
        <ul class="nav">
          <li class="nav-item">
            <a class="nav-link" href="index.html">
              <i class="ti-shield menu-icon"></i>
              <span class="menu-title">Dashboard</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
              <i class="ti-palette menu-icon"></i>
              <span class="menu-title">UI Elements</span>
              <i class="menu-arrow"></i>
            </a>
            <div class="collapse" id="ui-basic">
              <ul class="nav flex-column sub-menu">
                <li class="nav-item"> <a class="nav-link" href="pages/ui-features/buttons.html">Buttons</a></li>
                <li class="nav-item"> <a class="nav-link" href="pages/ui-features/typography.html">Typography</a></li>
              </ul>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="pages/forms/basic_elements.html">
              <i class="ti-layout-list-post menu-icon"></i>
              <span class="menu-title">Form elements</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="pages/charts/chartjs.html">
              <i class="ti-pie-chart menu-icon"></i>
              <span class="menu-title">Charts</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="pages/tables/basic-table.html">
              <i class="ti-view-list-alt menu-icon"></i>
              <span class="menu-title">Tables</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="pages/icons/themify.html">
              <i class="ti-star menu-icon"></i>
              <span class="menu-title">Icons</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-bs-toggle="collapse" href="#auth" aria-expanded="false" aria-controls="auth">
              <i class="ti-user menu-icon"></i>
              <span class="menu-title">User Pages</span>
              <i class="menu-arrow"></i>
            </a>
            <div class="collapse" id="auth">
              <ul class="nav flex-column sub-menu">
                <li class="nav-item"> <a class="nav-link" href="pages/samples/login.html"> Login </a></li>
                <li class="nav-item"> <a class="nav-link" href="pages/samples/login-2.html"> Login 2 </a></li>
                <li class="nav-item"> <a class="nav-link" href="pages/samples/register.html"> Register </a></li>
                <li class="nav-item"> <a class="nav-link" href="pages/samples/register-2.html"> Register 2 </a></li>
                <li class="nav-item"> <a class="nav-link" href="pages/samples/lock-screen.html"> Lockscreen </a></li>
              </ul>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="documentation/documentation.html">
              <i class="ti-write menu-icon"></i>
              <span class="menu-title">Documentation</span>
            </a>
          </li>
        </ul>
      </nav>
      <div class="main-panel">
        <div class="content-wrapper">
          <div class="row">
            <div class="col-md-12 grid-margin">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h4 class="font-weight-bold mb-0">Dashboard</h4>
                </div>
                <div>
                    <button type="button" class="btn btn-primary btn-icon-text btn-rounded">
                      <i class="ti-clipboard btn-icon-prepend"></i>Report
                    </button>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-3 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <p class="card-title text-md-center text-xl-left">Total Machines</p>
                  <div class="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                    <h3 class="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0">{this.state.total_machines}</h3>
                    
                    <i class="bi bi-bag-check-fill"></i>
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-bag-check-fill" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zm-.646 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
                      </svg>
                  </div>  
                  
                </div>
              </div>
            </div>
            <div class="col-md-3 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <p class="card-title text-md-center text-xl-left">Rented Machines</p>
                  <div class="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                    <h3 class="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0">{this.state.rented_machines}</h3>
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-bag-dash-fill" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zM6 9.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1H6z"/>
                      </svg>
                  </div>  
                  
                </div>
              </div>
            </div>
            <div class="col-md-3 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <p class="card-title text-md-center text-xl-left">Repairs Count</p>
                  <div class="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                    <h3 class="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0">{this.state.repair_count}</h3>
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-bag-x-fill" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zM6.854 8.146a.5.5 0 1 0-.708.708L7.293 10l-1.147 1.146a.5.5 0 0 0 .708.708L8 10.707l1.146 1.147a.5.5 0 0 0 .708-.708L8.707 10l1.147-1.146a.5.5 0 0 0-.708-.708L8 9.293 6.854 8.146z"/>
                      </svg>
                  </div>  
                  
                </div>
              </div>
            </div>
            <div class="col-md-3 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <p class="card-title text-md-center text-xl-left">User Count</p>
                  <div class="d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center">
                    <h3 class="mb-0 mb-md-2 mb-xl-0 order-md-1 order-xl-0">{this.state.user_count}</h3>
                     <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
                      <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                      <path fill-rule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
                      <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
                    </svg>
                  </div>  
                  
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
                  value={this.state.startDate}
                  onChange={date => this.setStartDate(date)} 
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
                  value={this.state.endDate}
                  onChange={date => this.setEndDate(date)} 
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>

              <button style={{marginTop: 15, color:'white'}} type="submit" class="btn btn-warning me-2" onClick={this.filterHandler}>{this.state.filterText}</button>

          </div>

          <div class="row">
            <div class="col-md-12 grid-margin stretch-card">
              <div class="card position-relative">
                <div class="card-body">
                  <p class="card-title mb-0">Orders</p>
                  <div class="table-responsive">
                    <table class="table table-hover">
                      <thead>
                        <tr>
                          <th>Order Id</th>
                          <th>Customer</th>
                          <th>Customer address</th>
                          <th>Telephone</th>
                          <th>Price</th>
                          <th>Order status</th>
                        </tr>
                      </thead>
                      <tbody>

                          {this.state.filteredOrders ? this.state.filteredOrders.map((order) => (
                            <tr key={order.id} onClick={() => this.handleRowClick(order.id)}>
                            <td>{order.id}</td>
                            <td>{order.username}</td>
                            <td>{order.address}</td>
                            <td>{order.telephone}</td>
                            <td>{order.price}</td>
                            <td><Button style={{backgroundColor: order.color, borderColor: order.color, color: 'white', width: '125px'}}>{order.status}</Button></td>
                          </tr>
                          )) : null}
                      </tbody>
                    </table>
                  </div>
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

              <button style={{marginTop: 15, color:'white'}} type="submit" class="btn btn-warning me-2" onClick={this.filterHandler2}>{this.state.filterText2}</button>

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
                            <tr key={repair.id} onClick={() => this.handleRowClick2(repair.id)}>
                            <td>{repair.id}</td>
                            <td>{repair.description.substring(0,20)}</td>
                            <td>{repair.username}</td>
                            <td>{repair.address}</td>
                            <td>{repair.telephone}</td>
                            <td><Button style={{backgroundColor: repair.color, borderColor: repair.color, color: 'white', width: '125px'}}>{repair.status}</Button></td>
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

  



  async componentDidMount()
  {
    let { data } = await axios.get("https://ensolapi.herokuapp.com/admin/dashboardValues", {
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      },
    });

    let allOrders = data.data.orders.map((order) => {
      if(order.orderStatus == 0)
      {
        order.orderStatus = "Cancelled";
        order.color = "#F44336";
      }
      else if(order.orderStatus == 1)
      {
        order.orderStatus = "Completed";
        order.color = "#4CAF50";
      }
      else if(order.orderStatus == 2)
      {
        order.orderStatus = "Accepted";
        order.color = "#3F51B5";
      }
      else if(order.orderStatus == 3)
      {
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
      if(repair.status == 0)
      {
        repair.status = "Cancelled";
        repair.color = "#F44336";
      }
      else if(repair.status == 1)
      {
        repair.status = "Completed";
        repair.color = "#4CAF50";
      }
      else if(repair.status == 2)
      {
        repair.status = "Accepted";
        repair.color = "#3F51B5";
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

    this.setState({ orders: allOrders, filteredOrders: allOrders, repairs: allRepairs, filteredRepairs: allRepairs, repair_count: data.data.top_values.repair_count, total_machines: data.data.top_values.total_machines, rented_machines: data.data.top_values.rented_machines, user_count: data.data.top_values.user_count });
  }
}

window.addEventListener( "pageshow", function ( event ) {
  var historyTraversal = event.persisted || ( typeof window.performance != "undefined" && window.performance.navigation.type === 2 );
  if ( historyTraversal ) {
    window.location.reload();
  }
});

export default Dashboard;