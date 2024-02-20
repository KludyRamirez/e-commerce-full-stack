import React from "react";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import SubList from "../components/sub/SubList";
import c1 from "../images/cjennie.svg";
import c2 from "../images/cnayeon.svg";
import c3 from "../images/cbutter.svg";
import c4 from "../images/caespa.svg";
import c5 from "../images/crv.svg";
import c6 from "../images/ctwice.svg";
import c7 from "../images/bts.svg";
import pouch from "../images/pouch.png";
import medal from "../images/medal.png";
import coin from "../images/coin.png";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const Home = () => {
  return (
    <div className="container-fluid p-0 bgNA">
      <div className="p-5 d-flex justify-content-center gap-5 flex-wrap align-items-center redcon ">
        <div className="d-flex justify-content-around gap-4 p-2 align-items-center">
          <div className="covertitle">
            Album
            <br />
            <AiOutlineArrowRight />
          </div>
          <img className="cover" src={c1}></img>
          <img className="cover" src={c2}></img>
          <img className="cover" src={c3}></img>
          <img className="cover" src={c4}></img>
          <img className="cover" src={c5}></img>
          <img className="cover" src={c6}></img>
          <img className="cover" src={c7}></img>
        </div>
        <div className="d-flex justify-content-around gap-4 p-2 align-items-center">
          <img className="cover1" src={c6}></img>
          <img className="cover1" src={c3}></img>
          <img className="cover1" src={c1}></img>
          <img className="cover1" src={c5}></img>
          <img className="cover1" src={c7}></img>
          <img className="cover1" src={c2}></img>
          <img className="cover1" src={c4}></img>
          <div className="covertitle">
            <AiOutlineArrowLeft />
            <br />
            Covers
          </div>
        </div>
      </div>
      <h4 className="text-center p-3 mt-5 mb-5 display-4">New Arrivals</h4>
      <NewArrivals />
      <br></br>

      <div className="d-flex justify-content-center flex-wrap gap-4 p-5">
        <div className="giconsinfo d-flex flex-column justify-content-center align-items-center ">
          <div className="d-flex justify-content-center align-items-center ">
            <img className="gicons" src={pouch}></img>
          </div>
          <span className="giconfont pt-2">SECURED</span>
          <center className="giconfontdesc">
            Protected By <br></br> Modern Technologies
          </center>
        </div>

        <div className="giconsinfo d-flex flex-column justify-content-center align-items-center ">
          <div className="d-flex justify-content-center align-items-center ">
            <img className="gicons" src={medal}></img>
          </div>
          <span className="giconfont pt-2">PREMIUM</span>
          <center className="giconfontdesc">
            Quality Product <br></br> In The Competition
          </center>
        </div>

        <div className="giconsinfo d-flex flex-column justify-content-center align-items-center ">
          <div className="d-flex justify-content-center align-items-center ">
            <img className="gicons" src={coin}></img>
          </div>
          <span className="giconfont pt-2">AFFORDABLE</span>
          <center className="giconfontdesc">
            Right Prices <br></br> Maximum Service
          </center>
        </div>
      </div>

      <h4 className="text-center p-3 mt-5 mb-5 display-4">Best Sellers</h4>
      <BestSellers />

      <h4 className="text-center p-3 mt-5 mb-5 display-4">Categories</h4>
      <CategoryList />

      <h4 className="text-center p-3 mt-5 mb-5 display-4">Sub Categories</h4>
      <SubList />

      <br />
      <br />
    </div>
  );
};

export default Home;
