import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AllProducts from './components/AllProducts';
import ProductDetails from './components/ProductDetails';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={AllProducts} />
                <Route path="/product/:id" component={ProductDetails} />
            </Switch>
        </Router>
    );
}

export default App;

