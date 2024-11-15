import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useAnimation } from 'framer-motion';
import back from '../assets/without_magic.png';
import martin from '../assets/Martin-triste.jpg'
import plume from '../assets/plume.png';
import jail from '../assets/jail.png';

 export function TestLib() {
    const dragConstraintsRef = React.useRef(null);
    const [jailHp, setJailHp] = useState(0);
    const controls = useAnimation();

    const handleCollision = () => {
        console.log('Collision detected');
    };

    const shake = () => {
        controls.start({
            x: [0, -1 * jailHp , 1  * jailHp, -1  * jailHp, 1  * jailHp, -1  * jailHp, 1  * jailHp, -1  * jailHp, 1  * jailHp, 0],
            y: [, -1  * jailHp, 1  * jailHp, -1  * jailHp, 1  * jailHp, -1  * jailHp, 1  * jailHp, -1  * jailHp, 1  * jailHp, 0],
        });
    }

    const handleClick = () => {
        setJailHp((prev) => Math.max(0, prev + 1));
        shake();
    }

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const { point } = info;
        const element = document.elementFromPoint(point.x, point.y);
        console.log(point.x, point.y);
        if (element && element.classList.contains('collision-element')) {
            handleCollision();
        }
    };

    return (
        <div>
            <h1 style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', fontSize: '24px'}}>clique sur le cage pour liberer Martin</h1>
        <div
            ref={dragConstraintsRef}
            style={{ width: "100%", height: "65vh", position: "relative", background: `url(${back})` }}
        >   
            <div>
                <motion.img
                    src={martin}
                    alt="un"
                    style={{ width: 100, height: 100, position: "absolute"}}
                    drag
                    dragConstraints={dragConstraintsRef}
                    onDragEnd={handleDragEnd}
                    initial={{ y: 50, x: 250 }}
                    className="collision-element"
                />
            </div>
            <div>{
                jailHp < 11 &&
                <motion.img
                    src={jail}
                    alt="un"
                    animate={controls}
                    style={{  width:"100%", height: "100%",  position: "absolute"}}
                    onClick={handleClick}
                     />
            }
            </div>
            </div>
        </div>
    );
};
