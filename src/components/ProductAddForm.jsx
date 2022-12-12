import { useFormik } from 'formik'
import { IonList, IonItem, IonLabel, IonInput, IonNote, IonButton } from '@ionic/react';
import { getNewId } from '../utils';

export const ProductAddForm = (products, {onSave}) => {
    const formik = useFormik({
        initialValues: {
            productName: ''
        },
        validate: validateForm,
        onSubmit: onSubmit
    });

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

        setSubmitting(false);
        resetForm();

        onSave(newProduct);
    }

    return <form onSubmit={formik.handleSubmit}>
        <IonList>
            <IonItem fill="solid"
                className={`${formik.errors.productName &&
                    formik.touched.productName ? 'ion-invalid' : 'ion-valid'}`}>
                <IonLabel position="floating">Nome do produto</IonLabel>
                <IonInput
                    id="productName"
                    name="productName"
                    type="text"
                    onIonChange={formik.handleChange}
                    onIonBlur={formik.handleBlur}
                    value={formik.values.productName}
                    placeholder="Nome do produto"
                />
                <IonNote slot="error">
                    {
                        formik.errors.productName &&
                        formik.touched.productName &&
                        formik.errors.productName
                    }
                </IonNote>
                <IonButton slot="end"
                    type="submit"
                    size='large'>
                    Adicionar
                </IonButton>
            </IonItem>
        </IonList>
    </form>
}