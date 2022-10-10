    const formulario=document.getElementById('mformulario');
    const inputs=document.querySelectorAll('#mformulario input');
    const seleccion=document.querySelectorAll('#seleccion input');
    const plazos=document.getElementById('plazo');
    const producto=document.getElementById('Producto');
    const presupuesto=document.getElementById('presupuesto');
    const oferta=document.getElementById('oferta');
   
    var puntos=0;
    let prod=0;
    let valor=0;
   

    const expresiones={
        nombre:/^[a-zA-ZÀ-ÿ\s]{1,40}$/,
        correo:/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        telefono:/^\d{7,9}$/,
        plazos:/^\d{1,60}$/,
    }
    
    const campos = {
        
        nombre: false,
        apellidos: false,
        correo: false,
        telefono: false,
        plazo:false
    }
    const mensajes={
        nombre:"El nombre puede contener solo letras.",
        apellidos: "Los apellidos pueden contener solo letras.",
        telefono:"El telefono solo puede contener números y máximo 9 dígitos.",
        correo:"El correo solo puede contener letras, numeros, puntos, guiones y guion bajo."
    }
    const validar=(e)=>{
        switch(e.target.name){
            case "nombre":
                validarCampo(expresiones.nombre, e.target, 'nombre');                
            break;
            case "apellidos":
                validarCampo(expresiones.nombre, e.target, 'apellidos');  
            break;
            case "telefono":                
                validarCampo(expresiones.telefono, e.target, 'telefono');  
            break;
            case "email":
                validarCampo(expresiones.correo, e.target, 'email');  
            break;
            case "plazo":
                validarCampo(expresiones.plazos, e.target, 'plazo');
                tiempo(e.target);
            break;
        }
    }

    //Validar el campo seleccionado
    const validarCampo = (expresion, input, campo) => {
        if(expresion.test(input.value)){
            document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
            document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
            document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
            document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
            // document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
            const elimina=document.getElementById(`parrafo`);
            if(elimina){
              elimina.remove();  
            }
            
            document.getElementById(`show`).style.display="none"
            campos[campo] = true;
            console.log(campos[campo]);
        } else {
            document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
            document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
            document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
            document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
            // document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
            if(input.value!==''){
                const parrafo=document.getElementById(`parrafo`);
                if(!parrafo){
                    const element=document.createElement("p");
                     element.setAttribute("id","parrafo")
                    element.innerHTML=mensajes[campo];
                    const agrega=document.getElementById(`show`);
                    agrega.appendChild(element)
                    agrega.style.display="block";
                    campos[campo] = false;
                    console.log(campos[campo]);
                }
                
            }
            
            // console.log(campos[campo]);
        }
    }

    //Recuperar el valor seleccionado de producto

    producto.addEventListener('change',(e)=>{
        prod=e.target.value;
    })


    const chequear=(e)=>{
        if(e.target.checked){
            valor+=parseInt(e.target.value)
            presupuesto.value=valor+puntos+parseInt(prod)
            
        }else{
            valor-=parseInt(e.target.value)
            presupuesto.value=valor+puntos+parseInt(prod)
        }
    }



    inputs.forEach((input)=>{
        input.addEventListener('keyup',validar);
        input.addEventListener('blur',validar);       
        plazos.addEventListener("click", validar);
    })

    seleccion.forEach((input)=>{
        input.addEventListener('change',chequear);
    })


    //relacion de descuento segun dias
    const tiempo=(input)=>{
        let time=input.value;
        // console.log(parseInt(time)  + 4);
        const times=parseInt(time)
        
        if(times<=5){
            puntos=-10;
            oferta.style.display="block"
            oferta.innerHTML=puntos +" off"
            if(valor>0){
                presupuesto.value=valor+puntos+parseInt(prod)
            }
        }else{
            if(times>5 && times <=20){
                puntos=-7;
                oferta.style.display="block"
                oferta.innerHTML=puntos +" off"
                if(valor>0){
                    presupuesto.value=valor+puntos+parseInt(prod)
                }
            }
            else{
                puntos=-5;
                oferta.style.display="block"
                oferta.innerHTML=puntos +" off"
                if(valor>0){
                    presupuesto.value=valor+puntos+parseInt(prod)
                }
            }
        }
        
    }
    
    

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        const terminos = document.getElementById('terminos');
     
        if(campos.nombre && campos.apellidos  && campos.telefono && terminos.checked ){
            document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
            setTimeout(() => {
                document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
            }, 4000);
    
            document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
                icono.classList.remove('formulario__grupo-correcto');
            });
        } 
        else {
            document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
            setTimeout(() => {
                document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
            }, 2000);
            
        }
    });

    const reset=()=>{
        formulario.reset();
    }

    // const saber=(e)=>{
    //     console.log(e.target.value);
    // }