const users = [
  { username: 'user1', email: 'user1@email.com' },
  { username: 'user2', email: 'user2@email.com' }
];

const getUser = (username) =>
    Promise((resolve) => {
    const user = users.find((user) => user.username === username);
    resolve(user);
});

const getUsers = (userNames) => {
  const userPromises = userNames.map((username) => getUser(username));
  return Promise.all(userPromises);
};

const main = () => {
  const userNames = ['user1', 'user2'];
  const users = getUsers(userNames);
  console.log(users);
};

main();
