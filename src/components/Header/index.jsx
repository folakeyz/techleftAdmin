import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { AiOutlineLeftCircle, AiOutlineSearch } from "react-icons/ai";
import { getMe } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = ({ title }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const userProfile = useSelector((state) => state.userProfile);
  const { user = {} } = userProfile;

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);
  return (
    <div className={styles.pageTitle}>
      <div className={styles.titleCon}>
        <div className={styles.title}>
          <span onClick={() => navigate(-1)}>
            <AiOutlineLeftCircle />
          </span>
        </div>
        <div className={styles.title}>{title}</div>
        <div className={styles.greeting}>
          <h3>
            Welcome {user?.first_name} <span>👋</span>
          </h3>
          <p>Good to see you again!</p>
        </div>
      </div>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <AiOutlineSearch />
      </div>
    </div>
  );
};

export default Header;
