$(window).ready(()=>{
    $('#loading').fadeOut(500);
})
/*** Start of  Open and close the sidebar with open button   ***/
let closeIcon = document.getElementById('closeSideBar');
$(closeIcon ).addClass('d-none');
$('.home-side').css({backgroundColor:'#0D0D0D'});
$('#openSideBar').click(function(){
    let position= $('.home-side').offset().left;   
    let boxWidth = $('.home-side').outerWidth();
    if(position===0){
        $('.home-side').css({left:`-${boxWidth}px`,transition:'all 1s'})
        $('#open').css({left:`0px`,transition:'all 1s'})        
    }else{       
        $('#closeSideBar').removeClass('d-none');
        $('#closeSideBar').addClass('d-block');
        $('#openSideBar').addClass('d-none');
        $('#openSideBar').removeClass('d-block');        
        $('.home-side').css({left:'0px',transition:'all 1s'})
        $('#open').css({left:`${boxWidth}px`,transition:'all 1s'})
        $('.home-side-list ul li a').removeClass('animate__animated animate__fadeOutDownBig animate__delay-200ms');
        $('.home-side-list ul li a').addClass('animate__animated animate__fadeInUpBig animate__delay-200ms');
    }
})
/*** End of Open and close the sidebar with open button   ***/

/*** Start of Close sidebar the sidebar with X button    ***/
$('#closeSideBar').click(function(){
    let boxWidth = $('.home-side').outerWidth();
    $('#openSideBar').addClass('d-block');
    $('#openSideBar').removeClass('d-none');
    $('#closeSideBar').addClass('d-none');
    $('.home-side').css({left:`-${boxWidth}px`,transition:'all 1s'});
    $('#open').css({left:`0px`,transition:'all 1s'})
    $('.home-side-list ul li a').removeClass('animate__animated animate__fadeInUpBig animate__delay-200ms');
    $('.home-side-list ul li a').addClass('animate__animated animate__fadeOutDownBig animate__delay-200ms');
})
/*** End of  Close sidebar the sidebar with X button    ***/

/*** Start of displaying the meals********/
let currentMealList = [];

const mealName = document.getElementById('meal_Name');
document.getElementById('meal_Name').addEventListener('keyup',(e)=>{
    searchAboutMealByName(mealName.value)
})
const mealFirstLetter = document.getElementById('firstLetter');
document.getElementById('firstLetter').addEventListener('keyup',(e)=>{
    searchAboutMealByFirstLetter(mealFirstLetter.value)
})
let mealList=[];

async function searchAboutMealByName(name){
    try {
        if(name.value == ''){
            name ="sal"
            let meals =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
            let data =await meals.json()
            mealList=data.meals;
            currentMealList = data.meals;       
            let cartoona =``;
            for (let i = 0; i < mealList.length; i++) {
                cartoona +=`
                <div class="col-md-3  rounded rounded-3">
                    
                        <img src="${mealList[i].strMealThumb}" alt="lime" id="${mealList[i].idMeal}" class="img-fluid">
                    
                    <div class="meal-layer" onclick="GetMealDetailsById(${mealList[i].idMeal})">
                        <h3>${mealList[i].strMeal}</h3>
                    </div>
                </div> `         
        }     
        document.querySelector('#mealsList .row').innerHTML=cartoona;
        $('.meal-layer').click(()=>{       
            $('#search').removeClass('show');
            $('#mealDetails').addClass('show');
        })      
        }else{
            let meals =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
            let data =await meals.json();
            mealList=data.meals;
            currentMealList = data.meals;
            let cartoona =``;
            for (let i = 0; i < mealList.length; i++) {
                cartoona +=`
                <div class="col-md-3 rounded rounded-3">
                
                        <img src="${mealList[i].strMealThumb}" id="${mealList[i].idMeal}" alt="lime" class=" w-100">
                    
                    <div class="meal-layer" onclick="GetMealDetailsById(${mealList[i].idMeal})">
                        <h3>${mealList[i].strMeal}</h3>
                    </div>
                </div>
                `       
            }
            document.querySelector('#mealsList .row').innerHTML=cartoona;
            $('.meal-layer').click(()=>{
                $('#search').removeClass('show');
                $('#mealDetails').addClass('show');
            })
        }
    } catch (error) {
        debugger
        $('#loading').show();
    }
   
    
}
searchAboutMealByName(mealName);

async function searchAboutMealByFirstLetter(letter){
    try{
        let meals =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
        let data =await meals.json();
        mealList=data.meals;
        currentMealList = data.meals;
        let cartoona =``;
        for (let i = 0; i < mealList.length; i++) {
            cartoona +=`
            <div class="col-md-3 rounded rounded-3">
                    <img src="${mealList[i].strMealThumb}" id="${mealList[i].idMeal}" alt="meal" class=" w-100">
            
                <div class="meal-layer" onclick="GetMealDetailsById(${mealList[i].idMeal})">
                    <h3>${mealList[i].strMeal}</h3>
                </div>
            </div>
            `       
        }
        document.querySelector('#mealsList .row').innerHTML=cartoona;
        $('.meal-layer').click(()=>{
            $('#search').removeClass('show');
            $('#category').removeClass('show');
            $('#area').removeClass('show'); 
            $('#ingredients').removeClass('show'); 
            $('#mealDetails').addClass('show');
        })
    
    }catch (error){
        $('#loading').show();
    }
       
}

$('.home-side-list ul li a').click(function (e) { 
    $('#search').addClass('show');
    let element =e.target;
    let hrefAttrOfSideBar = element.getAttribute('href').slice(1);
    if(hrefAttrOfSideBar === 'categories'){
        displayCategory(hrefAttrOfSideBar)
        $('#search').removeClass('show');
        $('#area').removeClass('show'); 
        $('#contact').removeClass('show');
        $('#category').addClass('show');
        $('#mealDetails').removeClass('show'); 
        $('#ingredients').removeClass('show'); 
    }else  if(hrefAttrOfSideBar === 'search'){
        $('#category').removeClass('show');
        $('#area').removeClass('show'); 
        $('#mealDetails').removeClass('show');
        $('#ingredients').removeClass('show');  
        $('#contact').removeClass('show'); 
        $('#search').addClass('show');
    }else  if(hrefAttrOfSideBar === 'area'){
        $('#search').removeClass('show');
        $('#category').removeClass('show'); 
        $('#mealDetails').removeClass('show'); 
        $('#area').addClass('show');
        $('#ingredients').removeClass('show'); 
        $('#contact').removeClass('show');       
        getAllAreas();
    }else  if(hrefAttrOfSideBar === 'ingredients'){
        $('#search').removeClass('show');
        $('#category').removeClass('show'); 
        $('#mealDetails').removeClass('show'); 
        $('#area').removeClass('show'); 
        $('#ingredients').addClass('show');
        $('#contact').removeClass('show');
        getAllIngredients();
    }else if(hrefAttrOfSideBar === 'contact'){
        $('#contact').addClass('show');
        $('#search').removeClass('show');
        $('#category').removeClass('show'); 
        $('#mealDetails').removeClass('show'); 
        $('#area').removeClass('show'); 
        $('#ingredients').removeClass('show');
    }
});
//#region  Get Meals Categories
async function displayCategory(allcategories){
    try {
        let categoriesList =await fetch(`https://www.themealdb.com/api/json/v1/1/${allcategories}.php`);
        let {categories} =await categoriesList.json()
        let cartoona =``;
        for (let i = 0; i < categories.length; i++) {
            cartoona +=`
            <div class="col-md-3 rounded rounded-3">
                    <img src="${categories[i].strCategoryThumb}" id="${categories[i].idCategory}" alt="lime" class=" w-100">       
                <div class="category-layer" onclick="getAllMealsByCategoryName('${categories[i].strCategory}')" >
                    <h3>${categories[i].strCategory}</h3>
                    <p>${categories[i].strCategoryDescription.slice(0,65)}</p>
                </div>
            </div>
            `       
        }
        document.querySelector('#CategoriesList .row').innerHTML=cartoona;        
    } catch (error) {
        $('#loading').show();
    }   
}
//#endregion
//#region  Get Meals By Category Name
async function getAllMealsByCategoryName(categoryName) {    
    try {
        let name = categoryName;
        let mealListByCategory =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`);
        let {meals} =await mealListByCategory.json()
    if(meals!= null){
        $('#mealsCategory').addClass('show');
        $('#category').removeClass('show');
        DisplayAllMealAccordingToCategory(meals);
    }else{
        $('#category').addClass('show');
        $('#mealsCategory').removeClass('show');
        return;
    }
    } catch (error) {
        $('#loading').show();
    }    
}

function DisplayAllMealAccordingToCategory(catMeals=[]){
    try {
        let meals = catMeals;
        let myBox =``;
        for (let i = 0; i < meals.length; i++) {
            myBox+=`
            <div class="col-md-3 rounded rounded-3">            
                        <img src="${meals[i].strMealThumb}" id="${meals[i].idMeal}" alt="lime" class=" w-100">                
                    <div class="meal-layer" onclick="GetMealDetailsById(${meals[i].idMeal})">
                        <h3>${meals[i].strMeal}</h3>
                    </div>
                </div>
                `           
        }
        document.querySelector('#meal_Category .row').innerHTML=myBox;
    } catch (error) {
        $('#loading').show();
    }
}
//#endregion
//#region  GetMealDetailsBy Meal Id
async function GetMealDetailsById(id){
    try {
        let mealID =new Number();
        mealID =id;
        let _meal= await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        let {meals}= await _meal.json();
        let myTags =[];
        if(meals[0].strTags){
            let str = meals[0].strTags
            myTags = str.split(',');            
        }
        let measures = [];
        //#region  adding measures 
        if(meals[0].strMeasure1 !=null && meals[0].strMeasure1 .trim().length !== 0    && meals[0].strMeasure1) measures.push(meals[0].strMeasure1);
        if(meals[0].strMeasure2 !=null  && meals[0].strMeasure2 .trim().length !== 0  && meals[0].strMeasure2) measures.push(meals[0].strMeasure2);
        if(meals[0].strMeasure3 !=null &&meals[0].strMeasure3 .trim().length !== 0   && meals[0].strMeasure3) measures.push(meals[0].strMeasure3);
        if(meals[0].strMeasure4 !=null && meals[0].strMeasure4 .trim().length !== 0     && meals[0].strMeasure4) measures.push(meals[0].strMeasure4);
        if(  meals[0].strMeasure5 !=null && meals[0].strMeasure5 .trim().length !== 0    && meals[0].strMeasure5) measures.push(meals[0].strMeasure5);
        if( meals[0].strMeasure6 !=null &&meals[0].strMeasure6 .trim().length !== 0   && meals[0].strMeasure6) measures.push(meals[0].strMeasure6);
        if(meals[0].strMeasure7 !=null&& meals[0].strMeasure7 .trim().length !== 0     && meals[0]?.strMeasure7) measures.push(meals[0].strMeasure7);
        if( meals[0].strMeasure8 !=null&& meals[0].strMeasure8 .trim().length !== 0    && meals[0].strMeasure8) measures.push(meals[0].strMeasure8);
        if( meals[0].strMeasure9 !=null&& meals[0].strMeasure9 .trim().length !== 0    && meals[0].strMeasure9) measures.push(meals[0].strMeasure9);
        if( meals[0].strMeasure10 !=null&& meals[0].strMeasure10 .trim().length !== 0   && meals[0].strMeasure10) measures.push(meals[0].strMeasure10);
        if(meals[0].strMeasure11 !=null &&meals[0].strMeasure11 .trim().length !== 0    && meals[0].strMeasure11) measures.push(meals[0].strMeasure11);
        if( meals[0].strMeasure12 !=null&& meals[0].strMeasure12 .trim().length !== 0   && meals[0].strMeasure12) measures.push(meals[0].strMeasure12);
        if(meals[0].strMeasure13 !=null && meals[0].strMeasure13 .trim().length !== 0   && meals[0].strMeasure13) measures.push(meals[0].strMeasure13);
        if(meals[0].strMeasure14 !=null&& meals[0].strMeasure14 .trim().length !== 0    && meals[0].strMeasure14) measures.push(meals[0].strMeasure14);
        if(meals[0].strMeasure15 !=null&& meals[0].strMeasure15 .trim().length !== 0    && meals[0].strMeasure15) measures.push(meals[0].strMeasure15);
        if(meals[0].strMeasure16 !=null && meals[0]?.strMeasure16.trim().length !== 0    && meals[0]?.strMeasure16) measures.push(meals[0].strMeasure16);
        if(meals[0].strMeasure17 !=null && meals[0].strMeasure17 .trim().length !== 0    && meals[0].strMeasure17) measures.push(meals[0].strMeasure17);
        if(meals[0].strMeasure18 !=null && meals[0].strMeasure18 .trim().length !== 0    && meals[0].strMeasure18) measures.push(meals[0].strMeasure18);
        if(meals[0].strMeasure19 !=null&& meals[0].strMeasure19 .trim().length !== 0     && meals[0].strMeasure19) measures.push(meals[0].strMeasure19);
        if(meals[0].strMeasure20 !=null &&meals[0].strMeasure20 .trim().length !== 0   && meals[0].strMeasure20) measures.push(meals[0].strMeasure20);
        //#endregion
        let myBox =``;   
            myBox+=`
        <div class="col-md-5 text-start py-5">
            <div class="meal-photo w-75 rounded rounded-2">
                <img src="${meals[0].strMealThumb}" alt="meal" class="img-fluid rounded rounded-5">
            </div>
            <h2 class="fs-1 text-light headers">${meals[0].strMeal}</h2>
        </div>
        <div class="col-md-7 py-5">
            <div class="row">
                    <div class="col-md-12">
                        <h2 class="fs-1 text-light headers">Instructions</h2>
                    </div>
                    <div class="col-md-12 text-light fs-3">
                        <p class="instruction">${meals[0].strInstructions}</p>
                    </div>
                    <div class="col-md-12">
                        <p class="fs-1 text-light headers"><span >Area :</span> ${meals[0].strArea}</p>
                    </div>
                    <div class="col-md-12">
                        <p class="fs-1 text-light headers"><span >Category : </span> ${meals[0].strCategory}</p>
                    </div> 
                    <div class="col-md-12 recipesList">
                        <p class="fs-1"><span class="fs-1 text-light headers">Recipes :</span></p>
                        <p class="rounded rounded-4 measures">
    
                        </p>
                    </div>            
                    <div class="col-md-12 tagsList">
                        <p><span class="headers">Tags :</span></p>
                        <p class="allTags">
                        
                        </p>
                    </div>
                    <div class="col-md-12">
                        <button type="button"  formtarget="_blank"  onclick="window.location.href='${meals[0].strSource}'" class="btn btn-success fs-4 fw-lighter">Source</button>
                        <button type="button" formtarget="_blank" onclick="window.location.href='${meals[0].strYoutube}'" class="btn btn-danger fs-4 fw-lighter">Youtube</button>
                    </div>
                </div>
            </div>
                `  ;  
                let mymeasurBox=``;
                for (let i = 0; i < measures.length; i++) {       
                    mymeasurBox +=`
                    <span>${measures[i]}</span>
                    `        
                }
                let myTagsBox =``;
                for (let i = 0; i < myTags.length; i++) {
                    myTagsBox +=`
                    <span class="bg-info fs-5  p-2 rounded rounded-2">${myTags[i]}</span>`
                    
                }
                $('#mealDetails').addClass('show');
                $('#mealsCategory').removeClass('show');
                $('#category').removeClass('show');
                $('#mealsArea').removeClass('show');
    
    document.querySelector('#meal_info .row').innerHTML=myBox;
    document.querySelector('.measures').innerHTML=mymeasurBox;
    document.querySelector('.allTags').innerHTML=myTagsBox;
    } catch (error) {
        $('#loading').show();
    }
}
//#endregion
//#region  Get meals by Area
async function getAllAreas(){
    try {
        let areaList =await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
        let {meals} =await areaList.json()  
        let cartoona =``;
        for (let i = 0; i < meals.length; i++) {
            cartoona +=`
            <div class="col-md-3 rounded rounded-3" onclick="getAllMealsByAreaName('${meals[i].strArea}')">
                                <img src="../images/home.png" alt="home" class="w-100">
                            <div class="area-layer text-center">
                                <h3>${meals[i].strArea}</h3>
                            </div>
            </div>`       
        }
        document.querySelector('#meal_area .row').innerHTML=cartoona;
    } catch (error) {
        $('#loading').show();
    }   
}

async function getAllMealsByAreaName(areaName) {    
    try {
        let mealListByArea =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`);
        let {meals} =await mealListByArea.json()
        let cartoona=``;
        for (let i = 0; i < meals.length; i++) {
            cartoona +=`
            <div class="col-md-3 rounded rounded-3" onclick="GetMealDetailsById('${meals[i].idMeal}')">
                                <img src="${meals[i].strMealThumb}" alt="home" class="w-100">
                            <div class="meal-layer text-center">
                                <h3>${meals[i].strMeal}</h3>
                            </div>
            </div>`       
        }
        document.querySelector('#mealsAreaList .row').innerHTML=cartoona;   
        if(meals!= null){
            $('#mealsArea').addClass('show');
            $('#area').removeClass('show');   
        }else{
            $('#area').addClass('show');
            $('#mealsArea').removeClass('show');
            return;
        }
    } catch (error) {
        $('#loading').show();
    }
}
//#endregion
//#region  Get meals by Ingredients
async function getAllIngredients(){
    try {
        let areaList =await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
        let {meals} =await areaList.json()
        let cartoona =``;
        for (let i = 0; i < meals.length; i++) {
            cartoona +=`
            <div class="col-md-3" onclick="getAllMealsByMainIngredient('${meals[i].strIngredient}')">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${meals[i].strIngredient}</h3>
                <p>${meals[i].strDescription?.slice(0,65)}</p>
            </div>`       
        }
    document.querySelector('#meal_ingredients .row').innerHTML=cartoona;
    } catch (error) {
        $('#loading').show();
    }   
}
async function getAllMealsByMainIngredient(IngredientName) { 
    try {
        let mealListByIngredientName =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${IngredientName}`);
        let {meals} =await mealListByIngredientName.json()
        let cartoona=``;
        for (let i = 0; i < meals.length; i++) {
            cartoona +=`
            <div class="col-md-3 rounded rounded-3" onclick="GetMealDetailsById('${meals[i].idMeal}')">
                                <img src="${meals[i].strMealThumb}" alt="home" class="w-100">
                            <div class="meal-layer text-center">
                                <h3>${meals[i].strMeal}</h3>
                            </div>
            </div>`       
        }
        document.querySelector('#mealsAreaList .row').innerHTML=cartoona;   
        if(meals!= null){
            $('#mealsArea').addClass('show');
            $('#ingredients').removeClass('show');   
        }else{
            $('#ingredients').addClass('show');
            $('#mealsArea').removeClass('show');
            return;
        }
    } catch (error) {
        $('#loading').show();
    }   
   
}
//#endregion


//#region validations of contacts
$('#Fname').keyup(function (e) { 
    let result = /^[ a-zA-Z\-\']+$/.test( nameValue);
    if(result == false || nameValue == null){
        $('.nameMessage').removeClass('d-none');
        $('.nameMessage').addClass('d-block');
    }else{
        $('.nameMessage').removeClass('d-block');
        $('.nameMessage').addClass('d-none');
    }
});

$('#yourMail').keyup(function (e) { 
    let emailValue = e.target.value;
    let emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let result = emailPattern.test(emailValue) ;
    if(result == false || emailValue == null){
        $('.emailMessage').removeClass('d-none');
        $('.emailMessage').addClass('d-block');
    }else{
        $('.emailMessage').removeClass('d-block');
        $('.emailMessage').addClass('d-none');
    }
});

$('#phone').keyup(function (e) { 
    let phoneValue = e.target.value;
    let phonePattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    let result = phonePattern.test(phoneValue) ;
    if(result == false || phoneValue == null){
        $('.phoneMessage').removeClass('d-none');
        $('.phoneMessage').addClass('d-block');
    }else{
        $('.phoneMessage').removeClass('d-block');
        $('.phoneMessage').addClass('d-none');
    }
});

$('#age').keyup(function (e) { 
    let ageValue = e.target.value;
    let age_regex=/^[0-9]{1,2}$/;
    let result = age_regex.test(ageValue) ;
    if(result == false || ageValue == null || ageValue < 10){
        $('.ageMessage').removeClass('d-none');
        $('.ageMessage').addClass('d-block');
    }else{
        $('.ageMessage').removeClass('d-block');
        $('.ageMessage').addClass('d-none');
    }
});

$('#myPassword').keyup(function (e) { 
    let passwordValue = $('#myPassword').val();
    let password_regex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
    let result = password_regex.test(passwordValue) ;
    if(result == false || passwordValue == null){
        $('.passwordMessage').removeClass('d-none');
        $('.passwordMessage').addClass('d-block');
    }else{
        $('.passwordMessage').removeClass('d-block');
        $('.passwordMessage').addClass('d-none');
    }
});

// function viewPassword() {
//     var x = document.getElementById("myPassword");
//     if (x.type === "password") {
//         x.type = "text";        
//     } else {
//         x.type = "password";
//     }
// }

$('#RePassword').keyup( function (e) {
    if ($('#myPassword').val() === $('#RePassword').val()) {
        $('.rePasswordMessage').removeClass('d-block');
        $('.rePasswordMessage').addClass('d-none');
    } else {              
        $('.rePasswordMessage').removeClass('d-none');
        $('.rePasswordMessage').addClass('d-block');
    }  
});

$('#contact').keyup(()=>{
    $(".submitBtn").removeClass('able');
        if($('.nameMessage').hasClass('d-none') && $('#Fname').val() != '' 
        && $('.emailMessage').hasClass('d-none')&& $('#yourMail').val() != ''
        && $('.ageMessage').hasClass('d-none') && $('#age').val() != ''
        && $('.phoneMessage').hasClass('d-none') && $('#phone').val() != ' '
        && $('.passwordMessage').hasClass('d-none') && $('#myPassword').val() != ''
        && $('.rePasswordMessage').hasClass('d-none') && $('#RePassword').val() != '' ){
            $(".submitBtn").addClass('able');
        }else{
            $(".submitBtn").removeClass('able');
        }
    }
)
//#endregion