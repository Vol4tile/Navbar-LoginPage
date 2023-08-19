import React, { useEffect, useState, useRef } from "react";
import styles from "../styles/Navbar.module.css";
import {
  AiOutlineSearch,
  AiOutlineUser,
  AiOutlineLogout,
  AiFillSetting,
} from "react-icons/ai";
import { RxTriangleUp, RxMoon, RxSun } from "react-icons/rx";
import { motion } from "framer-motion";

const Navbar = ({ mode, setMode }) => {
  const [accountBarToggle, setAccountBarToggle] = useState(false);
  const wrapperRef = useRef(null);
  const iconRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target) &&
        iconRef.current &&
        !iconRef.current.contains(event.target)
      ) {
        setAccountBarToggle(accountBarToggle);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, iconRef]);

  const parentVarent = {
    show: {
      height: "120px",
      transition: {
        duration: 0.5,
      },
    },
    hide: {
      height: "0px",
    },
  };
  return (
    <header
      className={`${styles.navbar} ${
        mode === "light" ? styles.light : styles.dark
      }`}
    >
      <div className={styles.logo}>
        <a href="">Logo</a>
      </div>
      <div className={`${styles.cols} ${styles.searchBar}`}>
        <label htmlFor="search" style={{ cursor: "text" }}>
          <AiOutlineSearch></AiOutlineSearch>
          <input
            type="text"
            name="search"
            id="search"
            autoComplete="off"
            placeholder="Bir şeyler ara..."
          />
        </label>
      </div>
      <nav className={styles.nav}>
        <div>
          <a href="">Keşfet</a>
        </div>
        <div>
          <a href="">Hakkımızda</a>
        </div>
        <div>
          <a href="">Ücretlendirme</a>
        </div>
        <div>
          <div
            className={styles.modeChanger}
            onClick={() => {
              if (mode === "light") {
                setMode("dark");
              } else {
                setMode("light");
              }
            }}
          >
            {mode === "dark" ? <RxSun></RxSun> : <RxMoon></RxMoon>}
          </div>
        </div>
        <div className={styles.account} ref={iconRef}>
          <AiOutlineUser
            style={{ fontSize: "24px" }}
            onClick={() => {
              setAccountBarToggle(!accountBarToggle);
            }}
          ></AiOutlineUser>
          <motion.div
            {...(accountBarToggle && {
              animate: "show",
              variants: parentVarent,
              initial: "hide",
            })}
            ref={wrapperRef}
            className={styles.accountNav}
            style={{ display: accountBarToggle ? "block" : "none" }}
          >
            {accountBarToggle && (
              <>
                <RxTriangleUp className={styles.triangle}></RxTriangleUp>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {" "}
                  <a href="">
                    <label className={styles.accountMenus}>
                      <AiOutlineUser></AiOutlineUser>
                      Hesabım
                    </label>
                  </a>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <a href="">
                    <label className={styles.accountMenus}>
                      <AiFillSetting></AiFillSetting>
                      Ayarlar
                    </label>
                  </a>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5 }}
                >
                  <a href="">
                    <label className={styles.accountMenus}>
                      <AiOutlineLogout></AiOutlineLogout>
                      Çıkış Yap
                    </label>
                  </a>
                </motion.div>
              </>
            )}
          </motion.div>
        </div>
        <div>
          <a href="">Paylaş</a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
