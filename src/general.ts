export type Category = {
  id: number;
  name: string;
  slug: string;
  image: string;
  creationAt: string;
  updatedAt: string;
};

export type Product = {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: Category;
  images: [
    "https://click.gt/cdn/shop/files/Sintitulo-1_3538b668-0b95-4a62-9e07-8a3f3d94a363.png?v=1733181609&width=600",
  ];
  creationAt: string;
  updatedAt: string;
};
