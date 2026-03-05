

async function loadCategories(){
    fetch("https://openapi.programming-hero.com/api/categories")
.then((res) => res.json())
.then((data)=> {console.log(data);

})
.catch((e) => console.log(e));

const res = await fetch("https://openapi.programming-hero.com/api/categories");
console.log(res);

}

loadCategories();