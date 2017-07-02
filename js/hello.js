$(document).ready(function() {
//check if sunny, cloudy, thunderstorm, rain, snow for weather icons
//change temp to celsius to farenheit when click...vice versa!!!
 var d = new Date();
 var hour= d.getHours();
 var $body = $("body");
 if( hour < 18){
 $($body).css({
  "background" : "url(css/images/skyNew.jpg) center no-repeat"
 });
}else{
  $($body).css({
  "background" : "url(css/images/space-the-stars.jpg) center no-repeat"
 });
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
             var forecast = '<div class="forecast cfix">';
             var weatherContainer = document.getElementById("weatherContainer");
	     var currentCondition = data.query.results.channel.item.condition.text;
	     var condition;
	     var conditionImg; 
		     if(currentCondition.includes("Sunny")){
		     conditionImg = '<img src="css/images/sunny.png" />';
		     }else if(currentCondition.includes("Clear")){
		     conditionImg = '<img src="css/images/nightr-icon.png" />';
		     }else if(currentCondition.includes("Cloudy")){
		     conditionImg = '<img src="css/images/cloudy.png" />';
		     }else if(currentCondition.includes("Thunderstorms")){
		     conditionImg = '<img src="css/images/thunderstorm.png" />';
		     }
             $(".location").html(data.query.results.channel.location.city + ", " + data.query.results.channel.location.country);
	     $(".imgContainer").html(conditionImg);
             $(".temp").html(data.query.results.channel.item.forecast[0].date + " Temp: " + data.query.results.channel.item.condition.temp + " C");
             $(".condition").html(data.query.results.channel.item.condition.text);
       //forecast div
             //try different border color for weatherBox container!!
             //dynamically create div's for weather forecast container 
		
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
		     }
		     
    forecast += '<div class="weatherBox col-left">' 
	    + '<div  class="day' + i + '">' + data.query.results.channel.item.forecast[i].day + '</div>' 
	   // + '<div class="date' + i + '">' + data.query.results.channel.item.forecast[i].date + '</div>' 
	    + '<div class="icon' + i + '">' + conditionImg + '</div>'
	    + '<div class="temp' + i + '">' + " Temp: " + data.query.results.channel.item.forecast[i].high + " C" + '/' + data.query.results.channel.item.forecast[i].low + " C" + '</div>' 
	    + '<div class="condition' + i + '">' + data.query.results.channel.item.forecast[i].text + '</div>' + '</div>' ;
    
             }
  forecast += '</div>';
  weatherContainer.innerHTML = weatherContainer.innerHTML + forecast;
             
           },
            beforeSend: function(xhr) {
           xhr.setRequestHeader("X-Mashape-Key", "n2JY9NePqSmshITplIN7rdB7kMEkp1BeG00jsnd3uVIHwON3AK"); // Enter here your Mashape key
          }
         });
         //"https://api.apixu.com/v1/current.json?key=ff4fb7b6a2f8452ab7a75833172106&q="
     /**  var url = 'http://api.openweathermap.org/data/2.5/weather?APPID=3fd9e2813ccbfb4090ab569a49b70a82&lat=' + position.coords.latitude + '&lon=' + position.coords.longitude; 
console.log(url);**/
/**$.get(url, function(data){
    $(".location").html(data.location.name + " " +  data.location.region + ", " + data.location.country);
  $(".temp").html(data.current.temp_c + " C");
    	});**/
  });

         
   }
  }

   /** $.ajax({
        url: "http://rest-service.guides.spring.io/greeting"
    }).then(function(data) {
       $('.greeting-id').append(data.id);
       $('.greeting-content').append(data.content);
    });**/
	/**$.get('https://randomuser.me/api/1.1/',function(data){
			$('.name').append(' ' + data.results[0].name.first + ' ' + data.results[0].name.last);
			$('.address').append(' ' +data.results[0].user.location.city + ' ' + data.results[0].user.location.state);
			$('.email').append(' ' +data.results[0].user.email);
			$('.contact').append(' '+data.results[0].user.cell);
		}
	);**/
   /**    if(navigator.geolocation){
       navigator.geolocation.getCurrentPosition(function(position) {
       	var url = "https://api.apixu.com/v1/current.json?key=ff4fb7b6a2f8452ab7a75833172106&q="+position.coords.latitude+','+position.coords.longitude;
    	console.log(url);
    //$(".location").html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
    $.get(url, function(data){
    	$(".location").html(data.location.name);
    	});
  });

   }**/
});
