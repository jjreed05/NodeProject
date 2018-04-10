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
                $("#entry").val("");
                $("#entry-title").val("");
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
            $.each(data.reverse(), function (i, text){
                console.log(text.entry);
                console.log(text.entry_date)
                // Parsing the date into MM-DD-YYYY format
                var date = '';
                for (i=5; i < 10; i++){
                    date += text.entry_date[i]
                }
                date += '-';
                for (i=0; i < 4; i++){
                    date += text.entry_date[i]
                }
                
                /*$("#entry-list").append('<div class=row><div class="card"><div id="postlist"><div class="panel"><div class="panel-heading"><div class="text-left"><div class="row"><div class="col-sm-9"><h3 class="pull-left">'
                                        + text.title + '</h3></div><div class="col-sm-3"><h4 class="pull-right"><small><em>'
                                        + date + '</em></small></h4></div></div></div></div><div class="panel-body">'
                                        + text.entry + '</div></div></div>')*/
                
                // Adding the entries to the page
                $("#entry-list").append("<div class='card'><h4 class='title text-left'>" 
                                        + text.title + 
                                        "</h4><h5 class ='text-right'>" 
                                        + date + 
                                        "</h5><br><div class='card-body border rounded'><em>" 
                                        + text.entry + 
                                        "</em></div><br><br><div class='form-actions'><button type='button' class='btn btn-danger btn-sm' id='delete' onclick='deleteJournal("
                                        + text.id +
                                        ")'>Delete</button><a href='https://twitter.com/intent/tweet?text=" 
                                        + text.entry.split(" ").join('%20') + "' class='twitter-share-button' data-size='large' data-show-count='false'>Tweet</a><script async src='https://platform.twitter.com/widgets.js' charset='utf-8'></script></div></div></div><br>");
            });
        }
    }); 
}

// Delete the journal off the database and refresh the section
function deleteJournal(item){
    console.log(item);
    if (confirm("Are you sure you want to delete this post?") == true){
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
}

