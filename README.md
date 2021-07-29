# Introduction
Nashville Software School Cohort 46 Capstone - My Food Journal By Yasmeen Cole

<img width="1440" alt="myfoodjobimg" src="https://user-images.githubusercontent.com/72658735/127567841-37b9aba7-073e-475f-bb90-ca32990d11c7.png">


## The Purpose of My Food Journal
The main purpose of My Food Journal application is to help users with gastrointestinal issues document foods that they have eaten for each day.

Oftentimes it can difficult to determine what foods are causing discomfort or flare ups. My Food Journal will make it easier for people who have gastrointestinal issues to document the foods they consume daily and eliminate any foods the user has determined are not good for them.

This application will allow a logged in user to: 
* document their daily meals
* determine which foods trigger gastrointestinal issues
* rate each of their meals
* notate how each meal physically made the user feel after consuming each food item
* notate their daily bowel movements


### Entity Relationship Diagram 

Here is a link to My Food Journal's ERD:

https://dbdiagram.io/d/605a6047ecb54e10c33cecdf


![My Food Journal ERD](https://user-images.githubusercontent.com/72658735/115466470-c50daf80-a1f5-11eb-9368-329265745113.png)


### Figma Mockup

Here is a link to My Food Journal's Mockup on Figma:

https://www.figma.com/file/DaxVj0U7sK7rcXkXZIUVsG/Capstone-My-Food-Journal?node-id=0%3A1



<img width="830" alt="Foods Mockup" src="https://user-images.githubusercontent.com/72658735/115468059-1c148400-a1f8-11eb-9f79-f825fae555b9.png">


<img width="832" alt="Food Details Mockup" src="https://user-images.githubusercontent.com/72658735/115468311-85949280-a1f8-11eb-8998-acd9fd1a2dad.png">

### Tech Stack
* React JS
* React Bootstrap
* JSON Server
* CSS
* HTML

### Setting Up My Food Journal
To run My Food Journal application:

```
git clone git@github.com:yasmeencole/my-food-journal.git
npm install
npm start
```

For My Food Journal API:

```
git clone git@github.com:yasmeencole/food-journal-api.git
```

Link: https://github.com/yasmeencole/food-journal-api

To start the JSON server:

```
json-server -p 8088 -w database.json
```
**Please be advise that no data is available at log in, as all data is user specific.**
