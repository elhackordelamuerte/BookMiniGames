import React from "react";
import bird from '../assets/martin.png'

type BirdProps = {
    birdPosition: {
        x: number;
        y: number;
    };
};

const Bird: React.FC<BirdProps> = ({ birdPosition }) => {
    return (
        <img
            src={bird}
            alt="bird"
            className="bird"
            style={{
                position: 'absolute',
                left: birdPosition.x,
                top: birdPosition.y,
            }}
            draggable={true}
        />
    );
};


export default Bird;
