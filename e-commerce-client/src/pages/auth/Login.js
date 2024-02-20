import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrUpdateUser } from "../../functions/auth";

import PuffLoader from "react-spinners/PuffLoader";

import logo from "../../images/isda.svg";
import glogo from "../../images/google.svg";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  let dispatch = useDispatch();

  useEffect(() => {
    const intended = history.location.state;
    if (!intended && user && user.token) {
      history.push("/");
    }
  }, [history, user]);

  const roleBasedRedirect = (res) => {
    const intended = history.location.state;
    const redirectPath =
      (intended && intended.from) ||
      (res.data.role === "admin" ? "/admin/dashboard" : "/user/history");
    history.push(redirectPath);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.table(email, password);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      // console.log(result);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: user.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err));

      // history.push("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: user.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
            roleBasedRedirect(res);
          })
          .catch((err) => console.log(err));
        //
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="fw-bold pb-1">Email</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          autoFocus
          style={{ fontSize: "13px", height: "40px" }}
        />
      </div>
      <br></br>
      <div className="form-group">
        <label className="fw-bold pb-1">Password</label>
        <div className="d-flex gap-1">
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            style={{ fontSize: "13px", height: "40px" }}
          />
        </div>
      </div>
      <div className="py-3">
        <Link to="/forgot/password" className="float-end fw-bold fp">
          Forgot Password?
        </Link>
      </div>
      <br />
      <div>
        <button
          onClick={handleSubmit}
          type="button"
          className=" btn btn-outline-warning w-100"
          disabled={!email || password.length < 6}
        >
          Sign In
        </button>
      </div>
      <br></br>
      <div>
        <button
          onClick={googleLogin}
          type="button"
          className="btn btn-outline-danger w-100 d-flex justify-content-center gap-2"
        >
          <img src={glogo} alt="" style={{ width: "22px", height: "22px" }} />
          <span>Sign In with Google</span>
        </button>
      </div>
    </form>
  );

  return (
    <div className="p-5 bg">
      <div className="d-flex flex-column align-items-center">
        <div className="con ">
          {loading ? (
            <div className="d-flex justify-content-center">
              <PuffLoader color="#763c00" loading={loading} size="350px" />
            </div>
          ) : (
            <div className="d-flex justify-content-center">
              <img
                src={logo}
                alt=""
                style={{ width: "300px", height: "300px" }}
              />
            </div>
          )}
          <br />

          <h4 className="d-flex justify-content-center fw-bold">
            <span>Sign In</span>
          </h4>

          <br />
          {loginForm()}

          <br />
        </div>
        <br />
        <div className="d-flex justify-content-center gap-1">
          Don't Have an account?
          {!user && (
            <Link to="/register" className="fw-bold su">
              Sign Up
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
