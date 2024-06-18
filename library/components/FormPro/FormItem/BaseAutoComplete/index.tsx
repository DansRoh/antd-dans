import { AutoComplete, AutoCompleteProps, Flex } from 'antd';
import withFormItem from '../../hoc/withFormItem';
import { LoadingOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useRequest } from 'ahooks';
import React from 'react';


export interface IBaseAutoCompleteProps{
  /**
  * @description 标签文本
  */
  label?: string;
  /**
  * @description 表单项类型
  */
   type?: 'autoComplete';
  /**
   * 数据请求接口，返回格式为 {content: any[]}
   */
  request?: (keyword) => Promise<any>
  /**
  * @description 该属性会传给表单元素,例如Input, Select
  */
  itemProps?: AutoCompleteProps;
}

const filterOption = (inputValue, option) => option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;


/**
 * 自动完成组件
 * 扩展以下功能：
 * 1. 支持接口搜索，支持loading
 */
const BaseAutoComplete = (props) => {
  const { form, label, name, type, itemProps, request, ...other } = props;

  const { data, run, loading } = useRequest<any, any>(request, {
    manual: true,
    debounceWait: 300,
  });

  return <AutoComplete
    filterOption={filterOption}
    placeholder={`请输入${label}`}
    options={loading ? [] : data?.content || []}
    onSearch={request ? run : undefined}
    {...itemProps}
    {...other}
    notFoundContent={ loading ? (
      <Flex justify="center" align="center">
        <LoadingOutlined />&nbsp;加载中...
      </Flex>
    ) : undefined}
  ></AutoComplete>;
};

export default withFormItem(BaseAutoComplete);
