import { WINNER_COMBOS } from "../constants.js";

export const checkWinnerFrom = (boardToCheck) => {
    // revisamos todas las combinaciones ganadoras
    // para ver si X u O ganó
    for (const combo of WINNER_COMBOS){
      const [a, b, c] = combo;
      if(
        boardToCheck[a] && // 0 -> x u o
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
        
      ) {
        return boardToCheck[a] // x u o
      }
    }

    // si no hay ganador
    return null
    
  }

  export const checkEndGame = (newBoard) => {
    // REVISAMOS SI HAY UN EMPATE
    // si no hay más espacios vacios
    // en el tablero

    return newBoard.every((square) => square !== null)

  }