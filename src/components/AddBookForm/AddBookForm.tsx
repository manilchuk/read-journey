// src/components/AddBookForm/AddBookForm.tsx
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import styles from './AddBookForm.module.css';

interface AddBookFormProps {
  onSubmit: (values: {
    title: string;
    author: string;
    totalPages: number;
  }) => void;
}

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  author: Yup.string().required('Author is required'),
  totalPages: Yup.number()
    .min(1, 'Must be at least 1')
    .required('Number of pages is required'),
});

export const AddBookForm = ({ onSubmit }: AddBookFormProps) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create your library:</h2>
      <Formik
        initialValues={{ title: '', author: '', totalPages: 0 }}
        validationSchema={validationSchema}
        onSubmit={(values) => onSubmit(values)}
      >
        {({ errors, touched }) => (
          <Form className={styles.form}>
            <label className={styles.inputWrapper}>
              <span className={styles.label}>Book title:</span>
              <Field
                name="title"
                type="text"
                placeholder="Enter text"
                className={styles.input}
              />
            </label>
            {errors.title && touched.title && (
              <span className={styles.error}>{errors.title}</span>
            )}

            <label className={styles.inputWrapper}>
              <span className={styles.label}>The author:</span>
              <Field
                name="author"
                type="text"
                placeholder="Enter text"
                className={styles.input}
              />
            </label>
            {errors.author && touched.author && (
              <span className={styles.error}>{errors.author}</span>
            )}

            <label className={styles.inputWrapper}>
              <span className={styles.label}>Number of pages:</span>
              <Field
                name="totalPages"
                type="number"
                placeholder="0"
                className={styles.input}
              />
            </label>
            {errors.totalPages && touched.totalPages && (
              <span className={styles.error}>{errors.totalPages}</span>
            )}

            <button type="submit" className={styles.submitBtn}>
              Add book
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
