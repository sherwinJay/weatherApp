computeHeight(); 

function computeHeight(){
  var windowHeight = function(){
   return $(window).innerHeight();
  }  
 console.log(windowHeight() + "px");
 } 
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
                 currentTemp =  data.query.results.channel.item.condition.temp,
                 degree = "&#176;",
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
             $(".temp").html(currentTemp + degree);
             $(".current-date").html(data.query.results.channel.item.forecast[0].date);
             $(".current-condition").html("Condition: " + data.query.results.channel.item.condition.text 
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
      + '<div class="date">' + data.query.results.channel.item.forecast[i].date + '</div>' 
      + '<div class="icon">' + conditionImg + '</div>'
      + '<div class="temp' + i + '">' + data.query.results.channel.item.forecast[i].high + degree + " C" + ' | ' + data.query.results.channel.item.forecast[i].low + "&#176; C" + '</div>' 
      + '<div class="condition">' + data.query.results.channel.item.forecast[i].text + '</div>' + '</div>' ;
              
             }
forecast += '</div>';
  weatherContainer.innerHTML = weatherContainer.innerHTML + forecast;
             
            $(".tempScale").on("click", "a" , function(e){
             var $this = $(this);
           e.preventDefault();
             //alert($(this).attr("class"));
             if($($this).attr("class") === "farenheit"){
              $($this).closest(".containerWrapper").find(".temp").html((currentTemp * (9/5) + 32) + degree);
             }else{
             $($this).closest(".containerWrapper").find(".temp").html( currentTemp + "&#176;");
             }
            /**
             alert("Hello");**/
           });
             
           },
            beforeSend: function(xhr) {
           xhr.setRequestHeader("X-Mashape-Key", "n2JY9NePqSmshITplIN7rdB7kMEkp1BeG00jsnd3uVIHwON3AK"); // Enter here your Mashape key
          }
         });
  });
     
   }
  }


