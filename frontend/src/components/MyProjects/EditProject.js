import React, { useState, useEffect } from "react";
import "./AddProject.css";
import Axios from "axios";
import { useSelector, shallowEqual } from "react-redux";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

const userSelector = (state) => state.user.user;

const EditProject = () => {
  const [titlu, setTitlu] = useState("");
  const { proiectId } = useParams();

  const user = useSelector(userSelector, shallowEqual);

  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`http://localhost:8080/api/projects/${proiectId}`)
      .then((response) => {
        setTitlu(response.data.titlu);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const editProject = () => {
    if (titlu) {
      Axios.put(`http://localhost:8080/api/projects/${proiectId}`, {
        titlu: titlu,
        studentId: user.id,
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
            value={titlu}
            onChange={(e) => {
              setTitlu(e.target.value);
            }}
          />
        </div>
        <div className="btn">
          <button onClick={editProject}>Editeaza</button>
        </div>
      </div>
    </div>
  );
};

export default EditProject;
