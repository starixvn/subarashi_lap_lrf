import React, { useState } from 'react'; 
import Popup from '@jsroot/components/popup/Popup.jsx';
import LangHelper from '@jsroot/lib/langHelper';
import {decode} from '@jsroot/lib/htmlHelper';
import Site from '@jsroot/lib/site';

const UpcomingClosurePopUp = (props) => {
    const isHasAlreadyAccess = !!Site.getCookie(props.id);
    const [isShow, setIsShow] = useState(!isHasAlreadyAccess);

    if(!isHasAlreadyAccess){
        Site.setCookie(props.id, "true");
    }

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
