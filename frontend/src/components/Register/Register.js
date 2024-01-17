import React, { useState } from "react";
import Axios from "axios";
import "./Register.css";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { saveUser } from "../../actions/actions";
import { useNavigate } from "react-router";

const userSelector = (state) => state.user.user;

const Register = () => {
  const [numeReg, setNumeReg] = useState("");
  const [prenumeReg, setPrenumeReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [parolaReg, setParolaReg] = useState("");

  const [rol, setRol] = useState("");

  const user = useSelector(userSelector, shallowEqual);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const register = () => {
    if (rol === "student") {
      let regex1 = new RegExp("[a-z0-9]+@stud.ase.ro");

      if (regex1.test(emailReg) === false) alert("Email student incorect!");
      else {
        let ok = 0;
        Axios.get("http://localhost:8080/api/students/").then((result) => {
          for (let j = 0; j < result.data.length; j++) {
            let emailStudent = result.data[j].email;
            if (emailStudent === emailReg) {
              ok = 1;
            }
          }
          if (ok === 1) alert("Adresa de email deja inregistrata!");
          else {
            Axios.post("http://localhost:8080/api/students", {
              nume: numeReg,
              prenume: prenumeReg,
              email: emailReg,
              parola: parolaReg,
            }).then((response) => {
              console.log(response.data);
              setNumeReg("");
              setPrenumeReg("");
              setEmailReg("");
              setParolaReg("");
              const utilizator = {
                type: "student",
                id: response.data.id,
                nume: response.data.nume,
                prenume: response.data.prenume,
                email: response.data.email,
              };
              dispatch(saveUser(utilizator));
              navigate("/homepage");
            });
          }
        });
      }
    } else if (rol === "teacher") {
      let regex1 = new RegExp("[a-z0-9]+@csie.ase.ro");
      let regex2 = new RegExp("[a-z0-9]+@ie.ase.ro");

      if (regex1.test(emailReg) === false && regex2.test(emailReg) === false)
        alert("Email profesor incorect!");
      else {
        let ok = 0;
        Axios.get("http://localhost:8080/api/teachers/").then((result) => {
          for (let j = 0; j < result.data.length; j++) {
            let emailTeacher = result.data[j].email;
            if (emailTeacher === emailReg) {
              ok = 1;
            }
          }
          if (ok === 1) alert("Adresa de email deja inregistrata!");
          else {
            Axios.post("http://localhost:8080/api/teachers", {
              nume: numeReg,
              prenume: prenumeReg,
              email: emailReg,
              parola: parolaReg,
            }).then((response) => {
              console.log(response.data);
              setNumeReg("");
              setPrenumeReg("");
              setEmailReg("");
              setParolaReg("");
              const utilizator = {
                type: "teacher",
                id: response.data.id,
                nume: response.data.nume,
                prenume: response.data.prenume,
                email: response.data.email,
              };
              dispatch(saveUser(utilizator));
              navigate("/homepage");
            });
          }
        });
      }
    }
  };

  return (
    <div className="container">
      <div className="top-header">
        <h3>Register</h3>
        <p>Enter your details to create your account</p>
      </div>
      <div className="user">
        <input
          className="registerInput"
          placeholder="Nume"
          value={numeReg}
          type="text"
          onChange={(e) => {
            setNumeReg(e.target.value);
          }}
        />
      </div>
      <div className="user">
        <input
          className="registerInput"
          placeholder="Prenume"
          value={prenumeReg}
          type="text"
          onChange={(e) => {
            setPrenumeReg(e.target.value);
          }}
        />
      </div>
      <div className="user">
        <input
          className="registerInput"
          placeholder="Email"
          value={emailReg}
          type="text"
          onChange={(e) => {
            setEmailReg(e.target.value);
          }}
        />
      </div>
      <div className="pass">
        <input
          className="registerInput"
          placeholder="Parola"
          value={parolaReg}
          type="password"
          onChange={(e) => {
            setParolaReg(e.target.value);
          }}
        />
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
      </div>
      <div className="btn">
        <button onClick={register}>Register</button>
      </div>
    </div>
  );
};

export default Register;
