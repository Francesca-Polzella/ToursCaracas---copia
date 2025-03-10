const formulario = document.querySelector('#formulario');
const emailInput = document.querySelector('#Correo-login');
const passwordInput = document.querySelector('#Contraseña-login');
const boton = document.querySelector('#boton');

// Validar el email
const validaremail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
// Validar la contraseña
const validarpasswoed = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

let valcorreo = false;
let valpass = false;

const datoslogin = {
    email: '',
    password: ''
};

// Validar el email
emailInput.addEventListener('input', (e) => {
    datoslogin.email = e.target.value;
    valcorreo = validaremail.test(datoslogin.email);
    validar(emailInput, valcorreo);
});

// Validar la contraseña
passwordInput.addEventListener('input', (e) => {
    datoslogin.password = e.target.value;
    valpass = validarpasswoed.test(datoslogin.password);
    validar(passwordInput, valpass);
});

function validar(input, val) {
    boton.disabled = valcorreo && valpass ? false : true;

    if (val) {
        // Caso de que pase
        input.classList.remove('focus:outline-black');
        input.classList.remove('focus:outline-red-700', 'outline-4');
        input.classList.add('focus:outline-green-700', 'outline-4');
    } else if (input.value === '') {
        // Caso de que esté vacío
        input.classList.remove('focus:outline-green-700', 'outline-4');
        input.classList.remove('focus:outline-red-700', 'outline-4');
        input.classList.add('focus:outline-black');
    } else {
        // Caso de que no pase
        input.classList.remove('focus:outline-black');
        input.classList.remove('focus:outline-green-700', 'outline-4');
        input.classList.add('focus:outline-red-700', 'outline-4');
    }
}

// Arreglar el botón de registro y las líneas de la casilla de correo
formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (datoslogin.email && datoslogin.password) {
        try {
            const response = await axios.get('/api/users/lista-user/',datoslogin);
            console.log(response.data);
            console.log('hola front')
        } catch (error) {
            console.error(error);
            alert('Error: ' + error.message);
        }
    } else {
        console.log('Error: Missing email or password');
    }
});

