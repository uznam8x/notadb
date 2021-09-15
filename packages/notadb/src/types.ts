export type Author = {
  id: number;
  name: string;
};

export type Media = {
  id: number;
  url: string;
  mime: string;
};

export type Property = {
  [key: string]: {
    label: string;
    value: any;
  };
};

export type Metadata = {
  label: string;
  name: string;
  value: any;
};
