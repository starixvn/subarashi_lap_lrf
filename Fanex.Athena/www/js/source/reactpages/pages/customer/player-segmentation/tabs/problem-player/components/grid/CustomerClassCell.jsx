import React from 'react';
import LangHelper from '@jsroot/lib/langHelper';
import Popup from '@jsroot/components/popup/Popup';

export default class CustomerClassCell extends React.Component {
    constructor(props) {
        super(props);

        this.state = { isShowCustomerClassInformation: false }
    };

    showCustomerClassInformation = () => {
        this.setState({ isShowCustomerClassInformation: true });
    };

    closeCustomerClassInfomation = () => {
        this.setState({ isShowCustomerClassInformation: false });
    };

    render() {
        var url = "PlayerSegmentation/CustomerClassInformation?time=" + (new Date().getTime());
        return (<>
            {this.props.cell.text}&nbsp;&nbsp;<div class="icon-info" onClick={this.showCustomerClassInformation}></div>
            <Popup width={800} height={600} isShow={this.state.isShowCustomerClassInformation}
                title={LangHelper.getSingleResource('CustomerClassInformation')}
                onClose={this.closeCustomerClassInfomation} isHtml="false"
                iframeUrl={url}></Popup>
        </>);
    }
}
