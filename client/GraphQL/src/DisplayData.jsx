import React, { useEffect, useState } from "react";
import { useQuery, gql, useLazyQuery, useMutation } from "@apollo/client";

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

const CREATE_USER = gql`
 mutation CreateUser($input:UserInput!){
    createUser(input:$input)
    {
       name
       age
       nationality
       username
    }
 }

`;

const DisplayData = () => {
  const { loading, data, refetch} = useQuery(QUERY_ALL_USERS);
  const { data: movie } = useQuery(QUERY_ALL_MOVIES);

  const [searchMovie, setMovie] = useState("");
  const [userdata, setUser] = useState("");
  const [fetchMovie, { data: Moviedata, error: Movie_error }] =
    useLazyQuery(GET_MOVIES);

  const [createUserDetails] = useMutation(CREATE_USER);
 const [name,setName]=useState('');
 const [age,setAge]=useState('');
 const [username,setUsername]=useState('');
 const [nationality,setNationality]=useState('');


  if (movie) {
    console.log(movie);
  }

  if (loading) {
    return <h1>Loading Data</h1>;
  }
  if (data) {
    console.log(data);
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
      <div>
        <input
          type="text"
          placeholder="Name.."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age.."
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username.."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nationality.."
          value={nationality}
          onChange={(e) => setNationality(e.target.value.toUpperCase())}
        />
        <button
          onClick={() => {
            createUserDetails({
              variables: {
                input: { name, username, age:Number(age), nationality },
              },
            });
            refetch();
          }}
        >
          Create User{" "}
        </button>
      </div>

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

        {Movie_error && <h1>Error try it again</h1>}
      </div>
    </>
  );
};

export default DisplayData;
