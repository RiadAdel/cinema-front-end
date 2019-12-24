import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
export default class Overlay extends React.Component {
    stopPropagation(e){
        e.stopPropagation();
    }
    render() {
        return (
            <div className = 'position-fixed w-100 h-100 d-flex align-items-center justify-content-center' style = {{background:"rgba(0,0,0,.6)", zIndex:1000,top:0,...this.props.style}} onClick = {this.props.hide}>
                <div onClick={this.stopPropagation}>
                    {
                        this.props.children
                    }
                </div>
        </div>
        );
    }
}