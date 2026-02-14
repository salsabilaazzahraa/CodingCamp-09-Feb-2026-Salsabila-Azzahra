const userNameElement = document.getElementById('userName');
const currentTimeElement = document.getElementById('currentTime');
const messageForm = document.getElementById('messageForm');
const resultDisplay = document.getElementById('resultDisplay');
const resultName = document.getElementById('resultName');
const resultBirthdate = document.getElementById('resultBirthdate');
const resultGender = document.getElementById('resultGender');
const resultPesan = document.getElementById('resultPesan');
const dataTableBody = document.getElementById('dataTableBody');

function updateCurrentTime() {
    const now = new Date();
    currentTimeElement.textContent = now.toString();
    setTimeout(updateCurrentTime, 1000);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function formatDateToText(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function getUserName() {
    let name = localStorage.getItem('userName');
    if (!name || name === 'Guest') {
        name = prompt('Please enter your name:', 'Guest');
        if (name && name.trim() !== '') {
            localStorage.setItem('userName', name.trim());
        } else {
            name = 'Guest';
        }
    }
    return name;
}

function displayWelcomeName() {
    const name = getUserName();
    userNameElement.textContent = name;
}

function changeName() {
    const newName = prompt('Enter your new name:', userNameElement.textContent);
    if (newName && newName.trim() !== '') {
        localStorage.setItem('userName', newName.trim());
        userNameElement.textContent = newName.trim();
    }
}

function validateName(name) {
    if (name.trim() === '') return 'Name cannot be empty';
    if (name.length < 2) return 'Name must be at least 2 characters';
    return '';
}

function validateBirthdate(birthdate) {
    if (!birthdate) return 'Please select your birth date';
    const birthDate = new Date(birthdate);
    const today = new Date();
    if (birthDate > today) return 'Birth date cannot be in the future';
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 5 || age > 120) return 'Please enter a valid birth date';
    return '';
}

function validateGender() {
    const gender = document.querySelector('input[name="gender"]:checked');
    if (!gender) return 'Please select your gender';
    return '';
}

function validatePesan(pesan) {
    if (pesan.trim() === '') return 'Message cannot be empty';
    if (pesan.length < 5) return 'Message must be at least 5 characters';
    return '';
}

function clearErrors() {
    document.getElementById('nameError').textContent = '';
    document.getElementById('birthdateError').textContent = '';
    document.getElementById('genderError').textContent = '';
    document.getElementById('pesanError').textContent = '';
}

function getGenderDisplay(genderValue) {
    return genderValue === 'Laki-Laki' ? 'Laki-Laki' : 'Perempuan';
}

function addDataToTable(name, birthdate, gender, pesan) {
    const row = document.createElement('tr');
    const formattedDate = formatDateToText(birthdate);
    const genderDisplay = getGenderDisplay(gender);
    row.innerHTML = `
        <td>${name}</td>
        <td>${formattedDate}</td>
        <td>${genderDisplay}</td>
        <td>${pesan}</td>
        <td><button class="btn-profile" onclick="showProfile('${name}', '${formattedDate}', '${genderDisplay}', '${pesan}')">Klik Disini</button></td>
        <td><button class="btn-delete" onclick="deleteRow(this)">×</button></td>
    `;
    dataTableBody.insertBefore(row, dataTableBody.firstChild);
}

function handleSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const birthdate = document.getElementById('birthdate').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const pesan = document.getElementById('pesan').value;
    clearErrors();
    const nameError = validateName(name);
    const birthdateError = validateBirthdate(birthdate);
    const genderError = validateGender();
    const pesanError = validatePesan(pesan);
    if (nameError) document.getElementById('nameError').textContent = nameError;
    if (birthdateError) document.getElementById('birthdateError').textContent = birthdateError;
    if (genderError) document.getElementById('genderError').textContent = genderError;
    if (pesanError) document.getElementById('pesanError').textContent = pesanError;
    if (nameError || birthdateError || genderError || pesanError) return;
    resultName.textContent = name;
    resultBirthdate.textContent = formatDate(birthdate);
    resultGender.textContent = getGenderDisplay(gender);
    resultPesan.textContent = pesan;
    resultDisplay.style.display = 'block';
    addDataToTable(name, birthdate, gender, pesan);
    resultDisplay.scrollIntoView({ behavior: 'smooth' });
    messageForm.reset();
    const submissions = JSON.parse(localStorage.getItem('formSubmissions')) || [];
    submissions.push({ name, birthdate, gender, pesan, timestamp: new Date().toISOString() });
    localStorage.setItem('formSubmissions', JSON.stringify(submissions));
}

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
    window.scrollTo(0, 0);
}

function showSubTab(tabId, button) {
    const parent = button.closest('.portfolio-content');
    parent.querySelectorAll('.sub-tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');
    parent.querySelectorAll('.sub-tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    button.classList.add('active');
}

function toggleMenu() {
    document.querySelector('.nav-menu').classList.toggle('show');
}

function showProfile(name, date, gender, message) {
    alert(`Profile Details:\n\nName: ${name}\nBirth Date: ${date}\nGender: ${gender}\nMessage: ${message}`);
}

function deleteRow(button) {
    if (confirm('Are you sure you want to delete this data?')) {
        button.closest('tr').remove();
    }
}

function handleTravelSubmit(event) {
    event.preventDefault();
    alert('Thank you for your travel inquiry! Our sales team will contact you within 24 hours.');
    document.getElementById('travelForm').reset();
}

function handleGroceriesSubmit(event) {
    event.preventDefault();
    alert('Thank you for your order! Our sales team will contact you within 24 hours.');
    document.getElementById('groceriesForm').reset();
}

function handleContactSubmit(event) {
    event.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    document.getElementById('contactPageForm').reset();
}

document.addEventListener('DOMContentLoaded', () => {
    displayWelcomeName();
    updateCurrentTime();
    const submissions = JSON.parse(localStorage.getItem('formSubmissions')) || [];
    while (dataTableBody.firstChild) {
        dataTableBody.removeChild(dataTableBody.firstChild);
    }
    submissions.slice(0, 10).forEach(sub => {
        addDataToTable(sub.name, sub.birthdate, sub.gender, sub.pesan);
    });
    if (submissions.length === 0) {
        const defaultData = [
            { name: 'Ada Lovelace', birthdate: '1815-12-10', gender: 'Perempuan', pesan: 'Belajar Buat Website' },
            { name: 'Grace Hopper', birthdate: '1906-12-09', gender: 'Perempuan', pesan: 'Hello World' },
            { name: 'Margaret Hamilton', birthdate: '1936-08-17', gender: 'Perempuan', pesan: 'Test Dulu' },
            { name: 'Joan Clarke', birthdate: '1917-06-24', gender: 'Laki-Laki', pesan: 'Selalu Semangat' }
        ];
        defaultData.forEach(data => {
            addDataToTable(data.name, data.birthdate, data.gender, data.pesan);
        });
    }
});