document.getElementById('loginForm').addEventListener('submit', function(e){
  e.preventDefault();
  const u = document.getElementById('username').value.trim();
  const p = document.getElementById('password').value;
  if(u === 'admin' && p === '1234'){
    window.location.href = '../../pages/freight.html';
  } else {
    alert('Usuário ou senha inválidos');
  }
});