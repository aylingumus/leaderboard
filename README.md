# leaderboard
A service that manages a game that uses a leaderboard with players submitting new scores from around the world. I used NodeJS with Express framework and PostgreSQL database for this application.

## Running Locally
```
git clone https://github.com/aylingumus/leaderboard.git
cd leaderboard
npm install
npm start
```

## Sample Requests and Responses

<b>GET /leaderboard:</b> You can get global leaderboard data.<br />
Sample Response:
```
[
    {
        "rank": 1,
        "points": "400",
        "display_name": "player_1",
        "country": "tr"
    },
    {
        "rank": 2,
        "points": "280",
        "display_name": "player_2",
        "country": "tr"
    },
    {
        "rank": 3,
        "points": "190",
        "display_name": "player_3",
        "country": "us"
    }
]
```

<b>GET /leaderboard/{country_iso_code}:</b> You can get country specific leaderboard data.<br />
Sample Response:
```
[
    {
        "rank": 4,
        "points": "117",
        "display_name": "gjg_5",
        "country": "eu"
    },
    {
        "rank": 7,
        "points": "0",
        "display_name": "gjg_7",
        "country": "eu"
    },
    {
        "rank": 7,
        "points": "0",
        "display_name": "gjg_8",
        "country": "eu"
    }
]
```

<b>GET /user/profile/{user_guid}:</b> You can get user data by user GUID.<br />
Sample Response:
```
{
    "user_id": "a7f3ed72-84f5-4adc-a16b-ccad82611474",
    "display_name": "player1",
    "points": "280",
    "rank": 2
}
```

<b>POST /user/create:</b> You can create a new user. New user will be ranked as the last automatically.<br />
Sample Response:
```
{
    "user_id": "f16743ed-b70d-4f5e-bb84-2482b53da12c",
    "display_name": "player2",
    "points": "0",
    "rank": 8
}
```

<b>POST /score/submit:</b> You can submit a score worth for an existing user. This score submission affects the rank orders.<br />
Sample Response:
```
{
    "score_worth": "15",
    "user_id": "a666c433-666c-498e-9539-200d54917666",
    "timestamp": 1592762472.153
}
```