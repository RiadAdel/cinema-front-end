import React from 'react';
import './../assets/color.css';
import Card from '../components/card';

export default class BrowseScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      isLoading: true,
    }
  }
  componentDidMount() {
    fetch('/api/movies').then(
      (data) => data.json()
    ).then(
      (movies) => {
        let movieCards = movies.map((item, i) => ({
          id:item.id,
          name: item.name,
          poster: item.poster,
          genres: item.genres.map(item => item.type)
        }))

        this.setState({ movies: movieCards, isLoading: false })
      }
    )
  }
  renderMoviesRow(movies,id) {
    return (
      <div key ={id} className="row text-center justify-content-around">
        {
          movies.map(((movie,i) => (
            <Card key = {i} movie={movie} className=" col-m-3 box" />
          )))
        }
      </div>
    );
  }
  renderMovies() {
    if (!this.state.movies)
      return null;
    let moviesGallary = [];
    const numOfCoulmms = 4;
    for (let row = 0; row < Math.ceil(this.state.movies.length / numOfCoulmms); row++) {
      moviesGallary.push(
        this.renderMoviesRow(this.state.movies.slice(row * numOfCoulmms, row * numOfCoulmms + numOfCoulmms),row)
      )
    }
    return moviesGallary;
  }
  render() {
    if (this.state.isLoading)
      return null;
    return (
      <div className="container">
        <div className="row text-center justify-content-center my-3">
          <b className="text-light">All your favorite movies are here</b>
        </div>
        {
          this.renderMovies()
        }
      </div>
    );
  }
}
