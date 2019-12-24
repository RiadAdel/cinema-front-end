import React from 'react';
import './../assets/color.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Overlay from '../components/ovelay';
import CinemaSeat from '../components/cinemaseat';
export default class ReserveScreen extends React.Component {
  state = {
    reservedSeats: [],
    overlay: false,
  }
  renderRow(rowNum, maxColumn) {
    let columns = [maxColumn];
    for (let column = 0; column < maxColumn; column++) {
      columns[column] = (<CinemaSeat column={column} row={rowNum} onClick={() => this.setState({ overlay: true })}
          reserved = {this.state.reservedSeats.find((seat) => seat.row === rowNum && seat.column === column)?true:false}
      />);
    }
    return columns;
    
  }

  renderCinema(maxRow, maxColumn) {
    let rows = [maxRow];
    for (let row = 0; row < maxRow; row++) {
      rows[row] = (<div key={row} className='d-flex flex-row justify-content-center'>
        {this.renderRow(row, maxColumn)}
      </div>)
    }
    return rows;
  }

  componentDidMount() {
    if (!this.props.location.state)
      return;
    console.log(this.props.location.state);
    fetch("/api/tickets?screening_id=" + this.props.location.state.screening_id).then(
      resp => resp.json()
    ).then(
      data => {
        console.log(data);
        this.setState({ reservedSeats: data.map((ticket) => ({ id: ticket.seat.id, row: ticket.seat.row, column: ticket.seat.coulmn, hall_id: ticket.seat.hall_id })) })
      }
    )
  }

  render() {
    console.log(this.state.reservedSeats)
    if (this.props.location.state == null)
      return <h6 className="mt-5 text-light">Wrong page</h6>
    let movie = this.props.location.state.movie;
    let hall = this.props.location.state.hall;

    return (
      <div>
        {
          this.state.overlay ? (
            <Overlay hide={() => this.setState({ overlay: false })} >
              <h2 className="text-light">{movie.name}</h2>
            </Overlay>) : null
        }
        <div className="mt-3 container">
          <h1 className="text-light">{movie.name}</h1>
          <h4 className="text-secondary">{"Hall No. " + hall.id}</h4>
          {
            this.renderCinema(hall.max_row, hall.max_coulmn)
          }
        </div>
      </div>
    );
  }
}
