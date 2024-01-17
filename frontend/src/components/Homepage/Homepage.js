import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import "./Homepage.css";

const userSelector = (state) => state.user.user;

const Homepage = () => {
  const [isHidden, setIsHidden] = useState(true);

  const user = useSelector(userSelector, shallowEqual);

  useEffect(() => {
    if (user.id !== 0) {
      setIsHidden(!isHidden);
    }
  }, [user]);

  return (
    <div className="containerHomepage">

      <div className="homepage-left">
        {!isHidden ? <h1>Salutare, {user.prenume}!</h1> : <span></span>}
        <br /> 
        <h3>Teamwork makes the project work!</h3>
        <p>
          <br /> 
          Bine ai venit în locul perfect pentru colaborare și dezvoltare.
          <br /> 
          <br /> 
          Acum poți încărca oricând un proiect sau livra parțial o parte din acesta.
          <br /> 
          <br /> 
          Iar pentru că feedback-ul are un rol important în evaluarea oricărui proiect, acum poți atât să oferi note colegilor, cât și să primești la rândul tău note din partea lor și a profesorilor.
        </p>
      </div>

      <div className="homepage-right">
        <img src="background.png"/>
      </div>

    </div>
  );
};

export default Homepage;
