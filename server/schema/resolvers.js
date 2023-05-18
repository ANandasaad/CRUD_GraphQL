import { UserList, MovieList } from "../FakeData.js";


let fakeArray = UserList

const resolvers = {
  Query: {
    users: () => {
      return UserList;
    },
    user: (_, args) => {
      const id = args.id;
      const user = UserList.find((obj) => obj.id == id);
      return user;
    },

    movies: () => {
      return MovieList;
    },
    movie: (_, args) => {
      const name = args.name;
      const user = MovieList.find((obj) => obj.name == name);
      return user;
    },
  },
  User: {
    favoriteMovies: () => {
      return MovieList.filter(
        (list) =>
          (list.yearOfPublication >= 2000) & (list.yearOfPublication <= 2010)
      );
    },
  },

  Mutation: {
    createUser: (_, args) => {
      const user = args.input;
      console.log(user);
      const lastId = UserList[UserList.length - 1].id;
      user.id = lastId + 1;

      UserList.push(user);
      return user;
    },

    updateUsername: (_, args) => {
      const { id, newUsername } = args.input;
      let userUpdate;
      UserList.forEach((user) => {
        if (user.id === Number(id)) {
          user.username = newUsername;
          userUpdate = user;
        }
      });

      return userUpdate;
    },

    deleteUser: (_, args) => {
        const id = args.id;
    
        const userIndex= UserList.findIndex(user=>user.id===Number(id));
        console.log(userIndex);
        if(userIndex!=-1)
        { 
            const deletedUser =  UserList.splice(userIndex, 1)[0];
            return deletedUser;
             
        }
        return null;
        
       
      },
      
  },
};

export default resolvers;
