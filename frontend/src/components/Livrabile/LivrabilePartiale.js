import React, { useState, useEffect } from "react";
import "./LivrabilePartiale.css";
import Axios from "axios";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

const LivrabilePartiale = () => {
  const [data, setData] = useState([]);
  const [titluProiect, setTitluProiect] = useState("");
  const { proiectId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`http://localhost:8080/api/projects/${proiectId}`)
      .then((result) => {
        setTitluProiect(result.data.titlu);
      })
      .catch((error) => {
        console.log(error);
      });
    Axios.get(
      `http://localhost:8080/api/projects/${proiectId}/partialDeliverables`
    )
      .then((result) => {
        setData(result.data.PartialDeliverable);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const editeaza = (idLivrabil) => {
    console.log("Se editeaza livrabilul cu id-ul " + idLivrabil);
    navigate(`/editLivrabil/${idLivrabil}/${proiectId}`);
  };

  const sterge = (idLivrabil) => {
    console.log("Se sterge livrabilul cu id-ul " + idLivrabil);
    Axios.delete(`http://localhost:8080/api/partialDeliverables/${idLivrabil}`);
    const newData = data.filter((item) => item.id !== idLivrabil);
    setData(newData);
  };

  return (
    <div>
      <div className="containerLivrabile">
        <h2 className="livrabileTitlu">{titluProiect}: Livrabile partiale</h2>
        {data.map((item) => {
          return (
            <div key={item.id} className="divLivrabil">
              <p className="textLivrabil">
                <strong>{item.nume}</strong>:{" "}
                <a href={item.link} target="_blank" rel="noreferrer">
                  {item.link}
                </a>
              </p>
              <button
                className="livrabilButton"
                onClick={() => sterge(item.id)}
              >
                Sterge
              </button>
              <button
                className="livrabilButton"
                onClick={() => editeaza(item.id)}
              >
                Editeaza
              </button>
            </div>
          );
        })}
        <div className="addLivrabil">
          <button
            onClick={() => {
              navigate(`/addLivrabil/${proiectId}`);
            }}
          >
            Adauga livrabil
          </button>
        </div>
      </div>
    </div>
  );
};

export default LivrabilePartiale;
