// src/components/AddReadingForm/AddReadingForm.tsx
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import styles from './AddReadingForm.module.css';

interface AddReadingFormProps {
  isReading: boolean;
  onSubmit: (page: number) => void;
}

const validationSchema = Yup.object({
  page: Yup.number().min(1, 'Must be at least 1').required('Page is required'),
});

export const AddReadingForm = ({
  isReading,
  onSubmit,
}: AddReadingFormProps) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {isReading ? 'Stop page:' : 'Start page:'}
      </h2>
      <Formik
        initialValues={{ page: 0 }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          onSubmit(values.page);
          resetForm();
        }}
      >
        {({ errors, touched }) => (
          <Form className={styles.form}>
            <label className={styles.inputWrapper}>
              <span className={styles.label}>Page number:</span>
              <Field
                name="page"
                type="number"
                placeholder="0"
                className={styles.input}
              />
            </label>
            {errors.page && touched.page && (
              <span className={styles.error}>{errors.page}</span>
            )}
            <button type="submit" className={styles.submitBtn}>
              {isReading ? 'To stop' : 'To start'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
