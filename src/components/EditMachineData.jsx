import axios from "axios";
import React, {Component, useEffect, useState} from "react";
import {Container, Form, Nav, NavDropdown} from "react-bootstrap";
import {Button} from "react-bootstrap";
import {toast, ToastContainer} from "react-toastify";

const EditMachineData = () => {

    const [serialnumber, setserialNumber] = useState("");
    const [machinename, setmachineName] = useState("");
    const [description, setDescription] = useState("");
    const [rentprice, setrentPrice] = useState(0);
    const [availablequantity, setavailableQuantity] = useState(0);
    const [imagePath, setImagePath] = useState({});
    const [image, setImage] = useState({});
    const [deleteid, setDeleteid] = useState(0);

    useEffect(async () => {
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get("id")

        let {data} = await axios.get("https://ensolapi.herokuapp.com/machine/" + id, {
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("token")
            },
        });

        setserialNumber(data.data.serialNumber);
        setDeleteid(data.data.id);
        setrentPrice(data.data.rentPrice);
        setDescription(data.data.description);
        setmachineName(data.data.machineType);
        setavailableQuantity(data.data.availableQty)
        setImagePath(JSON.parse(data.data.images)[0])

    }, [])


    const data = {
        serialNumber: serialnumber,
        machineType: machinename,
        description: description,
        rentPrice: rentprice,
        availableQty: availablequantity,
        machinePhotos: image,
    };

    const deleteMachine = () => {
        const token = sessionStorage.getItem("token");

        axios
            .delete(`https://ensolapi.herokuapp.com/machine/${deleteid}`, {
                headers: {
                    "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log(response.data);
            });
    };

    const updateMachine = () => {
        const datas = {};
        if (serialnumber) {
            datas.serialNumber = serialnumber;
        }
        if (machinename) {
            datas.machineType = machinename;
        }
        if (description) {
            datas.description = description;
        }
        if (rentprice) {
            datas.rentPrice = rentprice;
        }
        if (availablequantity) {
            datas.availableQty = availablequantity;
        }
        if (image) {
            datas.machinePhotos = image;
        }

        const token = sessionStorage.getItem("token");

        axios
            .put(`https://ensolapi.herokuapp.com/machine/${deleteid}`, datas, {
                headers: {
                    "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {

                if (response.data.status)
                    successNotify(response.data.data);

            });
    };

    const imageCome = (img) => {

        setImagePath(URL.createObjectURL(img));
        setImage(img);
    };
    const errNotify = (msg) => {
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

    const pageRefresh = () => {
        window.location.reload();
    };

    async function logOut() {
        sessionStorage.clear();
        window.location.href = "/";
    }

    return (
        <div>
            <div>
                <ToastContainer/>
            </div>

            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12 grid-margin">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h4 className="font-weight-bold mb-0">Manage Machine</h4>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Form>
                        <Form.Group className="mb-3">
                            <div className="form-group">
                                <label htmlFor="exampleInputName1">Id</label>
                                <input type="text" className="form-control" placeholder="Machine Id"
                                       value={deleteid}/>
                            </div>
                            {/*<Form.Label>id</Form.Label>*/}
                            {/*<Form.Control*/}
                            {/*    type="text"*/}
                            {/*    placeholder="id"*/}

                            {/*    onChange={(event) => {*/}
                            {/*        setDeleteid(event.target.value);*/}
                            {/*    }}*/}
                            {/*/>*/}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Serial Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Serial No"
                                value={serialnumber}
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
                                value={machinename}
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
                                value={description}
                                onChange={(event) => {
                                    setDescription(event.target.value);
                                }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Rent Price</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Rent Price"
                                value={rentprice}
                                onChange={(event) => {
                                    setrentPrice(event.target.value);
                                }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Available Quantity</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter Available Quantity"
                                value={availablequantity}
                                onChange={(event) => {
                                    setavailableQuantity(event.target.value);
                                }}
                            />
                        </Form.Group>
                        {/* https://react-bootstrap.github.io/forms/form-control/ */}
                        <Form.Group controlId="formFileMultiple" className="mb-3">
                            <Form.Label>Machine Image</Form.Label>
                            <br/>
                            <img style={{height: 300, width: 300}}
                                 alt="machine image" src={imagePath}/>
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
                                onClick={updateMachine}
                                style={{color: "white"}}
                                className="mr-5"
                                variant="primary"
                            >
                                Update
                            </Button>{" "}
                            <Button
                                style={{color: "white"}}
                                className="mr-5"
                                variant="primary"
                                onClick={deleteMachine}
                            >
                                Delete
                            </Button>{" "}

                        </Form.Group>
                    </Form>

                </div>
            </div>


        </div>
    )
        ;

};


export default EditMachineData;