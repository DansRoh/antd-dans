import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from 'react';
import {Form} from 'antd';
import {useAntdTable} from 'ahooks';
import TableList from './TableList';
import FilterForm from '../FilterForm';
import FilterWrap from './FilterWrap';
import TableListWrap from './TableListWrap';
import {get, isFunction} from 'lodash';
import {NavigateOptions, To} from 'react-router-dom';
import {ICustomColumnsProp, IParams, ITableProProps, ITableProps, ITableRef,} from './types';
import useNavigateWithState from './tableHook/navigateWithState';
import Title from '../Title';
import {trimObject} from '../../utils/common';
import {formatFormDataToValues, formatResponseData, formatValuesToFormData, renderTotal, upgradeColumns} from './utils';
import styles from './index.module.less';

const CommonTableList = forwardRef<ITableRef, ITableProProps>((props, ref) => {
  const {
    request,
    tableProps: uptableProps,
    filterItems,
    formatFilterParams,
    onExport,
    exportPermission,
    tableTopBar,
    labelWidth,
    nullDefaultValue = '--',
    hasSerialNo = false,
    title,
    rightSlot,
    showTotal,
    manual,
    defaultParams,
    initialValues,
    className,
    gridLayout,
    disabled,
    params
  } = props;
  const [ form ] = Form.useForm();
  const dataRef = useRef<IParams>();
  const [ refreshDep, setRefreshDep ] = useState<null | Symbol>(null);
  const {
    preState,
    navigateWithState,
  } = useNavigateWithState();

  // 路由缓存的上一次数据
  const preTableData = useMemo(() => {
    if (!preState) {
      return preState;
    }
    const [ pageData, postData ] = preState;
    let formData = postData;
    if (postData) {
      formData = formatValuesToFormData(postData, filterItems);
    }
    return [ pageData, formData ];
  /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  // table 路由跳转方法（跳转的时候才将筛选条件等保留，传递给路由）
  const tableNavigateWithState = useCallback((to: To, options: NavigateOptions | undefined) => {
    navigateWithState(dataRef.current, to, options);
  }, [ navigateWithState ]);


  const { tableProps, search, refresh, run } = useAntdTable((pageData, formData) => {
    const { current, pageSize, extra, ...other } = pageData || {};
    let postData = trimObject(formatFormDataToValues(formData || {}, filterItems));
    dataRef.current = [ pageData, {...postData, ...params} ];
    if (isFunction(formatFilterParams)) {
      postData = formatFilterParams(postData);
    }

    return formatResponseData(request({ index: current, size: pageSize, ...other, ...postData, ...params }));
  }, {
    form,
    manual,
    refreshDeps: [ refreshDep, params ],
    defaultParams: preState ? preTableData : defaultParams,
  });

  const { submit, reset } = search;

  const handlePaginationProps = (tableProps: ITableProps, uptableProps: ITableProps) => {
    const propsPagination = get(tableProps, 'pagination') || {};
    const upPropsPagination = get(uptableProps, 'pagination') || {};
    const pagination = {
      showQuickJumper: true,
      showSizeChanger: true,
      showTotal: ((total: Number) => {
        return `共 ${total} 条`;
      }),
      pageSizeOptions: [ 10, 20, 50 ]
    };
    return { ...pagination, ...upPropsPagination, ...propsPagination };
  };

  const handleTableProps = () => {
    const pagination = uptableProps.pagination !== false && handlePaginationProps(tableProps, uptableProps);
    const { columns } = uptableProps;
    const columnsClone = columns?.slice(0);
    let thisColumns: ICustomColumnsProp[] = [];
    const { current = 1, pageSize = 10 } = pagination || {};
    if (columnsClone) {
      if (hasSerialNo) {
        columnsClone?.unshift({
          title: '序号',
          width: 65,
          fixed: 'left',
          render: (_, __, idx) => (current - 1) * pageSize + idx + 1
        });
      }
      thisColumns = upgradeColumns(columnsClone, nullDefaultValue);
    }
    return { ...uptableProps, columns: thisColumns, ...tableProps, pagination };
  };

  useImperativeHandle(ref, () => ({
    run,
    refresh: (toFirstPage: boolean = true) => {
      if (toFirstPage) {
        const deps = Symbol();
        return setRefreshDep(deps);
      }
      refresh();
    },
    navigateWithState: tableNavigateWithState,
    dataSource: tableProps.dataSource || [],
    submit,
    dataRef,
    preTableData,
    form,
  }));
  const total = tableProps?.pagination?.total;
  return (
    <div className={className}>
      {
        filterItems
          ? <FilterWrap>
            <FilterForm
              form={form}
              config={filterItems}
              onOK={submit}
              onReset={reset}
              onExport={onExport}
              exportPermission={exportPermission}
              tableProps={tableProps}
              labelWidth={labelWidth}
              initialValues={initialValues}
              gridLayout={gridLayout}
              disabled={disabled}
            />
          </FilterWrap> : null
      }
      <TableListWrap>
        {(title || rightSlot) && <Title title={title} rightSlot={rightSlot} />}
        {tableTopBar ? <div className={styles.topbar}>{ tableTopBar}</div> : null}
        {renderTotal(total, showTotal)}
        <TableList tableProps={handleTableProps()} />
      </TableListWrap>
    </div>
  );
});

export default memo(CommonTableList);
