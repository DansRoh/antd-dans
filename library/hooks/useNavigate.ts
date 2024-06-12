import queryString from 'query-string';
import { useCallback, useState, useEffect } from 'react';
import { useNavigate as useNavigateRouter, To, NavigateOptions, useLocation } from 'react-router-dom';

const { parse, stringify } = queryString;

interface ISearch {
  [x: string]: any;
}

export interface NavigateFunction {
  (to: To, search?: ISearch, options?: NavigateOptions): void;
  (delta: number): void;
}

interface IUseNavigateFunction {
  navigate: NavigateFunction;
  search: ISearch
}

const useNavigate = (): IUseNavigateFunction => {
  const [ search, setSearch ] = useState(parse(window.location.search));
  let location = useLocation();

  const navigate = useNavigateRouter();

  const _navigate = useCallback(
    (to: To | number, search?: ISearch, options?: NavigateOptions) => {
      if (typeof to === 'number') {
        navigate(to);
        return;
      }

      if (typeof to === 'string') {
        const [ pathname, toSearch ] = to.split('?');
        const _search = stringify({ ...parse(toSearch), ...(search || {}) });
        return navigate({ pathname, search: _search }, options);
      } else {
        const { pathname, search: toSearch = '', ...other } = to;
        const _search = stringify({ ...parse(toSearch), ...(search || {}) });
        return navigate({ pathname, search: _search, ...other }, options);
      }
    },
    [ navigate ]
  );

  // 动态更新search
  useEffect(() => {
    setSearch(parse(window.location.search));
  }, [ location ]);

  return { navigate: _navigate, search };
};

export default useNavigate;
