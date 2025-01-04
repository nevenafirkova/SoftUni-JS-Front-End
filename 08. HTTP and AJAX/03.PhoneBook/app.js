function attachEvents() {
    const phonebookUrl = 'http://localhost:3030/jsonstore/phonebook';
    const loadButtonElement = document.getElementById('btnLoad');
    const ulPhonebookElement = document.getElementById('phonebook');
    const createButtonElement = document.getElementById('btnCreate');
    const personInputElement = document.getElementById('person');
    const personPhoneElement = document.getElementById('phone');

    loadButtonElement.addEventListener('click', () => {
        fetch(phonebookUrl)
            .then(res => res.json())
            .then(data => {
                Object.values(data)
                    .forEach(entry => {
                        ulPhonebookElement.appendChild(createEntryElement(entry));
                    });
            });
    });

    createButtonElement.addEventListener('click', () => {
        const personName = personInputElement.value;
        const personPhone = personPhoneElement.value;
        fetch(phonebookUrl, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                person: personName,
                phone: personPhone,
            }),
        }).then((res) => res.json())
            .then(entry => {
                const liElement = createEntryElement(entry);

                ulPhonebookElement.appendChild(liElement);

                personInputElement.value = '';
                personPhoneElement.value = '';
            });
    });

    function createEntryElement({ _id, person, phone }) {
        const liElement = document.createElement('li');
        liElement.textContent = `${person}: ${phone}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';

        deleteButton.addEventListener('click', () => {
            fetch(`${phonebookUrl}/${_id}`, {
                method: 'DELETE'
            })
                .then(() => {
                    liElement.remove();
                });
        });

        liElement.appendChild(deleteButton);

        return liElement;
    }
}

attachEvents();