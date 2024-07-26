import Header from "@/components/header";
import Scrollup from "@/components/scrollup";
import { MenuDTO } from "@/dtos/general/menu.dto";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

export const getStaticPaths = (async () => {
  const baseUrl = process.env.BASE_URL;
  const connect = await fetch(`${baseUrl}/api/general/menu?original=true&page=about-2`);
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
  const connect = await fetch(`${baseUrl}/api/general/menu`);
  const response = await connect.json();

  return { props: { menus: response.data, sheets: (params?.sheet ?? "").toString() }, revalidate: 60 };
}) satisfies GetStaticProps<{
  menus: MenuDTO[];
  sheets: string;
}>;

export default function Home({ menus, sheets }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Header menus={menus} />

      <main><h1>{sheets}</h1></main>

      <Scrollup />
    </>
  );
}
