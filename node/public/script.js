document.getElementById('action-button').addEventListener('click', () => {
    const message = document.getElementById('output-message');
    message.textContent = 'Thanks for clicking the button!';
    message.classList.remove('hidden');
});
