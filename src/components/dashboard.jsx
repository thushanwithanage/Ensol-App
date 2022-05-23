import React, { Component } from "react";
import axios from "axios";

import BarChart from "../charts/BarChart";
import { Button} from 'react-bootstrap';
import "../vendors/ti-icons/css/themify-icons.css";
import "../vendors/base/vendor.bundle.base.css";
import { Link } from "react-router-dom";
import "../css/style.css";

class Dashboard extends Component {
  state = {
    orders: [],
    repair_count: 0,
    total_machines: 0,
    rented_machines: 0,
    user_count: 0
  };

  handleRowClick = (id) => {
    /*<Link
      to={{
        pathname: "/orders",
        id: id
      }}
    ></Link>*/
    window.location.href = "/orders/search?id=" +id;
  }

  render() {

    return (
        <div class="container-scroller">
    
    <nav class="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        <img alt="logo image" className="login_logo" src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'/>
      </div>
      <div class="navbar-menu-wrapper d-flex align-items-center justify-content-end">
        <button class="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
          <span class="ti-view-list"></span>
        </button>
        <ul class="navbar-nav mr-lg-2">
          <li class="nav-item nav-search d-none d-lg-block">
            <div class="input-group">
              <div class="input-group-prepend hover-cursor" id="navbar-search-icon">
                <span class="input-group-text" id="search">
                  <i class="ti-search"></i>
                </span>
              </div>
              <input type="text" class="form-control" id="navbar-search-input" placeholder="Search" aria-label="search" aria-describedby="search"/>
            </div>
          </li>
        </ul>
        <ul class="navbar-nav navbar-nav-right">
          <li class="nav-item dropdown me-1">
            <a class="nav-link count-indicator dropdown-toggle d-flex justify-content-center align-items-center" id="messageDropdown" data-bs-toggle="dropdown">
              <i class="ti-email mx-0"></i>
            </a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link count-indicator dropdown-toggle" id="notificationDropdown" data-bs-toggle="dropdown">
              <i class="ti-bell mx-0"></i>
              <span class="count"></span>
            </a>
            <div class="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="notificationDropdown">
              <p class="mb-0 font-weight-normal float-left dropdown-header">Notifications</p>
              <a class="dropdown-item">
              </a>
              <a class="dropdown-item">
                <div class="item-thumbnail">
                  <div class="item-icon bg-warning">
                    <i class="ti-settings mx-0"></i>
                  </div>
                </div>
              </a>
              <a class="dropdown-item">
                <div class="item-thumbnail">
                  <div class="item-icon bg-info">
                    <i class="ti-user mx-0"></i>
                  </div>
                </div>
              </a>
            </div>
          </li>
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

          <div class="row">
            <div class="col-md-6 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <p class="card-title">Sales details</p>
                  <p class="text-muted font-weight-light">Received overcame oh sensible so at an. Formed do change merely to county it. Am separate contempt domestic to to oh. On relation my so addition branched.</p>
                  <div id="sales-legend" class="chartjs-legend mt-4 mb-2"></div>
                  <div style={{marginLeft:'50px'}}>
                    <BarChart story={10} bug={2} task={8} epic={4} sub={6} title={"Issue statistics: Type"}/>
                  </div>
                </div>
                <div class="card border-right-0 border-left-0 border-bottom-0">
                  <div class="d-flex justify-content-center justify-content-md-end">
                    <div class="dropdown flex-md-grow-1 flex-xl-grow-0">
                      <button class="btn btn-lg btn-outline-light dropdown-toggle rounded-0 border-top-0 border-bottom-0" type="button" id="dropdownMenuDate2" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        Today
                      </button>
                      <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuDate2">
                        <a class="dropdown-item" href="#">January - March</a>
                        <a class="dropdown-item" href="#">March - June</a>
                        <a class="dropdown-item" href="#">June - August</a>
                        <a class="dropdown-item" href="#">August - November</a>
                      </div>
                    </div>
                    <button class="btn btn-lg btn-outline-light text-primary rounded-0 border-0 d-none d-md-block" type="button"> View all </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 grid-margin stretch-card">
              <div class="card border-bottom-0">
                <div class="card-body pb-0">
                  <p class="card-title">Purchases</p>
                  <p class="text-muted font-weight-light">The argument in favor of using filler text goes something like this: If you use real content in the design process, anytime you reach a review</p>
                  <div class="d-flex flex-wrap mb-5">
                    <div class="me-5 mt-3">
                      <p class="text-muted">Status</p>
                      <h3>362</h3>
                    </div>
                    <div class="me-5 mt-3">
                      <p class="text-muted">New users</p>
                      <h3>187</h3>
                    </div>
                    <div class="me-5 mt-3">
                      <p class="text-muted">Chats</p>
                      <h3>524</h3>
                    </div>
                    <div class="mt-3">
                      <p class="text-muted">Feedbacks</p>
                      <h3>509</h3>
                    </div> 
                  </div>
                </div>
                <canvas id="order-chart" class="w-100"></canvas>
              </div>
            </div>
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
                          <th>Username</th>
                          <th>User address</th>
                          <th>Telephone</th>
                          <th>Price</th>
                          <th>Order status</th>
                        </tr>
                      </thead>
                      <tbody>

                          {this.state.orders ? this.state.orders.map((order) => (
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
          <div class="row">
            <div class="col-md-12 grid-margin stretch-card">
              <div class="card position-relative">
                <div class="card-body">
                  <p class="card-title">Detailed Reports</p>
                  <div class="row">
                    <div class="col-md-12 col-xl-3 d-flex flex-column justify-content-center">
                      <div class="ml-xl-4">
                        <h1>33500</h1>
                        <h3 class="font-weight-light mb-xl-4">Sales</h3>
                        <p class="text-muted mb-2 mb-xl-0">The total number of sessions within the date range. It is the period time a user is actively engaged with your website, page or app, etc</p>
                      </div>  
                    </div>
                    <div class="col-md-12 col-xl-9">
                      <div class="row">
                        <div class="col-md-6 mt-3 col-xl-5">
                          <canvas id="north-america-chart"></canvas>
                          <div id="north-america-legend"></div>
                        </div>
                        <div class="col-md-6 col-xl-7">
                          <div class="table-responsive mb-3 mb-md-0">
                            <table class="table table-borderless report-table">
                              <tr>
                                <td class="text-muted">Illinois</td>
                                <td class="w-100 px-0">
                                  <div class="progress progress-md mx-4">
                                    <div class="progress-bar bg-primary" role="progressbar" style={{width: '70%'}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"></div>
                                  </div>
                                </td>
                                <td><h5 class="font-weight-bold mb-0">524</h5></td>
                              </tr>
                              <tr>
                                <td class="text-muted">Washington</td>
                                <td class="w-100 px-0">
                                  <div class="progress progress-md mx-4">
                                    <div class="progress-bar bg-primary" role="progressbar" style={{width: '30%'}} aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                                  </div>
                                </td>
                                <td><h5 class="font-weight-bold mb-0">722</h5></td>
                              </tr>
                              <tr>
                                <td class="text-muted">Mississippi</td>
                                <td class="w-100 px-0">
                                  <div class="progress progress-md mx-4">
                                    <div class="progress-bar bg-primary" role="progressbar" style={{width: '95%'}} aria-valuenow="95" aria-valuemin="0" aria-valuemax="100"></div>
                                  </div>
                                </td>
                                <td><h5 class="font-weight-bold mb-0">173</h5></td>
                              </tr>
                              <tr>
                                <td class="text-muted">California</td>
                                <td class="w-100 px-0">
                                  <div class="progress progress-md mx-4">
                                    <div class="progress-bar bg-primary" role="progressbar" style={{width: '60%'}} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                                  </div>
                                </td>
                                <td><h5 class="font-weight-bold mb-0">945</h5></td>
                              </tr>
                              <tr>
                                <td class="text-muted">Maryland</td>
                                <td class="w-100 px-0">
                                  <div class="progress progress-md mx-4">
                                    <div class="progress-bar bg-primary" role="progressbar" style={{width: '40%'}} aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                                  </div>
                                </td>
                                <td><h5 class="font-weight-bold mb-0">553</h5></td>
                              </tr>
                              <tr>
                                <td class="text-muted">Alaska</td>
                                <td class="w-100 px-0">
                                  <div class="progress progress-md mx-4">
                                    <div class="progress-bar bg-primary" role="progressbar" style={{width: '75%'}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                                  </div>
                                </td>
                                <td><h5 class="font-weight-bold mb-0">912</h5></td>
                              </tr>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
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
        order.color = "Red";
      }
      else if(order.orderStatus == 1)
      {
        order.orderStatus = "Completed";
        order.color = "Green";
      }
      else if(order.orderStatus == 2)
      {
        order.orderStatus = "Ongoing";
        order.color = "Yellow";
      }
      else if(order.orderStatus == 3)
      {
        order.orderStatus = "Pending";
        order.color = "Blue";
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

    this.setState({ orders: allOrders, repair_count: data.data.top_values.repair_count, total_machines: data.data.top_values.total_machines, rented_machines: data.data.top_values.rented_machines, user_count: data.data.top_values.user_count });
  }

}

export default Dashboard;
