// When a user submits an entry. Post the information to the database
$(document).ready(function (){
    $("#entrySubmit").click(function (){
        var entry = document.getElementById("entry").value;
        var title = document.getElementById('entry-title').value;
        $.ajax({
            url: '/postEntry',
            type: "POST",
            data: { title: title, entry: entry },
            success: function(){
                $("#entry-list").empty();
                getJournals();
            }
        });
    });
    
    getJournals();
});

// Use Ajax to get entries off the database
function getJournals(){
    $.ajax({
        url: '/getEntry',
        type: "GET",
        dataType: 'json',
        success: function(data) {
            if(data.length > 0){
                $("#entry-list").empty();
            }
            else{
                $("#entry-list").append("<div class='card'><h4>No Entries Yet!</h4></div>")
            }
            $.each(data, function (i, text){
                console.log(text.entry);
                // Parsing the date into MM-DD-YYYY format
                var date = '';
                for (i=5; i < 10; i++){
                    date += text.entry_date[i]
                }
                date += '-';
                for (i=0; i < 4; i++){
                    date += text.entry_date[i]
                }
                
                // Adding the entries to the page
                $("#entry-list").append("<div class='card'><h4 class='title'>" 
                                        + text.title + 
                                        "</h4><h5>" 
                                        + date + 
                                        "</h5><div class='card-body'>" 
                                        + text.entry + 
                                        "<br><br><button type='button' class='btn btn-danger' id='delete' onclick='deleteJournal("
                                        + text.id +
                                        ")'>Delete</button></div></div><br>");
            });
        }
    }); 
}

// Delete the journal off the database and refresh the section
function deleteJournal(item){
    console.log(item);
    $.ajax({
        type: "DELETE",
        url: "/deleteEntry",
        data: { item: item },
        success: function(){
            // Refresh the list
           $("#entry-list").empty();
            getJournals(); 
        }
    })
}