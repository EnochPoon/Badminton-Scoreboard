import { useRef, useState } from "react";
import ScoreCounter from "./ScoreCounter";
import { Button, Form } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { doSwapPlayers, setName, winPoint } from "./redux/matchData";
import CourtQuarter from "./CourtQuarter";

interface PropTypes {
  isRight: boolean;
}
function CourtHalf(props: PropTypes) {

  const pointsPair = useAppSelector(state => state.matchData.pointsPair);
  const points = pointsPair.split(' ')[Number(props.isRight)];
  const dispatch = useAppDispatch();
  function addPoint() {
    dispatch(winPoint(props.isRight));
  }
  
  return (
    <div className="court-half">
      
      <CourtQuarter position={Number(props.isRight) * 2} />
      <CourtQuarter position={Number(props.isRight) * 2 + 1} />
      <ScoreCounter points={points} onAddPoint={addPoint} isRight={props.isRight} />
      {pointsPair === '0 0' && <Button size="sm" className="swap-players-button" onClick={() => dispatch(doSwapPlayers(props.isRight))}>Swap</Button>}
    </div>
  )
}

export default CourtHalf;
