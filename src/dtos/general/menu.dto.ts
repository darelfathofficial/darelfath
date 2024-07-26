export type MenuDTO = {
  id: string;
  parentId?: string;
  name: string;
  page: string;
  type: string;
  sheet: string;
  children?: MenuDTO[];
};
