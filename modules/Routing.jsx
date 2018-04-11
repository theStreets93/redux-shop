import React from 'react';
import createHistory from 'history/createBrowserHistory';
import {Router, Switch, Route} from 'react-router-dom';

// Reusable components
import { Header, Footer} from '../components';

// Modules
import { Home, Catalog, Error404, About, Counter, Cart } from './views';

// Init history
const history = createHistory();

const Routing = () => (
    <Router history={history}>
        <div>
            <Header/>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/cart" component={Cart} />
                <Route exact path="/catalog" component={Catalog} />
                <Route exact path="/about" component={About} />
                <Route exact path="/counter" component={Counter} />
                <Route component={Error404}/>
            </Switch>
            <Footer/>
        </div>
    </Router>
);

export default Routing;