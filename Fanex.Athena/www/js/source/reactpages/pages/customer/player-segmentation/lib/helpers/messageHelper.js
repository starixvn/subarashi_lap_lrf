import React from 'react';
import LangHelper from '@jsroot/lib/langHelper';

export default class MessageHelper {
    static MsgColors = {
        [0]: {
            content: 'msg-success',
            icon: 'icon-tick'
        },
        [100]: {
            content: 'msg-error',
            icon: 'icon-warning'
        },
        [101]: {
            content: 'msg-success',
            icon: 'icon-tick'
        },
        [102]: {
            content: 'msg-error',
            icon: 'icon-warning'
        },
    }

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
        return results.map(_ => {
            const code = _.code;
            const msgColor = MessageHelper.MsgColors[code];
            return (<p className="msg-result">
                <i className={`icon ${msgColor.icon}`}></i>
                <span className={msgColor.content}>{MessageHelper.GetMsgUpdateVipStatus[code](_, currentVipStatus)}</span>
            </p>)
        })
    }
}

