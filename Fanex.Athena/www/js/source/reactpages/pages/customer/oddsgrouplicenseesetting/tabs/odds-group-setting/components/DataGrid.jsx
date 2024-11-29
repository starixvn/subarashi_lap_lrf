import React from 'react';
import { connect } from 'react-redux';
import { Table, Row, Cell } from '@9softstudio/react-grid';
import NoDataTitle from '@jsroot/components/NoDataTitle';
import GridHelper from '../../../lib/helpers/gridHelper';
import { dataGridFullHeaders } from '../lib/constants';
import OddsGroupOption from './cell/OddsGroupOption'
import { CodeCss } from '../lib/constants';

export const DataGrid = (props) => {
    const { dataList, updateDataList, updatedStatusList, selectedParams } = props;

    if (dataList == null || selectedParams == null) {
        return null;
    }
    if (!dataList.length) {
        return <NoDataTitle />;
    }

    const _headers = () => GridHelper.renderHeader(dataGridFullHeaders.filter(header => header.key !== 'subsidiary' || selectedParams.SubsidiarySearch));

    const _body = () => dataList.map((dataItem, rowIndex) => {
        const key = `${dataItem.Custids}_${dataItem.Currency}`;
        var updatedStatusMsg = updatedStatusList?.[key]?.msg ?? "";
        var updatedStatusCode = updatedStatusList?.[key]?.code ?? -1;

        return <Row key={`row_${rowIndex}_${key}`}>
            {selectedParams.SubsidiarySearch && <Cell className="center-align">{dataItem.Subsidiary}</Cell>}
            <Cell className="center-align">{dataItem.Currency}</Cell>
            <Cell className="center-align odds-group-cell"><OddsGroupOption dataItem={dataItem} keyItem={key}/></Cell>
            <Cell key={`status_${updatedStatusCode}_${updateDataList?.[key]?.newValue}`} className="center-align" >
                <span className={`result-msg ${CodeCss[updatedStatusCode]?.textColor}`}>
                    <span className={`result-mark ${CodeCss[updatedStatusCode]?.icon}`}></span>
                    {updatedStatusMsg}</span>
            </Cell>
        </Row>
    });
    
    return (
        <>
            <div id="dropdown-container"></div>
            <Table key={`table_${selectedParams.t}`} minWidth={650}
                autoWidth={true}
                autoHeight={true}
                header={_headers()}
                body={_body()}
                containerPadding={30}
                shouldResetScrollPosition={false}/>
        </>
    );
}

function mapStateToProps(state) {
    const { dataList, updateDataList, updatedStatusList, selectedParams } = state;
    return Object.assign({}, { dataList, updateDataList, updatedStatusList, selectedParams });
}

export default connect(mapStateToProps, null)(DataGrid);


