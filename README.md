# Guardian Bubble

Stay safe in the liberal guardian bubble.

[http://guardian-bubble.herokuapp.com/](http://guardian-bubble.herokuapp.com/)

## Seting up the application

Run `npm install`

Sensitive information such as API keys are stored in the `.env` file when developing locally. This file needs to contain:

```
GUARDIAN_API_KEY=key
INDICO_API_KEY=key
WEATHER_API_KEY=key
```
To allow the app to access:
[The Guardian API](https://content.guardianapis.com)
[Indico API](https://indico.io/docs)
[Open Weather Map](http://api.openweathermap.org)

## Running the application

Run `node server.js`

The application will now be available at [http://localhost:5000](http://localhost:5000/)

## Deploying the application

The application is hosted on Heroku and was set up with [this guide](https://devcenter.heroku.com/articles/deploying-nodejs)

To deploy to Heroku run `git push heroku master`. Which will deploy the version of the code on master to Heroku and [http://guardian-bubble.herokuapp.com/](http://guardian-bubble.herokuapp.com/)