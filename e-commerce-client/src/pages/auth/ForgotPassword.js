import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import PuffLoader from "react-spinners/PuffLoader";
import logo from "../../images/waveblue.svg";

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      url: "https://bananauyu.web.app/login",
      handleCodeInApp: true,
    };

    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
        setLoading(false);
        toast.success("Check your email for password reset link");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
        console.log("ERROR MSG IN FORGOT PASSWORD", error);
      });
  };

  return (
    <div className="p-5 bgfp">
      <div className="d-flex flex-column align-items-center">
        <div className="confp">
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
            <span className="signupfp">Forgot Password</span>
          </h4>

          <br />
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Type your email"
              autoFocus
            />
            <br />
            <button
              type="submit"
              className="btn btn-outline-danger w-100"
              disabled={!email}
            >
              Submit
            </button>
          </form>

          <br />
        </div>
        <br />
        <div className="d-flex justify-content-center gap-1">
          <span className="havaccfp">Already Have an Account?</span>
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

export default ForgotPassword;
