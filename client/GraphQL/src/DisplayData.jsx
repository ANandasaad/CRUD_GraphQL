import React, { useEffect, useState } from "react";
import { useQuery, gql, useLazyQuery } from "@apollo/client";

const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      username
      age
      nationality
    }
  }
`;

const QUERY_ALL_MOVIES = gql`
  query GetAllMovies {
    movies {
      id
      name
      isInTheaters
      yearOfPublication
    }
  }
`;

const GET_MOVIES = gql`
  query getMovies($name: String!) {
    movie(name: $name) {
      name
      yearOfPublication
    }
  }
`;

const DisplayData = () => {
  const { loading, data, error } = useQuery(QUERY_ALL_USERS);
  const { data: movie } = useQuery(QUERY_ALL_MOVIES);

  const [searchMovie, setMovie] = useState("");
  const [userdata, setUser] = useState("");
  const [fetchMovie, { data: Moviedata, error: Movie_error }] =
    useLazyQuery(GET_MOVIES);

  if (movie) {
    console.log(movie);
  }

  if (loading) {
    return <h1>Loading Data</h1>;
  }
  if (data) {
    console.log(data);
  }
  if (error) {
    return <h1>{error.status || error.message}</h1>;
  }

 

  const list = data.users.map((items) => (
    <>
      <li>Name:- {items.name}</li>
      <li>Age:- {items.age}</li>
      <li>Username:- {items.username}</li>
      <li>Nationality:- {items.nationality}</li>
    </>
  ));

  const MovieList = movie?.movies.map((m) => (
    <>
      <li>MovieName:---{m.name}</li>
      <li>isInTheater:---{m.isInTheaters}</li>
      <li>Year Of Release :---{m.yearOfPublication}</li>
    </>
  ));

  return (
    <>
      <div>DisplayData</div>
      <div>{list}</div>
      <div>{MovieList}</div>
      <input
        type="text"
        placeholder="movies names"
        value={searchMovie}
        onChange={(e) => setMovie(e.target.value)}
      />
      <button
        onClick={() =>
          fetchMovie({
            variables: {
              name: searchMovie,
            },
          })
        }
      >
        Fetch Data
      </button>
      <div>
        {Moviedata && (
          <div>
            <h1>{Moviedata.movie.name}</h1>
            <h1>{Moviedata.movie.yearOfPublication}</h1>
          </div>
        )}

        {Movie_error&&<h1>Error try it again</h1>}
       
      </div>
    </>
  );
};

export default DisplayData;
