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
        <Link to="/authors" className={styles.navLink}>
        <div className={styles.sidebarBtn}>
             <span><FaUsers/> Authors</span>
        </div>
        </Link>

        <Link to="/favorite-authors" className={styles.navLink}>
        <div className={styles.sidebarBtn}>
            <span><MdFavorite/> Favorite Authors</span>
        </div>
        </Link>

    </div>
  )
}
