import React from 'react';
import DataGrid from './DataGrid';
import ButtonApply from './ButtonApply';

const Content = () => (
  <>
    <div className="result-content">
      <DataGrid />
    </div>
    <div className="button-group">
      <ButtonApply />
    </div>
  </>
);

export default Content;