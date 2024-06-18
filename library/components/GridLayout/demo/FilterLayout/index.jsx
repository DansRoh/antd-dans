import { Form, Input, Button } from 'antd';
import GridLayout from 'library/components/GridLayout';
import styles from './index.less';

function Filter({
  form,
  submit,
  reset
}) {
  return (
    <Form
      form={form}
      className={styles.form}
      autoComplete="off"
      labelCol={{span: 7}}
    >
      <GridLayout gutter={8} number={3} autoExtend={true}>
        <Form.Item
          label="企业名称"
          name="enterpriseName"
        >
          <Input　placeholder="请输入企业名称" />
        </Form.Item>
        <Form.Item
          label="统一社会信用代码"
          name="creditCode"
        >
          <Input　placeholder="请输入统一社会信用代码" />
        </Form.Item>
        <Form.Item
          label="姓名"
          name="username"
        >
          <Input　placeholder="请输入姓名" />
        </Form.Item>
        <Form.Item
          label="手机号"
          name="phone"
        >
          <Input　placeholder="请输入手机号" />
        </Form.Item>
        <Form.Item >
          <div className={styles.operationBtn}>
            <Button
              type="primary"
              className={styles.subBtn}
              onClick={submit}
            >
                查询
            </Button>
            <Button
              onClick={reset}>
                重置
            </Button>
          </div>
        </Form.Item>
      </GridLayout>
    </Form>
  );
}

export default Filter;
