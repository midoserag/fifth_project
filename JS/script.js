

let allRecipes = [];
let recipeDetails = {};


let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");


async function getRecipes(term)
{
    let apiResponse = await fetch(`https://forkify-api.herokuapp.com/api/search?&q=${term}`);
    allRecipes = await apiResponse.json();
    allRecipes = allRecipes.recipes;
    displayRecipes();
}


function displayRecipes()
{
    let cartoona = '';
    for (let i = 0 ; i < allRecipes.length ; i++)
    {
        cartoona += `
        <div class="col-md-4">
            <div class="recipe" onclick = "getRecipesDetails(${allRecipes[i].recipe_id})" >
            <img class="w-100 img-fluid" src="${allRecipes[i].image_url}" alt="">
            <h3 class="color-mine py-1">${allRecipes[i].title}</h3>
            <p>${allRecipes[i].publisher}</p>
            </div>
        </div>
        `
    }

    document.getElementById("recipesRow").innerHTML = cartoona;
}


async function getRecipesDetails(id)
{
    let apiResponse = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
    recipeDetails = await apiResponse.json();
    recipeDetails = recipeDetails.recipe;
    displayRecipeDetails();
    
}


function displayRecipeDetails()
{
    let cartoona =` <div class="recipedetails py-3">
    <h2 class="color-mine py-1">${recipeDetails.title}</h2>
    <img src="${recipeDetails.image_url}" class="w-100" alt="">
    <ul class="fa-ul py-1">`;

    for (let x of recipeDetails.ingredients) {

       cartoona += `<li class="d-flex align-items-center"><span class="fa-li"><i class="fas fa-utensil-spoon"></i></span>${x}</li>`
       
    }
    cartoona += `</ul>
       </div>`;
    
    


    document.getElementById("recipeDetails").innerHTML = cartoona;
}






searchBtn.addEventListener("click" , function(){
    
    getRecipes(searchInput.value);

})

