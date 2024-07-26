export type Home1 = {
  hero: Home1Hero;
  topic: Home1Topic[];
};

export type Home1Hero = {
  title: string;
  subtitle: string;
  description: string;
  picture1: string;
  picture2: string;
  budget: {
    data: string;
    title: string;
  };
  button?: {
    title: string;
    page: string;
  };
};

export type Home1Topic = {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
};
