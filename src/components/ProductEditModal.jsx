import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonNote, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useFormik } from 'formik';

export const ProductEditModal = ({ product, onDismiss }) => {
    const formik = useFormik({
        initialValues: {
            productName: product?.name
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

    function onSubmit(values, { setSubmitting }) {
        const newProduct = {
            ...product,
            name: values.productName
        };

        setSubmitting(false);
        onDismiss(newProduct, 'save');
    }

    function handleRemove() {
        onDismiss(product, 'remove');
    }

    return <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonButton onClick={() => onDismiss(null, 'cancel')}>
                        Cancelar
                    </IonButton>
                </IonButtons>
                <IonTitle>Editar {product.name}</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <form onSubmit={formik.handleSubmit}>
                <IonList>
                    <IonItem fill="solid"
                        className={`${formik.errors.productName &&
                            formik.touched.productName ? 'ion-invalid' : 'ion-valid'}`}>
                        <IonInput
                            clearInput
                            id="productName"
                            name="productName"
                            type="text"
                            inputMode="text"
                            autocorrect="on"
                            onIonChange={formik.handleChange}
                            onIonBlur={formik.handleBlur}
                            value={formik.values.productName}
                        />
                        <IonNote slot="error">
                            {
                                formik.errors.productName &&
                                formik.touched.productName &&
                                formik.errors.productName
                            }
                        </IonNote>
                        <IonButton slot="end"
                            type="submit">
                            Alterar
                        </IonButton>
                    </IonItem>
                    <IonItem>
                        <IonLabel button onClick={() => handleRemove()} color="danger">
                            Apagar produto
                        </IonLabel>
                    </IonItem>
                </IonList>
            </form>
        </IonContent>
    </IonPage>
}