import { Button, ButtonGroup } from "react-bootstrap";


const ScoreCounter = (props: any) => {
  return (
    <div className="score-counter" style={props.isRight? {left: '3%'} : {right: '3%'}}>
      <div className="points-number"><b>{props.points}</b></div>
      <Button onClick={props.onAddPoint}>+</Button>
      
    </div>
  );
}
 
export default ScoreCounter;
