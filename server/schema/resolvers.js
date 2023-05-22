import {  MovieList } from "../FakeData.js";
import UserList from "./database.js";



const resolvers = {
  Query: {
    users: async () => {
      try{
        const user= await UserList.find();
        return user;
      }
      catch(error)
      {
        console.log(error);
      }
      
        
      
    },
    user:  async (_, args) => {
      try{
        const id = args.id;
        const user= await UserList.findById(id);
     
        return user;
      }
      catch(error){
         console.log(error);
      }
     
     
        
      
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
    createUser: async(_, args) => {
      const {name,username,age,nationality} = args.input;
       const users=new UserList({
        name:name,
        username:username,
        age:age,
        nationality:nationality
       })

       const res= await users.save();

       return {
        id:res.id,
        ...res._doc
       }
      
      // const lastId = UserList[UserList.length - 1].id;
      // user.id = lastId + 1;

   
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
