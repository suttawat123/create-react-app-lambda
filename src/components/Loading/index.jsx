import React, { Component } from 'react';
import './index.css';
class Loading extends Component {

    render() {
        if (this.props.IsLoading) {
            return (
                <div className="spinner animated fadeIn">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                </div>
            );
        } else {
            return (
                <div className="spinner">
                </div>
            );
        }

    }
}

export default Loading;