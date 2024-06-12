# TablePro
基于antd表格的二次封装，提供配置项可以快速的渲染一个表格
## 基本使用
这是一个最简单的示例，它设置了以下属性
- `request`为列表的请求
- `filterItems`为筛选项的配置，它其实是FormProp的表单项配置，详细的api请查看[此处](/components/form-pro/docs#iconfigitem)，不传则不会展示筛选表单
- `tableProps.columns`则是表格项的配置,它融合了antd提供的[columns属性](https://ant.design/components/table-cn/#API)以及我们自定义的一些属性用于格式化时间、截取值，详情请[查看]()
- `onExport`为导出按钮的回调函数，这里需要提供一个返回promise的函数，如果不设置该属性则不会显示“导出”按钮
<!-- <code src="./demo/BaseUsage/index.tsx"></code> -->
```jsx | pure
import React from 'react';
import TablePro from 'library/components/TablePro';

const BaseUsage = () => {
  const filterConfig = [
    {
      label: '姓名',
      name: 'user',
      type: 'input',
    },
    {
      label: '地区',
      name: 'area',
      type: 'select',
      options: [
        { label: '北京', value: 'biejin'}
      ],
    },
    {
      label: '创建时间',
      name: 'createTs',
      type: 'rangeDate',
      fields: [ 'startTime', 'endTime' ]
    },
    {
      label: '月份',
      name: 'month',
      type: 'date',
      itemProps: {
        picker: 'month'
      }
    },
  ];

  const getList = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          total: 4,
          list: [
            { id: 1, serialNo: '123', companyName: 'xxx' },
            { id: 2, serialNo: '456', companyName: 'xxx' },
            { id: 3, serialNo: '789', companyName: 'xxx' },
            { id: 4, serialNo: '789', companyName: '' }
          ]
        });
      }, 2000);
    });
  };
  const columns = [
    {
      title: '咨询ID',
      dataIndex: 'serialNo',
    },
    {
      title: '单位名称',
      dataIndex: 'companyName',
    }
  ];
  const handleExport = (params) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('ok');
      }, 1000);
    });
  };
  return (
    <TablePro
      request={getList}
      filterItems={filterConfig}
      onExport={handleExport}
      tableProps={{
        columns,
        rowKey: 'id',
      }}
    />
  );
};

export default BaseUsage;

```
## tableTopBar
用于定义筛选和表格之间的区域
<!-- <code src="./demo/TableTopBar/index.tsx"></code> -->
```jsx | pure
import React from 'react';
import TablePro from 'library/components/TablePro';
import { IConfigItem } from 'library/components/FormPro/types';
import Operation from './Operation';

const BaseUsage = () => {
  const filterConfig: IConfigItem[] = [
    {
      label: '姓名',
      name: 'user',
      type: 'input',
    },
    {
      label: '地区',
      name: 'area',
      type: 'select',
      options: [
        { label: '北京', value: 'biejin'}
      ],
    },
    {
      label: '创建时间',
      name: 'createTs',
      type: 'rangeDate',
      fields: [ 'startTime', 'endTime' ]
    },
    {
      label: '月份',
      name: 'month',
      type: 'date',
      itemProps: {
        picker: 'month'
      }
    },
  ];

  const getList = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          total: 4,
          list: [
            { id: 1, serialNo: '123', companyName: 'xxx' },
            { id: 2, serialNo: '456', companyName: 'xxx' },
            { id: 3, serialNo: '789', companyName: 'xxx' },
            { id: 4, serialNo: '789', companyName: '' }
          ]
        });
      }, 2000);
    });
  };
  const columns = [
    {
      title: '咨询ID',
      dataIndex: 'serialNo',
    },
    {
      title: '单位名称',
      dataIndex: 'companyName',
    }
  ];

  return (
    <TablePro
      request={getList}
      filterItems={filterConfig}
      tableTopBar={ <Operation /> }
      tableProps={{
        columns,
        rowKey: 'id',
      }}
    />
  );
};

export default BaseUsage;

```

## column表格项的拓展属性
- `max`，最多max个字符,多余的用...展示
- `valueDict`值的字典，传入该属性后，表格回自动从字典中取要展示的值
- `dateFormat`格式化时间

<!-- <code src="./demo/CustomItem"></code> -->
```jsx | pure
import TablePro from 'library/components/TablePro';

const STATUS_MAP = {
  OPEN: '存续',
  CLOSE: '注销',
};

const BaseUsage = () => {
  const getList = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          total: 4,
          list: [
            {
              id: 1,
              serialNo: '123',
              companyName: 'xxx',
              status: 'OPEN',
              date: '2022-10-19T16:00:00.000+0000'
            },
            { id: 2, serialNo: '456', companyName: 'xxx', status: 'CLOSE' },
            { id: 3, serialNo: '789', companyName: '宝鸡有一群怀揣着梦想的少年相信在牛大叔的带领下会创造生命的奇迹网络科技有限公司' },
            { id: 4, serialNo: '789', companyName: '' }
          ]
        });
      }, 2000);
    });
  };
  const columns = [
    {
      title: '咨询ID',
      dataIndex: 'serialNo',
    },
    {
      title: '单位名称',
      dataIndex: 'companyName',
      max: 10
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueDict: STATUS_MAP
    },
    {
      title: '时间',
      dataIndex: 'date',
      dateFormat: 'YYYY-MM-DD'
    }
  ];
  return (
    <TablePro
      request={getList}
      tableProps={{
        columns,
        rowKey: 'id',
      }}
    />
  );
};

export default BaseUsage;

```
## 刷新
在某些场景下，你也许需要手动刷新数据。此时你可以使用TablePro向外暴露的refresh方法

<!-- <code src='./demo/Refresh'> -->
```jsx | pure
import { useRef } from 'react';
import { Button } from 'antd';
import TablePro from 'library/components/TablePro';
import { ITableRef } from 'library/components/TablePro/types';

const getList = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        total: 4,
        list: [
          { id: 1, serialNo: '123', companyName: 'xxx', status: 'OPEN' },
          { id: 2, serialNo: '456', companyName: 'xxx', status: 'CLOSE' },
          { id: 3, serialNo: '789', companyName: '宝鸡有一群怀揣着梦想的少年相信在牛大叔的带领下会创造生命的奇迹网络科技有限公司' },
          { id: 4, serialNo: '789', companyName: '' }
        ]
      });
    }, 2000);
  });
};
const columns = [
  {
    title: '咨询ID',
    dataIndex: 'serialNo',
  },
  {
    title: '单位名称',
    dataIndex: 'companyName',
    max: 10
  },
];
const Refresh = () => {
  const tableRef = useRef<ITableRef>(null);
  const refreshHandle = () => {
    if (tableRef && tableRef.current) {
      tableRef.current.refresh();
    }
  };
  return (
    <TablePro
      ref={tableRef}
      tableTopBar={<Button onClick={refreshHandle}>刷新</Button>}
      request={getList}
      tableProps={{
        columns,
        rowKey: 'id',
      }}
    />
  );
};
export default Refresh;

```
## 进入详情保留状态
使用TablePro提供的navigateWithState方法进行跳转，则可以在进入详情的时候自动保留筛选状态
```jsx | pure
import React, { useRef } from 'react';
import TablePro from 'library/components/TablePro';
import { Button } from 'antd';

const Demo = () => {
  const tableRef = useRef();
  const getList = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          total: 4,
          list: [
            {id: 1},
            {id: 2},
            {id: 3},
            {id: 4}
          ]
        });
      }, 2000);
    });
  };
  const columns = [
    {
      title: '咨询ID',
      dataIndex: 'serialNo',
    },
    {
      title: '单位名称',
      dataIndex: 'companyName',
    }
  ];
  const gotoDetail = () => {
    tableRef.current.navigateWithState('/admin/system');
  };
  return (
    <div>
      <TablePro
        ref={tableRef}
        hasSerialNo={true}
        request={getList}
        filterItems={filterConfig}
        tableProps={{
          columns,
          rowKey: 'id',
          pagination: {
            pageSize: 2
          }
        }}
        onExport={onExport}
      />
      <Button onClick={gotoDetail}>查看详情</Button>
    </div>
  );
};

export default Demo;
```
## API
### ITablePro
<API src="./index.tsx" hideTitle></API>


