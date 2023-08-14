function getParameterByName(name, url = location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var edId = getParameterByName('id');

async function showHoaToEdit() {
    try {
        var listLoaiHoa = await axios({
            method: "GET",
            url: "http://localhost:3000/hoa/type",
        });
        listLoaiHoa = listLoaiHoa.data;

        var hoaById = await axios({
            method: "GET",
            url: `http://localhost:3000/hoa/${edId}`,
        });
        hoaById = hoaById.data;
        var id = document.querySelector('input[name="id"]');
        id.value = hoaById.id;
        var name = document.querySelector('input[name="name"]');
        name.value = hoaById.name;
        var image = document.querySelector('#image');
        image.src = `uploads/${hoaById.image}`;

        var selectElement = document.querySelector('select[class="input-short"]');
        selectElement.innerHTML = `<option value=''>-- Chọn loại hoa --</option>`;

        for (const type of listLoaiHoa) {
            var optionElement = document.createElement('option');
            optionElement.value = type.id;
            optionElement.innerText = type.name;
            if (hoaById.cat_id === type.id) {
                optionElement.selected = 'selected';
            }

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
showHoaToEdit();

var form = document.forms['edit-form'];
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
            method: "PUT",
            url: "http://localhost:3000/hoa/edit",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        });

        //handle success
        // console.log('results: ', results);
        location = 'list.html?msg=2';
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