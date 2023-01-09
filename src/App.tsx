import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import { useOthelloStore } from './store';
import Board from './components/Board';

function App() {
    const startGame = useOthelloStore((store) => store.startGame);

    return (
        <div className='App'>
            <Board />
            <button onClick={startGame}>start</button>
        </div>
    );
}

export default App;
