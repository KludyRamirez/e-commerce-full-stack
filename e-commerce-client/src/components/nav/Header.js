import React, { useState } from "react";
import { Badge } from "antd";
import { Navbar } from "react-bootstrap";
import Search from "../forms/Search";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import firebase from "firebase/compat/app";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import cheesebanana from "../../images/idar.svg";
import {
  AiOutlineDashboard,
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineSearch,
  AiOutlineShop,
  AiOutlineShopping,
  AiOutlineUser,
  AiOutlineUserSwitch,
} from "react-icons/ai";

// const { SubMenu, Item } = Menu;

const Header = () => {
  // const [current, setCurrent] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  let dispatch = useDispatch();
  let { user, cart } = useSelector((state) => ({ ...state }));

  let history = useHistory();

  const searchClick = () => {
    setShowSearch(!showSearch);
  };

  // const handleSelect = (e) => {
  //   // console.log(e.key);
  //   setCurrent(e.key);
  // };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login");
  };

  return (
    <Navbar
      expand="lg"
      expanded={expanded}
      onToggle={handleToggle}
      className="pnav p-5 d-flex flex-column flex-wrap justify-content-around"
    >
      <div className="d-flex justify-content-center pt-1">
        <Link to="/" className="text-decoration-none">
          <img className="cheesebanana" src={cheesebanana} alt="" />
        </Link>
      </div>

      <br />

      {/* <div>
        {user && (
          <div className="type pb-3">
            <Jumbotron
              text={["Welcome!", user.email && user.email.split("@")[0]]}
            />
          </div>
        )}
        <br />
      </div> */}

      <div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav defaultActiveKey="1">
            <br />
            <div className="text-white fw-bold fs-6 pe-4 pb-3">
              <Link to="/" className="text-decoration-none">
                <div className="colorborder p-3" eventkey="1">
                  <AiOutlineHome size={30} color="#231f20" />
                </div>
              </Link>
              <span className="wordicon d-flex justify-content-center pt-1">
                Home
              </span>
            </div>

            <div className="text-white fw-bold fs-6 pe-4 pb-3">
              <Link to="/shop" className="text-decoration-none">
                <div className="colorborder p-3" eventkey="9">
                  <AiOutlineShop size={30} color="#231f20" />
                </div>
              </Link>
              <span className="wordicon d-flex justify-content-center pt-1">
                Shop
              </span>
            </div>

            <div className="text-white fw-bold fs-6 pe-4 pb-3">
              <Link to="/cart" className="text-decoration-none ">
                <div className="colorborder  p-3" eventkey="2">
                  <Badge count={cart.length} offset={[-9, 9]} color="#763c00">
                    <AiOutlineShopping size={30} color="#231f20" />
                  </Badge>
                </div>
              </Link>
              <span className="wordicon d-flex justify-content-center pt-1">
                Cart
              </span>
            </div>

            {!user && (
              <div className="text-white fw-bold fs-6 pe-4 pb-3">
                <Link to="/login" className="text-decoration-none">
                  <div className="colorborder p-3 " eventkey="3">
                    <AiOutlineUser size={30} color="#231f20" />
                  </div>
                </Link>
                <span className="wordicon d-flex justify-content-center pt-1">
                  Sign In
                </span>
              </div>
            )}

            {!user && (
              <div className="text-white fw-bold fs-6 pe-4 pb-3">
                <Link to="/register" className="text-decoration-none">
                  <div className="colorborder p-3" eventkey="4">
                    <AiOutlineUserSwitch
                      size={30}
                      color="#231f20"
                      key="register"
                    />
                  </div>
                </Link>
                <span className="wordicon d-flex justify-content-center pt-1">
                  Sign Up
                </span>
              </div>
            )}

            <div className="text-white fw-bold fs-6 pe-4 pb-3">
              <div
                className="colorborder p-3"
                onClick={searchClick}
                evenkey="5"
              >
                <AiOutlineSearch size={30} color="#231f20" />
              </div>
              <span className="wordicon d-flex justify-content-center pt-1">
                Search
              </span>
            </div>

            {user && user.role === "subscriber" && (
              <div className="text-white fw-bold fs-6 pe-4 pb-3">
                <Link to="/user/history" className="text-decoration-none">
                  <div className="colorborder p-3" eventkey="6">
                    <AiOutlineDashboard size={30} color="#231f20" />
                  </div>
                </Link>
                <span className="wordicon d-flex justify-content-center pt-1">
                  Dashboard
                </span>
              </div>
            )}

            {user && user.role === "admin" && (
              <div className="text-white fw-bold fs-6 pe-4 pb-3">
                <Link to="/admin/dashboard" className="text-decoration-none">
                  <div className="colorborder p-3" eventkey="7">
                    <AiOutlineDashboard size={30} color="#231f20" />
                  </div>
                </Link>
                <span className="wordicon d-flex justify-content-center pt-1">
                  Dashboard
                </span>
              </div>
            )}

            {user && (
              <div className="text-decoration-none text-white fw-bold fs-6 pe-4 pb-3">
                <div className="colorborder p-3" eventkey="8">
                  <AiOutlineLogout size={30} color="#231f20" onClick={logout} />
                </div>
                <span className="wordicon d-flex justify-content-center pt-1">
                  Sign Out
                </span>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
      {showSearch ? (
        <div className="pt-4">
          <Search />
        </div>
      ) : null}
    </Navbar>
  );
};

export default Header;
