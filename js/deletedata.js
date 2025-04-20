

firebase.initializeApp({
    projectId: 'test-3f385',
});

var db = firebase.firestore();
var key = db.collection('student').doc('keys');


function deleteSession() {
    if (!window.confirm('確定要刪除嗎!')) {
        return;
    }
    let thisSession = document.getElementById(event.target.parentNode.id);
    let sessId = thisSession.id.split(/[\D]/)[1]
    key.update({
        keylist: firebase.firestore.FieldValue.arrayRemove(`${sessId}`)
    })

    let session = db.collection('student').doc(`${sessId}`);
    session.delete()
    getList(key, 'dele')
    document.getElementById(`L${sessId}-detail`).innerHTML = '';

}


function deleteStudent() {

    let thisSession = document.getElementById(event.target.parentNode.parentNode.parentNode.id);
    let sessId = thisSession.id.split(/[\D]/)[1];
    let thisStudent = document.getElementById(event.target.parentNode.parentNode.id);
    let stuId = thisStudent.id;
    let session = db.collection('student').doc(`${sessId}`);
    session.get().then(doc => {
        var nameL = doc.data().name
        nameL.splice(stuId,1)
        var dietL = doc.data().diet
        dietL.splice(stuId,1)
        var otherL = doc.data().other
        otherL.splice(stuId,1)
        delOption(nameL, dietL, otherL)
      });

    function delOption(nameL, dietL, otherL) {
        session.update({
            name: nameL,
            diet: dietL,
            other: otherL
        })
        renewList(sessId)

    }
    
    

}