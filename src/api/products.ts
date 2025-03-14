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
