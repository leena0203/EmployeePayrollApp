window.addEventListener('DOMContentLoaded', (event) => {
    createInnerHtml();
});

const createInnerHtml = () => {
    const headerHtml = "<tr><th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>StartDate</th><th>Actions</th>";
    let innerHtml = `${headerHtml}`;
    let empPayrollList = creteEmployeePayrollJSON();
    for (const empPayrollData of empPayrollList){
        innerHtml = `${innerHtml}
    <tr> 
    <td><img class = "profile" src="${empPayrollData._profilePic}" alt = ""></td>
    <td>${empPayrollData._name}</td>
    <td>${empPayrollData._gender}</td>
    <td>${getDeptHtml(empPayrollData._department)}
         </td>
    <td>${empPayrollData._salary}</td>
    <td>${empPayrollData._startDate}</td>
    <td>
        <img name = "${empPayrollData._id}" src = "../assets/icons/delete-black-18dp.svg" onclick = "update(this)" alt = "edit">
        <img name = "${empPayrollData._id}" src = "../assets/icons/create-black-18dp.svg" onclick = "remove(this)" alt = "delete">
    </td>
</tr>
    `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}
const creteEmployeePayrollJSON = () => {
    let empPayrollListLocal = [
        {
            _name: 'Leena Sarode',
            _gender: 'female',
            _department:[
                'Sales',
                'Finance'
            ],
            _salary: '500000',
            _startDate: '29 Oct 2019',
            _notes: '',
            _id: new Date().getTime(),
            _profilePic: '../assets/profile-images/Ellipse -1.png'

        },
        {
        _name: 'Rahul Shah',
            _gender: 'male',
            _department:[
                'Sales'
                ],
            _salary: '550000',
            _startDate: '29 Nov 2019',
            _notes: '',
            _id: new Date().getTime() +1,
            _profilePic: '../assets/profile-images/Ellipse -2.png'

        }
    ];
    return empPayrollListLocal;
}
const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList) {
        deptHtml = `${deptHtml} <div class ='dept - label'>${dept}</div>`
    }
    return deptHtml;
}