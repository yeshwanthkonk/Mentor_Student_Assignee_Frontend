var host = "https://mentor-student-assignee-yesh.herokuapp.com/";

async function create_mentor(){
    try{
        let name = document.getElementById("create_mentor_name").value;
        let id = document.getElementById("create_mentor_id").value;
        let detail = {"name": name, "id": id}
        start_loading_screen();
        let response = await fetch(host+"create_mentor",{
            method: "POST",
            headers: { 
                'Content-Type':  
                    'application/json;charset=utf-8' 
            },
            body: JSON.stringify(detail),
        })
        let result = await response.json();     
        if(response.status != 200){
            error_notification(result["detail"]);
        }
        else{
            success_notification("Success");
            load_mentor_list();
        }
    }
    catch(err){
        error_notification(err.message);
    }
    stop_loading_screen();
}
async function create_student(){
    try{
        let name = document.getElementById("create_student_name").value;
        let id = document.getElementById("create_student_id").value;
        let detail = {"name": name, "id": id}
        start_loading_screen();
        let response = await fetch(host+"create_student",{
            method: "POST",
            headers: { 
                'Content-Type':  
                    'application/json;charset=utf-8' 
            },
            body: JSON.stringify(detail),
        })
        let result = await response.json();     
        if(response.status != 200){
            error_notification(result["detail"]);
        }
        else{
            success_notification("Success");
            load_student_list();
        }
    }
    catch(err){
        console.log(err)
        error_notification(err.message);
    }
    stop_loading_screen();
}
async function student_mentor_assign(){
    try{
        let student_id = document.getElementById("student_assign_list").value;
        let mentor_id = document.getElementById("mentor_assign_list").value;
        let detail = {"student_id": student_id, "mentor_id": mentor_id}
        if(student_id == "" || mentor_id == ""){
            error_notification("Please Select both Mentor and Student to Assignee");
            return;
        }
        start_loading_screen();
        let response = await fetch(host+"assigne_students_mentor",{
            method: "POST",
            headers: { 
                'Content-Type':  
                    'application/json;charset=utf-8' 
            },
            body: JSON.stringify(detail),
        })
        let result = await response.json();     
        if(response.status != 200){
            error_notification(result["detail"]);
        }
        else{
            success_notification("Success");
            load_student_list();
        }
    }
    catch(err){
        console.log(err)
        error_notification(err.message);
    }
    stop_loading_screen();
}
async function load_mentor_list(){
    try{
        let response = await fetch(host+"get_mentors")
        let result = await response.json();
        result = result["data"]
        console.log("Mentors", result)  
        if(response.status != 200){
            error_notification(result["detail"]);
        }
        else{
            success_notification("Success");
            let select = document.getElementById("mentor_assign_list");
            let select_2 = document.getElementById("mentor_assign_list-2");
            select.innerHTML = "<option value='' selected disabled>Select Mentor</option>";
            select_2.innerHTML = "<option value='' selected disabled>Select Mentor</option>";
            result.forEach((item)=>{
                select.innerHTML += `
                <option value=${item["_id"]}>${item["name"]+"-"+item["id"]}</option>
                `;
                select_2.innerHTML += `
                <option value=${item["_id"]}>${item["name"]+"-"+item["id"]}</option>
                `;
            })
        }
    }
    catch(err){
        console.log(err)
        error_notification(err.message);
    }
}
async function load_student_list(){
    try{
        let response = await fetch(host+"get_students")
        let result = await response.json();
        result = result["data"]
        console.log("Students", result)  
        if(response.status != 200){
            error_notification(result["detail"]);
        }
        else{
            success_notification("Success");
            let select = document.getElementById("student_assign_list");
            select.innerHTML = "<option value='' selected disabled>Select Student</option>";
            result.forEach((item)=>{
                select.innerHTML += `
                <option value=${item["_id"]}>${item["name"]+"-"+item["id"]}</option>
                `;
            })
        }
    }
    catch(err){
        console.log(err)
        error_notification(err.message);
    }
}

async function list_students(){
    try{
        let mentor_id = document.getElementById("mentor_assign_list-2").value;
        if(mentor_id == ""){
            error_notification("Please Select Mentor to list");
            return;
        }
        // start_loading_screen();
        let response = await fetch(host+`get_students/${mentor_id}`)
        let result = await response.json();  
        console.log("List", result); 
        result = result["result"]
        if(response.status != 200){
            error_notification(result["detail"]);
        }
        else{
            success_notification("Success");
            let rows = document.getElementById("rows");
            rows.innerHTML = "";
            let row_id = 1
            result.forEach((item) => {
                rows.innerHTML += `
                <tr>
                <th scope="row">${row_id}</th>
                <td>${item["name"]}</td>
                <td>${item["id"]}</td>
                </tr>
                `
                row_id++;
            })
        }
    }
    catch(err){
        console.log(err)
        error_notification(err.message);
    }
    stop_loading_screen();
}

load_mentor_list();
load_student_list();