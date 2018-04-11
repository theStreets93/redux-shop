import React from 'react';
import createHistory from 'history/createBrowserHistory';
import {Router, Switch, Route} from 'react-router-dom';

// Reusable components
import Header from '../components/Header';
import Footer from '../components/Footer';

// Modules
import { Home, Catalog, CatalogNew, Error404, About, Counter, Cart } from './views';

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
                <Route exact path="/catalog-new" component={CatalogNew} />
                <Route exact path="/about" component={About} />
                <Route exact path="/counter" component={Counter} />
                <Route component={Error404}/>
            </Switch>
            <Footer/>
        </div>
    </Router>
);

export default Routing;