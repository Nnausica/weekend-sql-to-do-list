$(document).ready(onReady);

function onReady(){
    $(`#addTask`).on(`click`, sendList);

    $( '#toDoList' ).on( 'click', '.deleteTask', deleteTask );

    $( '#toDoList' ).on( 'click', '.completedtask', completeTask);

    // $( '#toDoList' ).on( 'click', '.completedtask', turnGreen);


}//end onReady

function getList(){
    $.ajax({
        method: 'GET',
        url: '/toDoList'
    }).then( function( response ){
        console.log( 'back from GET:', response );
        // empty output el
        let el = $( '#toDoList' );
        el.empty();
        // append each message to DOM
        for( let i=0; i< response.length; i++ ){
            let appendString= ``

        if( response[i].completed === false){
            appendString+= `<li> ${response[i].task}: completed? ${ response[i].completed } <button class="completedtask" data-id="${ response[i].id }">completed</button>`;}
        else {appendString+= `<li class=completed> ${response[i].task}: completed? ${ response[i].completed }`}
        
            appendString+=`<button class="deleteTask" data-id="${ response[i].id }">delete</button></li>`;


        el.append( appendString ) }


    }).catch( function( err ){
        console.log( err );
        alert( 'bad get function' );
    })
} //end sendList


function sendList(){
    console.log( 'in sendList' );
    // get user input
    let objectToSend = {
        task: $( '#toDoItem').val(),
        completed: $( '#completed').val()
    }
    console.log( 'sending:', objectToSend );
    // send to server
    $.ajax({
        method: 'POST',
        url: 'toDoList',
        data: objectToSend
    }).then( function( response ){
        console.log( 'back from POST:', response );
        $( '#toDoList' ).val( '' );
        getList();
    }).catch( function( err ){
        alert( 'bad post function' );
        console.log( err );
    })
}// end sendTask

function deleteTask(){
    console.log( 'in deleteTask:', $(this).data( 'id' ) );
    $.ajax({
        method: 'DELETE',
        url: '/toDoList?id='+$(this).data( 'id' ),
    }).then( function( response){
        console.log( 'back from delete:', response)
        getList();
    }).catch(function(err){
        console.log(err);
        alert( 'error deleting task')
    })
}//end deleteMessage

function completeTask(){
    console.log( 'in complete task:', $(this).data('id'));
    $.ajax({ 
        method: 'PUT',
        url: '/toDoList?id='+ $(this).data('id'),
    }).then(function(response){
        console.log( 'back from update:', response);
        getList();
    }).catch( function (err){
        console.log(err);
        alert( 'error completing task');
    })
}

// function turnGreen(){
//     $(this).parent().css(`background-color`,`greenyellow`);
// };