const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('color');
const sizePicker = document.getElementById('size');
const submitBtn = document.getElementById('submit');
const titleInput = document.getElementById('title');

let drawing = false;

canvas.addEventListener('mousedown', () => {
  drawing = true;
  ctx.beginPath();
});

canvas.addEventListener('mouseup', () => {
  drawing = false;
  ctx.beginPath();
});

canvas.addEventListener('mouseout', () => {
  drawing = false;
  ctx.beginPath();
});

canvas.addEventListener('mousemove', draw);

function draw(e) {
  if (!drawing) return;

  const rect = canvas.getBoundingClientRect();
  ctx.lineWidth = sizePicker.value;
  ctx.lineCap = 'round';
  ctx.strokeStyle = colorPicker.value;

  ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
}

submitBtn.addEventListener('click', () => {
  const title = titleInput.value.trim();
  if (!title) return alert('Ajoute un titre à ton dessin.');

  const userId = new URLSearchParams(window.location.search).get('user');
  if (!userId) return alert('Utilisateur Discord manquant dans l’URL.');

  const imageData = canvas.toDataURL();

  fetch('https://TON_SERVEUR/submit-drawing', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageData, title, user: userId })
  })
    .then(res => {
      if (res.ok) alert('🎉 Ton dessin a été envoyé avec succès !');
      else alert('❌ Échec de l’envoi du dessin.');
    })
    .catch(err => {
      console.error(err);
      alert('❌ Une erreur est survenue lors de l’envoi.');
    });
});
