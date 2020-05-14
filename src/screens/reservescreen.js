import React from 'react';
import './../assets/color.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Overlay from '../components/ovelay';
import CinemaSeat from '../components/cinemaseat';
import { getUserCookies } from '../modules/cookies';
export default class ReserveScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      reservedSeats: [],
      overlay: false,
    }
    this.isLoading = false;
    this.getSeats = this.getSeats.bind(this);
    this.handleReserve = this.handleReserve.bind(this);
  }

  async handleReserve(reserved, id) {
    let data;
    if (reserved || this.isLoading)
      return
    this.isLoading = true;
    let ticket = {
      screening_id: this.props.location.state.screening_id,
      user_username: this.user.username,
      seat_id: id,
    }
    console.log(ticket);
    try{
      let res = await fetch("/api/add-ticket", {
        method: 'post',
        body: JSON.stringify(ticket),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      data = await res.json();
    }catch(error){
      alert('Error happened')
      console.log(error);
      this.isLoading = false;
      return
    }
    if(data)
      this.setState({ reservedSeats: data.map((ticket) => ({ id: ticket.seat.id, row: ticket.seat.row, column: ticket.seat.coulmn, hall_id: ticket.seat.hall_id })) })
    this.isLoading = false
    console.log("Bye");
  }
  renderRow(rowNum, maxColumn) {
    let columns = [maxColumn];
    for (let column = 0; column < maxColumn; column++) {
      let reserve = this.state.reservedSeats.find((seat) => seat.row === rowNum && seat.column === column) ? true : false;
      columns[column] = (<CinemaSeat column={column} row={rowNum} onClick={ async ()  => await this.handleReserve(reserve, column + this.state.seat_id + ((rowNum * maxColumn)))}
        reserved={!reserve}
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
    this.getSeats();
    setInterval(this.getSeats,3000);
  }
  getSeats() {
    if (!this.props.location.state)
      return;
    fetch("/api/tickets?screening_id=" + this.props.location.state.screening_id).then(
      resp => resp.json()
    ).then(
      data => {
        console.log("Seat id", data.seat_id)
        this.setState({ seat_id: data.seat_id, reservedSeats: data.tickets.map((ticket) => ({ id: ticket.seat.id, row: ticket.seat.row, column: ticket.seat.coulmn, hall_id: ticket.seat.hall_id })) })
      }
    )
  }
  render() {
    let user = getUserCookies();
    this.user = user;
    if (!user.token) {
      return <h4 className="text-light my-5">You must be a user to reserve, please sign in</h4>
    }
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
