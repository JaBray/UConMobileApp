<!doctype html>
<head>

<meta charset="UTF-8">

<title>Ucon API test Page using JS</title>
  </head>


<body>

<h2>API Responded with: </h2>
<p id="response"></p>
<input type="button" value="Send" onclick="getSchedule()">


<script type="application/javascript">





async function getSchedule(){
var text = '{"players": [2,151,730]}';

//var fetchBody = JSON.parse(text);

console.log("raw text: "+text);
//console.log("json body: "+fetchBody);


fetch("uconAPI.php", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'},
        body: text
      })
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    document.getElementById("response").innerHTML = JSON.stringify(data);
  });

}

  </script>



  </body>

</html>
