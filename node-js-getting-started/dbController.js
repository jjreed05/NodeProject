const dbModel = require('./dbModel.js')

function handleJournal(req, res){
    console.log('Requesting a journal entry')
    
    dbModel.getEntry(function(err, result){
        console.log('Journal Entry: ' + JSON.stringify(result.rows[0].entry))
        res.send(JSON.stringify(result.rows[0].entry))
    })
}

module.exports = {handleJournal: handleJournal}