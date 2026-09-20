
// laver et objekt for kokken med hans informationer
const chef =
{
    name: "Mads Jensen",
    tag: "professional chef",
    bio: "Mads Jensen is one of Denmark’s most celebrated chefs, known for his refined approach to different cuisines. With a deep respect for nature, seasonal ingredients and thoughtful craftsmanship, he creates elegant dishes that combine simplicity, creativity and exceptional flavour.",
    image: "assets/img/chefs/mads.avif",
    followers: 20000,
    recipes: 50,
    tipsAndAdvice: 30,
    featuredBrands: 8,
};

// henter chefBio fra min html fil, og gennnem innerHTML indsætter jeg informationerne fra objektet chef. 
document.querySelector(".chefBio").innerHTML = `

<div class="chefprofile">
<div class="chefImage">
    <img src="${chef.image}" alt="${chef.name}">
</div>
<div class="chefInfo">
    <h1>${chef.name}</h1>
    <p class="chefTag">${chef.tag}</p>
    <p class="chefBioText">${chef.bio}</p>
    <button class="followButton"> <i class="fa-solid fa-circle-plus fa-sm" style="color: rgb(255, 255, 255);"></i>Follow</button> 
    <button class="messageButton"> <i class="fa-regular fa-message" style="color: rgb(255, 255, 255);"></i> Message me</button>
    <ul class="chefStats">
        <li><strong>${chef.followers}</strong> Followers</li>
        <li><strong>${chef.recipes}</strong> Recipes</li>
        <li><strong>${chef.tipsAndAdvice}</strong> Tips & Advice</li>
        <li><strong>${chef.featuredBrands}</strong> Featured Brands</li>
    </ul>
</div>
</div>
`
// Laver et array med flere objekter, så vi længere nede kan lave en funktion.

const chefrecipes = [
    {
        image: './assets/img/opskrifter/mexican_16x9.jpg',
        title: 'Lasagne al forno',
        description: 'This is Marys classic lasagne recipe which has been perfected over the years...',
        time: '2h 30min',
        cuisine: 'Italien',
        level: 'Easy',
         link: 'opskrift.html'
    },
    {
        image: './assets/img/opskrifter/easy_spaghetti_bolognese_93639_16x9.jpg',
        title: 'Easy spaghetti bolognese',
        description: 'Everyone needs a basic spaghetti bolognese recipe that still tastes great...',
        time: '1h ',
        cuisine: 'Italien',
        level: 'Easy'
    },
    {
        image: './assets/img/opskrifter/fluffyamericanpancak_74828_16x9.jpg',
        title: 'Fluffy American Pancakes',
        description: 'This easy American pancake recipe makes really light and fluffy pancakes that are great...',
        time: '40min ',
        cuisine: 'American',
        level: 'Easy'
    },
    {
        image: './assets/img/opskrifter/classiccottagepie_90765_16x9.jpg',
        title: 'Easy cottage pie',
        description: 'James Martins easy cottage pie recipe is a family favourite...',
        time: '40min ',
        cuisine: 'British',
        level: 'Easy'
    },
    {
        image: './assets/img/opskrifter/okonomiyaki.jpg',
        title: 'Okonomiyaki',
        description: 'Okonomiyaki are traditional Japanese fritter-like pancakes. Served with okonomiyaki sauce, Japanese mayonnaise or your favourite hot sauce....',
        time: '30 min ',
        cuisine: 'Japanese',
        level: 'Easy'
    },

    {
        image: './assets/img/opskrifter/dubai-style_chocolate.jpg',
        title: 'Dubai chocolate',
        description: 'Impress your guests with these chocolate, pistachio and kataifi pastry trifles – all the vibes of the viral chocolate made simply at home. This decadent dessert is ideal for making over the festive period....',
        time: '30 min ',
        cuisine: 'Emirati',
        level: 'Easy'
    },
    {
        image: './assets/img/opskrifter/nordic_smorrebrod.jpg',
        title: 'Smørrebrød',
        description: 'Eaten widely in Nordic countries, smørrebrød is an open-faced sandwich. You can dress them up as much as you like, here with raw and cooked asparagus, horseradish cream and västerbottensost, a Swedish cheese...',
        time: '30 min ',
        cuisine: 'Nordic',
        level: 'Easy'
    },
    {
        image: './assets/img/opskrifter/singapore_vermicelli.jpg',
        title: 'Vermicelli',
        description: 'This speedy Singapore prawn noodle stir fry is so full of flavour, you’ll definitely want it in your weeknight rotation....',
        time: '30min ',
        cuisine: 'Japanese',
        level: 'Easy'
    },

    {
        image: './assets/img/opskrifter/tiramisu.jpg',
        title: 'Tiramisu',
        description: 'This easy no-cook dessert is perfect for dinner parties as it’s quick to put together and only improves in the fridge....',
        time: '2h ',
        cuisine: 'Italian',
        level: 'Easy'
    },
];

// Variabler til favoritfunktionen
const outline = "m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z";
const filled = "m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z";

// vi laver vores funktion, og i den laver en article, som skal indenholde det vi har specifeseret længere oppe i vores array. 
function createRecipeCard(recipe) {
    const article = document.createElement('article');

    const { title, description, time, cuisine, level, link } = recipe;

    // variabel for at indsætte link til opskrift, hvis opskrift har link
    const indhold = `
    
        <div class="funktions">
            <div class="tags">
                <button class="time">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#F3F1EC"><path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"/></svg>
                    ${time}
                </button>
                <button class="cuisine">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#F3F1EC"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-7-.5-14.5T799-507q-5 29-27 48t-52 19h-80q-33 0-56.5-23.5T560-520v-40H400v-80q0-33 23.5-56.5T480-720h40q0-23 12.5-40.5T563-789q-20-5-40.5-8t-42.5-3q-134 0-227 93t-93 227h200q66 0 113 47t47 113v40H400v110q20 5 39.5 7.5T480-160Z"/></svg>
                    ${cuisine}
                </button>
                <button class="level">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#F3F1EC"><path d="M360-400h80v-200h-80v200Zm-160-60q-46-23-73-66.5T100-621q0-75 51.5-127T278-800q12 0 24.5 2t24.5 5q25-41 65-64t88-23q48 0 88 23t65 64q12-3 24-5t25-2q75 0 126.5 52T860-621q0 51-27 94.5T760-460v220H200v-220Zm320 60h80v-200h-80v200Zm-240 80h400v-189l44-22q26-13 41-36.5t15-52.5q0-42-28.5-71T682-720q-11 0-20 2t-19 5l-47 13-31-52q-14-23-36.5-35.5T480-800q-26 0-48.5 12.5T395-752l-31 52-48-13q-10-2-19.5-4.5T277-720q-41 0-69 29t-28 71q0 29 15 52.5t41 36.5l44 22v189Zm-80 80h80v80h400v-80h80v160H200v-160Zm280-80Z"/></svg>
                    ${level}
                </button>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" class="favorite" fill="#BB271A"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/></svg>
        </div>
        <div class="recipe-text">
            <div class="top">
                <h3>${title}</h3>
                <div class="stars">
                    <svg class="star fullStar" viewBox="0 0 640 640" aria-hidden="true"><path d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z"/></svg>
                    <svg class="star fullStar" viewBox="0 0 640 640" aria-hidden="true"><path d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z"/></svg>
                    <svg class="star fullStar" viewBox="0 0 640 640" aria-hidden="true"><path d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z"/></svg>
                    <svg class="star fullStar" viewBox="0 0 640 640" aria-hidden="true"><path d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z"/></svg>
                    <svg class="star emptyStar" viewBox="0 0 640 640" aria-hidden="true"><path d="M320.1 32C329.1 32 337.4 37.1 341.5 45.1L415 189.3L574.9 214.7C583.8 216.1 591.2 222.4 594 231C596.8 239.6 594.5 249 588.2 255.4L473.7 369.9L499 529.8C500.4 538.7 496.7 547.7 489.4 553C482.1 558.3 472.4 559.1 464.4 555L320.1 481.6L175.8 555C167.8 559.1 158.1 558.3 150.8 553C143.5 547.7 139.8 538.8 141.2 529.8L166.4 369.9L52 255.4C45.6 249 43.4 239.6 46.2 231C49 222.4 56.3 216.1 65.3 214.7L225.2 189.3L298.8 45.1C302.9 37.1 311.2 32 320.2 32zM320.1 108.8L262.3 222C258.8 228.8 252.3 233.6 244.7 234.8L119.2 254.8L209 344.7C214.4 350.1 216.9 357.8 215.7 365.4L195.9 490.9L309.2 433.3C316 429.8 324.1 429.8 331 433.3L444.3 490.9L424.5 365.4C423.3 357.8 425.8 350.1 431.2 344.7L521 254.8L395.5 234.8C387.9 233.6 381.4 228.8 377.9 222L320.1 108.8z"/></svg>
                    <p class="star_number">4.0</p>
                </div>
            </div>
            <p>${description}</p>
        </div>
    `;

       if (link) {
        // Opskriften får et link
        article.innerHTML = `<a href="${link}" class="recipe-card-link">${indhold}</a>`;
    } else {
        // Intet link angivet -> vis kortet uden link, som normalt
        article.innerHTML = indhold;
    }

    // Ænder baggrundsbilledet for hver article
    const funktions = article.querySelector('.funktions');
    if (funktions) {
        funktions.style.backgroundImage = `url("${recipe.image}")`;
    }

    return article;
}

// Render opskrifter
function renderRecipes() {
    const recipeCards = document.querySelector('#chefRecipeCards');
    if (!recipeCards) return;

    // vi gør det synligt for brugeren, med appendchild at få vist opskrifterne. 
    chefrecipes.forEach((recipe) => {
        recipeCards.appendChild(createRecipeCard(recipe));
    });
}

// kilde: https://www.w3schools.com/js/js_events_load.asp, domcontentloaded, hjælper til at vente på at html siden er klar. 
document.addEventListener('DOMContentLoaded', renderRecipes);


//laver en if/else selection på hjerte ikonet, så den kan blive udfyldt
document.addEventListener('click', function (event) {
    const favorite = event.target.closest('.favorite');
    if (!favorite) {
        return;
    }

    const path = favorite.querySelector('path');
    const alreadyFilled = favorite.classList.contains('active');

    if (alreadyFilled) {
        path.setAttribute('d', outline);
        favorite.classList.remove('active');
    } else {
        path.setAttribute('d', filled);
        favorite.classList.add('active');
    }
});

// brands array
const brands = [{
    brandname: 'Savernake knives',
    brandbio: 'If youre looking for high-quality knives, I would recommend the brand savernake. They are well known for their durability, quality materials, and reliable performance',
    image: 'assets/img/brands/knives_unsplash.jpg',
    position: '70% center',

},
{
    brandname: 'Le muse',
    brandbio: 'If youre looking for high-quality cast iron pot, I would recommend the brand le muse. They are well known for their durability, quality materials, and reliable performance',
    image: 'assets/img/brands/muse.jpg',
    position: 'center 85%',
},
]
//laver en function
function createBrandCard(brand) {
    const article = document.createElement('article');
    article.classList.add('brand-card');

    const { brandname, brandbio, image, position } = brand;

    article.innerHTML = `
     <div class="brand-image"></div>
        <div class="tekst">
            <h3>${brandname}</h3>
            <div class="brandInfo">
            <p>${brandbio}</p>
             <button class="visitWebsite"> <i class="fa-solid fa-up-right-from-square" style="color: rgb(255, 255, 255);"></i>Visit
                    website</button>
                    </div>
        </div>
    `;

    // sætter style regleer på .brand-image, så det bliver et baggrundsbillede og ændring af position. 
    article.querySelector('.brand-image').style.backgroundImage = `url("${image}")`;
    article.querySelector('.brand-image').style.backgroundPosition = position || 'center';



    return article;
}
// Render brands
function renderbrands() {
    const brandCards = document.querySelector('.chefBrandsCards');
    if (!brandCards) return;

    brands.forEach((brand) => {
        brandCards.appendChild(createBrandCard(brand));
    });
}

document.addEventListener('DOMContentLoaded', renderbrands);




// chefs array

const chefs = [
    {
        navn: 'Mads Jensen',
        image: 'assets/img/chefs/mads.avif',
        rolle: 'Professionel chef',
    },
    {
        navn: 'Xiaomei Lee',
        image: 'assets/img/chefs/Xiaomei.avif',
        rolle: 'Professionel chef',
    },
    {
        navn: 'Antonio Devicienti',
        image: 'assets/img/chefs/antonio.avif',
        rolle: 'Professionel chef',
    },
    {
        navn: 'Sami Zayn',
        image: 'assets/img/chefs/sami.avif',
        rolle: 'Professionel chef',
    },
    {
        navn: 'Sophie Turner',
        image: 'assets/img/chefs/sophie.avif',
        rolle: 'Amateur cook',
    },
    {
        navn: 'Adam Henderson',
        image: 'assets/img/chefs/adam.avif',
        rolle: 'Amateur cook',
    }
];

// Laver chef card
function createChefCard(chef) {
    const article = document.createElement('article');
    article.classList.add('chef-card');

    const { navn, image, rolle } = chef;

    //anvender if/else for at kunne skelne mellem pro.chef og am.cook
    if (chef.rolle === 'Professionel chef') {
        article.innerHTML = `
              <div class="tekst">
            <h3>${navn}</h3>
            <div class="bottom">
                <p class="professionel">${rolle}</p>
                <button>Follow <span><svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="20px" fill="#4D8C75"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg></span></button>
            </div>
        </div>
    `;

    } else {
        article.innerHTML = `
             <div class="tekst">
            <h3>${navn}</h3>
            <div class="bottom">
                <p class="amateur">${rolle}</p>
                <button>Follow <span><svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="20px" fill="#4D8C75"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg></span></button>
            </div>
        </div>
    `;
    }

    // Sæt chefens billede som baggrund på selve kortet,
    // ligesom .funktions gør det for opskrift-cards
    article.style.backgroundImage = `url("${image}")`;

    return article;
}

// Render chefs
function renderChefs() {
    const chefCards = document.querySelector('.otherChefsCards');
    if (!chefCards) return;

    chefs.forEach((chef) => {
        chefCards.appendChild(createChefCard(chef));
    });

}


document.addEventListener('DOMContentLoaded', renderChefs);

