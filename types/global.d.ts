import { NavigateFunction } from 'library/hooks/useNavigate';
import { Location } from 'react-router-dom';

declare global {
  interface Window {
      /** 全局注册的 useNavigate 中的navigate, 在RenderRouter组件中 */
      navigate: NavigateFunction;
      /** 全局注册的 useLocation 中的location, 在RenderRouter组件中*/
      reactLocation: Location<unknown>;
  }
}
