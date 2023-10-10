import React from 'react';
import LangHelper from '@jsroot/lib/langHelper';

const Note = () => {
    return (
        <div className="row">
            <div className="col-1" style={{ flex: "0 0 5%" }}>
                {LangHelper.getSingleResource('Note')}:
                    </div>
            <div className="col-9">
                <p>* {LangHelper.getSingleResource("BettingTicketCenter_Exchange_Note_1")}</p>
                <p>* {LangHelper.getSingleResource("BettingTicketCenter_Exchange_Note_2")}</p>
                <p>* {LangHelper.getSingleResource("BettingTicketCenter_Exchange_Note_3")}</p>
            </div>
        </div>
    )
}

export default Note;
