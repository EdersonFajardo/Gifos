const modoNocturno = document.querySelector('#switch');

modoNocturno.addEventListener('click', () =>{
    document.body.classList.toggle('dark');
});