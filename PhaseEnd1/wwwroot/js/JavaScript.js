document.addEventListener("DOMContentLoaded", () => {
    const employeeList = document.getElementById("employeeList");
    const createEmployeeForm = document.getElementById("createEmployeeForm");
    const updateEmployeeForm = document.getElementById("updateEmployeeForm");
    const deleteEmployeeForm = document.getElementById("deleteEmployeeForm");

    function displayEmployees() {
        fetch("http://localhost:5223/api/EmpProfiles")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(employees => {
                employeeList.innerHTML = "";
                employees.forEach(employee => {
                    const listItem = document.createElement("li");
                    listItem.textContent = `EmpCode: ${employee.empCode}, DateOfBirth: ${employee.dateOfBirth}, EmpName: ${employee.empName}, DeptCode: ${employee.deptCode}, DeptMaster: ${employee.deptMaster}`;
                    employeeList.appendChild(listItem);
                });
            })
            .catch(error => {
                console.error("Fetch Error:", error);
                employeeList.innerHTML = "Error Fetching employees.";
            });
    }

    createEmployeeForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const dateOfBirth = document.getElementById("createDateOfBirth").value;
        const empName = document.getElementById("createEmpName").value;
        const deptCode = document.getElementById("createDeptCode").value;
        const deptMaster = document.getElementById("createDeptMaster").value;

        fetch(`http://localhost:5223/api/EmpProfiles`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ dateOfBirth, empName, deptCode, deptMaster })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(() => {
                document.getElementById("createDateOfBirth").value = "";
                document.getElementById("createEmpName").value = "";
                document.getElementById("createDeptCode").value = "";
                document.getElementById("createDeptMaster").value = "";
                displayEmployees();
            })
            .catch(error => {
                console.error("Fetch Error:", error);
            });
    });

    updateEmployeeForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const empCode = document.getElementById("updateEmpCode").value;
        const dateOfBirth = document.getElementById("updateDateOfBirth").value;
        const empName = document.getElementById("updateEmpName").value;
        const deptCode = document.getElementById("updateDeptCode").value;
        const deptMaster = document.getElementById("updateDeptMaster").value;

        fetch(`http://localhost:5223/api/EmpProfiles/${empCode}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ empCode, dateOfBirth, empName, deptCode, deptMaster })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(() => {
                document.getElementById("updateEmpCode").value = "";
                document.getElementById("updateDateOfBirth").value = "";
                document.getElementById("updateEmpName").value = "";
                document.getElementById("updateDeptCode").value = "";
                document.getElementById("updateDeptMaster").value = "";
                displayEmployees();
            })
            .catch(error => {
                console.error("Fetch Error:", error);
            });
    });

    deleteEmployeeForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const empCode = document.getElementById("deleteEmpCode").value;

        fetch(`http://localhost:5223/api/EmpProfiles/${empCode}`, {
            method: "DELETE"
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(() => {
                document.getElementById("deleteEmpCode").value = "";
                displayEmployees();
            })
            .catch(error => {
                console.error("Fetch Error:", error);
            });
    });

    displayEmployees();
});