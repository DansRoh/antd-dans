import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Editor as WangeEditor, Toolbar } from '@wangeditor/editor-for-react';
import { IDomEditor, IEditorConfig } from '@wangeditor/editor';
import { message } from 'antd';
import { isFunction } from 'lodash';

import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import FormWrapper from '../FormWrapper';

interface IEditorProps {
  /**
   * @desciption 富文本内容，html字符串
   */
  value: string;
  /**
   * @desciption 富文本内容变化时的回调函数
   */
  onChange: (html: string) => void;
  /**
   * @desciption 富文本框占位文本
   * @default 请输入
   */
  placeholder?: string;
}

export const Editor = (props: IEditorProps) => {
  const { value, onChange, placeholder } = props;

  // editor 实例
  const [ editor, setEditor ] = useState<IDomEditor | null>(null);

  // editor配置
  const editorConfig: Partial<IEditorConfig> = useMemo(() => {
    return {
      placeholder,
      MENU_CONF: {
        uploadImage: {
          base64LimitSize: 50 * 1024 * 1024, // 50M
          customUpload: async (file: File, insertFn: (url: string, alt: string, href: string) => void) => {
            message.error('暂未对接七牛云上传');
            // TODO: 对接七牛云上传，需要验证用户token
          },
        },
      },
    };
  }, [ placeholder ]);

  // 编辑内容change
  const onEditorChange = useCallback((_editor: IDomEditor) => {
    if (isFunction(onChange)) {
      onChange(_editor.getHtml());
    }
  }, [ onChange ]);

  // 销毁 editor
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [ editor ]);

  return (
    <>
      <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
        <Toolbar editor={editor} mode="simple" style={{ borderBottom: '1px solid #ccc' }} />
        <WangeEditor
          defaultConfig={editorConfig}
          value={value}
          onCreated={setEditor}
          onChange={onEditorChange}
          mode="simple"
          style={{ height: '500px', overflowY: 'hidden' }}
        />
      </div>
    </>
  );
};

Editor.defaultProps = {
  placeholder: '请输入',
};

// TODO: 类型待定义
const BaseEditor = ({ item, ...otherProps}: any) => (
  <FormWrapper {...otherProps}>
    <Editor {...item} />
  </FormWrapper>
);

export default BaseEditor;
