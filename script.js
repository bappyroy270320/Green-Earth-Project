
const categoriesContainer = document.getElementById("categoriesContainer");
const treesContainer = document.getElementById("treesContainer");
const loadingSpinner = document.getElementById("loadingSpinner");
const allTreesbtn = document.getElementById("allTreesBtn");

function showLoading(){
    loadingSpinner.classList.remove("hidden");
    treesContainer.innerHTML = "";
}

function hideLoading(){
    loadingSpinner.classList.add("hidden");
    treesContainer.innerHTML = "";
}




async function loadCategories(){

const res = await fetch("https://openapi.programming-hero.com/api/categories");
const data = await res.json();
console.log(data);
console.log(categoriesContainer);
data.categories.forEach((category) => {
    console.log(category);
    const btn = document.createElement("button");
    btn.className = "btn btn-outline w-full";
    btn.textContent = category.category_name;
    btn.onclick = () => selectCategroy(category.id, btn);
    categoriesContainer.appendChild(btn);
});

}

async function selectCategroy(categoryId, btn){
    console.log(categoryId, btn);
    showLoading();
    const allButtons = document.querySelectorAll("#categoriesContainer button, #allTreesbtn");
    console.log(allButtons);
    allButtons.forEach(btn => {
        btn.classList.remove("btn-primary");
        btn.classList.add("btn-outline");
    });
    btn.classList.add("btn-primary");
    btn.classList.remove("btn-outline");

    const res = await fetch(
        `https://openapi.programming-hero.com/api/category/${categoryId}`,
        );
    const data = await res.json();
    console.log(data);
    displayTrees(data.plants);
       
}

allTreesbtn.addEventListener("click", () => {
      const allButtons = document.querySelectorAll("#categoriesContainer button, #allTreesbtn");
    console.log(allButtons);
    allButtons.forEach(btn => {
        btn.classList.remove("btn-primary");
        btn.classList.add("btn-outline");
    });
    btn.classList.add("btn-primary");
    btn.classList.remove("btn-outline");
})

async function loadTrees(){
    showLoading();
    const res = await fetch("https://openapi.programming-hero.com/api/plants")
    const data = await res.json();
    hideLoading();
    displayTrees(data.plants);
    
}

function displayTrees(trees){
    console.log(trees);
    trees.forEach(trees => {
        console.log(trees);
        const card = document.createElement("div")
        card.className = "card bg-white shadow-sm";
        card.innerHTML = `
                        <figure>
                            <img src= "${trees.image}"
                                alt="${trees.name}" title="${trees.name}" class = "h-48 w-full object-cover"/>
                        </figure>
                        <div class="card-body shadow-sm rounded-md">
                            <h2 class="card-title">${trees.name}</h2>
                            <p class="line-clamp-2">A card component has a figure, a body part, and inside body there are title and actions
                                parts</p>
                                <div class="badge badge-success badge-outline">${trees.category}</div>
                            <div class="flex justify-between">
                                <h2 class="font-bold text-xl text-[#4ade80]">$${trees.price}</h2>
                                <button class="btn btn-primary bg-[#4ade80]">Cart</button>
                            </div>
                        </div>
        `

        treesContainer.appendChild(card);
        
        

    });

}

loadCategories();
loadTrees();