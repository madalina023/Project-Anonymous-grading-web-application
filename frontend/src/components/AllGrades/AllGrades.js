import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Axios from "axios";
import "./AllGrades.css";

const AllGrades = () => {
  const { proiectId } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:8080/api/projects/${proiectId}/grades`)
      .then((result) => {
        setData({
          idProiect: result.data.id,
          titlu: result.data.titlu,
          note: result.data.Grade,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div className="containerAllGrades">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Titlu proiect</th>
              <th scope="col">Note</th>
            </tr>
          </thead>
          <tbody>
            <tr key={data.idProiect}>
              <td>{data.titlu}</td>
              <td>{data.note?.map((item) => item.grade).join(", ")}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllGrades;
