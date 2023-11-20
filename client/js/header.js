var currentUser = localStorage.getItem('currentUser');
currentUser = JSON.parse(currentUser);

if (currentUser) {
    $('#li1').show();
    $('#li2').show();
    $('#li2').html(`<p>Xin chào ${currentUser.fullname}</p>`);
} else {
    $('#li3').show();
}

function onClickLogout() {
    localStorage.removeItem('currentUser');
    location = 'index.html';
}