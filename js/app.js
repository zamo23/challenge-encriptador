document.getElementById("botonEncriptar").addEventListener("click", encriptar);
document.getElementById("botonDesencriptar").addEventListener("click", desencriptar);
document.getElementById("botonCopiar").addEventListener("click", copiar);

function encriptar() {
    if (!validarTexto()) return;
    procesarTexto(true);
}

function desencriptar() {
    if (!validarTexto()) return;
    procesarTexto(false);
}

function validarTexto() {
    let textoOriginal = document.getElementById("textoEntrada").value.trim();
    if (textoOriginal === "") {
        mostrarAdvertencia('El campo de texto no puede estar vacío.');
        return false;
    }
    if (!/^[a-z ]+$/.test(textoOriginal)) {
        mostrarAdvertencia('Solo se permiten letras minúsculas sin acentos ni caracteres especiales.');
        return false;
    }
    return true;
}

function procesarTexto(esEncriptar) {
    let textoOriginal = document.getElementById("textoEntrada").value.toLowerCase();
    let textoProcesado = transformarTexto(textoOriginal, esEncriptar);
    mostrarResultado(textoProcesado);
}

function transformarTexto(texto, esEncriptar = true) {
    const reglas = {
        'e': 'enter', 'i': 'imes', 'a': 'ai', 'o': 'ober', 'u': 'ufat'
    };

    if (esEncriptar) {
        for (let letra in reglas) {
            let valor = reglas[letra];
            let expresion = new RegExp(letra, 'g');
            texto = texto.replace(expresion, valor);
        }
    } else {
        for (let letra in reglas) {
            let valor = reglas[letra];
            let expresion = new RegExp(valor, 'g');
            texto = texto.replace(expresion, letra);
        }
    }
    return texto;
}

function mostrarResultado(texto) {
    document.getElementById("imgDer").style.display = "none"; 
    document.getElementById("mensajeAdvertencia").style.display = "none";
    let mensajeElement = document.getElementById("textoInformativo");
    mensajeElement.value = texto;
    mensajeElement.classList.add("ajustar");

    document.getElementById("botonCopiar").classList.remove("oculto");
}


function mostrarAdvertencia(mensaje) {
    let mensajeAdvertencia = document.getElementById("mensajeAdvertencia");
    mensajeAdvertencia.textContent = mensaje;
    mensajeAdvertencia.style.display = 'block';
}

function ocultarAdvertencia() {
    let mensajeAdvertencia = document.getElementById("mensajeAdvertencia");
    mensajeAdvertencia.style.display = 'none';
}

function limpiarTexto() {
    document.getElementById("textoEntrada").value = '';
    mostrarAdvertencia('Ingresa el texto que desees encriptar o desencriptar');
}

async function copiar() {
    try {
        let textoCopiado = document.getElementById("textoInformativo").value;
        await navigator.clipboard.writeText(textoCopiado);
        mostrarAdvertencia('¡Texto copiado exitosamente!');
    } catch (err) {
        console.error("Error al copiar texto: ", err);
        mostrarAdvertencia('No se pudo copiar el texto.');
    }
}
