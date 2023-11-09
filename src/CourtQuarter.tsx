import { Badge, Button, Form } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { setName, setServer } from "./redux/matchData";
interface PropTypes {
  position: number;
}
export default function CourtQuarter(props: PropTypes) {
  const playerName = useAppSelector(state => state.matchData.positions.split('__')[props.position]);
  const pointsPair = useAppSelector(state => state.matchData.pointsPair);
  const curServer = useAppSelector(state => state.matchData.curServer);
  const dispatch = useAppDispatch();
  return (
    <div className="court-quarter">
      <Form.Control 
      // plaintext 
      value={playerName}
      placeholder="Player name"
      onChange={e => dispatch(setName({index: props.position, newName: e.target.value}))} 
      />
      {curServer === props.position && <Button disabled size="sm" variant="success" className="server-text">SERVING</Button>}
      {pointsPair === '0 0'
      && [1, 2].includes(props.position) 
      && curServer !== props.position 
      && <Button variant="warning" size="sm" onClick={() => dispatch(setServer(props.position))} className="server-text">Set as server</Button>}
    </div>
  )
}
