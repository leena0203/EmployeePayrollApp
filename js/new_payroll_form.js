let isUpdate = false;
let empPayrollObj = {};
/* UC8 */
/* UC1_DAY38 */
class EmployeePayrollData {

    get name() { return this._name; }
    set name(name) {
        let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
        if (nameRegex.test(name)) {
            this._name = name;
        }
        else throw 'Name is incorrect!';
    }

    get id() { return this._id;}
    set id(id) {
        this._id = id;
    }

    get salary() { return this._salary;}
    set salary(salary) {
        this._salary = salary;
    }

    get startDate() { return this._startDate;}
    set startDate(startDate){
        startDate = new Date(startDate);
         this._startDate = startDate;
    }

    get profilePic(){ return this._profilePic;}
    set profilePic(profilePic){
        this._profilePic = profilePic;
    }
    get gender() { return this._gender; }
    set gender (gender) {
        this._gender = gender;
    }
    get department(){ return this._department;}
    set department(department){
        this._department = department;
    }

    get notes(){ return this._notes;}
    set notes(notes){
        this._notes = notes;
    }

    toString() {
        const options = {year : 'numeric', month : 'long', day : 'numeric'};
        const empDate = this.startDate === undefined ? "undefined" : 
        (new Date(this.startDate)).toLocaleDateString("en-US", options);
                        return "id = " + this.id + ", name = " + this.name + ", gender = " + this.gender + 
               ", salary = " + this.salary + ", ProfilePic = " + this.profilePic + ", department = " + this.department + 
               ", start date = " + this.startDate + ", Notes = " + this.notes;
    }
}
window.addEventListener('DOMContentLoaded',() => {
const textError = document.querySelector('.text-error');
const name = document.querySelector('#name');
name.addEventListener('input', function(){
        if(name.value.length == 0){
        textError.textContent = "";
        return;
    }
    try{
        (new EmployeePayrollData()).name = name.value;
        textError.textContent = "";
    }catch(e){
        textError.textContent = e;
    }
});

const salary = document.querySelector('#salary');
const output = document.querySelector('.salary-output');
output.textContent = salary.value;
salary.addEventListener('input', function(){
    output.textContent = salary.value;
});
checkForUpdate();
});
const save = () => {
        try{
        let employeePayrollData = createEmployeePayroll();
        createAndUpdateStorage(employeePayrollData);
    }catch (e){
        console.log(e);
        return;
    }
    
}

function createAndUpdateStorage(employeePayrollData){
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList != undefined){
        employeePayrollList.push(employeePayrollData);
    } else{
        employeePayrollList = [employeePayrollData];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}
const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayrollData();
    try{
        employeePayrollData.name = getInputValueById('#name');
    }
    catch(e){
        setTextValue('.text-error', e);
        throw e;
    }

    employeePayrollData.profilePic = getSelectedValues('[name = profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name = gender]').pop();
    employeePayrollData.department = getSelectedValues('[name = department]');
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.notes = getInputValueById('#notes');
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " +
               getInputValueById('#year');
              
    employeePayrollData.startDate = Date.parse(date);
    alert(employeePayrollData.toString());
    return employeePayrollData;
}

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach( item => {
        if( item.checked ) selItems.push( item.value );
    });
    return selItems;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const getInputElementValue= (id) => {
    let value = document.getElementById(id).value;
    return value;
}

const setForm = () => {
    setValue('#name', empPayrollObj._name);
    setSelectedValues('[name = profile]', empPayrollObj._profilePic);
    setSelectedValues('[name = gender]', empPayrollObj._gender);
    setSelectedValues('[name = department]', empPayrollObj._department);
    setValue('#salary', empPayrollObj._salary);
    setTextValue('.salary-output', empPayrollObj._salary);
    setValue('#notes', empPayrollObj._notes);
    let date = stringifyDate(empPayrollObj._startDate).split(" ");
    setValue('#day', date[0]);
    setValue('#month', date[1]);
    setValue('#year', date[2]);
}

setSelectedValues = (propertyValue, value) => {

    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if(Array.isArray(value)){
            if (value.includes(item.value))
                item.checked = true;
        }
        else if(item.value == value)
            item.checked = true;
    });
}
const resetForm = () => {
    setValue('#name','');
    unsetSelectedValues('[name = gender');
    unsetSelectedValues('[name = department');
    unsetSelectedValues('[name = profile');
    setValue('#salary', '');
    setValue('#day', 0);
    setValue('#month', 0);
    setValue('#year', 0);
    setValue('#notes', '');
}

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });    
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value
}

const setTextValue = (id, value) =>{
    const element = document.querySelector(id);
    element.textContent = value;
}
const setSelectedIndex = (id, index) => {
    const element = document.querySelector(id);
    element.selectedIndex = index;
}

checkForUpdate = () => {
    const empPayrollJson = localStorage.getItem('editEmp');
    isUpdate = empPayrollJson ? true : false;
    if(!isUpdate) return;
    empPayrollObj = JSON.parse(empPayrollJson);
    setForm();
}