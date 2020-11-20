window.addEventListener('DOMContentLoaded', (event) => {
    createInnerHtml();
});

const createInnerHtml = () => {
    const headerHtml = "<tr><th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>StartDate</th><th>Actions</th>";
    const innerHtml = `${headerHtml}
    <tr> 
    <td><img class = "profile" src = "../assets/profile-images/Ellipse -2.png" alt = ""></td>
    <td>Rahul Shah</td>
    <td>Male</td>
    <td>
        <div class = "dept-label">Engineer</div>
        <div class = "dept-label">Finance</div>
    </td>
    <td>4500000</td>
    <td>18 November 2019</td>
    <td>
        <img id = "1" src = "../assets/icons/delete-black-18dp.svg" onclick = "update(this)" alt = "edit">
        <img id = "1" src = "../assets/icons/create-black-18dp.svg" onclick = "remove(this)" alt = "delete">
    </td>
</tr>
    `;
    document.querySelector('#table-display').innerHTML = innerHtml;
}