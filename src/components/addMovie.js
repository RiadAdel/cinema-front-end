import React from 'react';
import ReactLoading from 'react-loading';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import 'rc-time-picker/assets/index.css';
export default class AddMovie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            genre: [],
            isLoading: true,
            name: "",
            year: 2019,
            poster: "",
            screenshot: "",
            length: moment().hour(2).minute(0).second(0),
            movieGenres: [],
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleYear = this.handleYear.bind(this);
        this.handlePoster = this.handlePoster.bind(this);
        this.handleScreenshot = this.handleScreenshot.bind(this);
        this.handleLength = this.handleLength.bind(this);
    }
    handleCheckBox(event, i) {
        let data = this.state.movieGenres;
        data[i] = event.target.checked;
        this.setState({ movieGenres: data });
    }
    handleName(event) {
        this.setState({ name: event.target.value })
    }
    handleYear(event) {
        this.setState({ year: event.target.value })
    }
    handlePoster(event) {
        this.setState({ poster: event.target.value })
    }
    handleScreenshot(event) {
        this.setState({ screenshot: event.target.value })
    }
    handleLength(value) {
        this.setState({ length: value })
    }
    handleSubmit(event) {
        event.preventDefault();
        if (!this.state.movieGenres.find((item) => (item === true))) {
            alert('please choose movie genres');
            return
        }
        if (!this.state.length) {
            alert('please enter movie length');
            return
        }
        let indices = this.state.movieGenres.reduce(
            (out, bool, index) => bool ? out.concat(index) : out,
            []
        )
        let movie = {
            name: this.state.name,
            year: this.state.year,
            poster: this.state.poster,
            screenshot: this.state.screenshot,
            genres: indices.map((index) => this.state.genre[index]),
            length: this.state.length.format("hh:mm:ss"),
        }
        fetch("/api/add-movie", {
            method: 'post',
            body: JSON.stringify(movie),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((data) => data.json()).then(
            data=>console.log(data)
        ).finally(()=>this.setState({name:"",poster:"",screenshot:"",year:"2019"}))
    }
    renderGenre() {
        return this.state.genre.map((genre, i) => (
            <div key={i} className="form-check col-3 text-left">
                <input type="checkbox" className="form-check-input" id={"customCheck" + i} value={this.state.movieGenres[i]} onChange={(e) => this.handleCheckBox(e, i)} />
                <label className="form-check-label text-light" htmlFor={"customCheck" + i}>{genre}</label>
            </div>
        ))
    }
    componentDidMount() {
        fetch("/api/genres").then(
            data => data.json()
        ).then(
            data => data.map((element) => element.type)
        ).then(
            data => {
                let zeros = []
                for (let i = 0; i < data.length; i++)
                    zeros.push(false)
                this.setState({ genre: data, isLoading: false, movieGenres: zeros })
            }
        ).catch(
            (error) => console.log(error)
        )
    }
    render() {
        if (this.state.isLoading)
            return <ReactLoading width="5%" height="5%" className="mx-auto self-align-center" />
        return (
            <form onSubmit={this.handleSubmit} className = "py-3">
                <div className="form-group container">
                    <h4 className="text-light my-3" >Add Movie</h4>
                    <div className="form-row my-3">
                        <div className="col">
                            <input required type="text" className="form-control text-capitalize" name="name" placeholder="Movie name" value={this.state.name} onChange={this.handleName} />
                        </div>
                        <div className="col">
                            <input required type="number" className="form-control" name="year" placeholder="Year" value={this.state.year} onChange={this.handleYear} />
                        </div>
                        <div className="col">
                            <TimePicker defaultValue={this.state.length} placeholder="Movie Length" className="form-control" name="timer" value={this.state.length} onChange={this.handleLength} />
                        </div>
                    </div>

                    <div className="form-row my-3">
                        <div className="col text-left">
                            <input required type="url" className="form-control" name="name" placeholder="Poster URL" value={this.state.poster} onChange={this.handlePoster} />
                            <img src = {this.state.poster} alt = "poster" className="img-thumbnail m-2" style = {{width:60}}/>
                        </div>
                    </div>
                    <div className="form-row my-3">
                        <div className="col text-left">
                            <input required type="url" className="form-control" name="name" placeholder="Screenshot URL" value={this.state.screenshot} onChange={this.handleScreenshot} />
                            <img src = {this.state.screenshot} alt = "screenshot" className="img-thumbnail m-2" style = {{width:100}}/>
                        </div>
                    </div>
                    <div className="form-row my-3 mx-3">
                        {
                            this.renderGenre()
                        }
                    </div>
                    <small id="emailHelp" className="form-text text-light">Make sure that the movie data is correct.</small>
                </div>
                <button type="submit" className="btn btn-light">Submit</button>
            </form>
        );
    }
}