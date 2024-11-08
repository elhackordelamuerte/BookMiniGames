import { a } from 'framer-motion/client';
import React, { useState, useEffect } from 'react';

const WriteGame: React.FC = () => {
    const [score, setScore] = useState(0);
    const listword = ["savate", "martin", "reunion", "chat", "mot", "monmon", "marmay"];
    const [inputValue, setInputValue] = useState("");
    const [time, setTime] = useState(0);
    const [correct, setCorrect] = useState(false);
    const [wrong, setWrong] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    const handleSubmit = () => {
        if (inputValue === listword[score]) {
            setScore((prev) => prev + 1);
            setInputValue("");
            setCorrect(true);
            setWrong(false);
            if (score === listword.length - 1) {
                setGameOver(true);
            }
        } else {
            setInputValue("");
            setCorrect(false);
            setWrong(true);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    useEffect(() => {
        const timer = setInterval(() => {
            if (gameOver)
                return;
            setTime((prevTime) => prevTime + 1);
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
            <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Réécrit les mots que Martin a entendu</h1>
            <p>Time: {time} seconds</p>
            { !gameOver &&
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>{listword[score]}</h2>
                <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyPress} style={{ padding: '10px', marginBottom: '10px' }} />
                <button onClick={handleSubmit} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Submit</button>
            
            </div>
            }
            {!gameOver && correct && !wrong && <p style={{ color: 'green' }}>Correct!</p>}
            {!gameOver && !correct && wrong && <p style={{ color: 'red' }}>Wrong!</p>}
        </div>
    );
};

export default WriteGame;