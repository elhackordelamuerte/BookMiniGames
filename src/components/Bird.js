// Bird.js
import React from "react";
import bird from '../../assets/martin.png'

const Bird = ({ birdPosition }) => {

    return (
        <img
            src={bird}
            alt="bird"
            className="bird"
            style={{
                left: birdPosition.x,
                top: birdPosition.y,
                width: 100,
                height: 100
            }}
            draggable={true}
        />
    );
};

export default Bird;
