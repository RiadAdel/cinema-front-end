import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactLoading from 'react-loading';
import 'bootstrap';

export default class CinemaSeat extends React.Component {
  colors = ["#D32F2F", 'green'];
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    }
    this.handleSeat = this.handleSeat.bind(this);
  }
  async handleSeat() {
    this.setState({ isLoading: true })
    await this.props.onClick()
    this.setState({ isLoading: false })
  }
  render() {
    if (this.state.isLoading)
      return (
        <div key={(this.props.row + 1) * (this.props.column + 1)} className='m-2 py-1' style={{ width: '60px', color: 'white', backgroundColor: this.colors[this.props.reserved ? 1 : 0], cursor: "pointer" }}>
            <ReactLoading width="80%" height="80%" className="p-0 m-0" type ="bubbles"/>
        </div>
      )
    return (
      <div key={(this.props.row + 1) * (this.props.column + 1)} className='m-2 py-2' style={{ width: '60px', color: 'white', backgroundColor: this.colors[this.props.reserved ? 1 : 0], cursor: "pointer" }} onClick={this.handleSeat}>
        <b>
          {String.fromCharCode(this.props.row + 'A'.charCodeAt(0)) + (this.props.column + 1).toString()}
        </b>
      </div>
    );
  }
}