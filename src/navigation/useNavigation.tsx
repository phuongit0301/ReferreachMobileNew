import React from 'react';

const useNavigationWhenReady = (isReady: boolean, navigationRef: any) => {
  const [routeName, setRouteName] = React.useState('');
  const [routeParams, setRouteParams] = React.useState({});
  const [navigationAction, setNavigationAction] = React.useState('navigate');

  React.useEffect(() => {
    if (isReady && routeName) {
      if (navigationRef?.[navigationAction]) {
        const navAction = navigationRef[navigationAction];
        navAction(routeName, routeParams);
      }
    }
  }, [isReady, routeParams, routeParams]);

  const navigate = (route: string, _routeParams = {}) => {
    if (!routeName) {
      setNavigationAction('navigate');
      setRouteParams(_routeParams);
      setRouteName(route);
    }
  };

  const reset = (state: any) => {
    if (!routeName) {
      setNavigationAction('reset');
      setRouteName(state);
    }
  };

  return {navigate, reset};
};

export default useNavigationWhenReady;
