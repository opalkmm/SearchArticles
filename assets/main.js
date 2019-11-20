$(document).ready(function() {
  // my api key 0THSXgWyTAwSSKdZQk5O0Kgs4b4oxAT2

  // add click submit listener
  // capture user input value in the search term field
  // store API api plus the input
  $(document).on("click", "#search-submit", function(e) {
    e.preventDefault();
    console.log("Handler for .click() called.");

    //get search term input
    var userInput = document.getElementById("search-input").value;
    console.log(userInput);

    //get numbers of record from drop down input
    var r = document.getElementById("record-input");
    //get the value from the 'value'
    var rec = r.options[r.selectedIndex].value;
    //this is the same thing in jQuery $("#elementId :selected").val();
    //check if the value goes through
    console.log(rec);

    //value from year
    var sYear = document.getElementById("startYear-input").value;
    var eYear = document.getElementById("endYear-input").value;
    console.log(sYear);
    console.log(eYear);

    if (!sYear) {
      sYear = "1900";
    } else {
      sYear = document.getElementById("startYear-input").value;
    }
    if (!eYear) {
      eYear = "2019";
    } else {
      eYear = document.getElementById("endYear-input").value;
    }
    sYear = sYear + "0101";
    eYear = eYear + "1231";
    //&begin_date=20120101&end_date=20121231

    var queryURL =
      "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" +
      userInput +
      "&begin_date=" +
      sYear +
      "&end_date=" +
      eYear +
      "&api-key=0THSXgWyTAwSSKdZQk5O0Kgs4b4oxAT2";

    //  CORS issue with $.ajax()
    $.get(queryURL).then(function(data) {
      //get data from response.docs
      var articles = data.response.docs;
      var meta = data.response.meta;
      console.log(meta);

      console.log(articles);
      $("#searchResults").empty();

      for (var i = 0; i < rec; i++) {
        var headline = i + 1 + "." + articles[i].headline.main;
        var author = articles[i].byline.original;
        var section = "Section: " + articles[i].section_name;
        var pubdate = "Published: " + articles[i].pub_date;
        var weburl = articles[i].web_url;

        console.log(author);

        var p = $("<h4>").text(headline);
        var authorp = $("<p>").text(author);
        var sectionp = $("<p>").text(section);
        var pubdatep = $("<b>").text(pubdate);
        var weburlp = "<br><a href=" + weburl + ">" + weburl + "</a>" + "<hr>";

        $("#searchResults").append(p);
        $("#searchResults").append(authorp);
        $("#searchResults").append(sectionp);
        $("#searchResults").append(pubdatep);
        $("#searchResults").append(weburlp);
 
    
    }

      
      $(document).on("click", "#clear", function(e) {
        e.preventDefault();

        $("#searchResults").empty();
        console.log("clear clicked");
      });
    });
  });    
  
  
//   var forms = document.getElementsByClassName("needs-validation");
//       // Loop over them and prevent submission
//       var validation = Array.prototype.filter.call(forms, function(form) {
//         form.addEventListener("submit", function(event) {
//           if (form.checkValidity() === false) {
//             event.preventDefault();
//             event.stopPropagation();
//           }
//           form.classList.add('was-validated');
// }, false); 
      // });

      
  /* <h5>" + byline.original + "</h5>");
"<h5>Section: " + section + "</h5>"
<h5>" + article.pub_date + "</h5>"
a href='" + article.web_url + "'>" + article.web_url + "</a>" */
});
