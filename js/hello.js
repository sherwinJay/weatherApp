$(document).ready(function() {
//check if sunny, cloudy, thunderstorm, rain, snow for weather icons
//change temp to celsius to farenheit when click...vice versa!!!
 var d = new Date(),
     hour= d.getHours(),
     $body = $("body");
 if( hour < 18){
 $($body).css({
  "background" : "url(css/images/skyNew.jpg) center no-repeat"
 });
}else{
  $($body).css({
   "background" : "url(css/images/space-the-stars.jpg) center no-repeat"
  });
}
});
 weather();
  function weather(){
       if(navigator.geolocation){
       navigator.geolocation.getCurrentPosition(function(position) {
      $.ajax({
           url: "https://simple-weather.p.mashape.com/weatherdata?lat=" + position.coords.latitude + "&lng=" + position.coords.longitude,
           type: "GET",
           data: {},
           dataType: "json",
           success: function(data){
             var forecast = '<div class="forecast cfix">',
                 currentWeather = '<div class="current-weather">',
                 weatherContainer = document.getElementById("weatherContainer"),
                 currentContainer = document.getElementById("currentContainer"),
                 currentCondition = data.query.results.channel.item.condition.text,
                 condition,
                 conditionImg; 
             for(var i = 0; i <= 4; i++){
         condition = data.query.results.channel.item.forecast[i].text; 
         if(condition.includes("Sunny") || currentCondition.includes("Sunny")){
         conditionImg = '<img src="css/images/sunny.png" />';
         }else if(condition.includes("Clear")|| currentCondition.includes("Clear")){
         conditionImg = '<img src="css/images/nightr-icon.png" />';
         }else if(condition.includes("Cloudy") || currentCondition.includes("Cloudy")){
         conditionImg = '<img src="css/images/cloudy.png" />';
         }else if(condition.includes("Thunderstorms")|| currentCondition.includes("Thunderstorms")){
         conditionImg = '<img src="css/images/thunderstorm.png" />';
         }else if(condition.includes("Showers") || currentCondition.includes("Showers")){
          conditionImg = '<img src="css/images/rain.png" />' 
         }
              if(i == 0){
             currentWeather += '<div class="location">' + data.query.results.channel.location.city + ", " + data.query.results.channel.location.country + '</div>'
               + '<div class="imgContainer">' + conditionImg + '</div>'
               + '<p class="temp">' + data.query.results.channel.item.condition.temp + "&#176;" + " C" + '</p>'
               + '<p class="current-date">' + data.query.results.channel.item.forecast[0].date + '</p>'
               + '<p class="condition">Condition: ' + data.query.results.channel.item.condition.text + '</p>';
              }else{
    forecast += '<div class="weatherBox col-left">' 
      + '<div  class="day' + i + '">' + data.query.results.channel.item.forecast[i].day + '</div>' 
      + '<div class="date' + i + '">' + data.query.results.channel.item.forecast[i].date + '</div>' 
      + '<div class="icon">' + conditionImg + '</div>'
      + '<div class="temp' + i + '">' + data.query.results.channel.item.forecast[i].high + " C" + ' | ' + data.query.results.channel.item.forecast[i].low + " C" + '</div>' 
      + '<div class="condition' + i + '">' + data.query.results.channel.item.forecast[i].text + '</div>' + '</div>' ;
              }
             }
        currentWeather += '</div>';    
  forecast += '</div>';
  currentContainer.innerHTML = currentContainer.innerHTML + currentWeather;
  weatherContainer.innerHTML = weatherContainer.innerHTML + forecast;
             
           },
            beforeSend: function(xhr) {
           xhr.setRequestHeader("X-Mashape-Key", "n2JY9NePqSmshITplIN7rdB7kMEkp1BeG00jsnd3uVIHwON3AK"); // Enter here your Mashape key
          }
         });
  });
     
   }
  }

