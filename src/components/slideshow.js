import React from 'react';
import './slideshow.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import $ from 'jquery';
export default class Slideshow extends React.Component {
    id = "slideShow";
    renderIndicator() {
        if (!this.props.numOfSlides)
            return null;
        let indecies = [];
        for (let index = 0; index < this.props.numOfSlides; index++) {
            indecies.push(index);
        }
        return (
            <ol className="carousel-indicators">
                {
                    indecies.map((index) => (<li className={index===0?"active":null} data-target={"#" + this.id} data-slide-to={toString(index)}></li>))
                }
            </ol>
        );
    }
    renderSlides() {
        if (!this.props.slides)
            return null;
        return this.props.slides.map((slide, i) => {
            return (
                <div key={i} className={(i === 0) ? "carousel-item active" : "carousel-item"}>
                    <img className="d-block w-100" src={slide.img} alt="First slide" />

                    <div className="carousel-caption d-none d-md-block">
                        <h5>{slide.name}</h5>
                    </div>
                </div>

            );
        }
        )
    }

    componentDidMount(){
        $('.carousel').carousel({
            interval: 4000
        }); 
    }
    render() {
        return (
            <div id={this.id} className="carousel slide" data-ride="carousel">
                {
                    this.renderIndicator()
                }
                <div className="carousel-inner">
                    {
                        this.renderSlides()
                    }
                </div>
                <a className="carousel-control-prev" href={"#" + this.id} role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href={"#" + this.id} role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        );
    }
}