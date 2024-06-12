import React, { useMemo, useState, useImperativeHandle, useCallback, useRef, useEffect } from 'react';
import { Form, Spin, Empty, Pagination } from 'antd';
import { usePagination } from 'ahooks';
import { isFunction } from 'lodash';
import classNames from 'classnames';
import { ICardListProps, IShowTotal, ICardListRef } from './types';
import FilterForm from '../FilterForm';
import FilterWrap from '../TablePro/FilterWrap';
import TableListWrap from '../TablePro/TableListWrap';
import TableHeader from '../TablePro/TableHeader';
import useNavigateWithState from '../TablePro/tableHook/navigateWithState';
import styles from './index.module.less';
import GridLayout from '../GridLayout';
import { trimObject } from '../../utils/common';
import { NavigateOptions, To } from 'react-router-dom';
import { formatFormDataToValues, formatValuesToFormData } from '../TablePro/utils';


const renderTotal = (total: number, showTotal?: IShowTotal) => {
  if (typeof showTotal === 'boolean' && showTotal === true) {
    return <div className={styles.font}>共<span>{total}</span>条</div>;
  }
  if (typeof showTotal === 'function') {
    return <div className={styles.font}>{showTotal(total)}</div>;
  }
  return null;
};

const defaultRequest = (info: any) => Promise.resolve();

const InternalCardList: React.ForwardRefRenderFunction<ICardListRef, ICardListProps> = (props, ref) => {
  const {
    request = defaultRequest,
    params,
    filterItems,
    formatFilterParams,
    onExport,
    title,
    rightSlot,
    showTotal,
    labelWidth,
    children,
    layout,
    pagination: paginationConfig,
    addonBefore = null,
    addonAfter = null,
    customTitle = null,
    manual,
    className,
    size,
  } = props;

  const [ form ] = Form.useForm();
  const dataRef = useRef<any>();
  const {
    preState,
    navigateWithState,
  } = useNavigateWithState();

  // 路由缓存的上一次数据
  const preTableData = useMemo<any>(() => {
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
  const [ formData, setFormData ] = useState(preTableData?.[1]);
  const [ refreshDep, setRefreshDep ] = useState<null | Symbol>(null);

  useEffect(() => {
    if (preTableData?.[1]) {
      form.setFieldsValue(preTableData?.[1]);
    }
  }, []);

  // table 路由跳转方法（跳转的时候才将筛选条件等保留，传递给路由）
  const tableNavigateWithState = useCallback((to: To, options: NavigateOptions | undefined) => {
    navigateWithState(dataRef.current, to, options);
  }, [ navigateWithState ]);


  const { data = {}, loading, pagination, refresh, run } = usePagination<any, any>(
    (pageData, g: string) => {
      const { current, pageSize, ...other } = pageData || [];
      let postData = trimObject(formatFormDataToValues(formData || {}, filterItems));
      if (isFunction(formatFilterParams)) {
        postData = formatFilterParams(postData);
      }
      dataRef.current = [ pageData, postData ];
      return request(trimObject({
        index: current,
        size: pageSize,
        ...other,
        ...postData,
        ...(params || {})
      }));
    },
    {
      refreshDeps: [ formData, refreshDep, params, paginationConfig?.pageSize ],
      defaultPageSize: preTableData?.[0].pageSize || paginationConfig?.pageSize || 10,
      defaultCurrent: preTableData?.[0]?.current || 1, // TODO 可能是个bug
      manual
    } as any
  );

  const submit = () => {
    const values = form.getFieldsValue();
    setFormData(values);
  };

  const reset = () => {
    form.resetFields();
    setFormData({});
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
    navigateWithState: tableNavigateWithState
  }));


  const child = useMemo(() => {
    const childrenFuctions = isFunction(children);
    let list: any[] = [];
    if (addonBefore) {
      list.push(addonBefore);
    }
    if (childrenFuctions) {
      list = list.concat(data.list?.map((item: any, index: number) => children(item, index)));
    } else {
      list.push(children);
    }

    if (addonAfter) {
      list.push(addonAfter);
    }
    return list;
  }, [ addonAfter, addonBefore, children, data.list ]);

  return (
    <div className={classNames(styles['card-list'], className)}>
      {
        filterItems ? (
          <FilterWrap>
            <FilterForm
              form={form}
              config={filterItems}
              onOK={submit}
              onReset={reset}
              onExport={onExport}
              tableProps={{}}
              labelWidth={labelWidth}
              size={size}
            />
          </FilterWrap>
        ) : null
      }
      <TableListWrap>
        { customTitle && customTitle }
        {(title || rightSlot) && <TableHeader title={title} rightSlot={rightSlot} />}
        {renderTotal(data?.total, showTotal)}
        <Spin spinning={loading}>
          {
            !child?.length && (
              <Empty />
            )
          }
          <GridLayout {...layout}>
            { child.map((item) => item) }
          </GridLayout>
          {
            data.total > 0 && (
              <Pagination
                {...paginationConfig}
                current={pagination.current}
                pageSize={pagination.pageSize}
                total={data?.total}
                onChange={pagination.onChange}
                onShowSizeChange={pagination.onChange}
                className="card-pagination"
              />
            )
          }
        </Spin>
      </TableListWrap>
    </div>
  );
};

/** 卡片列表 */
const CardList = React.forwardRef<ICardListRef, ICardListProps>(InternalCardList);

export default CardList;
