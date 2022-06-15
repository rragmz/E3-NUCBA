/*
Vamos a utilizar el mismo array de objetos "Pizzas🍕" del desafío general anterior. 

👉 Crear un archivo HTML que contenga un h2, un h4, un input number y un botón. 

👉 El desafío será, al tocar el botón, capturar el valor ingresado en el input.
👉 Renderizar en el h2 el nombre y en el h4 el precio de la pizza cuyo id coincida con el numero ingresado en el input. 

🚨 Si no coincide con ningún id, renderizar un mensaje de error. 
*/
const $h2 = document.getElementById('h2');
const $h4 = document.getElementById('h4');
const $h5 = document.getElementById('h5');
const $ingredientes = document.getElementById('ingredientes');
const $input = document.getElementById('input');
const $button = document.getElementById('button');
const $img = document.getElementById('img');
const $info = document.getElementById('pizza-info');

class Pizza{
    constructor(ID, nombre, ingredientes, precio, image){
        this.ID = ID;
        this.nombre = nombre;
        this.ingredientes = ingredientes;
        this.precio = precio;
        this.image = image;
    }
}

const Fugazzeta = new Pizza(1, 'Fugazzeta', ['Muzzarella', 'Orégano', 'Cebolla'], 500, 'https://th.bing.com/th/id/OIP.9tC9PkuEonjcWf_RqL1nSgHaJQ?pid=ImgDet&rs=1');
const Muzzarella = new Pizza(2, 'Muzarella', ['Salsa de tomate', 'Muzzarella', 'Orégano'], 400, 'https://th.bing.com/th/id/OIP.o1aeWU2FPuTCjMI5FjbOhwHaHa?pid=ImgDet&rs=1');
const Napolitana = new Pizza(3, 'Napolitana', ['Salsa de tomate', 'Muzzarella', 'Tomate', 'Ajo', 'Orégano'], 700, 'https://i.pinimg.com/originals/ba/1b/ff/ba1bffe2cbf53977c67712cdd16d1eb5.jpg');
const JamonMorrones = new Pizza(4, 'Jamón y Morrones', ['Salsa de tomate', 'Muzzarella', 'Jamón', 'Morrón'], 800, 'https://th.bing.com/th/id/OIP.F3jpp3Sto5qSvTxwilQUYAHaFj?pid=ImgDet&rs=1');
const Verdura = new Pizza(5, 'Verdura', ['Espinaca', 'Queso', 'Salsa blanca', 'Orégano'], 600, 'https://th.bing.com/th/id/OIP.KA0cS2I7kJYRqmEq2G9BxgHaFX?pid=ImgDet&rs=1');
const Calabresa = new Pizza(6, 'Calabresa', ['Salsa de tomate', 'Muzzarella', 'Salame'], 700, 'https://th.bing.com/th/id/R.fe027c6ccaa606077437fad97a0ba009?rik=c5xRdnR9PoBthw&pid=ImgRaw&r=0');


const Pizzas = [];
Pizzas.push(Fugazzeta,Muzzarella,Napolitana,JamonMorrones,Verdura,Calabresa);
//Guardo el array en el localStorage
localStorage.setItem('Pizzas', JSON.stringify(Pizzas));

const PizzasSelected=()=>{

    $button.addEventListener("click", (e)=>{
        
        while($h2.firstChild && $h4.firstChild && $h5.firstChild){
            $h2.removeChild($h2.firstChild);
            $h4.removeChild($h4.firstChild);
           while($h5.firstChild){
                $h5.removeChild($h5.firstChild)
            }
        }

        let inputValue = $input.value;
        inputValue= Number(inputValue);

        
        const pizzaSelected= Pizzas.find((pizza) => pizza.ID === inputValue);
            localStorage.setItem('Pizza seleccionada', JSON.stringify(pizzaSelected));
            if(pizzaSelected === undefined){
                alert("No tenemos pizza con ese ID 🙁");
                if($img){
                    $img.style.display = 'none';
                }
                $ingredientes.style.display = 'none';
                $h2.style.border = 'none';
            }else{
                $ingredientes.style.display = 'block';
                let h2Text= document.createTextNode(pizzaSelected.nombre)
                $h2.appendChild(h2Text);
                $h2.style.border = '2px dashed black';
                
                let h4Text= document.createTextNode(`$${pizzaSelected.precio}`)
                $h4.appendChild(h4Text);
                
                $img.setAttribute('src', pizzaSelected.image);
                $img.style.display = 'inline-block';
                $img.style.width = '320px';
                $img.style.height = '330px';
                
                let h5text;
                for(let i = 0; i < pizzaSelected.ingredientes.length; i++){
                    if(i < pizzaSelected.ingredientes.length-1){
                        h5text = document.createTextNode(`${pizzaSelected.ingredientes[i]}, `);
                        $h5.appendChild(h5text);
                    }
                    else{
                        h5text = document.createTextNode(`${pizzaSelected.ingredientes[i]}`);
                        $h5.appendChild(h5text);
                    }
                }
            }
            $input.value = "";
    } )
}

PizzasSelected()