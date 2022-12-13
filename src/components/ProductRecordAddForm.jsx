import {
    IonButton, IonButtons, IonDatetime, IonDatetimeButton,
    IonInput,
    IonItem, IonLabel,
    IonList, IonModal, IonNote
} from '@ionic/react';
import { useFormik } from 'formik';

import { getNewId } from '../utils';

export const ProductRecordAddForm = ({ product, onSave }) => {
    const formik = useFormik({
        initialValues: {
            quantity: null,
            recordDate: getTodayDateISO()
        },
        validate: validateForm,
        onSubmit: onSubmit,
    });


    function getTodayDateISO() {
        const now = new Date();

        const year = now.getFullYear();
        const month = `0${(now.getMonth() + 1)}`.slice(-2);
        const day = `0${now.getDate()}`.slice(-2);

        const formatted = `${year}-${month}-${day}`;
        return formatted;
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

    function onSubmit(values, { setSubmitting, resetForm }) {
        const { quantity, recordDate } = values;

        const newRecord = {
            recordDate,
            quantity,
            id: getNewId(product.records, e => e.id)
        };

        resetForm();
        setSubmitting(false);

        onSave(newRecord);
    }

    return <form type="submit" onSubmit={formik.handleSubmit}>
        <IonList>
            <IonItem>
                <IonLabel position="floating">
                    Peso (gramas)
                </IonLabel>
                <IonInput
                    id="quantity"
                    name="quantity"
                    type="number"
                    inputMode="numeric"
                    min={0}
                    onIonChange={formik.handleChange}
                    onIonBlur={formik.handleBlur}
                    value={formik.values.quantity}
                />
                <IonNote slot="error">
                    {
                        formik.errors.quantity &&
                        formik.touched.quantity &&
                        formik.errors.quantity
                    }
                </IonNote>

                <IonButtons slot="end">
                    <IonDatetimeButton datetime="recordDate" />
                    <IonModal keepContentsMounted>
                        <IonDatetime id="recordDate"
                            name="recordDate"
                            presentation="date"
                            value={formik.values.recordDate}
                            onIonChange={formik.handleChange}
                            onIonBlur={formik.handleBlur}
                        ></IonDatetime>
                    </IonModal>
                    <IonButton type="submit"
                        size="large">
                        Guardar
                    </IonButton>
                </IonButtons>
            </IonItem>
        </IonList>
    </form>
}