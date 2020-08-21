import React from 'react';
import { useStorageState } from '../hooks/useStorageState';
import { Formik } from 'formik';
import { ProductsList } from '../components/ProductsList';

import { getNewId } from '../utils';

const Products = () => {
    const [products, setProducts] = useStorageState('products', []);

    function validateForm(values) {
        const errors = {};
        if (!values.productName || values.productName.trim() === '') {
            errors.productName = 'Insira um nome para o produto';
        }
        return errors;
    }

    function onSubmit(values, { setSubmitting, resetForm }) {
        const newId = getNewId(products, e => e.id);

        const newProduct = {
            name: values.productName,
            id: newId,
            quantity: 0,
            records: []
        }

        setProducts(val => [newProduct, ...val]);

        setSubmitting(false);

        resetForm();
    }

    function removeProduct(product) {
        setProducts(products => products.filter((p, i) =>
            p.id !== product.id
        ));
    }

    return <div className="page-products">
        <h2>Produtos</h2>

        <Formik
            initialValues={{ productName: '' }}
            validate={validateForm}
            onSubmit={onSubmit}>

            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting
            }) =>
                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <input type="text"
                            placeholder="Nome do produto"
                            name="productName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.productName}
                            className="flex-grow"
                        />

                        <div className="form-error">
                            {errors.productName && touched.productName && errors.productName}
                        </div>
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="form-group-btn" disabled={isSubmitting}>
                            Adicionar
                        </button>
                    </div>
                </form>
            }
        </Formik>

        <br />

        <ProductsList products={products} onRemove={removeProduct} />

    </div>
};

export { Products };