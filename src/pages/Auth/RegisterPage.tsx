// src/pages/Auth/RegisterPage.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, type FormikHelpers } from 'formik';
import toast from 'react-hot-toast';
import { AuthLayout } from './AuthLayout';
import styles from './AuthForm.module.css';
import { registerSchema } from '@/utils/validationSchemas';
import { signUp } from '@/services/auth';
import { useAppDispatch } from '@/redux/hooks';
import { setCredentials } from '@/redux/auth/slice';
import { getErrorMessage } from '@/utils/handleError';
import { Icon } from '@/components/Icon/Icon';
import type { SignUpCredentials, User } from '@/types';

export const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (
    values: SignUpCredentials,
    { setSubmitting }: FormikHelpers<SignUpCredentials>
  ) => {
    try {
      const data = await signUp(values);

      const user: User = {
        _id: '',
        name: data.name,
        email: data.email,
        token: data.token,
        refreshToken: data.refreshToken,
      };

      dispatch(setCredentials({ user, token: data.token }));
      navigate('/recommended');
      toast.success('Registration successful!');
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isValid, dirty, isSubmitting }) => (
          <Form className={styles.form}>
            <div className={styles.inputGroup}>
              <label
                className={`${styles.label} ${errors.name && touched.name ? styles.inputError : ''}`}
              >
                <span className={styles.labelText}>Name:</span>
                <Field
                  name="name"
                  type="text"
                  placeholder="Ilona Ratushniak"
                  className={styles.input}
                />
              </label>
              {errors.name && touched.name && (
                <span className={styles.errorMsg}>{errors.name}</span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label
                className={`${styles.label} ${errors.email && touched.email ? styles.inputError : ''}`}
              >
                <span className={styles.labelText}>Mail:</span>
                <Field
                  name="email"
                  type="email"
                  placeholder="Your@email.com"
                  className={styles.input}
                />
              </label>
              {errors.email && touched.email && (
                <span className={styles.errorMsg}>{errors.email}</span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label
                className={`${styles.label} ${errors.password && touched.password ? styles.inputError : ''}`}
              >
                <span className={styles.labelText}>Password:</span>
                <div className={styles.passwordWrapper}>
                  <Field
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Yourpasswordhere"
                    className={styles.input}
                  />
                  <button
                    type="button"
                    className={styles.eyeBtn}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <Icon name={showPassword ? 'icon-eye-off' : 'icon-eye'} />
                  </button>
                </div>
              </label>
              {errors.password && touched.password && (
                <span className={styles.errorMsg}>{errors.password}</span>
              )}
            </div>

            <div className={styles.footer}>
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={!isValid || !dirty || isSubmitting}
              >
                Registration
              </button>
              <Link to="/login" className={styles.link}>
                Already have an account?
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};
