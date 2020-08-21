import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

const ProductsList = ({ products, onRemove }) => {
    const [totals, setTotals] = useState({});

    useEffect(() => {
        const newTotals = products.map(p => {
            return {
                id: p.id,
                total: p.records.reduce((acc, cur) => acc + cur.quantity, 0)
            }
        })
        .reduce((acc, cur) => {
            acc[cur.id] = cur.total;
            return acc;
        }, {});

        setTotals(newTotals);

    }, [products]);

    return <div className="products-list">
        {
            products && products.length > 0 ?

                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Peso</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product, i) =>
                                <tr key={i}>

                                    <td className="product-cell">
                                        <Link className="product-link" to={`/details/${product.id}`}>
                                            {product.name}
                                        </Link>
                                    </td>

                                    <td>
                                        {totals[product.id]}&nbsp;g
                                    </td>

                                    <td>

                                        <button className="remove-btn" onClick={e => onRemove(product)}>
                                            &times;
                                </button>
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>

                :

                <div className="jumbotron"> Ainda não adicionou nenhum produto </div>
        }
    </div>
}

export { ProductsList };