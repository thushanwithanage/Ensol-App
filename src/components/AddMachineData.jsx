import axios from "axios";
import React, {Component, useState} from "react";
import {Container, Form, Nav, NavDropdown} from "react-bootstrap";
import {Button} from "react-bootstrap";
import logo from "../images/company_logo.png";
import {Link} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer, toast} from 'react-toastify';


const AddMachineData = () => {
    const [serialnumber, setserialNumber] = useState("");
    const [machinename, setmachineName] = useState("");
    const [description, setDescription] = useState("");
    const [rentprice, setrentPrice] = useState(0);
    const [availablequantity, setavailableQuantity] = useState(0);
    const [image, setImage] = useState({});
    const [deleteid, setDeleteid] = useState(0);

    const data = {
        serialNumber: serialnumber,
        machineType: machinename,
        description: description,
        rentPrice: rentprice,
        availableQty: availablequantity,
        machinePhotos: image,
    };
    const notify = (msg) => {
        console.log(msg);
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

    const Insert = async () => {

        const token = sessionStorage.getItem("token");


        await axios
            .post("https://ensolapi.herokuapp.com/machine", data, {
                headers: {
                    "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {

                if (response.data.status) {
                    successNotify(response.data.data);
                    window.location.reload();
                }
            });
    };

    const successNotify = (msg) => {
        console.log(msg);
        toast.success(msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }


    const imageCome = (img) => {
        setImage(img);
    };

    const pageRefresh = () => {
        window.location.reload();
    };

    async function logOut() {
        sessionStorage.clear();
        window.location.href = "/";
    }

    return (<div className="container-scroller">
        <div>
            <ToastContainer />
        </div>
        <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">

            <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                <img style={{width: 70, height: 70}} src={logo}/>
            </div>

            <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">


                <ul className="navbar-nav navbar-nav-right">
                    <li className="nav-item nav-profile dropdown">
                        <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" id="profileDropdown">
                            <Nav>
                                <NavDropdown title={sessionStorage.getItem("email")}>


                                    <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>


                                </NavDropdown>
                            </Nav>

                        </a>
                    </li>
                </ul>
                <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button"
                        data-toggle="offcanvas">
                    <span className="ti-view-list"/>
                </button>
            </div>

        </nav>
        <div className="container-fluid page-body-wrapper">
            <nav className="sidebar sidebar-offcanvas" id="sidebar">
                <ul className="nav">
                    <li className="nav-item">
                        <a className="nav-link" href="/dashboard">
                            <i className="ti-shield menu-icon"/>
                            <span className="menu-title">Dashboard</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" data-bs-toggle="collapse" href="/machine" aria-expanded="false"
                           aria-controls="ui-basic">
                            <i className="ti-plug menu-icon"/>
                            <span className="menu-title">Machines</span>

                        </a>

                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/repairs">
                            <i className="ti-settings menu-icon"/>
                            <span className="menu-title">Repairs</span>
                        </Link>

                    </li>
                </ul>
            </nav>
            <div className="main-panel">
                <div className="content-wrapper">
                    <div className="row">
                        <div className="col-md-12 grid-margin">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h4 className="font-weight-bold mb-0">Machines</h4>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Form>


                        <Form.Group className="mb-3">
                            <Form.Label>Serial Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Serial No"
                                onChange={(event) => {
                                    setserialNumber(event.target.value);
                                }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Machine Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Machine Name"
                                onChange={(event) => {
                                    setmachineName(event.target.value);
                                }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Enter Your Description"
                                rows={3}
                                onChange={(event) => {
                                    setDescription(event.target.value);
                                }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Rent Price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Rent Price"
                                onChange={(event) => {
                                    setrentPrice(event.target.value);
                                }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Available Quantity</Form.Label>
                            <Form.Control
                                type="number"

                                placeholder="Enter Available Quantity"
                                onChange={(event) => {
                                    setavailableQuantity(event.target.value);
                                }}
                            />
                        </Form.Group>
                        {/* https://react-bootstrap.github.io/forms/form-control/ */}
                        <Form.Group controlId="formFileMultiple" className="mb-3">
                            <Form.Label>Upload Image</Form.Label>

                            <Form.Control
                                type="file"
                                multiple
                                onChange={(event) => {
                                    imageCome(event.target.files[0]);
                                }}
                            />
                        </Form.Group>
                        <Form.Group className="my-3">
                            <Button
                                onClick={Insert}
                                style={{color: "white"}}
                                className="mr-5"
                                variant="primary"
                            >
                                Insert
                            </Button>{" "}

                            <Button
                                style={{color: "white"}}
                                className="mr-5"
                                variant="primary"
                                onClick={pageRefresh}
                            >
                                Clear
                            </Button>{" "}
                        </Form.Group>
                    </Form>
                    <footer className="footer">
                        <div className="d-sm-flex justify-content-center justify-content-sm-between">
                            <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © RWP 2022</span>
                        </div>
                    </footer>
                </div>
            </div>
        </div>

    </div>);
};

export default AddMachineData;