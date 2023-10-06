import React, {  useEffect, useRef } from 'react';
import ReportTitle from '@jsroot/components/ReportTitle';
import {  DefaultPageSize } from '../lib/constants.js';
import { ActionCreators } from './action.js';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, HeaderRow, HeaderCell } from '@9softstudio/react-grid';
import Service from '../lib/Service.js';
import { useMemo } from 'react';
import NoDataTitle from '@jsroot/components/NoDataTitle';


const ColumnWidths = [21, 9 , 15, 7]

export const BaseMobileDataGrid = (props) => {
    const {
        dataUrl, isPaging, body, footer, columns
    } = props;

    const [ gridData, requestParam, reportTitle, reloadReport ] = useSelector(state =>[state.gridData, state.requestParam, state.reportTitle, state.reloadReport], shallowEqual);
    const ref = useRef(null);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(toggleLoader(false));
        ref.current?.scrollIntoView({behavior: "smooth"});
    }, [gridData]);   
    const { toggleLoader, getGridData, setRequestParam } = ActionCreators;
    
    const pageOption = {
        PageIndex: requestParam.PageIndex,
        PageSize: requestParam.PageSize,
        TotalItem: gridData && gridData.TotalRows ? gridData.TotalRows : DefaultPageSize,
        PageList: [DefaultPageSize, 100, 200, 300, 400, 500, 1000, 2000]
    };


    const onPaging = (index, size) => {
        const param = Object.assign({}, requestParam, { PageIndex: index, PageSize: size });

        getData(param);
    }

    const getData = (param) => {
        toggleLoader(true);
        getGridData(dataUrl, param);
        setRequestParam(param);
    }

    const buildHeader = () => {
        let rows = [];
        for (let i = 0; i < columns.length; i++) {
            const column = columns[i];
            const headerName = Service.getHeaderName(column);

            rows.push(
                <HeaderCell key={column} colWidth={ColumnWidths[i]} >{headerName}</HeaderCell>
            )
        }

        return <HeaderRow style={{ height: 32 }}>{rows}</HeaderRow>;
    }

    const header = useMemo(() =>buildHeader(),[]);

    if (!gridData || !gridData.Data || gridData.Data.length == 0) {
        if(!gridData || !gridData.Data){
            return null;
        }
        return <NoDataTitle />;
    }

    return (
        <div className="mobile-betlist-container betlist-container result-content" ref={ref}>
            <ReportTitle content={reportTitle} />
            <Table
                autoWidth={true}
                autoHeight={false}
                header={header}
                body={body}
                footer={footer}
                containerPadding={10}
                isPaging={isPaging}
                pageOption={pageOption}
                shouldResetScrollPosition={reloadReport}
                bodyHeight={"100&"}
                onPaging={onPaging} />
        </div>
    );
};

const propTypes = {
    dataUrl: PropTypes.string,
    isPaging: PropTypes.bool,
    header: PropTypes.array || PropTypes.element,
    body: PropTypes.array || PropTypes.element,
    footer: PropTypes.array || PropTypes.element,
    columns: PropTypes.arrayOf(PropTypes.string)
};
const defaultProps = {
    isPaging: false
};

BaseMobileDataGrid.propTypes = propTypes;
BaseMobileDataGrid.defaultProps = defaultProps;

export default BaseMobileDataGrid