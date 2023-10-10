import React, {  useEffect, useRef, useState } from 'react';
import ReportTitle from '@jsroot/components/ReportTitle';
import {  DefaultPageSize } from '../lib/constants.js';
import { ActionCreators } from './action.js';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, HeaderRow, HeaderCell } from '@9softstudio/react-grid';
import Service from '../lib/Service.js';
import { useMemo } from 'react';
import NoDataTitle from '@jsroot/components/NoDataTitle';
import { useElementSize, useWindowSize } from 'usehooks-ts';
import { RefPager } from '../../../../components/mobile-component/RefPager.jsx';
import {v4 as uuidv4} from 'uuid';

const SmallColumnWidths = [ 50, 17 , 20, 13]
const LargeColumnWidths =  ['53%', '15%', '22%', '10%']

export const BaseMobileDataGrid = (props) => {
    const {
        dataUrl, isPaging, body, footer, columns
    } = props;

    const [ gridData, requestParam, reportTitle, reloadReport ] = useSelector(state =>[state.gridData, state.requestParam, state.reportTitle, state.reloadReport], shallowEqual);
    const ref = useRef(null);
    const dispatch = useDispatch();
    const [id, setId] = useState(`${uuidv4()}`);
    const [pagerRef, pagerSize] = useElementSize();
    const { width } = useWindowSize();
    const collumnWidths = width > 400 ? LargeColumnWidths : SmallColumnWidths

    useEffect(() => {
        dispatch(toggleLoader(false));
        setId(`${uuidv4()}`);
        ref.current?.scrollIntoView();
    }, [gridData]);
    
    useEffect(() => {
        const style = `bottom: ${pagerSize.height - 1}px`;
         ref.current?.getElementsByClassName('footer-content')[0].setAttribute('style', style);
    }, [pagerSize?.height, id])

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
        dispatch(toggleLoader(true));
        dispatch(getGridData(dataUrl, param));
        dispatch(setRequestParam(param));
    }

    const buildHeader = () => {
        let rows = [];
        for (let i = 0; i < columns.length; i++) {
            const column = columns[i];
            const headerName = Service.getHeaderName(column);

            rows.push(
                <HeaderCell key={column} colWidth={collumnWidths[i]} >{headerName}</HeaderCell>
            )
        }

        return <HeaderRow style={{ height: 32 }}>{rows}</HeaderRow>;
    }

    const header = useMemo(() =>buildHeader(),[width]);

    if (!gridData || !gridData.Data || gridData.Data.length == 0) {
        if(!gridData || !gridData.Data){
            return null;
        }
        return <NoDataTitle />;
    }

    const isShowPagingInfo  = pagerSize.width > 400 ? true : false;

    return (
        <div className="mobile-betlist-container betlist-container result-content" ref={ref}>
            <ReportTitle content={reportTitle} />
            <Table key={id}
                autoWidth={true}
                autoHeight={false}
                header={header}
                body={body}
                footer={footer}
                isPaging={false}
                pageOption={pageOption}
                shouldResetScrollPosition={reloadReport}
                bodyHeight="100%" />
            {isPaging && <RefPager ref={pagerRef} onPaging={onPaging} pageOption={pageOption} isShowPagingInfo={isShowPagingInfo}/>}            
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