# getWeather

getWeather is a an app that retrieves a live weather data from anywhere in the world and displays it in a sleak, easy-to-read weather report. 

## Technologies Used

getWeather is built using vanilla Javascript, HTML, and CSS. It also uses the [Giphy API](https://developers.giphy.com/) to retrieve gifs, and the [OpenWeather API](https://openweathermap.org/current) for current weather data.

## Highlights


### Weather Reports

getWeather displays current weather data in a user-friendly format. To avoid information overload, getWeather displays the most relevant information including current temperature, a clear description of the weather (i.e. broken clouds, sunny, rainy, windy), and the highest and lowest daily temperatures.

### City Search

There are two ways to search for a city in getWeather – using a city name, or a zip code. 

Due to the Open Weather servers existing in multiple places around the world (and even multiple in a given country), it is simple process to find the city most local to you with just name. For example, I live in Concord, California and even though there might be several Concords in the USA, Open Weather retrieves the weather data for the closest Concord to me.

### Backgrounds Gifs

A unique feature of getWeather is how the background displays gifs that are relevant to each weather report. This is a feature that calls the Giphy API with keywords including 'weather' appended with the current city's name and the current weather description. Using this method has the potential to retrieve background gifs that are incredibly on point with the weather report. This can be seen in the San Francisco and London demonstrations. Nonetheless, this is a feature that depends enourmously on the randomness of Giphy's search algorithm. Because of this, many of the background gifs tend to be humourous, almost relevant, or entirely irerelevant. Admittedly while imperfect, this aspect of getWeather gives it the characteristic of being alive and everchanging. Every visit is different to some degree.


