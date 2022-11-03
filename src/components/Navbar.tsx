import Link from "next/link"
import styles from "../styles/navbar.module.css"

const Navbar = () => {
  return (
    <Link href="/" className={styles.link}>
      <h1 className={styles.header}>The Muffiner</h1>
    </Link>
  )
}

export default Navbar
