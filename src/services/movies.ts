// api.js

const API_URL = "https://moviesdatabase.p.rapidapi.com/titles";



class MovieService {
  fetchMovies = async () => {
    try {
      const response = await fetch(
        API_URL + "?startYear=2022&list=most_pop_movies",
        {
          method: "GET",

          headers: {
            "X-RapidAPI-Key":
              "a2a294fd0bmsh6a658da60f9c95cp11b45fjsn5b38f6d32967",
            "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Failed to fetch titles:", response.statusText);
        return null;
      }
    } catch (error) {
      console.error("Error fetching titles:", error);
      return null;
    }
  };

  fetchMovieById = async (movieId:string) => {
    try {
      const response = await fetch(API_URL+`/${movieId}`, {
        
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "a2a294fd0bmsh6a658da60f9c95cp11b45fjsn5b38f6d32967",
          "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Failed to fetch titles:", response.statusText);
        return null;
      }
    } catch (error) {
      console.error("Error fetching titles:", error);
      return null;
    }
  };

  fetchMovieMainActors = async (movieId:string)=>{
      try {
        const response = await fetch(API_URL+`/${movieId}/crew`, {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "a2a294fd0bmsh6a658da60f9c95cp11b45fjsn5b38f6d32967",
            "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
          },
        });
console.log(API_URL+`/${movieId}/main_actors`);

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          
          return data;
        } else {
          console.error("Failed to fetch titles:", response.statusText);
          return null;
        }
      } catch (error) {
        console.error("Error fetching titles:", error);
        return null;
      }
  }
}

export const movieService = new MovieService()