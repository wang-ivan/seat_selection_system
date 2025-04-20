

firebase.initializeApp({
    projectId: 'test-3f385',
});
var db = firebase.firestore();
var key = db.collection('student').doc('keys');

function addSession() {

    var session = document.getElementById('Session').value;
    console.log(session)
    var result = chickSession(session);
    result = Number(result);
    if (result != 0) {

        key.update({
            keylist: firebase.firestore.FieldValue.arrayUnion(`${result}`)
        })
        var ref = db.collection('student').doc(`${session}`);
        ref.set({
            name: [],
            diet: [],
            other: []
        }).then(() => {
            console.log('set data successful');
        });
        var tab = document.querySelectorAll('.tab-pane')
        for (i in tab) {
            tab[i].className = "tab-pane fade"
        }
        getList(key, 'add');
        document.getElementById('close').click();
        document.getElementById('lis').lastChild.click()

    }



}

// 檢查session是否存在
function chickSession(session) {
    var parent = document.querySelectorAll('.n');

    for (i in parent) {
        try {
            let se = (parent[i].id.split('L')[1]);
            if (session == se) {
                document.getElementById('alert').innerHTML = `<p style="color:red;">此屆已存在</p>`
                return 0
            }
        } catch (e) {
            break
        }

    }
    return session
}


function addStudent() {
    try {
        var session = document.getElementById(event.target.parentNode.parentNode.id);
        var sessNa = session.name.split(/[form]/)[5];
        var name = document.forms[`formm${sessNa}`]["N"].value;
        var diet = document.forms[`formm${sessNa}`]["D"].value;
        var other = document.forms[`formm${sessNa}`]["O"].value;
        if (name == '' || diet == "飲食習慣") {
            alert("姓名或飲食習慣未填寫")
        } else {
            let ref = db.collection('student').doc(`${sessNa}`);
            ref.get().then(doc => {
                n = doc.data().name;
                d = doc.data().diet;
                o = doc.data().other;
                n.push(name)
                d.push(diet)
                o.push(other)
                updateStudent(n, d, o, ref)
            });
        }
    } catch { }

    
    async function updateStudent(n, d, o, ref) {
        await ref.update({
            name: n,
            diet: d,
            other: o,
        })
        renewList(sessNa)

    }
}


// 更新表單
function renewList(sessNa) {
    var ref = db.collection('student').doc(`${sessNa}`);
    ref.get().then(doc => {
        lis = `
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="row">No.</th>
                            <th class="col-3" scope="col">姓名</th>
                            <th class="col-2" scope="col">飲食習慣</th>
                            <th class="col-4" scope="col">其它</th>
                            <th class="col-3" scope="col">操作</th>
                        </tr>
                    </thead>
                    <tbody id="T${sessNa}">`
        var keys = doc.data()
        var name = keys['name']
        var diet = keys['diet']
        var other = keys['other']
        for (j in name) {
            j = Number(j)
            lis += `<tr id="${j}">
                        <th scope="row">${j + 1}</th>
                        <td class="col-3">${name[j]}</td>
                        <td class="col-2">${diet[j]}</td>
                        <td class="col-4">${other[j]}</td>
                        <td class="col-3"><button type="button" class="btn btn-danger btn-sm" onclick="deleteStudent()">刪除</button></td>
                    </tr>`
        }
        lis += `<tr>
                        <th scope="row">#</th>
                        <td colspan="4">
                            <form class="row" action="javascript:addStudent();" name="formm${sessNa}" id="form${sessNa}">
                                <div class="col-3">
                                    <input type="text" class="form-control" id="N" placeholder="姓名">
                                </div>
                                <div class="col-2">
                                    <select class="form-select" id="D">
                                        <option selected>飲食習慣</option>
                                        <option value="葷">葷</option>
                                        <option value="素">素</option>
                                    </select>
                                </div>
                                <div class="col-4">
                                    <input type="text" class="form-control" id="O" placeholder="備註">
                                </div>
                                <div class="col-3">
                                    <button type="submit" class="btn btn-success btn-sm" style="margin-left:0px;" onclick="addStudent()">新增</button>
                                </div>
                            </form>
                        </td>
                    
                </tr>`
        lis += `        </tbody>
                </table>
                <button type="button" class="btn btn-danger" onclick="deleteSession()">刪除這屆</button>
            `
        document.getElementById(`L${sessNa}-detail`).innerHTML = lis
    })
}