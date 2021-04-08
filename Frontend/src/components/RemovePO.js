import React, { Component } from "react";
import axios from "axios";
import { Redirect } from 'react-router';
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import Menubar_Homepage from "./layout/Menubar_Homepage";
import 'bootstrap/dist/css/bootstrap.min.css';

export default class RemovePO extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            user_name: "",
            user_role: "",
            user_subteam: "",
            logged_in: false
        };
    }

    componentDidMount() {
        try{
            const token = global.localStorage.getItem("jwtToken");
            const decoded = jwt_decode(token);
            this.setState({user_name: decoded.name, user_subteam: decoded.subteam, user_role: decoded.role, logged_in: true});
        }
        catch(err) {
            console.log(err)
        }
    }

    onSubmitYes = e => {
        axios.post("/api/po/remove" + this.state.id)
            .then(function(res) {
                global.location.pathname = "/order";
            })
            .catch(err => {
                console.log(err)
            })
    }

    onSubmitNo() {
        global.location.pathname = "/order";
    }

    render() {
        if (this.state.logged_in) {
            return (
                <div style={{ marginTop: "4rem", marginLeft: "5rem" }}>
                    <h3>Are you sure you want to remove {this.state.id}?</h3>
                    <button 
                    style={{
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px"
                        }}
                    className="btn btn-outline-secondary"
                    type="submit"
                    onClick={this.onSubmitYes}>
                        Yes
                    </button>
                    <button 
                    style={{
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px"
                        }}
                    className="btn btn-outline-secondary"
                    type="submit"
                    onClick={this.onSubmitNo}>
                        No
                    </button>
                </div>
            )
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