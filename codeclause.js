document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const recipesContainer = document.getElementById('recipes');
    const recipeIdInput = document.getElementById('recipe-id');
    const titleInput = document.getElementById('title');
    const ingredientsInput = document.getElementById('ingredients');
    const imageInput = document.getElementById('image');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const id = recipeIdInput.value;
        const title = titleInput.value;
        const ingredients = ingredientsInput.value;
        const image = imageInput.value;

        const recipe = { id: id || new Date().getTime().toString(), title, ingredients, image };

        saveRecipe(recipe);
        renderRecipes();
        form.reset();
    });

    function saveRecipe(recipe) {
        let recipes = getRecipes();
        const index = recipes.findIndex(r => r.id === recipe.id);
        if (index > -1) {
            recipes[index] = recipe;
        } else {
            recipes.push(recipe);
        }
        localStorage.setItem('recipes', JSON.stringify(recipes));
    }

    function getRecipes() {
        return JSON.parse(localStorage.getItem('recipes')) || [];
    }

    function renderRecipes() {
        recipesContainer.innerHTML = '';
        const recipes = getRecipes();
        recipes.forEach(recipe => {
            const recipeEl = document.createElement('div');
            recipeEl.classList.add('recipe');

            recipeEl.innerHTML = `
                <h3>${recipe.title}</h3>
                <img src="${recipe.image}" alt="${recipe.title}">
                <p>${recipe.ingredients}</p>
                <button onclick="editRecipe('${recipe.id}')">Edit</button>
                <button onclick="deleteRecipe('${recipe.id}')">Delete</button>
            `;

            recipesContainer.appendChild(recipeEl);
        });
    }

    renderRecipes();
});

function editRecipe(id) {
    const recipes = JSON.parse(localStorage.getItem('recipes'));
    const recipe = recipes.find(r => r.id === id);
    document.getElementById('recipe-id').value = recipe.id;
    document.getElementById('title').value = recipe.title;
    document.getElementById('ingredients').value = recipe.ingredients;
    document.getElementById('image').value = recipe.image;
}

function deleteRecipe(id) {
    let recipes = JSON.parse(localStorage.getItem('recipes'));
    recipes = recipes.filter(recipe => recipe.id !== id);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    document.getElementById('recipes').innerHTML = '';
    recipes.forEach(renderRecipe);
    location.reload();
}