import 'bootstrap/dist/css/bootstrap.min.css';
import './Court.scss';

import CourtHalf from './CourtHalf';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { resetPoints, swapCourtSides, undoPoint } from './redux/matchData';
import { useEffect, useState } from 'react';
function App() {
  const pointsPair = useAppSelector(state => state.matchData.pointsPair);
  const dispatch = useAppDispatch();
  const [portraitMode, setPortraitMode] = useState(false);

  useEffect(() => {
    function onResize() {
      setPortraitMode(window.innerWidth < window.innerHeight);
    }

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  function handleReset() {
    if (window.confirm('Are you sure you want to reset the score back to 0-0?')) {
      dispatch(resetPoints());
    }
  }
  return (
    <>
    <div style={{display: (portraitMode? 'block' : 'none')}}>
      Please rotate your screen to landscape mode to use this app.
      <p>(Work in progress: portrait mode compatibility)</p>
      </div>
    <div className="App" style={{display: (!portraitMode? 'block' : 'none')}}>
      
      <div className="court">
        <CourtHalf isRight={false} />
        <div className="net"></div>
        <CourtHalf isRight={true} />
      </div>
      <ButtonGroup vertical className="basic-button-group">
        <Button disabled={pointsPair === '0 0'} onClick={() => dispatch(undoPoint())}>Undo</Button>
        {pointsPair === '0 0' ? (
          <Button onClick={() => dispatch(swapCourtSides())}>Change Sides</Button>
        ) : (
          <Button variant="danger" onClick={handleReset}>Reset</Button>
        )}
      </ButtonGroup>


    </div>
    </>
    
  );
}

export default App;
