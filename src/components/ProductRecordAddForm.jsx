import {
    IonButton, IonButtons, IonDatetime, IonDatetimeButton,
    IonInput,
    IonItem, IonLabel,
    IonList, IonModal, IonNote
} from '@ionic/react';
import { useFormik } from 'formik';

import { getNewId, getTodayDateISO } from '../utils';

export const ProductRecordAddForm = ({ product, onSave }) => {
    const formik = useFormik({
        initialValues: {
            quantity: null,
            recordDate: getTodayDateISO()
        },
        validate: validateForm,
        onSubmit: onSubmit,
    });


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

    function onSubmit(values, { setSubmitting, setValues }) {
        const { quantity, recordDate } = values;

        const newRecord = {
            recordDate,
            quantity,
            id: getNewId(product.records, e => e.id)
        };

        setSubmitting(false);

        setValues({
            quantity: null,
            recordDate
        });

        onSave(newRecord);
    }

    return <form onSubmit={formik.handleSubmit}>
        <IonList>
            <IonItem>
                <IonInput
                    id="quantity"
                    name="quantity"
                    type="number"
                    inputMode="numeric"
                    min={0}
                    onIonChange={formik.handleChange}
                    onIonBlur={formik.handleBlur}
                    value={formik.values.quantity}
                    placeholder={0}
                />
                <IonLabel>
                    gramas
                </IonLabel>
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