import Header from "containers/base/Header";
import { Home, Auth } from "pages";
import { Switch, Route, Redirect } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/auth" component={Auth} />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  );
}

export default App;
