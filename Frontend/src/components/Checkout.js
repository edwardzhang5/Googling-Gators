import React, { Component } from "react";
import axios from "axios";
import { Redirect } from 'react-router';

export default class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.match.params.name,
            part: {},
            num_to_checkout: 0,
            completed: false
        };
    }

    componentDidMount() {
        axios.get("/api/parts" + this.state.name)
            .then(response => {
                this.setState({part: response.data.data});
            })
            .catch(err => {
                console.log(err);
            })
    }

    onSubmit = e => {
        e.preventDefault();
        axios.post("/api/parts/checkout", {"_id": this.state.part._id, "num_to_checkout": this.state.num_to_checkout})
        .then(function (result) {
            console.log("Request submitted successfully");
        })
        this.setState({completed: true});
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    render() {
        if (this.state.completed) {
            return (
            <Redirect to="/inventory_page"/>
            );
        }
        return (
            <form onSubmit={this.onSubmit}>
                How many {this.state.name} would you like to checkout?
                <input type="text" id="num_to_checkout" onChange={this.onChange}/>
                <input type="submit" value="Submit"/>
            </form>
        )
    }
}