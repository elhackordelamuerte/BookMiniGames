import React from "react";

type PipeProps = {
    pipePosition: {
        x: number;
        y: number;
        image: string;
    };
};

const Pipes: React.FC<PipeProps> = ({ pipePosition }) => {
    return (
        <img
            src={pipePosition.image}
            alt="pipe"
            className="pipe"
            style={{
                position: 'absolute',
                left: pipePosition.x,
                top: pipePosition.y,
            }}
            draggable={true}
        />
    );
};

export default Pipes;
