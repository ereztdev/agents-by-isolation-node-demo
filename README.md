# Agents Isolation Finder - BE
Hi, this is the back end demo.

## Objectives
**Part 1:** 
Endpoint: GET /countries-by-isolation
An isolated agent is defined as an agent that participated in a single mission.
Implement an algorithm that finds the most isolated country (the country with the highest degree of isolation).
For the sample input (see below) input:
Brazil has 1 isolated agent (008) and 2 non-isolated agents (007, 005)
Poland has 2 isolated agents (011, 013) and one non-isolated agent (005)
Morocco has 3 isolated agents (002, 009, 003) and one non-isolated agent (007)

So the result is Morocco with an isolation degree of 3.

**Part 2:**

Find the closest and farthest missions from a specific address 
	(you can use Google API for this)

Endpoint: POST /find-closest

# [SAMPLE DATA](https://pastebin.com/zQEx4uKH)

Please follow the following steps:
## Project setup
>This demo assumes you have the lates Node installed
 if not, [Download It](https://nodejs.org/dist/v10.15.2/node-v10.15.2-x64.msi).
 
1. `git clone` this repo, or download it to your local folder.
2. run ```npm install```
3. You'll need to setup your `.env` and include the key `GOOGLE_API_KEY=<your-key>`
4. run `nodemon index.js` 
>If all went good and nothing exploded, you now have a live server on  `http://localhost:3000`
#### ENDPOINTS
##### [countries-by-isolation](http://localhost:3000/countries-by-isolation)
Provides the most isolated country
##### Params
- **`all:(bool)true`** - Will send all agents
- **`all:null`** - Will send The highest isolated country
##### [find-closest](http://localhost:3000/find-closest)
##### Params
- **`target_location:(string)'city, country'`** - Returns shortest and longest distances from 

- **`target_location:{null / erroneous / Error}`** - Error (`status:422`)

## Run this project
>Please note that I am using port 3000 for back end.

1. Run ```yarn serve```

### Click Here for [-= Complementary Vue Project =-](https://bitbucket.org/yearzero/tikal-vue-demo/src/master/)

