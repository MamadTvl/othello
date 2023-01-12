import { useOthelloStore } from './../../../store/index';
import { useEffect, useRef } from 'react';
const useRobot = () => {
    const players = useOthelloStore((store) => store.players);
    const turn = useOthelloStore((store) => store.turn);
    const putDisc = useOthelloStore((store) => store.putDisc);
    const timer = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const player = players[turn];
        if (player.type === 'Robot' && player.legalMoves.length > 0) {
            timer.current = setTimeout(() => {
                const selectedMoveIndex = Math.floor(
                    Math.random() * player.legalMoves.length,
                );
                putDisc(turn, player.legalMoves[selectedMoveIndex]);
            }, 1000);
        }
        return () => {
            if (timer.current) {
                clearTimeout(timer.current);
                timer.current = null;
            }
        };
    }, [players, turn]);
};

export default useRobot;
