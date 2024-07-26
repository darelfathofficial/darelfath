import { MenuDTO } from "@/dtos/general/menu.dto";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface HeaderProps {
  menus: MenuDTO[];
}

const Header = ({ menus }: HeaderProps) => {
  const router = useRouter();
  useEffect(() => {
    if ($(".offcanvas-body .mobile-menu").children().length === 0) $(".header-area nav").meanmenu();
    $(".offcanvas-body .mean-nav li a").on("click", function (e) {
      e.preventDefault();
      router.push($(this).attr("href") ?? "");
      $('.menubars').click()
    });

    return () => {
      $(".offcanvas-body .mean-nav li a").off("click");
    };
  }, [router]);

  return (
    <>
      <header className="header-area">
        <div className="header__container">
          <div className="header__main">
            <a href="index.html" className="logo">
              <Image src="/images/logo/logo.svg" alt="logo" width={177} height={50} />
            </a>
            <div className="main-menu">
              <nav>
                <ul>
                  {menus.map((item) =>
                    (item.children ?? []).length > 0 ? (
                      <li key={item.id}>
                        <a href="#0">
                          {item.name} <i className="fa-solid fa-angle-down"></i>
                        </a>
                        <ul className="sub-menu">
                          {(item.children ?? []).map((child) => (
                            <li key={child.id}>
                              <Link href={`/${child.page}/${child.sheet}`}>{child.name}</Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ) : (
                      <li key={item.id}>
                        <Link href={`/${item.page}/${item.sheet}`}>{item.name}</Link>
                      </li>
                    )
                  )}
                </ul>
              </nav>
            </div>
            <div className="d-flex align-items-center gap-4 gap-xl-5">
              <div className="menu-btns d-none d-lg-flex">
                <Link href="https://wa.me/6282361110001">
                  Hubungi Kami &nbsp;<i className="fa-brands fa-whatsapp"></i>
                </Link>
              </div>
            </div>
            <button className="menubars d-block d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#menubar">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <div className="sidebar-area offcanvas offcanvas-end" id="menubar">
        <div className="offcanvas-header">
          <a href="index.html" className="logo">
            <Image src="/images/logo/logo-light.svg" width={177} height={50} alt="logo" />
          </a>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas">
            <i className="fa-regular fa-xmark"></i>
          </button>
        </div>
        <div className="offcanvas-body sidebar__body">
          <div className="mobile-menu overflow-hidden"></div>
          <div className="sidebar__contact-info mt-30">
            <h5 className="text-white mb-20">Contact Info</h5>
            <ul>
              <li>
                <i className="fa-solid fa-location-dot"></i> <a href="#0">example@example.com</a>
              </li>
              <li className="py-2">
                <i className="fa-solid fa-phone-volume"></i> <a href="tel:+912659302003">+91 2659 302 003</a>
              </li>
              <li>
                <i className="fa-solid fa-paper-plane"></i> <a href="#0">info.company@gmail.com</a>
              </li>
            </ul>
          </div>
          <div className="sidebar__btns my-2"></div>
          <div className="sidebar__socials">
            <ul>
              <li>
                <a href="#0">
                  <i className="fa-brands text-white fa-facebook-f"></i>
                </a>
              </li>
              <li>
                <a href="#0">
                  <i className="fa-brands text-white fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="#0">
                  <i className="fa-brands text-white fa-youtube"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
