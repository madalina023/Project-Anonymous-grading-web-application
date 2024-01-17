import React, { useState } from "react";
import "./AddProject.css";
import Axios from "axios";
import { useSelector, shallowEqual } from "react-redux";
import { useNavigate } from "react-router";

const userSelector = (state) => state.user.user;

const AddProject = () => {
  const [titlu, setTitlu] = useState("");

  const user = useSelector(userSelector, shallowEqual);

  const navigate = useNavigate();

  const addProject = () => {
    if (titlu) {
      Axios.post(`http://localhost:8080/api/students/${user.id}/projects`, {
        titlu: titlu,
      }).then((response) => {
        console.log(response.data);
        navigate("/myProjects");
      });
    }
  };

  return (
    <div>
      <div className="containerAddProject">
        <div className="top-header">
          <p>Enter your project title</p>
        </div>
        <div className="title">
          <input
            className="titleInput"
            type="text"
            placeholder="Titlu"
            onChange={(e) => {
              setTitlu(e.target.value);
            }}
          />
        </div>
        <div className="btn">
          <button onClick={addProject}>Adauga</button>
        </div>
      </div>
    </div>
  );
};

export default AddProject;
