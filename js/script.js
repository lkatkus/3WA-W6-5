// INITIAL FUNCTION
$(function() {
    sessionStorage.clear();

    // BUTTON LISTENER
    $("#btn-list").click(displayList);
    $("#btn-new").click(function(){
        displayNew();
    });
});

// DATA HANDLING ARRAY
var userInfoArr = [];
var userId = 1;

// FUNCTION DECLARATIONS
function displayList(){

    if(userInfoArr.length == 0){
        $("#myContainer" ).empty();
        $("#myContainer").append('EMPTY');
    }else{
        $("#myContainer").empty();
        userInfoArr = [];
        userInfoArr = JSON.parse(window.sessionStorage.getItem(1));

        for(let i = 0, j = userInfoArr.length; i < j; i++){

            // CREATE ROW FOR USER INFORMATION
            let userRow = $("<div></div>");
            $(userRow).addClass("userRow");

            // DISPLAY USER INFO
            let newSpan = $("<span></span>")
            $(newSpan).text(userInfoArr[i].id);
            $(userRow).append(newSpan);

            newSpan = $("<span></span>")
            $(newSpan).text(userInfoArr[i].userName);
            $(userRow).append(newSpan);

            newSpan = $("<span></span>")
            $(newSpan).text(userInfoArr[i].eMail);
            $(userRow).append(newSpan);

            newSpan = $("<span></span>")
            $(newSpan).text(userInfoArr[i].age);
            $(userRow).append(newSpan);
            $("#myContainer").append(userRow)

            // ADD MANIPULATION BUTTONS
            $(userRow).append('<button type="button" name="button" onclick="deleteUser('+ userInfoArr[i].id + ')">Delete</button>');
            $(userRow).append('<button type="button" name="button" onclick="displayNew('+ userInfoArr[i].id +')">Update</button>');
        }
    }
}

function displayNew(id){

    // EMPTY CONTAINER
    $("#myContainer" ).empty();

    // CREATING INPUTS
    $("#myContainer" ).append('<form id="submitForm">');
    $("#submitForm").append('<div class="row"><input id="userName" type="text" name="userName" value="default Name"><label for="userName">Username</label></div>');
    $("#submitForm").append('<div class="row"><input id="userEmail" type="text" name="userEmail" value="default Email"><label for="userEmail">Email</label></div>');
    $("#submitForm").append('<div class="row"><input id="userAge" type="number" name="userAge" value="10"><label for="userAge">Age</label></div>');

    // IF UPDATING USER ID IS PASSED. ADD INFO TO FORM
    if(id){
        for(let i = 0; i < userInfoArr.length; i++){
            if(userInfoArr[i].id == id){
                $("#userName").val(userInfoArr[i].userName);
                $("#userEmail").val(userInfoArr[i].eMail);
                $("#userAge").val(userInfoArr[i].age);
                break;
            }
        }
    }

    // ADDING BUTTONS
    $("#submitForm").append('<button id="btn-submit" type="button" name="button">Submit</button>');
    $("#submitForm").append('<button id="btn-cancel" type="button" name="button">Cancel</button>');

    $("#btn-cancel").click(displayList);
    $("#btn-submit").click(function(){
        if(id){
            submitJSON(id);
        }else{
            submitJSON();
        }
    });
}

function submitJSON(id){

    // CREATE USER OBJECT FROM INPUTS
    let newUserObject = {
        id: userId++,
        userName: $('#userName').val(),
        eMail: $('#userEmail').val(),
        age: parseInt($('#userAge').val())
    };

    // ADD ID TO USER IF UPDATING
    if(id){
        for(let i = 0; i < userInfoArr.length; i++){
            if(userInfoArr[i].id == id){
                userInfoArr[i].userName = $('#userName').val();
                window.sessionStorage.setItem('1',JSON.stringify(userInfoArr));
                displayList();
            }
        }
    }

    // ADD NEW USER PATH
    if(!id){
        userInfoArr.push(newUserObject);
        window.sessionStorage.setItem('1',JSON.stringify(userInfoArr));
        displayList();
    }

}

function deleteUser(deleteUserId){
    for(let i = 0; i < userInfoArr.length; i++){
        if(userInfoArr[i].id == deleteUserId){
            userInfoArr.splice(i,1);
            break;
        }
    }
    window.sessionStorage.setItem('1',JSON.stringify(userInfoArr));
    displayList();
}
