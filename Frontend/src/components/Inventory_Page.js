import React, { Component } from 'react';
import axios from "axios"
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Menubar from "./layout/Menubar";
import Menubar_Homepage from "./layout/Menubar_Homepage";
import jwt_decode from "jwt-decode";


const Part = props => (
    <tr>
      <td>{props.part.name}</td>
      <td>{props.part.description}</td>
      <td>{props.part.quantity_available}</td>
      <td>{props.part.total_quantity}</td>
      <td>{props.part.last_checked_out.substring(0, 10)}</td>
      <td>
          <div><Link to={"/checkout" + props.part.name}>Check-out</Link></div>
          <div><Link to={"/checkin" + props.part.name}>Check-in</Link></div>
      </td>
      {jwt_decode(global.localStorage.getItem("jwtToken")).role == "admin" && 
      <td>
          <div><Link to={"/removePart" + props.part.name}>Remove</Link></div>
      </td>}
    </tr>
  )

class Inventory_Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            parts: [],
            name: "",
            subteam: "",
            role: "",
            errors: {},
            logged_in: false
        };
    }

    componentDidMount() {
        axios.get("/api/parts")
            .then(response => {
                this.setState({parts: response.data.data});
            })
            .catch(err => {
                console.log(err);
            });
        try{
            const token = global.localStorage.getItem("jwtToken");
            const decoded = jwt_decode(token);
            this.setState({name: decoded.name, subteam: decoded.subteam, role: decoded.role, logged_in: true});
        }
        catch(err) {
            console.log(err)
        }
        
    }

    partsList() {
        return this.state.parts.map(function(currentPart, i) {
            return <Part part={currentPart} key={i} />;
        })
    }

    render() {
        if (this.state.logged_in) {
            return (
                <div style={{ fontFamily: "montserrat" }}>
                    <Menubar />

                    <div>
                        <div id="inv-search-bar">
                            <h3 style={{ float: "left", marginTop: "2rem", marginLeft: "2rem" }}><strong>Inventory</strong></h3>
                            <span style={{ float: "right" }}>
                                <div class="bg-none pl-5 pr-5" style={{ paddingTop: "2rem" }}>
                                    <form action="">
                                        <div class="input-group mb-4 border rounded-pill" style={{ height: "40px", width: "400px" }}>
                                            <input type="search" placeholder="What are you searching for?" aria-describedby="searchbutt" 
                                             class="form-control bg-none border-0" style={{ borderColor: "none", boxShadow: "none", fontSize: "15px" }}></input>
                                            <div class="input-group-append border-0">
                                                <button id="searchbutt" type="button" class="btn btn-link text-secondary" style={{ borderColor: "none", boxShadow: "none" }}>
                                                    <i class="material-icons">search</i>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </span>
                        </div>

                        <table className="table table-striped" style={{ margin: 30 }} >
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Quantity Available</th>
                                    <th>Total Quantity</th>
                                    <th>Last Checked Out</th>
                                    <th>Actions</th>
                                    {this.state.role == 'admin' && <th>Admin Actions</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {this.partsList()}
                            </tbody>
                        </table>

                        {this.state.role == 'admin' &&
                            <div style={{ marginLeft: "2rem", marginBottom: "30px"}}>
                                <Link to={"/add"}><button className="btn btn-outline-secondary">Add</button></Link>
                            </div>}

                    </div>

                </div>
            );
        }
        else {
            return (
                <div>
                    <Menubar_Homepage />
                    <div style={{ marginLeft: "40%", marginTop: "3%" }}>
                        <h1>Error: Not Logged In</h1>
                        <div style={{ marginLeft: "7%" }}>
                            <Link
                                to="/login"
                                style={{ fontFamily: "montserrat" }}
                                className="col s5 brand-logo center black-text">
                                Return to Login Page
                    </Link>
                        </div>
                    </div>
                </div>
            );
        }
        
    }
}

export default Inventory_Page;