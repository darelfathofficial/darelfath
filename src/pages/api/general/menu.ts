// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MenuDTO } from "@/dtos/general/menu.dto";
import { get } from "@/services/google-spreadsheets";
import { encrypt } from "@/utils/crypto";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<BaseResponse<MenuDTO[]>>) {
  try {
    const menus = await get({ range: "Pengaturan!A3:F20" });
    const data = mapping(menus ?? [], req.query.original === "true", req.query.page as string);

    res.status(200).json({
      success: true,
      message: "Successfully!",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Ups, maaf terjadi kesalahan di sisi server!",
      data: null,
    });
  }
}

const mapping = (data: any[][], original: boolean, page: string): MenuDTO[] => {
  const items = data
    .filter((item) => item[0] !== "")
    .map<MenuDTO>((item) => ({
      id: item[0],
      parentId: item[1],
      name: item[2],
      page: item[3],
      type: item[4],
      sheet: item[5] !== "" && item[5] !== undefined ? encrypt(item[5]) : "",
    }));
  if (original) return items.filter((item) => item.page === page && item.sheet !== "" && item.sheet !== undefined);
  const itemMap = new Map<string, MenuDTO>();
  const rootItems: MenuDTO[] = [];
  items.forEach((item) => {
    itemMap.set(item.id, { ...item, children: [] });
  });

  items.forEach((item) => {
    const currentItem = itemMap.get(item.id)!;
    if (item.parentId !== "" && item.parentId !== undefined) {
      const parentItem = itemMap.get(item.parentId);
      if (parentItem) {
        parentItem.children!.push(currentItem);
      }
    } else {
      rootItems.push(currentItem);
    }
  });

  return rootItems;
};