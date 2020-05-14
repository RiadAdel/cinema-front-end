import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { Link } from 'react-router-dom';

export default class Card extends React.Component {
    render() {
        return (
            <Link to={{
                pathname: '/movieshow',
                state: {movie:this.props.movie},
            }}>
                <div className={this.props.className}>
                    <div className="card  p-2">
                        <img className="card-image" alt="Poster" src={this.props.movie.poster} style={{ width: 230,height:342 }} />
                        <div className="card-body p-1">
                            <h6 className="card-title word-break">{this.props.movie.name}</h6>
                            <p className="card-text word-break">{this.props.movie.genres ? this.props.movie.genres.join(', ') : null}</p>
                        </div>
                    </div>
                </div>
            </Link>
        );
    }
}