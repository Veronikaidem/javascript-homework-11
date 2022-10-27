
 let result = document.getElementById('result');
 let filter = document.getElementById('filter');
 let listItems = [];
 
 
 
  function filterData(searchItem) {
    
     listItems.forEach(item => {
        
         if (item.innerText.toLowerCase().includes(searchItem.toLowerCase())){
             item.classList.remove('hide');
         } else {
             item.classList.add('hide');
         }
     })
 }
 
 filter.addEventListener('keyup',function(event) {
   
     filterData(event.target.value)
 })
 
 
 let currentPage = 1;
 let totalpages;
 
 function getUsers(page) {
   fetch("https://reqres.in/api/users?page=" + page, {
     method: "GET",
   })
     .then(function (response) {
       if (response.status !== 200) {
         throw response.status;
       }
       return response.json();
     })
     .then(function (responseData) {
       const fragment = document.createDocumentFragment();
 
       responseData.data.forEach((element) => {
         let li = document.createElement("li");
 
         let p = document.createElement("p");
         p.textContent = `${element.first_name} ${element.last_name}`;
 
         let image = document.createElement("img");
         image.src = element.avatar;
         li.appendChild(image);
         li.appendChild(p);
         fragment.appendChild(li);
       });
 
      
       document.getElementById("list").appendChild(fragment);
       totalpages = responseData.total_pages;
     })
     .catch(function (error) {
       if (error == 404) {
         let p = document.createElement("p");
         p.textContent = "Page not found";
         p.style.color = "red";
         document.getElementById("api").appendChild(p);
       } else if (error == 500) {
         let p = document.createElement("p");
         p.textContent = "Server Error";
         p.style.color = "red";
         document.getElementById("api").appendChild(p);
       }
     });
 }
  document.getElementById('loadmore').addEventListener('click', function(){
     currentPage++;
     getUsers(currentPage)
  })
 
 
  getUsers()