let submitBtn = document.getElementById("submit");

const info = {
    student_name: '',
    email: '',
    contact: '',
    student_id: '',
    gender: '',
    skillArr: [],
}

/*getData gathers input data given by user and it stores the data into the info object*/
const getData = () => {
    info.student_name = document.getElementById('name').value;
    info.email = document.getElementById('email').value;
    info.contact = document.getElementById('contact').value;
    info.student_id = document.getElementById('student-id').value;
    info.gender = document.querySelector('input[name="male-female"]:checked').value;

    let skills = document.querySelectorAll('.checkbox:checked');
    info.skillArr = Array.from(skills).map(skill => skill.value);

    return info;
}

/*validate fucntion here is used as an arrow fucntion that checks if all the field of from are filled out or not*/
const validate = () => {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let contact = document.getElementById("contact").value;
    let studentId = document.getElementById("student-id").value;
    let genderChecked = document.querySelector('input[name="male-female"]:checked');
    let skillsChecked = document.querySelectorAll('input[type="checkbox"]:checked');

    
    const numberPattern = /^[0-9]+$/; /* to check only number are valid in the field */
    const contactPattern = /^[0-9]{10}$/;  /* takes only a 10-digit number */

    if (name === '' || email === '' || contact === '' || studentId === '' || !genderChecked || skillsChecked.length === 0) {
        alert("All fields are required.");
        return false;
    }

    /*Check if contact and student ID are valid*/
    if (!contactPattern.test(contact)) {
        alert("Please enter a valid 10-digit contact number.");
        return false;
    }

    if (!numberPattern.test(studentId)) {
        alert("Student ID should only contain numbers.");
        return false;
    }

    return true;
}

/*Function to create a card and display it on the page*/
const createCard = (info, index) => {
    const container = document.getElementById('cardContainer');
    const card = document.createElement('div');
    card.classList.add('card');
    
    const infoDiv = document.createElement('div');
    infoDiv.classList.add('info');
    
    const nameElem = document.createElement('p');
    nameElem.textContent = `Name: ${info.student_name}`;
    infoDiv.appendChild(nameElem);

    const emailElem = document.createElement('p');
    emailElem.innerHTML = `Email: <a href="mailto:${info.email}">${info.email}</a>`;
    infoDiv.appendChild(emailElem);

    const contactElem = document.createElement('p');
    contactElem.textContent = `Contact Number: ${info.contact}`;
    infoDiv.appendChild(contactElem);

    const studentIdElem = document.createElement('p');
    studentIdElem.textContent = `Student ID: ${info.student_id}`;
    infoDiv.appendChild(studentIdElem);

    const genderElem = document.createElement('p');
    genderElem.textContent = `Gender: ${info.gender}`;
    infoDiv.appendChild(genderElem);

    const skillsElem = document.createElement('p');
    skillsElem.textContent = `Skills: ${info.skillArr.join(', ')}`;
    infoDiv.appendChild(skillsElem);

    /* Delete fucntion defination */
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteData(index);
    infoDiv.appendChild(deleteBtn);

    card.appendChild(infoDiv);
    container.appendChild(card);
}

/*saving  data to localStorage*/
const saveDataToLocalStorage = (data) => {
    let studentsData = JSON.parse(localStorage.getItem('students')) || [];
    studentsData.push(data);
    localStorage.setItem('students', JSON.stringify(studentsData));
}
/*saving  data to localStorage*/
const displayStoredData = () => {
    const studentsData = JSON.parse(localStorage.getItem('students')) || [];
    studentsData.forEach((student, index) => {
        createCard(student, index);
    });
}

/*Function to delete a student card from both localStorage and display screen*/
const deleteData = (index) => {
    let studentsData = JSON.parse(localStorage.getItem('students')) || [];
    studentsData.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(studentsData));
    document.getElementById('cardContainer').innerHTML = '';
    displayStoredData();
}

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (validate()) {
        const studentData = getData();
        saveDataToLocalStorage(studentData);
        createCard(studentData, JSON.parse(localStorage.getItem('students')).length - 1);
        document.querySelector("form").reset();
    }
});

/*Display data when the page loads*/

window.onload = displayStoredData;
