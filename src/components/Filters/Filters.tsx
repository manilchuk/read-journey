// src/components/Filters/Filters.tsx
import { Formik, Form, Field } from 'formik';
import styles from './Filters.module.css';

interface FiltersProps {
  onSubmit: (title: string, author: string) => void;
}

export const Filters = ({ onSubmit }: FiltersProps) => {
  return (
    <div className={styles.filtersContainer}>
      <h2 className={styles.title}>Filters:</h2>
      <Formik
        initialValues={{ title: '', author: '' }}
        onSubmit={(values) => onSubmit(values.title, values.author)}
      >
        {() => (
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
            <label className={styles.inputWrapper}>
              <span className={styles.label}>The author:</span>
              <Field
                name="author"
                type="text"
                placeholder="Enter text"
                className={styles.input}
              />
            </label>
            <button type="submit" className={styles.submitBtn}>
              To apply
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
