type Image = {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

type Car = {
  _id: string;
  name: string;
  price: string;
  image: Image;
  slug: string;
  company: string;
  model?: string;
  range?: string;
  acceleration?: string;
  description?: string;
} 