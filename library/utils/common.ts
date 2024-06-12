/**
 * 下载文件
 * @param blob 二进制
 * @param fileName 文件名
 */
export const download = (blob: Blob | MediaSource, fileName: string) => {
  const el = document.createElement('a');
  const href = window.URL.createObjectURL(blob); // 创建 URL 对象

  el.href = href;
  el.target = '_blank';
  el.style.display = 'none';
  el.download = fileName;
  document.body.appendChild(el);
  el.click();
  document.body.removeChild(el); // 下载完成移除元素
  window.URL.revokeObjectURL(href); // 释放掉blob对象
};

/**
 * 去除对象键值中string的前后空格
 * @param {object} obj 需要去除前后空格的对象
 * @returns {object} 返回一个去除空格后的新对象
 */
export const trimObject = <T = any>(obj: T ) => {
  if (typeof (obj) !== 'object') {
    return obj;
  }
  const res: T = { ...obj };
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const item = obj[key];
      if (typeof (item) === 'string') {
        res[key] = item.trim() as T[Extract<keyof T, string>];
      }
    }
  }
  return res;
};

/**
 * 滚动到错误项去
 * @param err form.validateFields 返回的错误信息
 */
export const scrollErrField = (err) => {
  const { errorFields = [] } = err || {};
  for (let i = 0; i < errorFields.length; i++) {
    const item = errorFields[i];
    if (item.name[0]) {
      document.getElementById(item.name?.join('_') || '')
        ?.scrollIntoView({
          block: 'center',
          inline: 'nearest',
          behavior: 'smooth'
        });
      return;
    }
  }
};
