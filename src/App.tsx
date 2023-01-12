import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import { useOthelloStore } from './store';
import Board from './components/game/Board';
import Home from './components/home/Home';
function App() {
    const isGameStarted = useOthelloStore((store) => store.started);

    return (
        <div className='App'>
            {isGameStarted ? <Board /> : <Home />}
            <a
                id={'source_code'}
                href='https://github.com/mamadtvl/othello'
                target={'_blank'}>
                <img
                    width={50}
                    height={50}
                    src={'/github.svg'}
                    alt={'github'}
                />
            </a>
        </div>
    );
}

export default App;
