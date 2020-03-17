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
        singleUpdate: {
            [0]: data => LangHelper.getSingleResource('SuccessUpdateVipStatusSingle'),

            [100]: data => LangHelper.getSingleResource('InvalidPlayerUpdateVipStatusSingle')
                .replace('{0}', data.systemIds),

            [101]: (data, isUpdateVip) => (isUpdateVip ? LangHelper.getSingleResource('AlreadyUpdateVipStatusSingle') : LangHelper.getSingleResource('AlreadyUpdateNotVipStatusSingle')),

            [102]: data => LangHelper.getSingleResource('RetractedPlayerUpdateVipStatusSingle')
                .replace('{0}', data.systemIds)
        },
        multipleUpdate: {
            [0]: data => LangHelper.getSingleResource('SuccessUpdateVipStatus')
                .replace('{0}', data.numberOfPlayer),

            [100]: data => LangHelper.getSingleResource('InvalidPlayerUpdateVipStatus')
                .replace('{0}', data.numberOfPlayer)
                .replace('{1}', data.systemIds),

            [101]: (data, isUpdateVip) => (isUpdateVip ? LangHelper.getSingleResource('AlreadyUpdateVipStatus') : LangHelper.getSingleResource('AlreadyUpdateNotVipStatus'))
                .replace('{0}', data.numberOfPlayer),

            [102]: data => LangHelper.getSingleResource('RetractedPlayerUpdateVipStatus')
                .replace('{0}', data.numberOfPlayer)
                .replace('{1}', data.systemIds)
        }
    }

    static GetListMsgUpdateVipStatus = (results, currentVipStatus, isSingleUpdate = false) => {
        const fieldName = isSingleUpdate ? 'singleUpdate' : 'multipleUpdate';
        return results.map(_ => {
            const code = _.code;
            const msgColor = MessageHelper.MsgColors[code];
            return (<p className="msg-result">
                <i className={`icon ${msgColor.icon}`}></i>
                <span className={msgColor.content}>{MessageHelper.GetMsgUpdateVipStatus[fieldName][code](_, currentVipStatus)}</span>
            </p>)
        })
    }
}

