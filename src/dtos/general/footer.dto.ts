export type FooterDTO = {
  description: string;
  quickLinks: { title: string; page: string }[];
  major: { title: string; page: string }[];
  contact: {
    location: string
    phoneNumber: string
    email: string
  };
};
