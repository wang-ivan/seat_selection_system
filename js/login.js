


firebase.initializeApp({
  projectId: '***'
});

var db = firebase.firestore();
var ref = db.collection('login');

ref.get().then(querySnapshot => {
  querySnapshot.forEach(doc => {
    a = (doc.id, doc.data());
  });
});




function login() {
  var account = document.forms["form"]["Email"].value;
  var password = document.forms["form"]["Password"].value;

  if (account != a['account']) {
    document.getElementById('account-error').innerHTML = `<p style="color:red;"><i class="bi bi-exclamation-triangle"></i>帳號錯誤</p>`;
  }

  if (account == a['account']) {
    document.getElementById('account-error').innerHTML = `<p>&nbsp;</p>`;
    if (password != a['password']) {
      document.getElementById('password-error').innerHTML = `<p style="color:red;"><i class="bi bi-exclamation-triangle"></i>密碼錯誤</p>`;
    } else if (password == a['password']) {
      window.location.href = 'index.html';
      localStorage.login = 'true'
    }
  }
}


function changeUser() {
  var account = document.forms['formNew']['newAcount'].value;
  var pass1 = document.forms['formNew']['newPass'].value;
  var pass2 = document.forms['formNew']['newPass2'].value;
  if (pass1 != pass2) {
    document.getElementById('password-error2').innerHTML = `<p style="color:red;"><i class="bi bi-exclamation-triangle"></i>密碼和上面不一樣喔!</p>`;
  } else {
    var ref2 = db.collection('login').doc('2WpmxFP4FSWA31pYvZND');
    ref2.update({
      account: account,
      password: pass1
    })
    document.getElementById('successAlert').innerHTML = `<div class="alert alert-primary" role="alert">
                                                            帳密更改成功!
                                                          </div>`
  }
}


