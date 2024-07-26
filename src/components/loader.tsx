import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Loader = () => {
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => $("#loading").show();
    const handleComplete = () => $("#loading").fadeOut(500);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router.asPath, router.events]);

  return (
    <div id="loading" suppressHydrationWarning>
      <div id="loading-center">
        <div id="loading-center-absolute">
          <div className="loading-icon text-center d-flex flex-column align-items-center justify-content-center">
            <Image src="/images/preloader.svg" alt="icon" className="loading-logo" width={250} height={250} priority={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
