import React from 'react'
import styles from "../../../assets/css/sidebar.module.css";
import { FaUsers } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";

export default function Sidebar({collapsed, setCollapsed}) {

  return (
    <div className={collapsed === true ? styles.collapsedSidebarWrapper : styles.sidebarWrapper}>
      <div onClick={() => setCollapsed(!collapsed)} style={{cursor: "pointer"}}>
          <GiHamburgerMenu/>  
      </div>
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
