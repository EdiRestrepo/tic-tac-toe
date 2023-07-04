import { useState } from "react"
import confetti from "canvas-confetti"
import { Square } from "./components/Square"
import { TURNS } from "./constants";
import { checkWinnerFrom, checkEndGame } from "./logic/board";
import { WinnerModal } from "./components/WinnerModal";


function App() {
  console.log('render');
  const [board, setBoard] = useState(()=>{
    console.log('inicializar estado del board')
    const boardFromStorage = window.localStorage.getItem('board');
    return boardFromStorage ? JSON.parse(boardFromStorage) : 
    Array(9).fill(null);
  });

  const [turn, setTurn ] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn');
    return turnFromStorage ?? TURNS.X;
  });

  // null es que no hay ganador, false es que hay un empate
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem('board');
    window.localStorage.removeItem('turn');
  }

  const updateBoard = (index) => {
    //no actualizamos esta posición
    // si ya tiene algo
    if(board[index] || winner) return;
    // actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard); // la actualizacion del estado es asincrona
    //cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    // guardar aqui partida
    window.localStorage.setItem('board', JSON.stringify(newBoard));
    window.localStorage.setItem('turn', newTurn);
    // revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if(newWinner){
      confetti();
      setWinner(newWinner) //actualiza el estado de manera asincrono
      // alert(`El ganador es ${newWinner}`)
      // To do: check if game is over
    }else if(checkEndGame(newBoard)){
      setWinner(false) // empate
    }

  }

  console.log(board);

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame} >Reset del juego</button>
      <section className="game">
        {
          board.map((square, index) => {
            return (
              <Square
              key={index}
              index= {index}
              updateBoard={updateBoard}>
                {square}
              </Square>
            )
          })
        }
      </section>
      <section className="turn">
        <Square isSelected={turn == TURNS.X}>
          {TURNS.X}
          </Square>
        <Square isSelected={turn == TURNS.O}>
          {TURNS.O}
          </Square>
      </section>
      
      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
    
  )
}

export default App
