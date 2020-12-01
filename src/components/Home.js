import React, { Component , useContext} from 'react';
import UserContext from "./context/UserContext";
import {Card,Button} from "react-bootstrap";
import home from "../200287-Thousand_Sunny-One_Piece.jpg"

export default function Home(){
  const { userData, setUserData } = useContext(UserContext);
  return (
    <div className = "LoggedIN">
     {userData.user?(
      <p>
      	Logged in
      </p>
     )
     :
     (
     	<>
     <Card>
    <Card.Img variant="top" src={home} style={ { height: 300} }/>
  </Card>
  <Card body style = {{"background-color": "white","color": "black"}}>This is some text within a card body.</Card>
   </>
     )}
    </div>
    )
}

