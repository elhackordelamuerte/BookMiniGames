import React, { useState, useEffect, useRef } from 'react';
import martin from '../assets/Martin-triste.jpg';
import plume from '../assets/plume.png';
import back from '../assets/background.png';
import heart from '../assets/heart.png';
import cage from '../assets/cage.png';

export function FlyMinigame () {
  
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [targets, setTargets] = useState<{ id: number; x: number; y: number }[]>([]);
  const [enemy, setEnemy] = useState<{ id: number; x: number; y: number }[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [lives, setLives] = useState(6);
  const divRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const rect = divRef.current?.getBoundingClientRect();
      setPosition({ 
        x: event.clientX - (rect?.left || 0), 
        y: event.clientY - (rect?.top || 0)
      });
    };
  
    const divElement = divRef.current;
  
    if (divElement) {
      divElement.addEventListener('mousemove', handleMouseMove);
    }
  
    return () => {
      if (divElement) {
        divElement.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  useEffect(() => {
    const generateTarget = () => {
      if (gameOver) {
        return;
      }
      const newTarget = {
        id: Date.now(),
        x: Math.random() * divRef.current.clientWidth, 
        y: 0, 
      };
      setTargets((prev) => [...prev, newTarget]);
    };

    const interval = setInterval(generateTarget, 2000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const generateEnemy = () => {
      if (gameOver) {
        return;
      }
      const newEnemy = {
        id: Date.now(),
        x: Math.random() * divRef.current.clientWidth, 
        y: 0, 
      };
      setEnemy((prev) => [...prev, newEnemy]);
    }
    const interval = setInterval(generateEnemy, 1000);
    return () => clearInterval(interval);
  }
  , []);

  useEffect(() => {
    const moveEnemies = () => {
      setEnemy((prev) =>
        prev
          .map((enemy) => ({
            ...enemy,
            y: enemy.y + 10, 
          }))
          .filter((enemy) => enemy.y < divRef.current.clientHeight) 
      );
    };

    const interval = setInterval(moveEnemies, 50); 

    return () => clearInterval(interval);
  }, []);

  const isColliding_enemy = (enemy: {id:number; x: number; y: number }) => {
      
      const isco = 
            position.x < enemy.x + 50 &&
            position.x + 50 > enemy.x &&
            position.y < enemy.y + 50 &&
            position.y + 50 > enemy.y
      if (isco) {
        setLives((prev) => prev - 1);
        console.log(lives);
      }
      return isco; 
    }

  useEffect(() => {
      const detectCollisions = () => {
        if (gameOver) {
          return;
        }
          setEnemy((prev) =>
              prev.filter(
                  (enemy) =>
                      !isColliding_enemy(enemy)
              )
          );
      };

      const interval = setInterval(detectCollisions, 100);
      return () => clearInterval(interval);
  }
  , [position]);

  useEffect(() => {
    const moveTargets = () => {
      if (gameOver) {
        return;
      }
      setTargets((prev) =>
        prev
          .map((target) => ({
            ...target,
            y: target.y + 10, 
          }))
          .filter((target) => target.y < divRef.current.clientHeight) 
      );
    };

    const interval = setInterval(moveTargets, 50); 

    return () => clearInterval(interval);
  }, []);

const isColliding = (target: {id:number; x: number; y: number }) => {
    
  const isco = 
        position.x < target.x + 50 &&
        position.x + 50 > target.x &&
        position.y < target.y + 50 &&
        position.y + 50 > target.y
  if (isco) {
    setScore((prev) => prev + 1);
    console.log(score);
  }
  return isco; 
}

useEffect(() => {
    const detectCollisions = () => {
      if (gameOver) {
        return;
      }
        setTargets((prev) =>
            prev.filter(
                (target) =>
                    !isColliding(target)
            )
        );
    };

    const interval = setInterval(detectCollisions, 100);
    return () => clearInterval(interval);
}, [position]);

  const round_to_superior = (n: number) => {
    const new_n = n / 2
    return Math.round(new_n)
  }

  useEffect(() => {
    if (score >= 30 || lives <= 0) {
      setGameOver(true);
    }
  }, [score, lives]);

  

  return (
    <div ref={divRef} >
      <img src={back} style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        right: 0,
      }}/>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
        <div>
          {
            score >= 30 ? (
              <div style={{position: 'absolute', left: '400px', top: '200px', fontSize: '100px' }}>
                Congratulations! You Win!
              </div>
            ) : lives <= 0 ? (
              <div>
              <div style={{ position: 'absolute', left: '400px', top: '200px', fontSize: '100px' }}>
                Game Over!
              </div>
              <div style={{ position: 'absolute'}} className='border'>
                <button onClick={() => {setLives(6); setScore(0); setGameOver(false);}} style={{ fontSize: '50px', marginTop: '50px' }}>Retry</button>
              </div>
              </div>
            ) : (
              <>
                <img
                  src={martin}
                  alt="Martin"
                  style={{
                    position: 'absolute',
                    left: position.x,
                    top: position.y,
                    width: '50px',
                    height: '50px',
                  }}
                />
                {enemy.map((enemy) => (
                  <img
                    key={enemy.id}
                    src={cage}
                    alt="Enemy"
                    style={{
                      position: 'absolute',
                      left: enemy.x,
                      top: enemy.y,
                      width: '50px',
                      height: '50px',
                    }}
                  />
                ))}
                {targets.map((target) => (
                  <img
                    key={target.id}
                    src={plume}
                    alt="Target"
                    style={{
                      position: 'absolute',
                      left: target.x,
                      top: target.y,
                      width: '50px',
                      height: '50px'
                    }}
                  />
                ))}
              </>
            )
          }
          <div
            style={{
              position: 'absolute',
              top: '50px',
              left: '10px',
              backgroundColor: 'black',
              color: 'white',
              padding: '5px',
              alignItems: 'center',
              display: 'flex'
            }}
          >
            {Array.from({ length: round_to_superior(lives) }).map((_, index) => (
              <img
                key={index}
                src={heart}
                alt="heart"
                style={{ width: '20px', height: '20px' }}
              />
            ))}
          </div>
          <div
            style={{
              position: 'absolute',
              top: '50px',
              right: '10px',
              backgroundColor: 'black',
              color: 'white',
              padding: '5px',
              fontSize: '15px'
            }}
          >
            Score: {score}
          </div>
        </div>
      </div>
    </div>
  );
};
