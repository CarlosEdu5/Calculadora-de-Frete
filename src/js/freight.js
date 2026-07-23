document.getElementById('freightForm').addEventListener('submit', function(e){
  e.preventDefault();
  const weight = parseFloat(document.getElementById('weight').value) || 0;
  const distance = parseFloat(document.getElementById('distance').value) || 0;
  const rateKg = parseFloat(document.getElementById('rateKg').value) || 0;
  const rateKm = parseFloat(document.getElementById('rateKm').value) || 0;
  // Fórmula simples: base + peso*rateKg + distancia*rateKm
  const base = 10.0;
  const total = base + (weight * rateKg) + (distance * rateKm);
  const formatted = total.toLocaleString('pt-BR', {style:'currency',currency:'BRL'});
  document.getElementById('result').textContent = `Valor estimado: ${formatted}`;
});

const freightForm = document.getElementById('freightForm');
if (freightForm) {
    freightForm.addEventListener('submit', function(e){
        e.preventDefault();
        const weight = parseFloat(document.getElementById('weight').value) || 0;
        const distance = parseFloat(document.getElementById('distance').value) || 0;
        const rateKg = parseFloat(document.getElementById('rateKg').value) || 0;
        const rateKm = parseFloat(document.getElementById('rateKm').value) || 0;
        const base = 10.0;
        const total = base + (weight * rateKg) + (distance * rateKm);
        const formatted = total.toLocaleString('pt-BR', {style:'currency',currency:'BRL'});
        document.getElementById('result').textContent = `Valor estimado: ${formatted}`;
    });
}

const usuarioButton = document.getElementById('usuarioButton');
const sairButton = document.getElementById('sairButton');

if (usuarioButton && sairButton) {
    usuarioButton.addEventListener('click', () => {
        sairButton.classList.toggle('show');
    });
}