/**
 * 将字节数转换为对应单位的数值
 * @param {*} byte 文件字节数
 * @returns string 
 */
export const converFileSize = (byte: any) => {
  const num = parseFloat(byte);
  let size = '';
  if (num < 0.1 * 1024) {
    // 如果小于0.1KB转化成B
    size = `${num.toFixed(2) }B`;
  } else if (num < 0.1 * 1024 * 1024) {
    // 如果小于0.1MB转化成KB
    size = `${(num / 1024).toFixed(2) }KB`;
  } else if (num < 0.1 * 1024 * 1024 * 1024) {
    // 如果小于0.1GB转化成MB
    size = `${(num / (1024 * 1024)).toFixed(2) }MB`;
  } else {
    // 其他转化成GB
    size = `${(num / (1024 * 1024 * 1024)).toFixed(2) }GB`;
  }

  const sizestr = `${size }`;
  const len = sizestr.indexOf('.');
  const dec = sizestr.substr(len + 1, 2);
  if (dec === '00') {
    // 当小数点后为00时 去掉小数部分
    return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
  }
  return sizestr;
};
