import React, {  useEffect, useRef, useState, useMemo, memo } from 'react';
import ReportTitle from '@jsroot/components/ReportTitle';
import {  DefaultPageSize } from '../lib/constants.js';
import { ActionCreators } from './action.js';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, HeaderRow, HeaderCell } from '@legion-lib/react-grid';
import Service from '../lib/Service.js';
import NoDataTitle from '@jsroot/components/NoDataTitle';
import { useElementSize, useWindowSize } from 'usehooks-ts';
import { RefPager } from '@jsroot/components/mobile-component/RefPager.jsx';
import {v4 as uuidv4} from 'uuid';

const VerySmallColumnWidths = [ 53, 16 , 22, 13]
const SmallColumnWidths = [ 159, 66 , 90, 28]
const LargeColumnWidths =  ['53%', '18%', '22%', '7%']

export const BaseMobileDataGrid = (props) => {
    const {
        dataUrl, isPaging, body, footer, columns, sortableColumns
    } = props;

    const [ gridData, requestParam, reportTitle, reloadReport ] = useSelector(state =>[state.gridData, state.requestParam, state.reportTitle, state.reloadReport], shallowEqual);
    const ref = useRef(null);
    const dispatch = useDispatch();
    const [id, setId] = useState(`${uuidv4()}`);
    const [pagerRef, pagerSize] = useElementSize();
    const { width } = useWindowSize();
    const collumnWidths = width > 500
        ? LargeColumnWidths 
        : width > 370 ? SmallColumnWidths : VerySmallColumnWidths

    useEffect(() => {
        dispatch(toggleLoader(false));
        setId(`${uuidv4()}`);
    }, [gridData]);
    
    useEffect(() => {
        const style = `bottom: ${pagerSize.height - 1}px`;
        ref.current?.getElementsByClassName('footer-content')[0]?.setAttribute('style', style);
    }, [pagerSize?.height, id])

    useEffect(() => {
        ref.current?.scrollIntoView();
    },[id])

    const { toggleLoader, getGridData, setRequestParam } = ActionCreators;

    const pageOption = {
        PageIndex: requestParam.PageIndex,
        PageSize: requestParam.PageSize,
        TotalItem: gridData?.TotalRows ? gridData.TotalRows : DefaultPageSize,
        PageList: [DefaultPageSize, 100, 200, 300, 400, 500, 1000, 2000]
    };


    const onPaging = (index, size) => {
        const param ={...requestParam, PageIndex: index, PageSize: size};
        getData(param);
    }

    const onSort = (sortBy, sortOrder) =>{
        const param = { ...requestParam, SortBy: sortBy === 'WinLoss' ? 'WinLost' : sortBy, SortOrder: sortOrder };

        getData(param);
    }

    const getData = (param) => {
        dispatch(toggleLoader(true));
        dispatch(getGridData(dataUrl, param));
        dispatch(setRequestParam(param));
    }

    const buildHeader = () => {
        let rows = [];
        for (let i = 0; i < columns.length; i++) {
            const column = columns[i];
            const isSortable = sortableColumns.indexOf(column) >= 0;
            const headerName = Service.getHeaderName(column);

            rows.push(
                <HeaderCell key={column} colWidth={collumnWidths[i]} sortBy={isSortable ? column : null} >{headerName}</HeaderCell>
            )
        }

        return <HeaderRow style={{ height: 32 }}>{rows}</HeaderRow>;
    }

    const header = useMemo(() =>buildHeader(),[width]);
    const bodyWrapper = useMemo(() => <React.Fragment key={id}>{body}</React.Fragment>, [id])

    if (!gridData?.Data || gridData.Data.length == 0) {
        if(!gridData?.Data){
            return null;
        }
        return <NoDataTitle />;
    }

    const isShowPagingInfo  = pagerSize.width > 400;

    return (
        <div className="mobile-betlist-container betlist-container result-content mobile-table" ref={ref}>
            <ReportTitle content={reportTitle} />
            <Table key='betlist-mobile-table'
                autoWidth={true}
                autoHeight={false}               
                header={header}
                body={bodyWrapper}
                footer={footer}
                isPaging={false}
                pageOption={pageOption}
                shouldResetScrollPosition={reloadReport}
                bodyHeight="100%"
                containerPadding={2}
                isIncludeScrollWidth={false}
                onSort= {onSort} />
            {isPaging && <RefPager ref={pagerRef} onPaging={onPaging} pageOption={pageOption} isShowPagingInfo={isShowPagingInfo}/>}            
        </div>
    );
};

const propTypes = {
    dataUrl: PropTypes.string,
    isPaging: PropTypes.bool,
    header: PropTypes.oneOfType([PropTypes.array, PropTypes.element, PropTypes.object]),
    body: PropTypes.oneOfType([PropTypes.array, PropTypes.element, PropTypes.object]),
    footer: PropTypes.oneOfType([PropTypes.array, PropTypes.element, PropTypes.object]),
    columns: PropTypes.arrayOf(PropTypes.string),
    sortableColumns: PropTypes.arrayOf(PropTypes.string)
};
const defaultProps = {
    isPaging: false,
    sortableColumns: []
};

BaseMobileDataGrid.propTypes = propTypes;
BaseMobileDataGrid.defaultProps = defaultProps;

export default memo(BaseMobileDataGrid);