import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import Axios from "axios";
import "./AdaugaNote.css";

const userSelector = (state) => state.user.user;

const AdaugaNote = () => {
  const [data, setData] = useState([]);
  const [nota, setNota] = useState(0);
  const [livrabile, setLivrabile] = useState([]);

  const user = useSelector(userSelector, shallowEqual);

  useEffect(() => {
    Axios.get(`http://localhost:8080/api/projects`)
      .then((result) => {
        // console.log(result.data);
        for (let i = 0; i < result.data.length; i++) {
          let idProiect = result.data[i].id;
          let titluProiect = result.data[i].titlu;
          let studentId = result.data[i].studentId;
          let livrabile = [];
          if (user.id !== studentId) {
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
                  let idLivrabil =
                    resultLivrabile.data.PartialDeliverable[j].id;
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
            Axios.get("http://localhost:8080/api/grades").then((response) => {
              // console.log(response.data);
              let notaProiect = 0;
              let idNota = 0;
              for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].idStudent === user.id) {
                  if (response.data[i].projectId === idProiect) {
                    notaProiect = response.data[i].grade;
                    idNota = response.data[i].id;
                  }
                }
              }
              setData((oldData) => [
                ...oldData,
                {
                  idProiect: idProiect,
                  titluProiect: titluProiect,
                  idNota: idNota,
                  nota: notaProiect,
                  livrabile: livrabile,
                },
              ]);
            });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const adaugaNota = (idProiect) => {
    let ok = 1;
    let idNota = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].idProiect === idProiect && data[i].nota !== 0) {
        ok = 0;
        idNota = data[i].idNota;
      }
    }
    if (ok === 0) {
      Axios.put(`http://localhost:8080/api/grades/${idNota}`, {
        grade: nota,
        projectId: idProiect,
        idStudent: user.id,
      })
        .then(() => {
          console.log("Succes!");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      Axios.post("http://localhost:8080/api/grades", {
        grade: nota,
        projectId: idProiect,
        idStudent: user.id,
      })
        .then(() => {
          console.log("Succes!");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setData([]);
    Axios.get(`http://localhost:8080/api/projects`)
      .then((result) => {
        // console.log(result.data);
        for (let i = 0; i < result.data.length; i++) {
          let idProiect = result.data[i].id;
          let titluProiect = result.data[i].titlu;
          let studentId = result.data[i].studentId;
          let livrabile = [];
          if (user.id !== studentId) {
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
                  let idLivrabil =
                    resultLivrabile.data.PartialDeliverable[j].id;
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
            Axios.get("http://localhost:8080/api/grades").then((response) => {
              // console.log(response.data);
              let notaProiect = 0;
              let idNota = 0;
              for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].idStudent === user.id) {
                  if (response.data[i].projectId === idProiect) {
                    notaProiect = response.data[i].grade;
                    idNota = response.data[i].id;
                  }
                }
              }
              setData((oldData) => [
                ...oldData,
                {
                  idProiect: idProiect,
                  titluProiect: titluProiect,
                  idNota: idNota,
                  nota: notaProiect,
                  livrabile: livrabile,
                },
              ]);
            });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="containerAdaugaNote">
        {data.map((item) => {
          return (
            <div key={item.idProiect} className="divProiect">
              <h1 className="titluLivrabil">{item.titluProiect}</h1>
              <button
                className="addNotaButton"
                onClick={() => adaugaNota(item.idProiect)}
              >
                {item.nota ? <span>Actualizeaza</span> : <span>Adauga</span>}
              </button>
              <input
                className="inputNota"
                type="number"
                placeholder="Nota"
                min="1"
                max="10"
                defaultValue={item.nota ? item.nota : <span></span>}
                onChange={(e) => {
                  setNota(e.target.value);
                }}
              />
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
        <div className="hiddenButton">
          <button></button>
        </div>
      </div>
    </div>
  );
};

export default AdaugaNote;
