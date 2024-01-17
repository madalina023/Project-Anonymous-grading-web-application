import React, { useState } from "react";
import Axios from "axios";
import "./Login.css";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { saveUser } from "../../actions/actions";
import { useNavigate } from "react-router";

const userSelector = (state) => state.user.user;

const Login = () => {
  const [email, setEmail] = useState("");
  const [parola, setParola] = useState("");

  const [rol, setRol] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  const user = useSelector(userSelector, shallowEqual);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const login = () => {
    if (rol === "student") {
      Axios.post("http://localhost:8080/api/students/login", {
        email: email,
        parola: parola,
      }).then((response) => {
        if (response.data.message) {
          setLoginStatus(response.data.message);
        } else {
          const utilizator = {
            type: "student",
            id: response.data.id,
            nume: response.data.nume,
            prenume: response.data.prenume,
            email: response.data.email,
          };
          dispatch(saveUser(utilizator));
          navigate("/homepage");
        }
        // console.log(response.data);
      });
    } else if (rol === "teacher") {
      Axios.post("http://localhost:8080/api/teachers/login", {
        email: email,
        parola: parola,
      }).then((response) => {
        if (response.data.message) {
          setLoginStatus(response.data.message);
        } else {
          const utilizator = {
            type: "teacher",
            id: response.data.id,
            nume: response.data.nume,
            prenume: response.data.prenume,
            email: response.data.email,
          };
          dispatch(saveUser(utilizator));
          navigate("/homepage");
        }
        // console.log(response.data);
      });
    }
  };

  return (
    <div className="containerLogin">
      <div className="top-header">
        <h3>Welcome back</h3>
        <p>Enter your credentials to access your account</p>
      </div>
      <div className="user">
        <input
          className="loginInput"
          type="email"
          placeholder="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className="pass">
        <input
          className="loginInput"
          type="password"
          placeholder="parola"
          onChange={(e) => {
            setParola(e.target.value);
          }}
        />
      </div>
      <div>
        <select
          name="role"
          id="role"
          onChange={(e) => {
            setRol(e.target.value);
          }}
        >
          <option value="">Selecteaza rol</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
      </div>
      <div className="btn">
        <button onClick={login}>Login</button>
      </div>
      <h3>{loginStatus}</h3>
    </div>
  );
};

export default Login;
