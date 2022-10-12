
const muestra=()=>{
    const menu=document.getElementById("nav");
    const navbar=document.getElementById("navbar");
    const fondo=document.getElementById("fondo_menu");
    menu.style.display="flex";
    // navbar.style.display="flex";
    fondo.classList.toggle("fondo_menu");
    navbar.classList.toggle("show_menu");
    

}

const ham=document.getElementById("hamburger");
ham.addEventListener("click",muestra);


