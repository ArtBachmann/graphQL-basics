let users = [
  {
    id: '1',
    name: 'Riks',
    email: 'riks@mail.ee',
    age: 19
  },
  {
    id: '2',
    name: 'Aks',
    email: 'aks@mail.ee',
    age: 9
  },
  {
    id: '3',
    name: 'Art',
    email: 'art@mail.ee'
    //age: 48
  }
];

let posts = [
  {
    id: '1',
    title: 'Yee african people!!!',
    body: 'How are You?',
    published: true,
    author: '1'
  },
  {
    id: '2',
    title: 'Yee european people!!!',
    body: 'How are You?',
    published: true,
    author: '2'
  },
  {
    id: '3',
    title: 'Yee american people!!!',
    body: 'How are You?',
    published: true,
    author: '2'
  }
];

let comments = [
  {
    id: '1',
    text: 'I Love This!',
    author: '1',
    post: '2'
  },
  {
    id: '2',
    text: 'I Admire This!',
    author: '2',
    post: '3'
  },
  {
    id: '3',
    text: 'I Hate This!',
    author: '2',
    post: '1'
  },
  {
    id: '4',
    text: "I Don't Care About This!",
    author: '3',
    post: '2'
  }
];
const db = {
  users,
  posts,
  comments
}

export { db as default } 