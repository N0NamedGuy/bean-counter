import React from 'react';
import './App.css';

import { Products } from './pages/Products';
import { ProductDetails } from './pages/ProductDetails';
import { Export } from './pages/Export';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import { Import } from './pages/Import';

function App() {

    return (
        <div className="bean-counter">
            <Router basename="/beans">
                <h1 className="brand">Conta-feijões</h1>

                <nav>
                    <Link className="nav-link" to="/">Início</Link>
                    <Link className="nav-link" to="/import">Importar</Link>
                    <Link className="nav-link" to="/export">Exportar</Link>
                </nav>

                <Switch>
                    <Route exact path="/">
                        <Products />
                    </Route>
                    <Route path="/details/:id">
                        <ProductDetails />
                    </Route>
                    <Route path="/export">
                        <Export />
                    </Route>
                    <Route path="/import">
                        <Import />
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
