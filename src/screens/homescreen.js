import React from 'react';
import './../assets/color.css';
import Slideshow from './../components/slideshow';
const slides = [
  {
    name:"Joker",
    description:"bla bla bla bla bla",
    img:require("./../assets/pic/1.jpg")
  },
  {
    name:"Fury",
    description:"bla bla bla bla bla",
    img:require("./../assets/pic/2.jpg")
  },
  {
    name:"Her",
    description:"bla bla bla bla bla",
    img:require("./../assets/pic/3.jpg")
  },
]

function HomeScreen() {
  return (
    <div>
      <Slideshow numOfSlides = {3} slides = {slides}/>
    </div>
  );
}

export default HomeScreen;
