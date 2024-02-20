import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import PuffLoader from "react-spinners/PuffLoader";
import logo from "../../images/isdarkk.svg";

const Register = ({ history }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log("ENV --->", process.env.REACT_APP_REGISTER_REDIRECT_URL);
    const config = {
      url: "https://bananauyu.web.app/register/complete",
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `Email is sent to ${email}. Click the link to complete your registration.`
    );
    // save user email in local storage
    window.localStorage.setItem("emailForRegistration", email);
    // clear state
    setEmail("");
    setLoading(false);
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        autoFocus
      />

      <br />
      <button
        type="submit"
        className="btn btn-outline-light w-100"
        disabled={!email}
      >
        Sign Up
      </button>
    </form>
  );

  return (
    <div className="p-5 bgr">
      <div className="d-flex flex-column align-items-center">
        <div className="conr ">
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
            <span className="signup">Sign Up</span>
          </h4>

          <br />
          {registerForm()}

          <br />
        </div>
        <br />
        <div className="d-flex justify-content-center gap-1">
          <span className="havacc">Already Have an Account?</span>
          {!user && (
            <Link to="/login" className="fw-bold su">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
