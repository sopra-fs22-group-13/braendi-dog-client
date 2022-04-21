import Down from '@mui/icons-material/ArrowCircleDownOutlined';
import Up from '@mui/icons-material/ArrowCircleUpOutlined';
import Left from '@mui/icons-material/ArrowCircleLeftOutlined';
import Right from '@mui/icons-material/ArrowCircleRightOutlined';
import { useEffect, useState } from 'react';
import { HelpOutline } from '@mui/icons-material';
import 'styles/ui/TurnIndicator.scss';


const TurnIndicator = (props) => {
    const [state, setState] = useState(0);
    useEffect(() => {
        //only add the listener on initial render, otherwise we have multiple
        document.addEventListener("turnUpdate", event => {
            setState(event.detail.turn);
        });
    }, []);

    return (
        <div className='turn-indicator'>
            {state == 0? <Down/> : null}
            {state == 1? <Left/> : null}
            {state == 2? <Up/> : null}
            {state == 3? <Right/> : null}
        </div>
    )
}

export default TurnIndicator;
