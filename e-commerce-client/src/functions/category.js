import axios from "axios";

export const getCategories = async () =>
  await axios.get(`https://bananauyu.up.railway.app/api/categories`);

export const getCategory = async (slug) =>
  await axios.get(`https://bananauyu.up.railway.app/api/category/${slug}`);

export const removeCategory = async (slug, authtoken) =>
  await axios.delete(`https://bananauyu.up.railway.app/api/category/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const updateCategory = async (slug, category, authtoken) =>
  await axios.put(
    `https://bananauyu.up.railway.app/api/category/${slug}`,
    category,
    {
      headers: {
        authtoken,
      },
    }
  );

export const createCategory = async (category, authtoken) =>
  await axios.post(`https://bananauyu.up.railway.app/api/category`, category, {
    headers: {
      authtoken,
    },
  });

export const getCategorySubs = async (_id) =>
  await axios.get(`https://bananauyu.up.railway.app/api/category/subs/${_id}`);
