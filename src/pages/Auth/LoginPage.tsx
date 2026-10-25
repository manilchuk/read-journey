// src/pages/Auth/LoginPage.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, type FormikHelpers } from 'formik';
import toast from 'react-hot-toast';
import { AuthLayout } from './AuthLayout';
import { loginSchema } from '@/utils/validationSchemas';
import { signIn } from '@/services/auth';
import { useAppDispatch } from '@/redux/hooks';
import { setCredentials } from '@/redux/auth/slice';
import { getErrorMessage } from '@/utils/handleError';
import { Icon } from '@/components/Icon/Icon';
import type { SignInCredentials, User } from '@/types';
import styles from './AuthForm.module.css';

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (
    values: SignInCredentials,
    { setSubmitting }: FormikHelpers<SignInCredentials>
  ) => {
    try {
      const data = await signIn(values);

      const user: User = {
        _id: '',
        name: data.name,
        email: data.email,
        token: data.token,
        refreshToken: data.refreshToken,
      };

      dispatch(setCredentials({ user, token: data.token }));
      navigate('/recommended');
      toast.success('Login successful!');
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isValid, dirty, isSubmitting }) => (
          <Form className={styles.form}>
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
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
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
                Log in
              </button>
              <Link to="/register" className={styles.link}>
                Don't have an account?
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};
