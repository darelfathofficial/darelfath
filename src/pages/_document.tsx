/* eslint-disable @next/next/no-sync-scripts */
import { Head, Html, Main, NextScript } from "next/document";
import Image from "next/image";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <div id="loading" suppressHydrationWarning>
          <div id="loading-center">
            <div id="loading-center-absolute">
              <div className="loading-icon text-center d-flex flex-column align-items-center justify-content-center">
                <Image src="/images/preloader.svg" alt="icon" className="loading-logo" width={250} height={250} priority={true} />
              </div>
            </div>
          </div>
        </div>
        <Main />
        <NextScript />
        <script src="/js/jquery-3.7.1.min.js" />
        <script src="/js/bootstrap.min.js" />
        <script src="/js/meanmenu.js" />
        <script src="/js/swiper-bundle.min.js" />
        <script src="/js/jquery.counterup.min.js" />
        <script src="/js/wow.min.js" />
        <script src="/js/magnific-popup.min.js" />
        <script src="/js/nice-select.min.js" />
        <script src="/js/parallax.js" />
        <script src="/js/jquery.waypoints.js" />
        <script src="/js/script.js" />
      </body>
    </Html>
  );
}
