#Tikal Agents - BE
Hi, this is the back end demo.

Please follow the following steps:
## Project setup
>This demo assumes you have the lates Node installed
 if not, [Download It](https://nodejs.org/dist/v10.15.2/node-v10.15.2-x64.msi).
 
1. `git clone` this repo, or download it to your local folder.
2. run ```npm install```
3. You'll need to setup your `.env` and include the key `GOOGLE_API_KEY=<your-key>`
4. run `nodemon index.js` 
>If all went good and nothing exploded, you now have a live server on  `http://localhost:3000`
####ENDPOINTS
#####[countries-by-isolation](http://localhost:3000/countries-by-isolation)
Provides the most isolated country
#####Header Keys
- **`all:(bool)true`** - Will send all agents
- **`all:null`** - Will send The highest isolated country
#####[find-closest](http://localhost:3000/find-closest)
#####Body Keys (`x-www-form-urlencoded`)
- **`target_location:(string)'city, country'`** - Returns shortest and longest distances from 

- **`target_location:{null / erroneous / Error}`** - Error (`status:422`)

##Run this project
>Please note that I am using port 3000 for back end.

1. Run ```yarn serve```

###Click Here for [-= Complementary Vue Project =-]()

