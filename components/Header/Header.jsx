import Logo from './Logo';
import HamburgerMenu from './HamburgerMenu';
import Navigation from './Navigation';
import styles from './header.module.css';

export default function Header({ allPages }) {
  return (
    <header className={styles.header}>
      <div className="flex items-center justify-between flex-wrap bg-gray-50 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Logo />
        </div>
        <HamburgerMenu />
        <Navigation allPages={allPages} />
      </div>
    </header>
  );
}
