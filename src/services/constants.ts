export const API_KEY = process.env.API_KEY;
export const API_HOST = "moviesdatabase.p.rapidapi.com";
export const API_URL = "https://moviesdatabase.p.rapidapi.com/titles";
export const API_OPTIONS = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": API_KEY!,
    "X-RapidAPI-Host": API_HOST!,
  },
};
