import axiosInstance from "./config";

type GetProductsArgs = {
  offset?: number;
  limit?: number;
  search?: string;
};

export const getProducts = ({
  offset,
  limit,
  search = "",
}: GetProductsArgs) => {
  return axiosInstance.get("/products", {
    params: {
      offset,
      limit,
      title: search,
    },
  });
};

export const getProduct = (slug: string) => {
  return axiosInstance.get(`/products/slug/${slug}`);
};

export const getRelatedProducts = (slug: string) => {
  return axiosInstance.get(`/products/slug/${slug}/related`);
};
