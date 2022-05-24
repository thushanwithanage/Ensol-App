import React, { Component } from "react";
import axios from "axios";
//import "../css/Login.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Orders extends Component {
  state = {
    machines: [],
    oid: "",
    total: 0,
    odate: "",
    status: "",
    username: "",
    address: "",
    tele: "",
    newstatus: 0
  };

  notify(msg)
  {
    toast.error(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }

  onChangeHandler = (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index]
    const option =  el.getAttribute('id');  
    this.state.newstatus = option;
    console.log("Selected option " + option);
  }

  submitHandler = async (e) => {
    e.preventDefault();
    console.log('Order Status: ', this.state.newstatus);
    let status = {
        orderStatus: this.state.newstatus
    };
    if (navigator.onLine) 
    {
      try {

        if(status === -1)
        {
          this.notify("Invalid order status");
        }
        else
        {
          if (status) 
          {
            const { data } = await axios.put("https://ensolapi.herokuapp.com/order/" + this.state.oid, status, {
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("token")
            },
            });

            console.log(data);
            
            if (data.status) 
            {
              window.location.reload();
            } 
            else 
            {
              this.notify(data.data);
            }
          } 
          else 
          {
            this.notify("Failed to get the order status");
          }
        }
      } 
      catch (error) 
      {
        this.notify(error.message + " : " + error.response.data);
      }
    } else 
    {
      this.notify("Please check your internet connection");
    }
  };

  render() {
    return (
      <div>
        <div>
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Order Deails</h4>
                  <p class="card-description">
                    Order Id : {this.state.oid}
                  </p>
                  <form class="forms-sample">
                    <div class="form-group">
                      <label for="exampleInputName1">Order Total</label>
                      <input type="text" class="form-control" placeholder="Total" value={this.state.total}/>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputEmail3">Order Date</label>
                      <input type="text" class="form-control" placeholder="Order date" value={this.state.odate}/>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputEmail3">Order Status</label>
                      <input type="text" class="form-control" placeholder="Order status" value={this.state.status}/>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword4">Username</label>
                      <input type="text" class="form-control" id="exampleInputPassword4" placeholder="Username" value={this.state.username}/>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword4">User address</label>
                      <input type="text" class="form-control" id="exampleInputPassword4" placeholder="User address" value={this.state.address}/>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword4">Telephone number</label>
                      <input type="text" class="form-control" id="exampleInputPassword4" placeholder="Telephone number" value={this.state.tele}/>
                    </div>

                    <div class="row">
          </div>                   
                  </form>
                </div>
              </div>
            </div>

<div>
<div class="card position-relative">
  <div class="card-body">
    <p class="card-title mb-0">Machines</p>
    <div class="table-responsive">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Image</th>
            <th>Machine name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Contract End Date</th>
            
          </tr>
        </thead>
        <tbody>

            {this.state.machines ? this.state.machines.map((machine) => (
              <tr>
              {machine.image[0].length>0 ? <td><img style={{width: 100, height:100}} alt="logo image" src={machine.image[0]}/> </td> : null}
              <td>{machine.mname}</td>
              <td>{machine.price}</td>
              <td>{machine.qty}</td>
              <td>{machine.edate}</td>
              </tr>
            )) : null}
        </tbody>
      </table>
    </div>
  </div>
</div>
</div>

<div>
<div class="card position-relative">
  <div class="card-body">
    <div class="table-responsive"></div>

    {this.state.status !== "Cancelled" ? 
                    <div>
                    <div class="form-group">
                    <p class="card-title mb-0">Update Order Status</p>
                        <select class="form-control" id="statusDropDown" onChange={this.onChangeHandler}>
                          <option id="0">Cancelled</option>
                          <option id="1">Completed</option>
                          <option id="2">Ongoing</option>
                          <option id="3">Pending</option>
                        </select>
                      </div>
                      <button type="submit" class="btn btn-warning me-2" onClick={this.submitHandler}>Update</button>
                    </div>
                    
                      : null }

    </div>
  </div>
</div>

</div>
    );
  }

  async componentDidMount()
  {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id")

    let { data } = await axios.get("https://ensolapi.herokuapp.com/order/" + id, {
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      },
    });

        let allMachines = data.data.machines.map((machine) => {
            return {
            mname: machine.machineType,
            price: machine.rentPrice,
            qty: machine.OrderMachines.quantity,
            edate: machine.OrderMachines.contractEndDate.substring(0,10),
            image: JSON.parse(machine.images)
            };
        });

        let ostatus = data.data.orderStatus;
        if(ostatus == 0)
          {
            ostatus = "Cancelled";
          }
          else if(ostatus == 1)
          {
            ostatus = "Completed";
          }
          else if(ostatus == 2)
          {
            ostatus = "Ongoing";
          }
          else if(ostatus == 3)
          {
            ostatus = "Pending";
          }
    
        this.setState({ machines: allMachines, oid: data.data.id, total: data.data.price, status: ostatus, odate: data.data.orderDate.substring(0,10), username: data.data.user.name, address: data.data.user.address, tele: data.data.user.telephone });
        console.log(data);
  }
}

export default Orders;
