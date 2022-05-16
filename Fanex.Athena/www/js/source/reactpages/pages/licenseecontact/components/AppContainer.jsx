import React from 'react'
import { connect } from 'react-redux'
import AppLayout from '../../../layouts/AppLayout'
import Loader from '@jsroot/components/Loader'
import Popup from '@jsroot/components/popup'
import AppData from '@jsroot/lib/AppData'
import ActionCreators from '../actions';
import { bindActionCreators } from 'redux';
import LangHelper from '@jsroot/lib/langHelper'
import FormFilter from './FormFilter'
import DataGrid from './DataGrid'
import FormEdit from './FormEdit'
import FormAdd from './FormAdd';
import FormDelete from './FormDelete'
import { fields, ModificationActionType } from '../lib/contants'
import ExcelHandler from '../lib/excel';
import { isShowSubsidiaryInfo } from '../lib/helper';

const AppContainer = ({ isLoading, currentModificationAction, contactList, setModificationAction, fetchContactList, toggleLoader }) => {
  const _renderModificationPopup = () => {
    const { type, data } = currentModificationAction;
    if (type === ModificationActionType.AddContact) {
      return (<Popup height={550} width={750} isShow={true} title={LangHelper.getSingleResource("AddContact")} onClose={_onCloseModificationPopup}>
        <FormAdd contactId={data} afterSuccess={_onCloseModificationPopup} toggleLoader={toggleLoader} />
      </Popup>)
    } else if (type === ModificationActionType.EditContact) {
      return (<Popup height={550} width={750} isShow={true} title={LangHelper.getSingleResource("EditContact")} onClose={_onCloseModificationPopup}>
        <FormEdit contactId={data} afterSuccess={_onCloseModificationPopup} toggleLoader={toggleLoader} />
      </Popup>)

    } else if (type === ModificationActionType.DeleteContact) {
      return <FormDelete {...data} onClose={_onCloseModificationPopup} toggleLoader={toggleLoader} />
    } else {
    }
  }

  const _onCloseModificationPopup = () => {
    setModificationAction(null);
    fetchContactList(null);
  }

  const _exportExcel = () => {
    const excel = new ExcelHandler(contactList, { [fields.Subsidiary]: !isShowSubsidiaryInfo(AppData.subsidiaryViewType, AppData.subsidiaryList) });
    excel.export();
  }

  const _renderStickyFooter = () => {
    return (<div className="caret-block">
        <i className="icon-excel right" onClick={_exportExcel} title={LangHelper.getSingleResource("ExportToExcel")}></i>
    </div>);
}

  const _renderFormAction = () => {
    return <div className="form-action">
      <div className="form-group">
        <div className="button-group">
          <button type="button" className="btn btn-add" onClick={() => {
            setModificationAction({ type: ModificationActionType.AddContact });
          }}>{LangHelper.getSingleResource('AddContact')}</button>
        </div>
      </div>
      {_renderStickyFooter()}
    </div>
  }

  return (
    <AppLayout>
      <Loader isLoading={isLoading} />
      <FormFilter />
      {_renderFormAction()}
      <DataGrid />
      {currentModificationAction && _renderModificationPopup()}
    </AppLayout>
  )
}
function mapDispatchToProps(dispatch) {
  const { setModificationAction, fetchContactList, toggleLoader } = ActionCreators;
  return bindActionCreators({ setModificationAction, fetchContactList, toggleLoader }, dispatch);
}

function mapStateToProps(state) {
  const { isLoading, currentModificationAction, contactList } = state;
  return {
    isLoading,
    currentModificationAction,
    contactList
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);