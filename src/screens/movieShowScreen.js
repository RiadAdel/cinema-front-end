import React from 'react';
import colors from '../assets/color';
import ReservationCard from '../components/reservationCard';
export default class MovieShowScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: null,
            screenings: null,
        }
    }
    componentDidMount() {
        if (this.props.location.state) {
            this.setState({ movie: this.props.location.state.movie })
            fetch('/api/screening?id='+this.props.location.state.movie.id).then(
                res => res.json()
            ).then(
                data => {
                    let screenings = data.hall.map((screening)=>(screening.pivot));
                    this.halls = data.hall;
                    this.setState({screenings})
                }
            )
        }
    }
    handleReserve(screening_id){
        let hall = this.halls.find(x=>(x.pivot.id === screening_id));
        this.props.history.push('/reserve',{screening_id,movie:this.state.movie,hall});
    }
    renderTimes() {
        if (!this.state.screenings)
            return (
                <h6 className="mt-5">Check you internet connection</h6>
            );
        return (
            <div className="shadow-sm mx-auto overflow-auto border border-secondary py-1 px-2" style={{ height: '80%', width: '85%', backgroundColor: '#F9F9F9' }}>
                {
                    this.state.screenings.map((screen,i)=>(<ReservationCard
                        key = {i}
                        screeningId = {screen.id}
                        hall = {screen.hall_id}
                        date = {screen.screening_day}
                        time = {screen.screening_time}
                        onClick = {()=>this.handleReserve(screen.id)}
                    />))
                }
            </div>
        );
    }
    render() {
        if (!this.state.movie)
            return (
                <h5 className="my-5 text-light">you have no access for this page</h5>
            )
        return (
            <div className="box row mx-0" style={{ backgroundColor: colors.primary, minHeight: '90vh' }} >
                <div className="col-3 justify-content-center" style={{ backgroundColor: "#EEE" }}>
                    <div className="mx-auto mt-4 w-75">
                        <img className='img-thumbnail shadow' src={this.state.movie.poster} alt="Poster" />
                        <h4 className='ml-3 mt-3'>{this.state.movie.name}</h4>
                        <h6 className='ml-4 text-secondary'>{this.state.movie.genres.join(", ")}</h6>
                    </div>
                </div>
                <div className="col box mx-0 my-0 py-4 px-3" style={{ height: '90vh' }}>
                    <div className="shadow-lg w-100 h-100 py-5 overflow-hidden" style={{ backgroundColor: "#EEE" }}>
                        <h3 className="mb-4">
                            Screening Times
                        </h3>
                        {
                            this.renderTimes()
                        }
                    </div>
                </div>
            </div>
        );
    }
}