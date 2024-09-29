'use client';

import Link from 'next/link';
import Image from 'next/image'; // next/image のインポート
import { useAuth } from '@/app/_contexts/AuthContext';
import { usePathname } from 'next/navigation';

const Header = () => {
  const { user } = useAuth();
  const pathname = usePathname();

  const isActive = (path: string) => (pathname === path ? 'nav-link active' : 'nav-link');

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link href="/" className="navbar-brand">
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <Link href="/" className={isActive('/')}>
              Home
            </Link>
          </li>
          {user ? (
            <>
              <li className="nav-item">
                <Link href="/editor" className={isActive('/editor')}>
                  <i className="ion-compose"></i>&nbsp;New Article
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/settings" className={isActive('/settings')}>
                  <i className="ion-gear-a"></i>&nbsp;Settings
                </Link>
              </li>
              <li className="nav-item">
                <Link href={`/profile/${user.username}`} className={isActive(`/profile/${user.username}`)}>
                  {user.image && (
                    <Image
                      src={user.image}
                      className="user-pic"
                      alt={user.username}
                      width={30}
                      height={30} // 適切なサイズを指定
                    />
                  )}
                  {user.username}
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link href="/login" className={isActive('/login')}>
                  Sign in
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/register" className={isActive('/register')}>
                  Sign up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
