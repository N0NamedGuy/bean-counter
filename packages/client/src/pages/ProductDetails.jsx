import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { useStorageState } from '../hooks/useStorageState';
import { getNewId } from '../utils';
import { Formik } from 'formik';

import { ProductRecordsList } from '../components/ProductRecordsList';

const ProductDetails = () => {
    const { id } = useParams();
    const [products, setProducts] = useStorageState('products', []);
    const [product, setProduct] = useState(null);

    const [isError, setIsError] = useState(null);

    useEffect(() => {
        const foundProduct = products.find(p => p.id === parseInt(id, 10));

        if (!foundProduct) {
            setIsError(true);
        }

        setProduct(foundProduct);
    }, [id, products]);

    function onSubmit(values, { setSubmitting, resetForm }) {
        const { quantity, recordDate } = values;

        const newRecord = {
            recordDate,
            quantity,
            id: getNewId(product.records, e => e.id)
        };

        const productsToChange = [...products];
        const productToChange = products.find(p => p.id === parseInt(product.id, 10));
        productToChange.records = [newRecord, ...productToChange.records];

        setProducts(productsToChange);

        resetForm();
        setSubmitting(false);
    }

    function validateForm({ quantity, recordDate }) {
        const errors = {};

        const quantityInt = parseInt(quantity);

        if (!(quantityInt > 0)) {
            errors.quantity = 'Insira um peso como deve ser, faxabor';
        }

        const parsedRecDate = Date.parse(recordDate);

        if (isNaN(parsedRecDate)) {
            errors.recordDate = 'Insira uma data válida, oh sôra!';
        }

        return errors;
    }

    function getTodayDateISO() {
        const now = new Date();

        const year = now.getFullYear();
        const month = `0${(now.getMonth() + 1)}`.slice(-2);
        const day = `0${now.getDate()}`.slice(-2);

        const formatted = `${year}-${month}-${day}`;
        return formatted;
    }

    function removeRecord(product, record) {
        const newProducts = [...products];
        const productToChange = newProducts.find((p) => p.id === product.id);

        if (productToChange) {
            productToChange.records = productToChange.records.filter((rec) =>
                rec.id !== record.id
            )
        }

        setProducts(newProducts);
    }

    return <div>
        <Link to="/" className="back-link">&larr; Voltar à lista</Link>

        {isError ? <div className="jumbotron">
            Este produto já não existe (ou nunca existiu!)
            </div> : <div>

                <h2>{product && product.name}</h2>

                <Formik
                    initialValues={{
                        quantity: 0,
                        recordDate: getTodayDateISO()
                    }}
                    validate={validateForm}
                    onSubmit={onSubmit}>

                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        setFieldValue
                    }) =>
                        <form onSubmit={handleSubmit}>

                            <div className="form-group">
                                <input type="number"
                                    placeholder="Peso"
                                    name="quantity"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.quantity}
                                /> &nbsp; g
                                <span className="form-error">
                                    {errors.quantity && touched.quantity && errors.quantity}
                                </span>
                            </div>

                            <div className="form-group">
                                <label>Data</label><br />
                                <input type="date"
                                    name="recordDate"
                                    onChange={(e) => { setFieldValue('recordDate', e.target.value) }}
                                    onBlur={handleBlur}
                                    value={values.recordDate}
                                />
                                <br />
                                <span className="form-error">
                                    {errors.recordDate && touched.recordDate && errors.recordDate}
                                </span>
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="form-group-btn" disabled={isSubmitting}>
                                    Adicionar
                                </button>
                            </div>
                        </form>
                    }
                </Formik>

                {product && <ProductRecordsList product={product} onRemove={removeRecord} />}
            </div>
        }
    </div>
};

export { ProductDetails };