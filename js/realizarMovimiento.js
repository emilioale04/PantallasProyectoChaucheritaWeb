// Función para mostrar mensajes flotantes (toasts)
function showToast(message, type = 'error') {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast show';
    toast.textContent = message;

    if (type === 'success') {
        toast.style.backgroundColor = '#4CAF50'; // Verde para éxito
    } else if (type === 'warning') {
        toast.style.backgroundColor = '#FFC107'; // Amarillo para advertencias
    }

    toastContainer.appendChild(toast);

    // Ocultar después de 3 segundos
    setTimeout(() => {
        toast.classList.remove('show');
        toast.addEventListener('transitionend', () => toast.remove());
    }, 3000);
}

function closeAlert() {
    const alertOverlay = document.getElementById('alerta-overlay');
    if (alertOverlay) {
        alertOverlay.style.display = 'none';
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".tab-button");
    const panes = document.querySelectorAll(".tab-pane");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            // Quitar clases activas
            buttons.forEach((btn) => btn.classList.remove("active"));
            panes.forEach((pane) => pane.classList.add("hidden"));

            // Activar pestaña seleccionada
            button.classList.add("active");
            const targetPane = document.getElementById(button.dataset.target);
            targetPane.classList.remove("hidden");
        });
    });

    // Manejo de formularios de ingreso y egreso
    document.querySelectorAll('form[id^="ingreso-form"], form[id^="egreso-form"]').forEach(form => {
        const valorInput = form.querySelector('input[name="valor"]');
        const conceptoInput = form.querySelector('input[name="concepto"]');
        const balance = parseFloat(form.getAttribute('data-balance')) || 0;

        form.addEventListener('submit', function (event) {
            let isValid = true;

            // Validar campo de valor
            if (!valorInput.value) {
                showToast('Por favor, rellena todos los campos (valor).');
                isValid = false;
            } else if (isNaN(parseFloat(valorInput.value)) || parseFloat(valorInput.value) <= 0) {
                showToast('El valor no puede ser negativo o cero.');
                isValid = false;
            } else if (form.id.startsWith('egreso-form') && parseFloat(valorInput.value) > balance) {
                showToast('Balance insuficiente.');
                isValid = false;
            }

            // Validar campo de concepto
            if (!conceptoInput.value.trim()) {
                showToast('Por favor, rellena todos los campos (concepto).');
                isValid = false;
            }

            if (!isValid) {
                event.preventDefault();
            }
        });
    });

    // Manejo de formularios de transferencia
    document.querySelectorAll('form[id^="transferencia-form"]').forEach(form => {
        const cuentaDestinoInput = form.querySelector('select[name="cuentaDestinoId"]');
        const valorInput = form.querySelector('input[name="valor"]');
        const conceptoInput = form.querySelector('input[name="concepto"]');
        const cuentaOrigenInput = form.querySelector('input[name="cuentaId"]');
        const balance = parseFloat(form.getAttribute('data-balance')) || 0;

        form.addEventListener('submit', function (event) {
            let isValid = true;

            // Validar campo de cuenta destino
            if (!cuentaDestinoInput.value) {
                showToast('Por favor, rellena todos los campos (cuenta destino).');
                isValid = false;
            } else if (cuentaDestinoInput.value === cuentaOrigenInput.value) {
                showToast("La cuenta destino debe ser diferente a la de origen.")
                isValid = false;
            }

            // Validar campo de valor
            if (!valorInput.value) {
                showToast('Por favor, rellena todos los campos (valor).');
                isValid = false;
            } else if (isNaN(parseFloat(valorInput.value)) || parseFloat(valorInput.value) <= 0) {
                showToast('El valor no puede ser negativo.');
                isValid = false;
            } else if (parseFloat(valorInput.value) > balance) {
                showToast('Balance insuficiente.');
                isValid = false;
            }

            // Validar campo de concepto
            if (!conceptoInput.value.trim()) {
                showToast('Por favor, rellena todos los campos (concepto).');
                isValid = false;
            }

            if (!isValid) {
                event.preventDefault();
            }
        });
    });

    // Función para ocultar el overlay de alerta
    const alertaOverlay = document.getElementById("alerta-overlay");
    if (alertaOverlay) {
        alertaOverlay.querySelector("button").addEventListener("click", function () {
            alertaOverlay.style.display = "none";
        });
    }
});