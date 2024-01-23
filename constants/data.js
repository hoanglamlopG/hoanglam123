import images from "./images";

export const latestList = [
    {
      id: "1",
      image: images.shoes6,
      name: "Nike 1",
      category: "Giày Nike mới",
      oldPrice: 110,
      price: 110
    },
    {
      id: "2",
      image: images.shoes7,
      name: "Nike 2",
      category: "Giày Nike đỏ trắng",
      oldPrice: 50,
      price: 30
    },
    {
      id: "3",
      image: images.shoes8,
      name: "Nike 3",
      category: "Giày Nike đen trắng",
      oldPrice: 130,
      price: 130
    }
  ]

export const userList = [
  {
    id:1,
    username:'nva',
    password:'123456',
  },
  {
    id:2,
    username:'nvb',
    password:'123456',
  },
  {
    id:3,
    username:'nvc',
    password:'123456',
  }
]
export const findUser = (username, password) => {
  const foundUser = userList.find(user => user.username === username && user.password === password);
  return foundUser || null;
};



export const shoesList1 = [
    {
      id: "1",
      shoes: images.shoes1,
    },
    {
      id: "2",
      shoes: images.shoes2,
    },
    {
      id: "3",
      shoes: images.shoes3,
    },
    {
      id: "4",
      shoes: images.shoes4,
    },
    {
      id: "5",
      shoes: images.shoes2,
    }
  ]
  
export const shoesList2 = [
    {
      id: "1",
      shoes: images.shoes3,
    },
    {
      id: "2",
      shoes: images.shoes1,
    },
    {
      id: "3",
      shoes: images.shoes2,
    },
    {
      id: "4",
      shoes: images.shoes4,
    },
    {
      id: "5",
      shoes: images.shoes7,
    }
    
    
  ]