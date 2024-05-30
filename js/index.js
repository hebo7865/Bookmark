
var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var nameRegex = /^[a-zA-z0-9]{3,}$/;
var urlRegex = /^(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?$/;
var submitBtn = document.getElementById("submitBtn");
var closeBtn = document.getElementById("closeBtn");
var info = document.getElementById("info");

var sitelist = [];



if(localStorage.getItem('sites') !== null){
    sitelist = JSON.parse(localStorage.getItem('sites'));
    displaySite();
}





function addSite()
{
    var site = {
        name: siteName.value,
        Url: siteUrl.value,
    }

    sitelist.push(site);

    clearForm();
    displaySite()


    localStorage.setItem('sites', JSON.stringify( sitelist))
}



function clearForm()
{
    siteName.value = null;
    siteUrl.value = null;
}



function displaySite()
{
    var box = "";

    for(var i = 0; i < sitelist.length; i++){
        box += `
        <tr>
            <td>${i + 1}</td>
            <td class="text-capitalize">${sitelist[i].name}</td>
            <td>
                <button onclick = 'location.href="http:\/\/${sitelist[i].Url}"' type = 'button' class="btn btn-visit">
                    <i class="fa-solid fa-eye"></i>
                    Visit
                </button>
            </td>
            <td>
                <button onclick = "deleteSite(${i})" class="btn btn-delete">
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                </button>
            </td>
        </tr>
        `
    }

    document.getElementById("tableBody").innerHTML = box;
}


function deleteSite(i){
    sitelist.splice(i , 1)
    displaySite();
    
    
    localStorage.setItem('sites', JSON.stringify(sitelist) )
}


function validateName(){
    if(nameRegex.test(siteName.value) == true){
        siteName.classList.add('is-valid', 'valid');
        siteName.classList.remove('is-invalid', 'invalid');
    }
    else{
        siteName.classList.add("is-invalid", 'invalid');
        siteName.classList.remove("is-valid", 'valid',);
    }
}


function validateSite(){
    if(urlRegex.test(siteUrl.value) == true){
        siteUrl.classList.add('is-valid', 'valid');
        siteUrl.classList.remove('is-invalid', 'invalid');
    }
    else{
        siteUrl.classList.add("is-invalid", 'invalid');
        siteUrl.classList.remove("is-valid", 'valid',);
    }
}


submitBtn.addEventListener('click', function(){
    if(siteName.classList.contains('valid') && siteUrl.classList.contains('valid')){
        addSite();
        clearClass();
    }
    else{
        displayInfo();
    }
})


closeBtn.addEventListener('click', function(){
    closeInfo();
});


function displayInfo(){
    info.classList.remove('d-none')
}


function closeInfo(){
    info.classList.add('d-none')
}


function clearClass(){
    siteName.classList.remove('valid', 'is-valid');
    siteUrl.classList.remove('valid', 'is-valid')
}