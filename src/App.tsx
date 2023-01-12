import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import { useOthelloStore } from './store';
import Board from './components/game/Board';
import Home from './components/home/Home';

function App() {
    const isGameStarted = useOthelloStore((store) => store.started);

    return <div className='App'>{isGameStarted ? <Board /> : <Home />}</div>;
}

export default App;
