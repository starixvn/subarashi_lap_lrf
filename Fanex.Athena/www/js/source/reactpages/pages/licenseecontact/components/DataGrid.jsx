import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { HeaderRow, HeaderCell, Row, Cell } from '@9softstudio/react-grid';
import ActionCreators from '../actions';
import { Table } from '@9softstudio/react-grid';
import NoDataTitle from '@jsroot/components/NoDataTitle';
import { decode } from '@jsroot/lib/htmlHelper';
import AppData from '@jsroot/lib/AppData'
import { ModificationActionType, fields, textHeaders, } from '../lib/contants'
import { getContactTypeText, isShowSubsidiaryInfo } from '../lib/helper';

const MAX_WIDTH_PAGE = 1920;

export const DataGrid = ({ contactList, setModificationAction }) => {
    const MAX_WIDTH = Math.min(document.body.clientWidth, MAX_WIDTH_PAGE);

    if (contactList == null) {
        return null;
    }
    if (!contactList.length) {
        return <NoDataTitle />;
    }

    const _showSubsidiaryColumn = useMemo(() => isShowSubsidiaryInfo(AppData.subsidiaryViewType, AppData.subsidiaryList), []);

    const _headers = React.useMemo(() => {
        return <HeaderRow style={{ height: 35 }}>
            <HeaderCell colWidth={10}>{textHeaders[fields.Index]}</HeaderCell>
            {_showSubsidiaryColumn && <HeaderCell colWidth={30}>{textHeaders[fields.Subsidiary]}</HeaderCell>}
            <HeaderCell colWidth={40}>{textHeaders[fields.ContactName]}</HeaderCell>
            <HeaderCell colWidth={30}>{textHeaders[fields.ContactType]}</HeaderCell>
            <HeaderCell colWidth={30}>{textHeaders[fields.Position]}</HeaderCell>
            <HeaderCell colWidth={30}>{textHeaders[fields.Department]}</HeaderCell>
            <HeaderCell colWidth={40}>{textHeaders[fields.Email]}</HeaderCell>
            <HeaderCell colWidth={40}>{textHeaders[fields.Skype]}</HeaderCell>
            <HeaderCell colWidth={70}>{textHeaders[fields.ToList]}</HeaderCell>
            <HeaderCell colWidth={40}>{textHeaders[fields.Remark]}</HeaderCell>
            <HeaderCell colWidth={30}>{textHeaders['Action']}</HeaderCell>
        </HeaderRow>
    }, [])

    const _body = React.useMemo(() => {
        return contactList.map((contact, index) => <Row key={'contact_' + contact.ContactID}>
            <Cell className="center-align">{index + 1}</Cell>
            {_showSubsidiaryColumn && <Cell className="left-align" title={contact[fields.Subsidiary]} >{contact[fields.Subsidiary]}</Cell>}
            <Cell className="left-align" title={contact[fields.ContactName]} >{contact[fields.ContactName]}</Cell>
            <Cell className="center-align">{getContactTypeText(contact[fields.ContactType])}</Cell>
            <Cell className="center-align">{contact[fields.Position]}</Cell>
            <Cell className="center-align">{contact[fields.Department]}</Cell>
            <Cell className="left-align" title={contact[fields.Email]} >{contact[fields.Email]}</Cell>
            <Cell className="left-align" title={contact[fields.Skype]} >{contact[fields.Skype]}</Cell>
            <Cell className="left-align">{contact[fields.ToList].map(to => <div>{decode(to)}</div>)}</Cell>
            <Cell className="left-align">{contact[fields.Remark]}</Cell>
            <Cell className="center-align action-cell">
                <button className="btn-default btn-link btn-icon"
                    onClick={() => setModificationAction({ type: ModificationActionType.EditContact, data: contact.ContactID })}
                >
                    <i className="material-icons">edit</i>
                </button>
                <button className="btn-default btn-link btn-icon delete-icon"
                    onClick={() => setModificationAction({
                        type: ModificationActionType.DeleteContact, data:
                            { contactId: contact.ContactID, contactName: contact.ContactName }
                    })}
                >
                    <i className="material-icons">delete</i>
                </button>
            </Cell>
        </Row>)
    }, [contactList])


    return (
        <Table minWidth={1300}
            autoWidth={true}
            maxWidth={MAX_WIDTH}
            autoHeight={true}
            header={_headers}
            body={_body}
            containerPadding={30}
            shouldResetScrollPosition={true}
        />
    );
}

function mapDispatchToProps(dispatch) {
    const { setModificationAction } = ActionCreators;
    return bindActionCreators({ setModificationAction }, dispatch);
}

function mapStateToProps(state) {
    const { contactList } = state;
    return {
        contactList
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);


