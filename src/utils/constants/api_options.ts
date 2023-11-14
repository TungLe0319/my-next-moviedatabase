export const API_KEY = process.env.API_KEY
export const API_HOST = "moviesdatabase.p.rapidapi.com";

export const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": API_HOST,
  },
};
