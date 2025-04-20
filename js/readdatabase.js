





// 先載入資料庫
firebase.initializeApp({
    projectId: 'test-3f385',
});

var db = firebase.firestore();
var ref = db.collection('student').doc('keys');
getList(ref, 'load')



function getList(ref, o) {

    ref.get().then(doc => {
        var keys = doc.data()
        var Key = keys['keylist']
        option(Key, o)
    })
}

async function option(Key, o) {
    var lisname = ''    // button
    var lis = '';       // detail
    for (i in Key) {
        lisname += `<button class="nav-link n" id="L${Key[i]}" data-bs-toggle="pill" data-bs-target="#L${Key[i]}-detail" type="button" role="tab" aria-controls="L${Key[i]}-detail" aria-selected="false">第${Key[i]}屆</button>`
        var ref = db.collection('student').doc(`${Key[i]}`);
        await ref.get().then(doc => {
            lis = `<div class="tab-pane fade" id="L${Key[i]}-detail" role="tabpanel" aria-labelledby="L${Key[i]}" tabindex="0">
                    <div class="container table-responsive">
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
                        <tbody class="table-group-divider" id="T${Key[i]}">`
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
                                <form class="row" action="javascript:addStudent();" name="formm${Key[i]}" id="form${Key[i]}">
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
                    </div>
                    <button type="button" class="btn btn-danger" onclick="deleteSession()">刪除這屆</button>                   
                </div>
                `
            document.getElementById('detail').innerHTML += lis
        })
    }
    lisname += `<button class="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#addModal" type="button">+</button>`
    document.getElementById('lis').innerHTML = lisname

    if (o == 'load') {
        document.getElementById('lis').firstChild.click()
    } else {
        document.getElementById('lis').lastChild.previousSibling.click()
    }
    
    
}

