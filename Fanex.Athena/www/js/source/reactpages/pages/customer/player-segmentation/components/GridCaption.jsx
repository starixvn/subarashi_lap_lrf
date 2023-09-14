import React from 'react';
import ReportTitle from '@jsroot/components/ReportTitle';
import LangHelper from '@jsroot/lib/langHelper';

const GridCaption = (props) => {
    const { playerCount } = props;

    const _buildContent = () => {
        return (<span key="searchResult">{`${LangHelper.getSingleResource('SearchResult')}: ${playerCount} ${LangHelper.getSingleResource('Player')}` 
            + (LangHelper.currentLanguage === LangHelper.languageKeys.eng ? `(s)` : ``)}</span>);
    }

    return (<ReportTitle tag="div" content={_buildContent()} />)
}

export default React.memo(GridCaption); 