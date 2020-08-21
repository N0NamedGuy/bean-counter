import React from 'react';

const ProductRecordsList = ({ product, onRemove }) => {
    const records = product.records;
    const quantity = records.reduce((acc, cur) => acc + parseInt(cur.quantity, 10), 0);

    return <div className="product-records-list-page">
        {records && records.length > 0 ?

            <div>

                <span>Total:</span>
                &nbsp;

                <strong className="total-qtd">{quantity}g</strong>

                <table>
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Peso</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            product && product.records.map((record, i) =>
                                <tr key={i}>
                                    <td>{record.recordDate}</td>
                                    <td>{record.quantity}g</td>
                                    <td><button className="remove-btn"
                                        onClick={(e) => onRemove(product, record)}>&times;</button></td>
                                </tr>
                            )
                        }
                    </tbody>

                </table>

            </div>

            :

            <div className="jumbotron">
                Sem registos para este produto.<br />
                Vá colher cenas pá!
            </div>
        }

    </div>

};

export { ProductRecordsList };