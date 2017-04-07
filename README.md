# lazyload-inferno-component
inferno component to lazily load other components

# Usage

`npm install --save lazyload-inferno-component`

With `inferno-router` and webpack:
```javascript
import LazyLoader from "lazyload-inferno-component";

const loadComponent = (callback, { props, router }) => {
  require.ensure([], (require) => {
    const component = require("./lazyLoaded").default;
    callback(component);
  });
};

export const router = (
  <Router history={createBrowserHistory()}>
    <Route component={App}>
      <IndexRoute component={Home} />
      <Route path="/lazy" lazyLoad={loadComponent} component={LazyLoader} />
    </Route>
  </Router>
);
```

Inside another component:
```javascript
export const MyComponent = () => {
  return (
    <div>
      <LazyLoader lazyLoad={loadComponent} />
    </div>
  );
};
```
Github repository available at https://github.com/LGabAnnell/lazyload-inferno-component
