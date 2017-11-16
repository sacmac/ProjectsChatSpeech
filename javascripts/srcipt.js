function synthesizedData(){
  console.log("HIII");
  $.ajax({
    type: "GET",
    url: "/synthesis",
    success: function(response){
      console.log(response);
    } 
  });
}