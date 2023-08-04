async function getListHoa() {
    try {
        var listHoa = await axios({
            method: "GET",
            url: "http://localhost:3000/hoa",
            // headers: { Authorization: `Bearer ${currentUser.token}` },
        });
        listHoa = listHoa.data;
        var bodyElement = document.getElementById('body');

        listHoa.forEach(function (hoa) {
            var trElement = document.createElement('tr');
            trElement.innerHTML = `
                <td class="align-center">${hoa.id}</td>
                <td><a href="">${hoa.name}</a></td>
                <td>${hoa.ten_loai_hoa}</td>
                <td align="center"><img src="avatar/${hoa.image}" class="hoa" /></td>
                <td align="center">
                    <a href="edit.html?id=${hoa.id}">Sửa <img src="images/pencil.gif" alt="edit" /></a>
                    <a href="javascript: void(0)" onclick="onClickDelete(${hoa.id})">Xóa
                    <img src="images/bin.gif" width="16" height="16" alt="delete" /></a>
                </td>`;

            bodyElement.appendChild(trElement);

        })
    } catch (error) {
        console.log('Lỗi ', error);
        var errorElement = document.getElementById('error');
        errorElement.innerText = 'Xảy ra lỗi!';
        Object.assign(errorElement.style, {
            display: 'block',
            color: 'red',
            fontStyle: 'italic',
            fontWeight: 'bold',
            backgroundColor: 'yellow'
        })
    }
}
getListHoa();

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var msg = getParameterByName('msg');

if (msg == 1) {
    var msgElement = document.querySelector('#msg');
    msgElement.style = 'display: block';
}