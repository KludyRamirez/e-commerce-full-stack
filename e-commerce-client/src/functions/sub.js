import axios from "axios";

export const getSubs = async () =>
  await axios.get(`https://bananauyu.up.railway.app/api/subs`);

export const getSub = async (slug) =>
  await axios.get(`https://bananauyu.up.railway.app/api/sub/${slug}`);

export const removeSub = async (slug, authtoken) =>
  await axios.delete(`https://bananauyu.up.railway.app/api/sub/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const updateSub = async (slug, sub, authtoken) =>
  await axios.put(`https://bananauyu.up.railway.app/api/sub/${slug}`, sub, {
    headers: {
      authtoken,
    },
  });

export const createSub = async (sub, authtoken) =>
  await axios.post(`https://bananauyu.up.railway.app/api/sub`, sub, {
    headers: {
      authtoken,
    },
  });
