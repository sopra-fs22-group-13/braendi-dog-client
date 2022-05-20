import React, { useState } from "react";
import reactDom from "react-dom";
import "styles/ui/InfoBlock.scss"
import { Button } from "./Button";
import { MovePopup, RulesPopup } from "./RulesPopup";

const InfoButtons = () => {

    const [rulesOn, setRulesOn] = useState(false);
    const [helpOn, setHelpOn] = useState(false);

    function toggleRules()
    {
        setRulesOn(!rulesOn);
    }

    function toggleHelp()
    {
        setHelpOn(!helpOn);
    }

    return (
        <React.Fragment>
            <div className="helpinfo-container">
                <div>
                    <Button onClick={toggleRules}>Rules</Button>
                    <Button onClick={toggleHelp}>Help</Button>
                </div>
            </div>

            {<RulesPopup open={rulesOn} onClose={toggleRules}/>}
            {<MovePopup open={helpOn} onClose={toggleHelp}/>}

        </React.Fragment>

    );
}

export default InfoButtons;