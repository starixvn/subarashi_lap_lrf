import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions/index.js';
import { bindActionCreators } from 'redux';
import LangHelper from '@jsroot/lib/langHelper';
import AppData from '@jsroot/lib/AppData';
import Select from 'react-select';

export class FormFilter extends PureComponent {
    constructor(props) {
        super(props);

        this.state = { productId: props.requestParam.ProductId };
    }

    onProductChange = (item) => {
        var param = { ...this.props.requestParam };
        param.ProductId = item.value;

        this.setState({ productId: item.value });
        this.props.setRequestParam(param);
    }

    _renderProductSelectList() {
        const selectedProduct = this.state.productId;
        const productList = AppData.productList;
        return <Select instanceId="ddlProduct"
            value={selectedProduct}
            options={productList}
            onChange={this.props.onProductChange} />;
    }

    render() {
        return (
            <div className='page-filter'>
                <div className="row">
                    <div className="col-12 col-md-4 col-sm-12 col-lg-3 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource("Product")}</label>
                            {this._renderProductSelectList()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    const { setRequestParam } = ActionCreators;
    return bindActionCreators({ setRequestParam }, dispatch);
}
function mapStateToProps(state) {
    const { requestParam } = state;
    return Object.assign({}, { requestParam });
};

export default connect(mapStateToProps, mapDispatchToProps)(FormFilter);