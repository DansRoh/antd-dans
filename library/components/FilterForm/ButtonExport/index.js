import React from 'react';
import { isFunction } from 'lodash';
import { formatFormDataToValues } from 'library/components/TablePro/utils';
import Download from 'library/components/Download';

const ButtonExport = ({ onExport, tableProps, form, config, permission }) => {

  if (isFunction(onExport)) {
    const params = formatFormDataToValues(form.getFieldsValue(), config);
    const { pagination } = tableProps;
    const thisOnExport = () => {
      return onExport(params, pagination);
    };

    return (
      <Download permission={permission} onDownload={thisOnExport}>导出</Download>
    );
  }
  return null;
};

export default ButtonExport;
