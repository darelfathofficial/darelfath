// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { FooterDTO } from "@/dtos/general/footer.dto";
import { get } from "@/services/google-spreadsheets";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<BaseResponse<FooterDTO>>) {
  try {
    const menus = await get({ range: "Pengaturan!H3:I6" });
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

const mapping = (data: any[][], original: boolean, page: string): FooterDTO => {
    const dataObj = Object.fromEntries(data)
    const contact = (dataObj['Hubungi Kami'] as string).split(';')
    return {
        description: dataObj['Deskripsi'],
        quickLinks: (dataObj['Quick Link'] as string).split(';').map(item => ({
            title: item.split(':')[0],
            page: item.split(':')[1],
        })),
        major: (dataObj['Jurusan'] as string).split(';').map(item => ({
            title: item.split(':')[0],
            page: item.split(':')[1],
        })),
        contact: {
            location: contact[0],
            phoneNumber: contact[1],
            email: contact[2],
        },
    }
};