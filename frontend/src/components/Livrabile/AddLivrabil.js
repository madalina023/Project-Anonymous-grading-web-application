import React, { useState } from "react";
import Axios from "axios";
import { useSelector, shallowEqual } from "react-redux";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import "./AddLivrabil.css";

const AddLivrabil = () => {
  const [nume, setNume] = useState("");
  const [link, setLink] = useState("");
  const { proiectId } = useParams();
  const navigate = useNavigate();

  const addLivrabil = () => {
    if (nume) {
      if (link) {
        Axios.post(
          `http://localhost:8080/api/projects/${proiectId}/partialDeliverables`,
          {
            nume: nume,
            link: link,
          }
        ).then((response) => {
          console.log(response.data);
          navigate(`/livrabilePartiale/${proiectId}`);
        });
      }
    }
  };

  return (
    <div>
      <div className="containerAddLivrabil">
        <div className="top-header">
          <p>Enter your partial deliverable details</p>
        </div>
        <div className="title">
          <input
            className="titleInput"
            type="text"
            placeholder="Nume"
            value={nume}
            onChange={(e) => {
              setNume(e.target.value);
            }}
          />
        </div>
        <div className="title">
          <input
            className="titleInput"
            type="text"
            placeholder="link"
            value={link}
            onChange={(e) => {
              setLink(e.target.value);
            }}
          />
        </div>
        <div className="btn">
          <button onClick={addLivrabil}>Adauga</button>
        </div>
      </div>
    </div>
  );
};

export default AddLivrabil;
