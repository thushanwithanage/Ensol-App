import React, { Component } from "react";
import axios from "axios";
import "../css/Login.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Repairs extends Component {
  state = {
    rid: "",
    description: "",
    oid: "",
    odate: "",
    mtype: "",
    status: "",
    username: "",
    address: "",
    tele: "",
    image: "",
    sdate: "",
    edate: "",
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
    console.log('Repair Status: ', this.state.newstatus);
    let status = {
        status: this.state.newstatus
    };
    if (navigator.onLine) 
    {
      try {

        if(status === -1)
        {
          this.notify("Invalid repair status");
        }
        else
        {
          if (status) 
          {
            const { data } = await axios.put("https://ensolapi.herokuapp.com/repair/" + this.state.rid, status, {
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
            this.notify("Failed to get the repair status");
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
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Repair Details</h4>
                  <p class="card-description">
                    Repair Id : {this.state.rid}
                  </p>
                  <form class="forms-sample">
                    <div class="form-group">
                      <label for="exampleInputName1">Description</label>
                      <input type="text" class="form-control" placeholder="Description" value={this.state.description}/>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputEmail3">Order Id</label>
                      <input type="text" class="form-control" placeholder="Order Id" value={this.state.oid}/>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputEmail3">Order Date</label>
                      <input type="text" class="form-control" placeholder="Order date" value={this.state.odate}/>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputEmail3">Contract Start Date</label>
                      <input type="text" class="form-control" placeholder="Order date" value={this.state.sdate}/>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputEmail3">Contract End Date</label>
                      <input type="text" class="form-control" placeholder="Order date" value={this.state.edate}/>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputEmail3">Machine Type</label>
                      <input type="text" class="form-control" placeholder="Order date" value={this.state.mtype}/>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputEmail3">Machine Image</label> <br/>
                      <img style={{height:200, marginLeft:'50px'}} alt="machine image" src={this.state.image}/>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputEmail3">Repair Status</label>
                      <input type="text" class="form-control" placeholder="Repair status" value={this.state.status}/>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword4">Customer Name</label>
                      <input type="text" class="form-control" id="exampleInputPassword4" placeholder="Customer Name" value={this.state.username}/>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword4">Customer address</label>
                      <input type="text" class="form-control" id="exampleInputPassword4" placeholder="Customer address" value={this.state.address}/>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword4">Telephone number</label>
                      <input type="text" class="form-control" id="exampleInputPassword4" placeholder="Telephone number" value={this.state.tele}/>
                    </div>

                    {this.state.status !== "Cancelled" ? 
                    <div>
                    <div class="form-group">
                      <label for="exampleSelectGender">Update Repair Status</label>
                        <select class="form-control" id="statusDropDown" onChange={this.onChangeHandler}>
                          <option id="0">Cancelled</option>
                          <option id="1">Completed</option>
                          <option id="2">Accepted</option>
                          <option id="3">Pending</option>
                        </select>
                      </div>
                      <button type="submit" class="btn btn-warning me-2" onClick={this.submitHandler}>Update</button>
                    </div>
                    
                      : null }

                   
                  </form>
                </div>
              </div>
            </div>
    );
  }

  async componentDidMount()
  {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id")

    let { data } = await axios.get("https://ensolapi.herokuapp.com/repair/" + id, {
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      },
    });

        let ostatus = data.data.status;
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
    
          let mimage = JSON.parse(data.data.machine.images);

          if(data.data.machine.contractStartDate != null)
          {
            this.setState({ sdate: data.data.machine.contractStartDate.substring(0,10) });
          }

          if(data.data.machine.contractEndDate != null)
          {
            this.setState({ edate: data.data.machine.contractEndDate.substring(0,10) });
          }

          if(data.data.order.orderDate != null)
          {
            this.setState({ odate: data.data.order.orderDate.substring(0,10) });
          }

        this.setState({ rid: data.data.id, description: data.data.description, image: mimage[0], mtype: data.data.machine.machineType, status: ostatus, oid: data.data.order.id, username: data.data.order.user.name, address: data.data.order.user.address, tele: data.data.order.user.telephone });
        console.log(data);
  }
}

export default Repairs;