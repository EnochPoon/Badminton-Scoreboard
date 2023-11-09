import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface stateTypes {
  pointsPair: string; // two space-separated integers
  serveHistory: string; // string of 0's or 1's
  positions: string;
  curServer: number; // 0, 1, 2, or 3
}

const initialState: stateTypes = {
  pointsPair: '0 0',
  serveHistory: '0',
  positions: '______',
  curServer: 1
};

function swapPlayers(state: stateTypes, isRight: boolean) {
  const positionsArray = state.positions.split('__');
  [
    positionsArray[Number(isRight) * 2], positionsArray[Number(isRight) * 2 + 1]
  ] = [
    positionsArray[Number(isRight) * 2 + 1], positionsArray[Number(isRight) * 2]
  ];
  state.positions = positionsArray.join('__');
}

export const matchDataSlice = createSlice({
  name: 'matchData',
  initialState,
  reducers: {
    winPoint: (state, action: PayloadAction<boolean>) => {
      // win point, switch server if needed
      const points = state.pointsPair.split(" ").map(x => parseInt(x));

      // check if already won
      if (Math.max(...points) === 30 || (Math.max(...points) >= 21 && Math.max(...points) - Math.min(...points) >= 2)) {
        return;
      }

      points[Number(action.payload)]++;
      state.pointsPair = `${points[0]} ${points[1]}`;

      // switch sides if needed
      if (parseInt(state.serveHistory[state.serveHistory.length - 1]) === Number(action.payload)) {
        swapPlayers(state, action.payload);
      }
      state.serveHistory += Number(action.payload);

      // set new server
      if (action.payload) {
        // server on right
        state.curServer = 2 + points[1] % 2;
      } else {
        // server on left
        state.curServer = 1 - points[0] % 2;
      }
    },
    setName: (state, action: PayloadAction<{index: number, newName: string}>) => {
      const newPlayerNames = state.positions.split('__');
      newPlayerNames[action.payload.index] = action.payload.newName;
      state.positions = newPlayerNames.join('__');
      
    },
    undoPoint: (state) => {
      if (state.serveHistory.length > 1) {
        const lastServe = state.serveHistory.slice(-1);
        
        // remove point
        const points = state.pointsPair.split(' ').map(x => parseInt(x));
        points[Number(lastServe)]--;
        state.pointsPair = points.join(' ');

        // swap if necessary
        if (lastServe === state.serveHistory[state.serveHistory.length - 2]) {
          // const positionsArray = state.positions.split('__');
          // [
          //   positionsArray[Number(lastServe) * 2], positionsArray[Number(lastServe) * 2 + 1]
          // ] = [
          //   positionsArray[Number(lastServe) * 2 + 1], positionsArray[Number(lastServe) * 2]
          // ];
          // state.positions = positionsArray.join('__');
          swapPlayers(state, lastServe === '1');
        }
        state.serveHistory = state.serveHistory.slice(0, -1);

        // set new server
        if (Number(state.serveHistory.slice(-1))) {
          // server on right
          state.curServer = 2 + points[1] % 2;
        } else {
          // server on left
          state.curServer = 1 - points[0] % 2;
        }
      }
    },
    doSwapPlayers: (state, action: PayloadAction<boolean>) => {
      swapPlayers(state, action.payload);
    },
    swapCourtSides: (state) => {

      // change positions
      let positionsArray = state.positions.split('__');
      state.positions = positionsArray.reverse().join('__');

      // change points
      const pointsPair = state.pointsPair.split(' ');
      state.pointsPair = `${pointsPair[1]} ${pointsPair[0]}`;

      // change server
      state.curServer = 3 - state.curServer;
    },
    resetPoints: (state) => {
      state.pointsPair = '0 0';
      state.curServer = 1;
    },
    setServer: (state, action: PayloadAction<number>) => {
      state.curServer = action.payload;
      state.serveHistory = state.serveHistory.slice(0, -1) + Math.floor(action.payload / 2);
    }
  }
});

export const { winPoint, setName, undoPoint, doSwapPlayers, swapCourtSides, resetPoints, setServer } = matchDataSlice.actions;
export default matchDataSlice.reducer;
