/* eslint-disable @next/next/no-img-element */
import Header from "@/components/header";
import Scrollup from "@/components/scrollup";
import { Home1 } from "@/dtos/general/home-1.dto";
import { MenuDTO } from "@/dtos/general/menu.dto";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";

export const getStaticPaths = (async () => {
  const baseUrl = process.env.BASE_URL;
  const connect = await fetch(`${baseUrl}/api/general/menu?original=true&page=home-1`);
  const response = await connect.json();

  return {
    paths: (response.data as MenuDTO[]).map((item) => ({
      params: { sheet: item.sheet },
    })),
    fallback: "blocking",
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async ({ params }) => {
  const baseUrl = process.env.BASE_URL;
  const menuConnect = await fetch(`${baseUrl}/api/general/menu`);
  const menuResponse = await menuConnect.json();

  const dataConnect = await fetch(`${baseUrl}/api/home-1/${(params?.sheet ?? "").toString()}`);
  const dataResponse = await dataConnect.json();

  return { props: { menus: menuResponse.data as MenuDTO[], content: dataResponse.data as Home1 }, revalidate: 600 };
}) satisfies GetStaticProps<{
  menus: MenuDTO[];
  content: Home1;
}>;

export default function Home({ menus, content }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Header menus={menus} />

      <main>
        {/* Banner area start here */}
        <section className="banner-two-area sub-bg">
          <div className="banner-two__shape1">
            <img src="/images/shape/banner-two-left-line.png" alt="shape" />
          </div>
          <div className="banner-two__shape2">
            <img className="animation__sunMove" src="/images/shape/banner-two-dots.png" alt="shape" />
          </div>
          <div className="banner-two__shape3">
            <img src="/images/shape/banner-two-right-line.png" alt="shape" />
          </div>
          <div className="banner-two__shape4">
            <img src="/images/shape/banner-two-bottom-line.png" alt="shape" />
          </div>
          <div className="container">
            <div className="banner-two__content">
              <h5 className="mb-10 primary-color text-capitalize wow fadeInUp" data-wow-delay="00ms" data-wow-duration="1500ms" suppressHydrationWarning>
                {content.hero.subtitle}
              </h5>
              <h1 className="wow fadeInUp" data-wow-delay="200ms" data-wow-duration="1500ms" suppressHydrationWarning dangerouslySetInnerHTML={{__html: content.hero.title}}/>
              <p className="mt-20 wow fadeInUp" data-wow-delay="400ms" data-wow-duration="1500ms" suppressHydrationWarning>
                {content.hero.description}
              </p>
              <Link href="/pendaftaran" className="btn-one mt-50 wow fadeInUp" data-wow-delay="600ms" data-wow-duration="1500ms" suppressHydrationWarning>
                Pendaftaran<i className="fa-light fa-arrow-right-long"></i>
              </Link>
            </div>
          </div>
          <div className="banner-two__image">
            <div className="banner__info info3">
              <img src="/images/icon/banner-hero-icon3.png" alt="icon" />
              <div>
                <h5 className="fs-28">
                  <span className="count secondary-color" suppressHydrationWarning>
                    {content.hero.studentData.data}
                  </span>
                  +
                </h5>
                <span className="fs-14">{content.hero.studentData.title}</span>
              </div>
            </div>
            <img className="shape-line slide-up-down" src="/images/shape/banner-two-hero-line.png" alt="shape" />
            <img className="shape-dots pxl-image-zoom" src="/images/shape/banner-two-hero-dots.png" alt="shape" />
            <img className="shape animation__arryLeftRight" src="/images/shape/banner-two-hero-shape.png" alt="shape" />
            <div className="image1 image">
              <img src={`https://drive.google.com/thumbnail?id=${content.hero.picture1}&sz=w287`} alt="image" />
            </div>
            <div className="image2 image">
              <img src={`https://drive.google.com/thumbnail?id=${content.hero.picture2}&sz=w455`} alt="image" />
            </div>
          </div>
        </section>
        {/* Banner area end here */}
      </main>

      <Scrollup />
    </>
  );
}
