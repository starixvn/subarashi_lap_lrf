import React from 'react';
import LangHelper from '@jsroot/lib/langHelper';
import { UpdateMonitoredPlayerCode } from '../lib/constants';

export default class MessageHelper {
    static MsgColors = {
        [UpdateMonitoredPlayerCode.Success]: {
            content: 'msg-success',
            icon: 'icon-tick'
        },
        [UpdateMonitoredPlayerCode.InvalidParameters]: {
            content: 'msg-error',
            icon: 'icon-warning'
        },
        [UpdateMonitoredPlayerCode.InvalidSystemId]: {
            content: 'msg-error',
            icon: 'icon-warning'
        },
        [UpdateMonitoredPlayerCode.InvalidExternalId]: {
            content: 'msg-error',
            icon: 'icon-warning'
        },
        [UpdateMonitoredPlayerCode.ExistingInList]: {
            content: 'msg-error',
            icon: 'icon-warning'
        },
        [UpdateMonitoredPlayerCode.NotExistingInList]: {
            content: 'msg-error',
            icon: 'icon-warning'
        },
        [UpdateMonitoredPlayerCode.InvalidWinningThreshold]: {
            content: 'msg-error',
            icon: 'icon-warning'
        },
        [UpdateMonitoredPlayerCode.InvalidAccount]: {
            content: 'msg-error',
            icon: 'icon-warning'
        },
        [UpdateMonitoredPlayerCode.InvalidUsernameInput]: {
            content: 'msg-error',
            icon: 'icon-warning'
        }
    }

    static GetMsgUpdateMonitoredPlayer = {
        command: {
            [UpdateMonitoredPlayerCode.Success]: _ => LangHelper.getSingleResource('SuccessfullyUpdate'),

            [UpdateMonitoredPlayerCode.InvalidParameters]: _ => LangHelper.getSingleResource('InvalidParameters'),

            [UpdateMonitoredPlayerCode.InvalidSystemId]: _ => LangHelper.getSingleResource('InvalidSystemId'),

            [UpdateMonitoredPlayerCode.InvalidExternalId]: _ => LangHelper.getSingleResource('InvalidExternalId'),

            [UpdateMonitoredPlayerCode.InvalidWinningThreshold]: _ => LangHelper.getSingleResource('InvalidWinningThreshold'),

            [UpdateMonitoredPlayerCode.ExistingInList]: _ => LangHelper.getSingleResource('ExistingInMonitoredPlayerList'),

            [UpdateMonitoredPlayerCode.NotExistingInList]: _ => LangHelper.getSingleResource('NotExistingInMonitoredPlayerList'),

            [UpdateMonitoredPlayerCode.InvalidUsernameInput]: _ => LangHelper.getSingleResource('EitherSystemIdOrExternalIdIsRequired')

        },
        batchCommand: {
            [UpdateMonitoredPlayerCode.Success]: data => LangHelper.getSingleResource('SuccessfullyUpdateBatchCommand')
                .replace('{0}', data.numberOfError),

            [UpdateMonitoredPlayerCode.InvalidParameters]: _ => LangHelper.getSingleResource('InvalidParameters'),

            [UpdateMonitoredPlayerCode.InvalidSystemId]: data => LangHelper.getSingleResource('InvalidSystemIdBatchCommand')
                .replace('{0}', data.numberOfError)
                .replace('{1}', data.systemId),

            [UpdateMonitoredPlayerCode.InvalidExternalId]: data => LangHelper.getSingleResource('InvalidExternalIdBatchCommand')
                .replace('{0}', data.numberOfError)
                .replace('{1}', data.externalId),

            [UpdateMonitoredPlayerCode.InvalidWinningThreshold]: data => LangHelper.getSingleResource('InvalidWinningThresholdBatchCommand')
                .replace('{0}', data.numberOfError)
                .replace('{1}', data.externalId || data.systemId)
        }
    }

    static GetListMsgUpdateMonitoredPlayer = msgResults => {
        let commandType = 'batchCommand';
        if(!msgResults.length) {
            msgResults = [msgResults];
            commandType = 'command';
        }
        return msgResults.map(_ => {
            const code = _.errorCode;
            const msgColor = MessageHelper.MsgColors[code];
            return (<p className="msg-result">
                <i className={`icon ${msgColor.icon}`}></i>
                <span className={msgColor.content}>{MessageHelper.GetMsgUpdateMonitoredPlayer[commandType][code](_)}</span>
            </p>)
        })
    }
}

