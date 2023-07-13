import React, { useState } from 'react'; 
import Popup from '@jsroot/components/popup/Popup.jsx';
import LangHelper from '@jsroot/lib/langHelper';
import {decode} from '@jsroot/lib/htmlHelper';

const UpcomingClosurePopUp = () => {
    const [isShow, setIsShow] = useState(true);
    const _onCloseHandler = () =>{
        setIsShow(false);
    }

    return (
        <>
            <Popup width={650} height={200} isShow={isShow} title={LangHelper.getSingleResource("Notification").toUpperCase()} onClose={_onCloseHandler} isHtml={false}>
                <div style={{padding:10 + "px"}} 
                    dangerouslySetInnerHTML={{__html: decode(LangHelper.getSingleResource("Message_UpcomingClosureReport"))}}>
                </div>
            </Popup>
        </>
    );
}

export default UpcomingClosurePopUp;
