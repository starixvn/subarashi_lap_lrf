import React from 'react';
import LangHelper from '@jsroot/lib/langHelper';

export default class MessageHelper {
    static GetMsgUpdateVipStatus = {
        [0]: data => LangHelper.getSingleResource('Successfully update: {0}')
            .replace('{0}', data.numberOfPlayer),
    
        [100]: data => LangHelper.getSingleResource('Invalid player(s): {0} ({1})')
            .replace('{0}', data.numberOfPlayer)
            .replace('{1}', data.systemIds),
    
        [101]: (data, isUpdateVip) => LangHelper.getSingleResource('Already {0}, no update: {1}')
            .replace('{0}', isUpdateVip ? 'VIP' : 'NO VIP')
            .replace('{1}', data.numberOfPlayer),
    
        [102]: data => LangHelper.getSingleResource('Retracted VIP player(s): {0} ({1})')
            .replace('{0}', data.numberOfPlayer)
            .replace('{1}', data.systemIds)
    }

    static GetListMsgUpdateVipStatus = (results, currentVipStatus) => {
        return results.map(_ => <p>
            {MessageHelper.GetMsgUpdateVipStatus[_.code](_, currentVipStatus)}
        </p>)
    }
}

