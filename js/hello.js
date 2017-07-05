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
                 currentCondition = data.query.results.channel.item.condition.text,
                 currentTemp = data.query.results.channel.item.condition.temp,
                 condition,
                 conditionImg; 
            if(currentCondition.includes("Sunny")){
         conditionImg = '<img src="css/images/sunny.png" />';
         }else if(currentCondition.includes("Clear")){
         conditionImg = '<img src="css/images/nightr-icon.png" />';
         }else if(currentCondition.includes("Cloudy")){
         conditionImg = '<img src="css/images/cloudy.png" />';
         }else if(currentCondition.includes("Thunderstorms")){
         conditionImg = '<img src="css/images/thunderstorm.png" />';
         }else if(currentCondition.includes("Showers") || currentCondition.includes("Rain")){
          conditionImg = '<img src="css/images/rain.png" />' 
         }
             $(".location").html(data.query.results.channel.location.city + ", " + data.query.results.channel.location.country);
             $(".imgContainer").html(conditionImg);
             $(".temp").html(data.query.results.channel.item.condition.temp + "&#176;");
             $(".current-date").html(data.query.results.channel.item.forecast[0].date);
             $(".condition").html("Condition: " + data.query.results.channel.item.condition.text 
                                                + "   Humidity: " + data.query.results.channel.atmosphere.humidity
                                                + "   Visibility: " + data.query.results.channel.atmosphere.visibility);
    
          for(var i = 1; i <= 4; i++){
         condition = data.query.results.channel.item.forecast[i].text; 
         if(condition.includes("Sunny")){
         conditionImg = '<img src="css/images/sunny.png" />';
         }else if(condition.includes("Clear")){
         conditionImg = '<img src="css/images/nightr-icon.png" />';
         }else if(condition.includes("Cloudy")){
         conditionImg = '<img src="css/images/cloudy.png" />';
         }else if(condition.includes("Thunderstorms")){
         conditionImg = '<img src="css/images/thunderstorm.png" />';
         }else if(condition.includes("Showers") || condition.includes("Rain")){
          conditionImg = '<img src="css/images/rain.png" />' 
         }
           
    forecast += '<div class="weatherBox col-left">' 
      + '<div  class="day' + i + '">' + data.query.results.channel.item.forecast[i].day + '</div>' 
      + '<div class="date' + i + '">' + data.query.results.channel.item.forecast[i].date + '</div>' 
      + '<div class="icon">' + conditionImg + '</div>'
      + '<div class="temp' + i + '">' + data.query.results.channel.item.forecast[i].high + "&#176; C" + ' | ' + data.query.results.channel.item.forecast[i].low + "&#176; C" + '</div>' 
      + '<div class="condition' + i + '">' + data.query.results.channel.item.forecast[i].text + '</div>' + '</div>' ;
              
             }
forecast += '</div>';
  weatherContainer.innerHTML = weatherContainer.innerHTML + forecast;
             
            $(".tempScale").on("click", "a" , function(e){
           e.preventDefault();
            $(this).closest.(".containerWrapper").find(".temp");
             alert("Hi");
           });
             
           },
            beforeSend: function(xhr) {
           xhr.setRequestHeader("X-Mashape-Key", "n2JY9NePqSmshITplIN7rdB7kMEkp1BeG00jsnd3uVIHwON3AK"); // Enter here your Mashape key
          }
         });
  });
     
   }
  }


