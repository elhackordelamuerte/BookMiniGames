import React, { useState, useEffect } from 'react';
import chat from '../assets/chat.jpg';
import enfant from '../assets/enfant.jpg';
import martin from '../assets/martin.png';
import reunion from '../assets/reunion.jpg';
import savate from '../assets/savate.jpg';
import zorey from '../assets/images.jpg';

const WriteGame: React.FC = () => {
    const [score, setScore] = useState(0);
    const listword = [{word :"savate", img: savate}, {word :"chat", img: chat}, {word :"marmay", img: enfant}, {word :"martin", img: martin}, {word :"reunion", img: reunion}, {word :"zorey", img: zorey}];
    const [inputValue, setInputValue] = useState("");
    const [time, setTime] = useState(0);
    const [correct, setCorrect] = useState(false);
    const [wrong, setWrong] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const handleSubmit = () => {
        if (inputValue === listword[score].word) {
            setScore((prev) => prev + 1);
            setCorrect(true);
            setWrong(false);
            if (score === listword.length - 1) {
                setGameOver(true);
            }
        } else {
            setCorrect(false);
            setWrong(true);
        }
        setInputValue("");
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const alphabet = /^[A-Za-z]+$/;
            if (event.key === 'Enter') {
                handleSubmit();
            }
            if (event.key.match(alphabet) && event.key !== 'Backspace' && event.key !== 'Enter') {
                setInputValue((prev) => prev + event.key);
            }
            if (event.key === 'Backspace') {
                setInputValue((prev) => prev.slice(0, prev.length - 1));
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [inputValue]);
    
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
        <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center'}}>
            <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Réécrit les mots que Martin a entendu</h1>
            <p>Temps: {time} secondes</p>
            { !gameOver &&
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>{listword[score].word}</h2>

                <img src={listword[score].img} alt={listword[score].word} style={{ width: '200px', marginBottom: '10px', height: '200px' }} />
                
                <input type="text" value={inputValue} style={{ padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '200px' }} />

                <button onClick={handleSubmit} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Répondre</button>
            
            </div>
            }
            {!gameOver && correct && !wrong && <p style={{ color: 'green' }}>Correct!</p>}
            {!gameOver && !correct && wrong && <p style={{ color: 'red' }}>Wrong!</p>}
            {gameOver && <h2>congratulation</h2>}
        </div>
    );
};

export default WriteGame;