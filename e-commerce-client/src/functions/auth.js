import axios from "axios";

export const createOrUpdateUser = async (authtoken) => {
  return await axios.post(
    `https://bananauyu.up.railway.app/api/create-or-update-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const currentUser = async (authtoken) => {
  return await axios.post(
    `https://bananauyu.up.railway.app/api/current-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const currentAdmin = async (authtoken) => {
  return await axios.post(
    `https://bananauyu.up.railway.app/api/current-admin`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
