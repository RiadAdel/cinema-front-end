import React from 'react';
import ReactLoading from 'react-loading';
import 'rc-time-picker/assets/index.css';
export default class AddScreening extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            time: "",
            date: "",
            movie:0,
            hall:0,
            movies:null,
            halls:null,
        }
        this.movie = null;
        this.hall = null;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        let screening = {
            movie_id: this.movie.id,
            hall_id: this.hall.id,
            screening_time: this.state.time,
            screening_day: this.state.date,
        }
        fetch("/api/add-screening", {
            method: 'post',
            body: JSON.stringify(screening),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((data) => data.json()).then(
            data => console.log(data)
        ).finally(() => this.setState({ name: "", poster: "", screenshot: "", year: "2019" }))
    }

    componentDidMount() {
        let movies = fetch("/api/movies");
        let halls = fetch("/api/halls");
        Promise.all([movies,halls]).then(
            resps => Promise.all(resps.map((resp) =>resp.json()))
        ).then(
            ([movies,halls])=>{
                this.setState({halls,movies,isLoading:false})
            }
        ).catch(e=>console.log(e));

    }
    renderMovies() {
        return (
            <select className="form-control" required
            value = {this.state.movie}
            onChange = {e=>{
                this.movie = this.state.movies.find(x=> (x.id).toString()===e.target.value);
                this.setState({movie:e.target.value});
                console.log(e.target.value,this.movie)
            }}>
                <option disabled value = {0} key={0} >Movies</option>
                {
                    this.state.movies.map((movie,i) => (
                        <option value={movie.id} key={i+1}>{movie.name+" "+movie.year}</option>
                    ))
                }
            </select>
        );
    }
    renderHalls() {
        return (
            <select className="form-control" required
            value = {this.state.hall}
            onChange = {e=>{
                this.hall = this.state.halls.find(x=> (x.id).toString()===e.target.value);
                this.setState({hall:e.target.value});
                console.log(e.target.value,this.hall)
            }}>
                <option disabled value ={0} key={0}>Halls</option>
                {
                    this.state.halls.map((hall,i) => (
                        <option value={hall.id} key={i+1}>{hall.id}</option>
                    ))
                }
            </select>
        );
    }
    render() {
        if (this.state.isLoading)
            return <ReactLoading width="5%" height="5%" className="mx-auto self-align-center" />
        return (
            <form onSubmit={this.handleSubmit} className="py-3">
                <div className="form-group container">
                    <h4 className="text-light my-3" >Add Movie Screening</h4>
                    <div className="form-row my-3">
                        <div className="col">
                            {this.renderMovies()}
                        </div>
                        <div className="col">
                            <input type="time" className="form-control" required value = {this.state.time} onChange = {(e)=>this.setState({time:e.target.value})}/>
                        </div>
                        <div className="col">
                            <input type="date" className="form-control" required value = {this.state.date} onChange = {(e)=>this.setState({date:e.target.value})}/>
                        </div>
                    </div>

                    <div className="form-row my-3">
                        <div className="col text-left">
                            {this.renderHalls()}
                        </div>

                    </div>
                    <div className="form-row my-3 justify-content-center">
                        <small id="emailHelp" className="form-text text-light text-center">Make sure that the sceening data is correct.</small>
                    </div>
                    <button type="submit" className="btn btn-light">Submit</button>
                </div>
            </form>
        );
    }
}