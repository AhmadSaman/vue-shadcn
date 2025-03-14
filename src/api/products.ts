import axiosInstance from "./config";

type GetProductsArgs = {
  offset: number;
  limit: number;
};

export const getProducts = ({ offset, limit }: GetProductsArgs) => {
  return axiosInstance.get("/products", {
    params: {
      offset,
      limit,
    },
  });
};

export const getProduct = (slug: string) => {
  return axiosInstance.get(`/products/slug/${slug}`);
};

export const getRelatedProducts = (slug: string) => {
  return axiosInstance.get(`/products/slug/${slug}/related`);
};
