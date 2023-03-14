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
                <td>${hoa.type}</td>
                <td>${hoa.amount}</td>
                <td>${hoa.price}</td>
                <td align="center">
                    <img src="${hoa.image}" alt="${hoa.image}" class="hoa" style="width: 150px; height: 100px;" />
                </td>
                <td align="center">
                    <a href="edit.html?id=${hoa.id}">Sửa
                        <img src="images/pencil.gif" alt="edit" />
                    </a>
                    <a href="" onclick="return confirm('Bạn có chắc chắn muốn xóa không?')">Xóa
                        <img src="images/bin.gif" width="16" height="16" alt="delete" />
                    </a>
                </td>`;

            bodyElement.appendChild(trElement);

        })
    } catch (error) {
        console.log('Lỗi ', error);
    }
})()