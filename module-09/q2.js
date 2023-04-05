const users = [
{ username: `user1`, email: `user1@email.com` },
{ username: `user2`, email: `user2@email.com` }
];

const getUser = (username) =>
  new Promise((resolve) => {
    const user = users.find((user) => user.username === username);
    resolve(user);
  });

const getUsers = (data) => {
  const allUsers = data.map((username) => getUser(username));
  return (allUsers)
};

const main = () => {
    const userNames = [`user1`, `user2`];
    const users = getUsers(userNames);
    console.log(users);
    };

main();


  

  

  