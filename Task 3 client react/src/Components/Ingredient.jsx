import React from "react";
import { Card } from "react-bootstrap";

export default function Ingredient(props) {
  const SendID = (e) => {
    if (e.target.checked) {
      props.SendID2Add(props.id);
    } else {
      props.sendID2Remove(props.id);
    }
  };

  return (
    <div style={{ float: "left" }}>
      <Card.Title>
        {props.button && (
          //if we're in add recipe page
          <div style={{ textAlign: "center" }}>
            <br></br>
            <label>Add </label>
            <input onChange={SendID} id={props.id} type="checkBox" />
          </div>
        )}
      </Card.Title>

      <Card style={{ margin: "10px", width: "10rem" }}>
        <Card.Img src={props.image} />

        <Card.Body>
          <Card.Title>{props.name}</Card.Title>

          <Card.Text>
            <b>Calories : </b>
            {props.calories}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
