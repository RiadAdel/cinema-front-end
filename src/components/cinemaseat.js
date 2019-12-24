import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

export default class CinemaSeat extends React.Component {
    colors = ["#D32F2F",'green'];
    render() {
        
        return (
            <div key = {(this.props.row+1)*(this.props.column+1)} className='m-2 py-2' style={{ width: '60px', color: 'white', backgroundColor: this.colors[this.props.reserved?1:0], cursor: "pointer" }} onClick = {this.props.onClick}>
              <b>
                {String.fromCharCode(this.props.row + 'A'.charCodeAt(0)) + (this.props.column + 1).toString()}
              </b>
            </div>
          );
    }
}