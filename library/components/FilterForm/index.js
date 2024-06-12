import React, { memo, useMemo } from 'react';
import { Button, Form, Space } from 'antd';
import FormPro from 'library/components/FormPro';
import ButtonExport from './ButtonExport';

const Filter = (props) => {
  const {
    config,
    onOK,
    onReset,
    onExport,
    exportPermission,
    tableProps,
    form,
    size = undefined,
    initialValues = undefined,
    labelWidth = '108px',
    gridLayout = {
      number: 3,
      gutter: 45,
      autoExtend: true
    },
    disabled = false
  } = props;
  const buttons = (_, idx) => {
    return (
      !disabled
      && <div style={{ textAlign: 'right', height: 56 }}>
        <Space>
          <Button type="primary" onClick={onOK}>筛选</Button>
          <Button onClick={onReset}>重置</Button>
          <ButtonExport onExport={onExport} permission={exportPermission} config={config} tableProps={tableProps} form={form} />
        </Space>
      </div>
    );
  };

  // 二次处理筛选项
  const _config = useMemo(() => {
    return config.map((item) => {
      if (item.type === 'input') {
        const _item = { ...item };
        const { itemProps } = item;
        /**
         * 1. 支持回车筛选
         * 2. 全局配置最大长度20
         */
        _item.itemProps = {
          maxLength: 20,
          ...itemProps,
          onPressEnter: (e) => {
            itemProps?.onPressEnter?.(e);
            onOK();
          }
        };
        return _item;
      }
      return item;
    });
  }, [ config, onOK ]);

  const formProps = {
    labelWidth,
    config: [ ..._config, { customRender: buttons } ],
    form,
    gridLayout,
  };
  return (
    <Form form={form} size={size} initialValues={initialValues} disabled={disabled}>
      <FormPro size={size} {...formProps} />
    </Form>
  );
};

export default memo(Filter);
