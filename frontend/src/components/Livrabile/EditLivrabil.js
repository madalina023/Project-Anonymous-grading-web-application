import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useSelector, shallowEqual } from "react-redux";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import "./EditLivrabil.css";

const EditLivrabil = () => {
  const [nume, setNume] = useState("");
  const [link, setLink] = useState("");

  const { livrabilId } = useParams();
  const { proiectId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`http://localhost:8080/api/partialDeliverables/${livrabilId}/`)
      .then((response) => {
        setNume(response.data.nume);
        setLink(response.data.link);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const editLivrabil = () => {
    if (nume) {
      if (link) {
        Axios.put(
          `http://localhost:8080/api/partialDeliverables/${livrabilId}`,
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
      <div className="containerEditLivrabil">
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
          <button onClick={editLivrabil}>Editeaza</button>
        </div>
      </div>
    </div>
  );
};

export default EditLivrabil;
