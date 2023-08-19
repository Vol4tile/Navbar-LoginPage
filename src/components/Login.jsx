import { Formik } from "formik";
import * as Yup from "yup";
import styles from "../styles/Login.module.css";
import {
  AiOutlineUser,
  AiOutlineKey,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { useState } from "react";

const Login = ({ mode }) => {
  const [passwordToggle, setPasswordToggle] = useState(false);
  const schema = Yup.object().shape({
    username: Yup.string()
      .required("Bu alan boş bırakalamaz")
      .min(6, "En az 6 karakterden oluşmalı!"),
    password: Yup.string()
      .required("Şifre  boş bırakılamaz!")
      .min(8, "En az 8 karakterden oluşmalı!"),
  });
  return (
    <div
      className={`${styles.login} ${
        mode === "light" ? styles.light : styles.dark
      }`}
    >
      <div className={styles.container}>
        <div className={styles.media}>
          <img
            src={mode === "light" ? "lion.png" : "lightlogin.svg"}
            alt="lion"
          />
          <video src="conversation.mp4" loop muted autoPlay></video>
        </div>
        <Formik
          validationSchema={schema}
          initialValues={{ username: "", password: "" }}
          onSubmit={(values) => {
            alert(JSON.stringify(values));
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <div className={styles.formContainer}>
              <h1>Giriş Yap</h1>
              <div className={styles.form}>
                <form noValidate onSubmit={handleSubmit}>
                  <label htmlFor="username">
                    <AiOutlineUser />
                    <input
                      type="text"
                      name="username"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                      placeholder="Kullanıcı adı giriniz."
                      id="username"
                    />
                  </label>
                  <p className={styles.error}>
                    {touched.username && errors.username}
                  </p>
                  <label htmlFor="password">
                    <AiOutlineKey />
                    <input
                      type={passwordToggle ? "text" : "password"}
                      name="password"
                      id="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      placeholder="Enter password"
                    />
                    {passwordToggle ? (
                      <AiOutlineEyeInvisible
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setPasswordToggle(!passwordToggle);
                        }}
                      />
                    ) : (
                      <AiOutlineEye
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setPasswordToggle(!passwordToggle);
                        }}
                      />
                    )}
                  </label>
                  <p className={styles.error}>
                    {touched.password && errors.password}
                  </p>
                  <button type="submit">Login</button>
                </form>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
