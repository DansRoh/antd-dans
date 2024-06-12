import { useMemo, useCallback } from 'react';
import {
  useLocation,
  To,
  NavigateOptions,
  generatePath,
  Location,
  useNavigate
} from 'react-router-dom';

interface INavigateState {
  tableProFilterParams: object,
  [key: string | number | symbol]: any
}

function getPathFromLocation(location: Location) {
  const {
    pathname,
    search,
    ...remain
  } = location;
  const path = generatePath(pathname, remain as any);
  return path;
}

function useNavigateWithState(manual = false) {
  const navigate = useNavigate();
  const location = useLocation();

  /** 跳转方法 */
  const navigateWithState = useCallback((data: any, to: To, options: NavigateOptions | undefined) => {
    const tableProFilterParams = data;
    const state = location.state as INavigateState;
    let preState = {};
    if (state) {
      if (typeof state !== 'object') {
        preState = { state };
      }
      preState = state;
    }
    const newState = Object.assign({}, preState, { tableProFilterParams });
    const path = getPathFromLocation(location);
    navigate(path + location.search, { state: newState, replace: true });
    navigate(to, options);
  }, [ location, navigate ]);

  /** 从state获取数据后清除state */
  const getDataFormState = useCallback<any>(() => {
    const state = location.state as INavigateState;
    const data = { ...state };
    const newState = Object.assign({}, data, { tableProFilterParams: null });
    const path = getPathFromLocation(location);

    // 感觉navigate有做节流处理
    setTimeout(() => {
      navigate(path + location.search, { state: newState, replace: true });
    }, 100);
    if (data && typeof data === 'object' && 'tableProFilterParams' in data) {
      return data.tableProFilterParams;
    }
    return;
  }, [ location, navigate ]);

  /** 上一次的路由state */
  const preState = useMemo(() => {
    return manual ? null : getDataFormState();
  /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  return {
    preState,
    navigateWithState,
    getDataFormState
  };
}
export default useNavigateWithState;
