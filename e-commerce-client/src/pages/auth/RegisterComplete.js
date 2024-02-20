import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createOrUpdateUser } from "../../functions/auth";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import PuffLoader from "react-spinners/PuffLoader";
import logo from "../../images/isdarkk.svg";

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  const { user } = useSelector((state) => ({ ...state }));
  let dispatch = useDispatch();

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
    // console.log(window.location.href);
    // console.log(window.localStorage.getItem("emailForRegistration"));
  }, [history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validation
    if (!email || !password) {
      toast.error("Email and password is required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      //   console.log("RESULT", result);
      if (result.user.emailVerified) {
        // remove user email fom local storage
        window.localStorage.removeItem("emailForRegistration");
        // get user id token
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        // redux store
        console.log("user", user, "idTokenResult", idTokenResult);

        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));

        // redirect
        history.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const completeRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="fw-bold pb-1 text-white">Email</label>
        <input type="email" className="form-control" value={email} disabled />
      </div>
      <br />
      <div className="form-group">
        <label className="fw-bold pb-1 text-white">Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
        />
      </div>
      <br />
      <button
        type="submit"
        className="btn btn-outline-light w-100"
        disabled={!email}
      >
        Submit
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
            <span className="signup">Processing Account</span>
          </h4>

          <br />
          {completeRegistrationForm()}

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

export default RegisterComplete;
