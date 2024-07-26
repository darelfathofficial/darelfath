// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Home1, Home1Hero, Home1Topic } from "@/dtos/general/home-1.dto";
import { get } from "@/services/google-spreadsheets";
import { decrypt } from "@/utils/crypto";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<BaseResponse<Home1>>) {
  try {
    const sheet = decrypt(req.query.sheet as string);

    const gethHero = await get({ range: `${sheet}!B3:B9`, majorDimension: "COLUMNS" });
    const hero = mappingHero(gethHero ?? [["", "", "", "", "", ""]]);

    const gethTopic = await get({ range: `${sheet}!D3:G6` });
    const topic = mappingTopic(gethTopic ?? []);

    res.status(200).json({
      success: true,
      message: "Successfully!",
      data: { hero, topic },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Ups, maaf terjadi kesalahan di sisi server!",
      data: null,
    });
  }
}

const mappingHero = (data: any[][]): Home1Hero => {
  const item = data[0];
  const budget = `${item[5]}`.split(";");
  const button = item[6] !== "" && typeof item[6] !== "undefined" ? `${item[6]}`.split(";") : undefined;
  return {
    title: item[0],
    subtitle: item[1],
    description: item[2],
    picture1: item[3],
    picture2: item[4],
    budget: { data: budget[0], title: budget[1] },
    button: typeof button !== "undefined" ? { page: button[0], title: button[1] } : undefined,
  };
};

const mappingTopic = (data: any[][]): Home1Topic[] => {
  return data
    .filter((item) => item[0] !== "")
    .map<Home1Topic>((item) => ({
      id: item[0],
      icon: item[1],
      title: item[2],
      subtitle: item[3],
    }));
};
