(async () => {
    try {
        var listHoa = await axios.get('http://localhost:3000/hoa');
        listHoa = listHoa.data;
        var bodyElement = document.getElementById('body');

        listHoa.forEach(function (hoa) {
            var trElement = document.createElement('tr');
            trElement.innerHTML =
                `<td class="align-center">${hoa.id}</td>
                <td><a href="">${hoa.name}</a></td>
                <td>${hoa.type_name}</td>
                <td>${hoa.amount}</td>
                <td>${hoa.price}</td>
                <td align="center">
                    <img src="${hoa.image}" alt="${hoa.image}" class="hoa" style="width: 150px; height: 100px;" />
                </td>
                <td align="center">
                    <a href="edit.html?id=${hoa.id}">Sửa
                        <img src="images/pencil.gif" alt="edit" />
                    </a>
                    <a href="javascript: void(0)" onclick="onClickDelete(${hoa.id})">Xóa
                        <img src="images/bin.gif" width="16" height="16" alt="delete" />
                    </a>
                </td>`;

            bodyElement.appendChild(trElement);

        })
    } catch (error) {
        console.log('Lỗi ', error);
    }
})()

async function onClickDelete(id) {
    if (confirm('Bạn có chắc chắn muốn xóa không?')) {
        try {
            var results = await axios({
                method: "POST",
                url: "http://localhost:3000/hoa/delete",
                data: { id: id },
                headers: { "Content-Type": "application/json" },
            });

            // console.log('results: ', results);
            window.location = 'list.html';
        } catch (error) {
            console.log('Lỗi ', error);
        }
    }
}