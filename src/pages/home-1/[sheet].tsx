/* eslint-disable @next/next/no-img-element */
import Footer from "@/components/footer";
import Header from "@/components/header";
import Scrollup from "@/components/scrollup";
import { FooterDTO } from "@/dtos/general/footer.dto";
import { MenuDTO } from "@/dtos/general/menu.dto";
import { Home1 } from "@/dtos/home-1.dto";
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

  const footerConnect = await fetch(`${baseUrl}/api/general/footer`);
  const footerResponse = await footerConnect.json();

  const dataConnect = await fetch(`${baseUrl}/api/home-1/${(params?.sheet ?? "").toString()}`);
  const dataResponse = await dataConnect.json();

  return { props: { menus: menuResponse.data as MenuDTO[], content: dataResponse.data as Home1, footer: footerResponse.data as FooterDTO }, revalidate: 600 };
}) satisfies GetStaticProps<{
  menus: MenuDTO[];
  content: Home1;
  footer: FooterDTO;
}>;

export default function Home({ menus, content, footer }: InferGetStaticPropsType<typeof getStaticProps>) {
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
              <h1 className="wow fadeInUp" data-wow-delay="200ms" data-wow-duration="1500ms" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: content.hero.title }} />
              <p className="mt-20 wow fadeInUp" data-wow-delay="400ms" data-wow-duration="1500ms" suppressHydrationWarning>
                {content.hero.description}
              </p>
              {content.hero.button && (
                <Link href={content.hero.button.page} className="btn-one mt-50 wow fadeInUp" data-wow-delay="600ms" data-wow-duration="1500ms" suppressHydrationWarning>
                  {content.hero.button.title} <i className="fa-light fa-arrow-right-long"></i>
                </Link>
              )}
            </div>
          </div>
          <div className="banner-two__image">
            <div className="banner__info info3">
              <img src="/images/icon/banner-hero-icon3.png" alt="icon" />
              <div>
                <h5 className="fs-28">
                  <span className="count secondary-color" suppressHydrationWarning>
                    {content.hero.budget.data}
                  </span>
                  +
                </h5>
                <span className="fs-14">{content.hero.budget.title}</span>
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

        {/* Topic area start here */}
        <section className="topic-two-area pb-120">
          <div className="container">
            <div className="topic-two__wrp">
              <div className="row g-4 text-center">
                {content.topic.map((item, idx) => (
                  <div key={item.id} className="col-xl-6 col-md-6 wow fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms" suppressHydrationWarning>
                    <div className={`topic__item item-${["one", "two", "three", "four"][idx]}`}>
                      <div className="topic__icon" dangerouslySetInnerHTML={{ __html: item.icon }} />
                      <div className="topic__content text-left">
                        <h4>
                          <a href="course-2.html">{item.title}</a>
                        </h4>
                        <span>{item.subtitle}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* Topic area end here */}

        {/* About area start here */}
        <section className="about-area pb-120">
          <div className="container">
            <div className="row g-4">
              <div className="col-xl-5 wow fadeInRight" data-wow-delay="200ms" data-wow-duration="1500ms">
                <div className="about__left-part">
                  <div className="about__image">
                    <img className="about-dots sway__animation" src="/images/shape/about-dots.png" alt="shape" />
                    <img className="about-circle" src="/images/shape/about-circle.png" alt="shape" />
                    <img src="/images/about/about-image1.png" alt="image" />
                    <img className="sm-image" src="/images/about/about-image2.png" alt="image" />
                    <div className="count-info">
                      <h5 className="primary-color fs-28">
                        <span className="count primary-color" suppressHydrationWarning>
                          25
                        </span>
                        +
                      </h5>
                      <span className="fs-14">Years Experience</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-7">
                <div className="about__right-wrp">
                  <div className="section-header">
                    <h5 className="wow fadeInUp" data-wow-delay="00ms" data-wow-duration="1500ms">
                      ABOUT US
                    </h5>
                    <h2 className="wow fadeInUp" data-wow-delay="200ms" data-wow-duration="1500ms">
                      Learn & Grow Your{" "}
                      <span suppressHydrationWarning>
                        Skills <img src="/images/shape/header-shape.png" alt="shape" />
                      </span>{" "}
                      From Anywhere
                    </h2>
                    <p className="wow fadeInUp" data-wow-delay="00ms" data-wow-duration="1500ms">
                      Aonsectetur adipiscing elit Aenean scelerisque augue vitae consequat Juisque eget congue velit in cursus leo sodales the turpis euismod quis sapien euismod quis sapien the.
                    </p>
                  </div>
                  <div className="about__right-part mt-30 wow fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
                    <div className="about__info">
                      <div className="icon bg__1">
                        <img src="/images/icon/about-icon1.png" alt="icon" />
                      </div>
                      <div>
                        <h4>Educator Support</h4>
                        <p className="mt-10">Elit Aenean scelerisque vitae consequat the.</p>
                      </div>
                    </div>
                    <div className="about__info">
                      <div className="icon bg__2">
                        <img src="/images/icon/about-icon2.png" alt="icon" />
                      </div>
                      <div>
                        <h4>Flexible Classes</h4>
                        <p className="mt-10">Elit Aenean scelerisque vitae consequat the.</p>
                      </div>
                    </div>
                  </div>
                  <a href="about.html" className="btn-one mt-50 wow fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
                    About Us<i className="fa-light fa-arrow-right-long"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* About area end here */}

        <Footer content={footer} />
      </main>

      <Scrollup />
    </>
  );
}

