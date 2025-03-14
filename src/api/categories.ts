import axiosInstance from "./config";

export const getCategories = () => {
  return axiosInstance.get("/categories");
};

type GetCategoryProductsArgs = {
  offset: number;
  limit: number;
  slug: string;
};
export const getCategoryProducts = ({
  offset,
  limit,
  slug,
}: GetCategoryProductsArgs) => {
  return axiosInstance.get(`products/?categorySlug=${slug}`, {
    params: {
      offset,
      limit,
    },
  });
};
