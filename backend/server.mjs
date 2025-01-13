import express from "express";

const app = express();
app.get('/data', (req, res) => {
  res.send({
    "movie": [
      {
        "id": "1",
        "name": "Vettiyan",
        "Rating": 7.5,
        "genre": "Action",
        "url": "https://images.app.goo.gl/Qvr4GPACvAcwYx9d9"
      },
      {
        "id": "2",
        "name": "Swag",
        "Rating": 7.8,
        "genre": "Comedy",
        "url": "https://images.app.goo.gl/dWS2XD7kNzq4aTveA"
      },
      {
        "id": "3",
        "name": "Tholiprema",
        "Rating": 7.2,
        "genre": "Romantic"
      },
      {
        "id": "4",
        "name": "Adhurs",
        "Rating": 6.7,
        "genre": "Comedy"
      },
      {
        "id": "5",
        "name": "Badshaah",
        "Rating": 6.9,
        "genre": "Action"
      },
      {
        "id": "6",
        "name": "Animal",
        "Rating": 6.1,
        "genre": "Violent"
      },
      {
        "id": "7",
        "name": "pokiri",
        "Rating": 8,
        "genre": "Action"
      },
      {
        "id": "8",
        "name": "Bahubali",
        "Rating": 8,
        "genre": "Drama"
      },
      {
        "id": "9",
        "name": "HanuMan",
        "Rating": 7.8,
        "genre": "Drama"
      },
      {
        "id": "10",
        "name": "Interstellar",
        "Rating": 8.7,
        "genre": "Sci-Fi"
      },
      {
        "id": "11",
        "name": "Gravity",
        "Rating": 7.7,
        "genre": "Sci-Fi"
      },
      {
        "id": "12",
        "name": "Raja The Great",
        "Rating": 9,
        "genre": "Comedy"
      }
    ],
    "watchlist": [
      {
        "id": "1",
        "name": "Vettiyan",
        "Rating": 7.5,
        "genre": "Action",
        "url": "https://images.app.goo.gl/Qvr4GPACvAcwYx9d9"
      },
      {
        "id": "2",
        "name": "Swag",
        "Rating": 7.8,
        "genre": "Comedy",
        "url": "https://images.app.goo.gl/dWS2XD7kNzq4aTveA"
      }
    ]
  });
});
app.get("/login", (req, res)=>{
  res.send({
    "login": [
      {
        "username": "test@gmail.com",
        "password": "b74a"
      },
      {
        "username": "test@gmail.com",
        "password": "Dhathri@25"
      }
    ]
  })
})
// Ensure the server listens on a specific port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});