import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./NavigationBar.css";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { saveUser } from "../../actions/actions";

const userSelector = (state) => state.user.user;

const NavigationBar = () => {
  const [isStudent, setIsStudent] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);

  const navigate = useNavigate();

  const user = useSelector(userSelector, shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.type === "student") {
      setIsStudent(true);
      setIsTeacher(false);
    } else if (user.type === "teacher") {
      setIsStudent(false);
      setIsTeacher(true);
    } else {
      setIsStudent(false);
      setIsTeacher(false);
    }
  }, [user]);

  return (
    <div>
      <ul>
        <li>
          <button
            id="home"
            onClick={() => {
              if (isStudent === false && isTeacher === false) {
                navigate("/login");
              } else {
                navigate("/homepage");
              }
            }}
          >
            Home
          </button>
        </li>
        {isStudent ? (
          <>
            <>
              <li>
                <button
                  id="myprojects"
                  onClick={() => {
                    navigate("/myProjects");
                  }}
                >
                  Proiectele mele
                </button>
              </li>
              <li>
                <button
                  id="addnote"
                  onClick={() => {
                    navigate("/AdaugaNote");
                  }}
                >
                  Adauga Note
                </button>
              </li>
            </>
          </>
        ) : (
          <span></span>
        )}
        {isTeacher ? (
          <li>
            <button id="students" onClick={() => navigate("/students")}>
              Studenti
            </button>
          </li>
        ) : (
          <span></span>
        )}
        {isStudent || isTeacher ? (
          <li className="right">
            <button
              id="logout"
              onClick={() => {
                const utilizator = {
                  type: "",
                  id: 0,
                  nume: "",
                  prenume: "",
                  email: "",
                };
                dispatch(saveUser(utilizator));
                navigate("/login");
              }}
            >
              Logout
            </button>
          </li>
        ) : (
          <span></span>
        )}
        {isStudent || isTeacher ? (
          <span></span>
        ) : (
          <li className="right">
            <button
              id="login"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
          </li>
        )}
        {isStudent || isTeacher ? (
          <span></span>
        ) : (
          <li className="right">
            <button
              id="register"
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default NavigationBar;
