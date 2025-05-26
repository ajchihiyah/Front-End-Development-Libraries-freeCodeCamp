$(document).ready(function() {
	
	function getQuote(){
		$.ajax({
			url:'https://api.quotable.io/random',
			type:'GET',
			dataType:'json',
			success:function(data){
				$("#text").html('"'+data.content+'"');
				$("#author").html(data.author);
				$("a.twitter-share-button").attr("data-text",data.quote);
				$("#text,#author").addClass('animated bounceInLeft');
				$("#text,#author").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				$("#text,#author").removeClass('animated bounceInLeft');
				});
			},
		});
	}
	
  getQuote();
	  $("#new-quote").click(function() {
		  getQuote();
	  });
	  
    $("#tweet-quote").click(function() {
		  var curQuote=$("#text").html();
		  var curAuthor=$("#author").html();
		  var url="http://www.twitter.com/intent/tweet?text=" + encodeURIComponent(curQuote+"\n"+curAuthor);
		  window.open(url)
	  });
});