

firebase.initializeApp({
    projectId: 'test-3f385',
});

var db = firebase.firestore();
var key = db.collection('student').doc('keys');
var Name = [];
var namelis;
var public_name;
processSheetsData()
// 顯示屆數選單
async function processSheetsData() {

    await key.get().then(doc => {
        selectOp(doc.data()['keylist']);
    });

    function selectOp(session) {
        var select = `<select class="form-select" id="sel">
                            <option selected>請選擇屆數</option>`
        for (i in session) {
            select += `<option value="${session[i]}">第${session[i]}屆</option>`
        }
        select += `</select>`
        document.getElementById('select').innerHTML = select;
    }
    var selSession = document.getElementById('sel');
    selSession.addEventListener('change', function () {
        readName(selSession.value);
    })
}

// 讀取資料庫姓名list
function readName(value) {
    Name = []
    var ref = db.collection('student').doc(`${value}`);
    ref.get().then(doc => {
        namelis = doc.data()['name'];
        for (i in namelis) {
            Name.push(namelis[i]);
        }
    });
}

// 迴圈顯示座位
function past() {
    var button = ''
    var j = 0
    for (i = 1; i <= 40; i++) {

        button += `<div class= 'col-1'><button type="button" id=${j}${i} class="btn btn-primary" onclick="past_name();touch()" style="width:120%;height:60px;margin-top:30%;font-size: 16px;" data-bs-toggle="modal" data-bs-target="#Modal">${j}${i}</button></div>`

        if (i > 8) {
            j = ''
        }
        if (i == 15 || i == 19 || i == 25 || i == 29 || i == 32 || i == 34 || i == 38) {
            button += `<div class= 'col-1'></div>`
        }
    }
    document.getElementById("seat").innerHTML = button
}




// 將姓名貼上Modal
function past_name() {    
    
    var button_list = '';
    for (i = 0; i < Name.length; i++) {
        button_list += `<div class='col-3' ><button type="button" id="name${i}" class="btn btn-secondary" style="width:100%;margin:5%;font-size: 20px;" onclick="input_name()">${Name[i]}</button></div>`;
    }

    document.getElementById("name_button").innerHTML = button_list;
     
}

function touch() {
    public_name = document.getElementById(event.target.id);
}

function input_name() {   
    var result = chickPublicName(public_name.innerHTML);
    var copy = document.getElementById(event.target.id).innerHTML;
    if (copy == "刪除" && result == 0) {
        public_name.className = "btn btn-primary";
        Name.push(public_name.innerHTML);
        public_name.innerHTML = public_name.id;

    } else if (copy == "保留" && result == 0) {
        // 按保留裡面有東西
        public_name.className = "btn btn-secondary";
        Name.push(public_name.innerHTML);
        public_name.innerHTML = public_name.id;

    } else if (copy == "保留") {
        public_name.className = "btn btn-secondary";

    } else if (copy == "刪除") {
        if (public_name.className == "btn btn-secondary") {
            public_name.className = "btn btn-primary";
        }
        
    } else if (result == 0) {
        Name.push(public_name.innerHTML);
        i = 0;
        while (copy != Name[i]) {
            i += 1;
        }
        Name.splice(i, 1);
        public_name.innerHTML = copy;
    } else {
        public_name.className = "btn btn-danger";
        i = 0;
        while (copy != Name[i]) {
            i += 1;
        }
        Name.splice(i, 1);
        public_name.innerHTML = copy;
    }

    document.getElementById("close").click();

}


function chickPublicName(box_value) {
    if (Number(box_value)) {
        return 1
    } else {
        return 0
    }
}

// 不速之客
function otherPeople() {
    var result = chickPublicName(public_name.innerHTML);
    var copy = document.forms['formOth']['othName'].value;
    if (copy == '') {
        return
    }
    if (result == 0) {
        Name.push(public_name.innerHTML);
        i = 0;
        while (copy != Name[i]) {
            i += 1;
        }
        Name.splice(i, 1);
        public_name.innerHTML = copy;
    } else {
        public_name.className = "btn btn-danger btn-lg";
        public_name.innerHTML = copy;
    }

    document.getElementById("close").click();
}