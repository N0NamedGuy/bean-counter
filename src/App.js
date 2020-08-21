import React from 'react';
import './App.css';

import { Products } from './pages/Products';
import { ProductDetails } from './pages/ProductDetails';

import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

function App() {

    return (
        <div className="bean-counter">
            <Router>
                <h1 className="brand">Conta-feijões</h1>

                <Switch>
                    <Route exact path="/">
                        <Products />
                    </Route>
                    <Route path="/details/:id">
                        <ProductDetails />
                    </Route>
                </Switch>
                <footer>
                    <small>&copy; 2020 David Serrano</small>
                </footer>
            </Router>
        </div>
    );
}

export default App;
