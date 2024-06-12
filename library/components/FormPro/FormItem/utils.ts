
/**
 * 有弹出层表单组件的挂载对象
 */
export const getPopupContainer = (triggerNode): any => {
  const modals = document.querySelectorAll('.ant-modal-wrap');
  return modals?.[modals.length - 1] || triggerNode.parentElement;
};
