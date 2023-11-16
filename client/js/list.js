async function getListHoa() {
    try {
        var listHoa = await axios("http://localhost:3000/hoa");
        listHoa = listHoa.data;
        var bodyElement = $('#body');

        listHoa.forEach(function (hoa) {
            var trElement = $('<tr>');
            trElement.html(`
                <td class="align-center">${hoa.id}</td>
                <td><a href="">${hoa.name}</a></td>
                <td>${hoa.ten_loai_hoa}</td>
                <td align="center"><img src="uploads/${hoa.image}" class="hoa" alt='Không có hình ảnh' /></td>
                <td align="center">
                    <a href="edit.html?id=${hoa.id}">Sửa<img src="images/pencil.gif" alt="edit" /></a>
                    <a href="javascript: void(0)" onclick="onClickDelete('${hoa.id}')">Xóa
                    <img src="images/bin.gif" width="16" height="16" alt="delete" /></a>
                </td>`);

            bodyElement.append(trElement);
        })
    } catch (error) {
        console.log('Lỗi ', error);
        var errorElement = $('#error');
        errorElement.text('Xảy ra lỗi khi lấy dữ liệu!');
        errorElement.attr('style', 'color: red; font-style: italic;');
    }
}
getListHoa();

function getParameterByName(name, url = location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var msg = getParameterByName('msg');

var msgElement = $('#msg');
if (msg == 1) {
    msgElement.attr('style', 'display: block');
    msgElement.text('Thêm thành công!');
} else if (msg == 2) {
    msgElement.attr('style', 'display: block');
    msgElement.text('Sửa thành công!');
} else if (msg == 3) {
    msgElement.attr('style', 'display: block');
    msgElement.text('Xóa thành công!');
}

async function onClickDelete(id) {
    if (confirm('Bạn có chắc muốn xóa không?')) {
        try {
            await axios({
                method: "DELETE",
                url: `http://localhost:3000/hoa/delete/${id}`,
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: `Bearer ${currentUser.token}`
                },
            });
            location = 'list.html?msg=3';
        } catch (error) {
            console.log('Lỗi ', error);
            var errorElement = $('#error');
            errorElement.text('Xảy ra lỗi khi xóa!');
            errorElement.attr('style', 'color: red; font-style: italic;');
        }
    }
}