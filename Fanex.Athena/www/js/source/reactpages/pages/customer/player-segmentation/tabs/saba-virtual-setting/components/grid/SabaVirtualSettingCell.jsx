import React from 'react';
import LangHelper from '@jsroot/lib/langHelper';
import Popup from '@jsroot/components/popup/Popup';

export default class SabaVirtualSettingCell extends React.Component {
    constructor(props) {
        super(props);

        this.state = { isSabaVirtualSettingInformation: false }
    };

    showSabaVirtualSettingInformation = (e) => {
        this.setState({ isSabaVirtualSettingInformation: true });
        e.stopPropagation();
        return false;
    };

    closeSabaVirtualSettingInformation = () => {
        this.setState({ isSabaVirtualSettingInformation: false });
    };

    clickOnPopup = (e) => {
        e.stopPropagation();
        return false;
    };

    render() {
        var url = "SabaVirtualSetting/Index?time=" + (new Date().getTime());
        return (<>
            {this.props.cell.text}&nbsp;&nbsp;<div class="icon-info" onClick={this.showSabaVirtualSettingInformation}></div>
            {this.state.isSabaVirtualSettingInformation
                ? (<Popup width={1000} height={600} isShow="true"
                    title={LangHelper.getSingleResource('SabaVirtualSettingInformation')}
                    onClose={this.closeSabaVirtualSettingInformation}
                    onClick={this.clickOnPopup} isHtml="false"
                    iframeUrl={url}></Popup>)
                : ""}
        </>);
    }
}
