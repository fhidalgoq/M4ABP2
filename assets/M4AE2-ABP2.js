//Bloquea caracteres
function bloquearCaracteres(e) {
    const teclasProhibidas = ['e', 'E', '+', '-'];
    if (teclasProhibidas.includes(e.key)) {
        e.preventDefault();
    }
}

//Problema 1:
function mostrarCalculo() {
    const cantidad = document.getElementById('cantidadDeDolares');
    if (isNaN(cantidad.value)) {
        console.log("Por favor, ingrese un número válido.");
        return;
    } else {
        if (cantidad.value > 0) {
            const valorEnPesos = 750.00;
            const resultado = document.getElementById('resultado');
            resultado.innerHTML = `<h5 class="text-center">La cantidad de pesos chilenos (CLP) a recibir es de: <div><strong>$ ${(cantidad.value * valorEnPesos)}</strong></div></h4>`;
        }
        else {
            console.log("El valor debe ser mayor que cero.");
            return;
        }
    }
}

//Problema 2:

// Espera a que el DOM cargue
document.addEventListener('DOMContentLoaded', () => {
    const selNacionalidad = document.getElementById('nacionalidad');
    const containerCedula = document.getElementById('cedulaExtranjeraContainer');

    selNacionalidad.addEventListener('change', () => {
        // Limpia contenido previo
        containerCedula.innerHTML = '';

        if (selNacionalidad.value === '2') {
            // Crea elementos
            const wrapper = document.createElement('div');
            wrapper.className = 'mb-3';

            const label = document.createElement('label');
            label.setAttribute('for', 'cedulaExtranjeraVigente');
            label.className = 'form-label';
            label.textContent = '¿Tiene cédula para extranjeros vigente?';

            const select = document.createElement('select');
            select.className = 'form-select';
            select.id = 'cedulaExtranjeraVigente';
            select.required = true;
            select.innerHTML = `
        <option value="" disabled selected>Seleccione una opción</option>
        <option value="1">Sí</option>
        <option value="2">No</option>`;
            // Inserta en el DOM
            wrapper.appendChild(label);
            wrapper.appendChild(select);
            containerCedula.appendChild(wrapper);
        }
    });
});

function calcularBeneficio() {
    // Obtener y convertir valores
    const edad = Number(document.getElementById("edad").value);
    const ahorro = Number(document.getElementById('ahorro').value);
    const nacionalidad = Number(document.getElementById('nacionalidad').value);
    const porcentaje = Number(document.getElementById('porcentajeCalificacion').value);
    const cedulaVigente = Number(document.getElementById('cedulaVigente').value);

    // Validación básica
    if ([edad, ahorro, nacionalidad, porcentaje, cedulaVigente]
        .some(v => isNaN(v))) {
        alert("Por favor, ingrese datos válidos.");
        return;
    }

    // Leer cédula extranjera si aplica
    let cedulaExt = null;
    if (nacionalidad === 2) {
        const sel = document.getElementById('cedulaExtranjeraVigente');
        cedulaExt = sel ? Number(sel.value) : null;
        if (cedulaExt === null) {
            alert("Debe indicar si tiene cédula de extranjero.");
            return;
        }
    }

    // Referencia al div de resultado
    const resultado = document.getElementById('resultadoPostulacion');
    const cumpleEdad = edad >= 18;
    const cumpleAhorro = ahorro === 1;
    const cumpleCalif = porcentaje <= 70;
    let esBeneficiario = false;

    if (nacionalidad === 1) {
        // Chilena
        esBeneficiario = cumpleEdad && cumpleAhorro && cedulaVigente === 1 && cumpleCalif;
    } else {
        // Extranjera
        esBeneficiario = cumpleEdad && cumpleAhorro && cedulaExt === 1 && cedulaVigente == 1 && cumpleCalif;
    }

    // Mostrar resultado
    resultado.innerHTML = `
    <h5 class="text-center">
      ${esBeneficiario
            ? "Usted es beneficiario del subsidio de arriendo de vivienda."
            : "Usted NO es beneficiario del subsidio de arriendo de vivienda."}
    </h5>`;
}