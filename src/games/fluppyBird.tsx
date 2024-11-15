import React, { useState, useEffect } from 'react';
import Bird from '../components/Bird.tsx';
import Pipes from '../components/Pipes.tsx';
import pipe2 from '../assets/pipe2.png'
import pipe3 from '../assets/pipe3.png'
import '../styles/fluppyBird.css';

type Position = {
    x: number;
    y: number;
};

type Pipe = {
    x: number;
    y: number;
    passed: boolean;
    image: string;
};

const Fluppybird: React.FC = () => {
    const [birdPosition, setBirdPosition] = useState<Position>({ x: 50, y: 200 });
    const [pipes, setPipes] = useState<Pipe[]>([]);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [won, setWon] = useState<boolean>(false);
    const pipesImages = [pipe2, pipe3];
    const [counter, setCounter] = useState(60)

    const jump = (): void => {
        if (!gameOver && gameStarted && !won) {
            setBirdPosition((prev) => ({ ...prev, y: prev.y - 60 }));
        } else if (!gameOver && !gameStarted) {
            setGameStarted(true);
        } else if (gameOver || won) {
            resetGame();
        }
    };

    const resetGame = (): void => {
        setBirdPosition({ x: 50, y: 200 });
        setPipes([]);
        setGameOver(false);
        setGameStarted(true);
        setScore(0);
        setWon(false);
        setCounter(60)
    };

    const checkCollision = (): void => {
        if (counter === 0 && score > 0) {
            setWon(true);
            setGameStarted(false);
        }
        const birdTop = birdPosition.y;
        const birdBottom = birdPosition.y + 50;
        const birdLeft = birdPosition.x;
        const birdRight = birdPosition.x + 50;

        pipes.forEach((pipe) => {
            const pipeTop = pipe.y;
            const pipeBottom = pipe.y + 600;
            const pipeLeft = pipe.x;
            const pipeRight = pipe.x + 100;

            const isColliding =
                birdRight > pipeLeft &&
                birdLeft < pipeRight &&
                birdBottom > pipeTop &&
                birdTop < pipeBottom;

            if (isColliding && !won) {
                setGameOver(true);
                setGameStarted(false);
            }
        });

        if ((birdBottom > 800 || birdTop < -220)) {
            setGameOver(true);
            setGameStarted(false);
        }
    };

    useEffect(() => {
        checkCollision();
    }, [birdPosition, pipes, gameOver, score]);

    useEffect(() => {
        if (gameOver)
            return;
        if (counter > 0) {
            const countDown = setInterval(() => {
                setCounter((prevCounter) => prevCounter - 1)
            }, 1000)
            return () => clearInterval(countDown)
        }
    }, [counter]);


    useEffect(() => {
        if (won) {
            return;
        }
        const gravity = setInterval(() => {
            setBirdPosition((prev) => ({ ...prev, y: prev.y + 5 }));
            checkCollision();
        }, 30);

        const pipeGenerator = setInterval(() => {
            if (!gameOver && gameStarted && !won) {
                const randomImage = pipesImages[Math.floor(Math.random() * pipesImages.length)]
                setPipes((prev) => [
                    ...prev,
                    { x: 400, y: Math.floor(Math.random() * 300), passed: false, image: randomImage },
                ]);
            }
        }, 2000);

        const pipeMove = setInterval(() => {
            if (!gameOver && gameStarted && !won) {
                setPipes((prev) =>
                    prev.map((pipe) => {
                        if (!pipe.passed && pipe.x < birdPosition.x) {
                            pipe.passed = true;
                            setScore((prevScore) => prevScore + 1);
                        }
                        return { ...pipe, x: pipe.x - 5 };
                    })
                );
            }
        }, 30);

        return () => {
            clearInterval(gravity);
            clearInterval(pipeGenerator);
            clearInterval(pipeMove);
        };
    }, [gameOver, gameStarted, won]);

    return (
        <div className={`App ${gameOver ? 'game-over' : ''} ${won ? 'win' : ''}`} onClick={jump}>
            <Bird birdPosition={birdPosition} />
            {pipes.map((pipe, index) => (
                <Pipes key={index} pipePosition={pipe} />
            ))}
            <div className="score-display">
                Score: {score}
            </div>
            <p className='counter'>{counter}</p>
            {gameOver && (
                <center>
                    <div className="game-over-message">
                        Oh non ! Martin Triste s'est fait attrapé !
                        <br />
                        Votre score: {score}
                        <br />
                        <p style={{ backgroundColor: 'red', padding: "2px 6px", borderRadius: '5px' }}>Cliquer n'importe où pour recommencer</p>
                    </div>
                </center>
            )}
            {won && (
                <center>
                    <div className="win-message">
                        Bravo! Martin Triste a pu s'échapper !
                        <br />
                        Score Final: {score}
                        <br />
                        <p style={{ backgroundColor: 'green', padding: "2px 6px", borderRadius: '5px' }}>Cliquer n'importe où pour rejouer</p>
                    </div>
                </center>
            )}
        </div>
    );
};

export default Fluppybird;

