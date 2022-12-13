import { useFormik } from 'formik'
import { IonList, IonItem, IonLabel, IonInput, IonNote, IonButton } from '@ionic/react';
import { getNewId } from '../utils';

const randProducts = [
    'Alho',
    'Abóbora',
    'Agrião',
    'Alface',
    'Batata',
    'Batata doce',
    'Berinjela',
    'Bróculos',
    'Couve',
    'Couve flor',
    'Couve de bruxelas',
    'Couve lombarda',
    'Cebola',
    'Cenoura',
    'Chuchu',
    'Coentros',
    'Ervilha',
    'Erva-doce',
    'Fava',
    'Feijão',
    'Feijão verde',
    'Gengibre',
    'Grão de bico',
    'Hortelã',
    'Lentinha',
    'Linhaça',
    'Macadâmia',
    'Melancia',
    'Morango',
    'Majericão',
    'Nabo',
    'Noz',
    'Pêra',
    'Rabanete',
    'Salsa',
    'Tomate',
    'Tomate cereja',
    'Tomilho',
    'Kico'
];

function getRandProduct() {
    const r = Math.floor(Math.random() * randProducts.length);
    return randProducts[r];
}

export const ProductAddForm = ({ products, onSave }) => {
    const formik = useFormik({
        initialValues: {
            productName: null
        },
        validate: validateForm,
        onSubmit: onSubmit
    });

    const [placeholder, setPlaceholder] = useState();

    function validateForm(values) {
        const errors = {};
        if (!values.productName || values.productName.trim() === '') {
            errors.productName = 'Insira um nome para o produto';
        }
        return errors;
    }

    useEffect(() => {
        setPlaceholder(getRandProduct());
    }, [])

    function onSubmit(values, { setSubmitting, resetForm }) {
        const newId = getNewId(products, e => e.id);

        const newProduct = {
            name: values.productName,
            id: newId,
            quantity: 0,
            records: []
        }

        setSubmitting(false);

        setPlaceholder(getRandProduct());

        resetForm();

        onSave(newProduct);
    }

    return <form onSubmit={formik.handleSubmit}>
        <IonList>
            <IonItem fill="solid"
                className={`${formik.errors.productName &&
                    formik.touched.productName ? 'ion-invalid' : 'ion-valid'}`}>
                <IonLabel position="floating">Novo produto</IonLabel>
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
                    placeholder={placeholder}
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
                    Adicionar
                </IonButton>
            </IonItem>
        </IonList>
    </form>
}