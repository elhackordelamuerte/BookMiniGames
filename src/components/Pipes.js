// Pipes.js

import React from "react";
import pipes from "../../assets/pipes.png"

const Pipes = ({ pipePosition }) => {
    return (
        <img
            src={pipes}
            alt="pipe"
            className="pipe"
            style={{
                left: pipePosition.x,
                top: pipePosition.y,
                width: 150,
            }}
            draggable={true}
        />
    );
};

export default Pipes;
