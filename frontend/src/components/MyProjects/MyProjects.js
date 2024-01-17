import React, { useState, useEffect } from "react";
import "./MyProjects.css";
import Axios from "axios";
import { useSelector, shallowEqual } from "react-redux";
import { useNavigate } from "react-router";

const userSelector = (state) => state.user.user;

const MyProjects = () => {
  const [data, setData] = useState([]);
  const [livrabile, setLivrabile] = useState([]);

  const user = useSelector(userSelector, shallowEqual);

  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`http://localhost:8080/api/students/${user.id}/projects`)
      .then((result) => {
        // console.log(result.data.Project);
        for (let i = 0; i < result.data.Project.length; i++) {
          let idProiect = result.data.Project[i].id;
          let titluProiect = result.data.Project[i].titlu;
          let livrabile = [];
          Axios.get(
            `http://localhost:8080/api/projects/${idProiect}/partialDeliverables`
          )
            .then((resultLivrabile) => {
              //   console.log(resultLivrabile.data);
              for (
                let j = 0;
                j < resultLivrabile.data.PartialDeliverable.length;
                j++
              ) {
                let idLivrabil = resultLivrabile.data.PartialDeliverable[j].id;
                let numeLivrabil =
                  resultLivrabile.data.PartialDeliverable[j].nume;
                let linkLivrabil =
                  resultLivrabile.data.PartialDeliverable[j].link;
                livrabile.push({
                  idLivrabil: idLivrabil,
                  numeLivrabil: numeLivrabil,
                  linkLivrabil: linkLivrabil,
                });
                setLivrabile((oldLivrabile) => [
                  ...oldLivrabile,
                  {
                    idLivrabil: idLivrabil,
                    numeLivrabil: numeLivrabil,
                    linkLivrabil: linkLivrabil,
                  },
                ]);
              }
            })
            .catch((error) => {
              console.log(error);
            });
          setData((oldData) => [
            ...oldData,
            {
              idProiect: idProiect,
              titluProiect: titluProiect,
              livrabile: livrabile,
            },
          ]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const sterge = (idProiect) => {
    console.log("Stergere proiect cu id " + idProiect);
    Axios.delete(`http://localhost:8080/api/projects/${idProiect}`);
    const newData = data.filter((item) => item.idProiect !== idProiect);
    setData(newData);
  };

  const editeaza = (idProiect) => {
    navigate(`/editProject/${idProiect}`);
  };

  const livrabilePartiale = (idProiect) => {
    navigate(`/livrabilePartiale/${idProiect}`);
  };

  return (
    <div>
      <div className="containerMyProjects">
        {data.map((item) => {
          return (
            <div key={item.idProiect} className="divProiect">
              <h1 className="titluLivrabil">{item.titluProiect}</h1>
              <button
                className="projectButton"
                onClick={() => livrabilePartiale(item.idProiect)}
              >
                Livrabile partiale
              </button>
              <button
                className="projectButton"
                onClick={() => sterge(item.idProiect)}
              >
                Sterge
              </button>
              <button
                className="projectButton"
                onClick={() => editeaza(item.idProiect)}
              >
                Editeaza
              </button>
              {item.livrabile?.map((item2) => {
                return (
                  <p className="linkLivrabil" key={item2.idLivrabil}>
                    {item2.numeLivrabil}:{" "}
                    <a
                      href={item2.linkLivrabil}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item2.linkLivrabil}
                    </a>
                  </p>
                );
              })}
            </div>
          );
        })}
        <div className="addProjectButton">
          <button
            onClick={() => {
              navigate("/addProject");
            }}
          >
            Adauga proiect
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProjects;
