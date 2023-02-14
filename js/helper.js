export default function notificationBox(content, typeBoxEl) {
    const nameAttribute = typeBoxEl.getAttribute('id');
    typeBoxEl.textContent = content;
    const boxView = typeBoxEl.parentElement;
    boxView.style.display = 'block';

    if (nameAttribute === 'errorBox') {
        boxView.addEventListener('click', () => {
            typeBoxEl.textContent = '';
            boxView.style.display = 'none';
        });
    } else {
        setTimeout(() => {
            typeBoxEl.textContent = '';
            boxView.style.display = 'none';
        }, 3000)
    }


};