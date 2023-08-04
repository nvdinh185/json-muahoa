async function getListLoaiHoa() {
    try {
        var listLoaiHoa = await axios({
            method: "GET",
            url: "http://localhost:3000/hoa/type",
            // headers: { Authorization: `Bearer ${currentUser.token}` },
        });
        listLoaiHoa = listLoaiHoa.data;

        var selectElement = document.querySelector('select[class="input-short"]');
        selectElement.innerHTML = `<option value=''>-- Chọn loại hoa --</option>`;

        for (const type of listLoaiHoa) {
            var optionElement = document.createElement('option');
            optionElement.value = type.id;
            optionElement.innerText = type.name;

            selectElement.appendChild(optionElement);
        }
    } catch (error) {
        console.log('Lỗi: ' + error);
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
getListLoaiHoa();

var form = document.forms['add-form'];
form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData();
    for (const el of e.target) {
        if (el.files) {
            formData.append("file", el.files[0]);
        } else if (el.name) {
            formData.append(el.name, el.value);
        }
    }
    try {
        var results = await axios({
            method: "POST",
            url: "http://localhost:3000/hoa/add",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        });

        //handle success
        // console.log('results: ', results);
        location = 'list.html?msg=1';
    } catch (error) {
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
})