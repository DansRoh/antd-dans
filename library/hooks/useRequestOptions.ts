import { useState } from 'react';

type IOptionChangeCb = (data?:any) => void;

export const useRequestOptions = (form: any, key: string, onOptionsChangeCb?: IOptionChangeCb) => {
  const [ options, setOptions ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const defaultOptionsChangeHandle = () => {
    form.setFieldsValue({[key]: undefined});
  };
  const optionsChangeHandle = onOptionsChangeCb || defaultOptionsChangeHandle;
  const request = async (requestOptions: any, data: any) => {
    const isFunction = typeof requestOptions === 'function';
    optionsChangeHandle();
    if (isFunction) {
      setLoading(true);
      const result = await requestOptions(data);
      setLoading(false);
      setOptions(result);
    } else {
      setOptions(requestOptions);
    }
  };
  return {
    options,
    loading,
    request
  };
};

export default useRequestOptions;
