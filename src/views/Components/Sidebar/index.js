import React from 'react'
import styles from "../../../assets/css/sidebar.module.css";
import { FaUsers } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { Link } from 'react-router-dom';


export default function Sidebar() {
  return (
    <div className={styles.sidebarWrapper}>
        <Link to="/authors" className={styles.navLink}>
            <h3 className='mb-5 text-center'>Author Management</h3>
        </Link>
        <div className={styles.sidebarBtn}>
          <Link to="/authors" className={styles.navLink}>
             <span><FaUsers/> Authors</span>
          </Link>
        </div>
        <div className={styles.sidebarBtn}>
          <Link to="/favorite-authors" className={styles.navLink}>
            <span><MdFavorite/> Favorite Authors</span>
          </Link>
        </div>
    </div>
  )
}
