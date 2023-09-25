import React, { useState, useEffect } from 'react'; 
import Popup from '@jsroot/components/popup/Popup.jsx';
import LangHelper from '@jsroot/lib/langHelper';
import {decode} from '@jsroot/lib/htmlHelper';
import Site from '@jsroot/lib/site';
import axios from 'axios';

const UnderMaintenancePopUp = (props) => {
    const [isShow, setIsShow] = useState(false);
    const delay = 5 * 60 * 1000 // 5 minutes

    useEffect(() => {
        CheckUM();
        var interval = setInterval(() => {
            CheckUM();
        }, delay);

        return () => clearInterval(interval);
    }, []);

    if (isShow) {
        Site.setCookie(props.id, "true");
    }

    const _onCloseHandler = () => {
        setIsShow(false);
    }

    const CheckUM = () => {
        const isHasAlreadyAccess = !!Site.getCookie(props.id);
        const apiUrl = Site.resolveClientUrl("api/ExchangeWinLossReport/IsUnderMaintenance");

        if (!isHasAlreadyAccess) {
            axios.get(apiUrl, {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    '__RequestVerificationToken': Site.getXsrfToken()
                }
            }).then((response) => {
                const isUm = response.data;
                setIsShow(isUm);
            }).catch((error) => {
                console.error(error);
            });
        }
    }

    return (
        <>
            <Popup width={"max-content"} height={"min-content"} isShow={isShow} title={LangHelper.getSingleResource("Notification").toUpperCase()} onClose={_onCloseHandler} isHtml={false}>
                <div style={{ padding: "10px 10px 50px", "front-size": "13px" }}
                    dangerouslySetInnerHTML={{ __html: decode(LangHelper.getSingleResource("ExchangeUnderMaintenanceMsg")) }}>
                </div>
            </Popup>
        </>
    );
}

export default UnderMaintenancePopUp;
