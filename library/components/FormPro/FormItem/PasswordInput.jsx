import React from 'react';
import { Input } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import FormWrapper from '../FormWrapper';

class PasswordInput extends React.Component {

  instence;

  constructor(props) {
    super(props);
    this.state = {
      inputType: 'password',
    };

    // 提供一个外部可用实例对象, 方便对组件的部分特殊方法进行控制
    this.instence = {
      show: this.show,
      hide: this.hide,
    };
  }

  componentDidMount() {
    if (this.props.item.getInstence) {
      this.props.item.getInstence(this.instence);
    }
  }

  componentWillUnmount() {
    this.instence = null;
  }

  // 状态修改
  changeInputType = () => {
    const { inputType } = this.state;
    const currentType = inputType === 'password' ? 'text' : 'password';
    this.setState({
      inputType: currentType,
    });
  };

  show = () => {
    this.setState({
      inputType: 'text',
    });
  };

  hide = () => {
    this.setState({
      inputType: 'password',
    });
  };

  render() {
    const { item } = this.props;
    const { inputType } = this.state;
    const showPwd = inputType !== 'password';

    const itemProps = {
      ...item.itemProps,
      type: inputType,
      suffix: <span style={{ cursor: 'pointer' }} onClick={this.changeInputType}>{showPwd ? <EyeOutlined /> : <EyeInvisibleOutlined />}</span>
    };

    return (
      <FormWrapper {...this.props}>
        <Input {...itemProps} />
      </FormWrapper>
    );
  }
}

export default PasswordInput;
