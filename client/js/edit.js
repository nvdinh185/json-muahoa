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
        var listLoaiHoa = await axios("http://localhost:3000/hoa/type");
        listLoaiHoa = listLoaiHoa.data;

        var hoaById = await axios(`http://localhost:3000/hoa/${edId}`);
        hoaById = hoaById.data;

        var id = $('input[name="id"]');
        id.val(hoaById.id);
        var name = $('input[name="name"]');
        name.val(hoaById.name);
        var image = $('#image');
        image.attr('src', `uploads/${hoaById.image}`);

        var selectElement = $('select[class="input-short"]');
        selectElement.html(`<option value=''>-- Chọn loại hoa --</option>`);

        for (const type of listLoaiHoa) {
            var optionElement = $('<option>');
            optionElement.val(type.id);
            optionElement.text(type.name);
            if (hoaById.cat_id === type.id) {
                optionElement.attr('selected', 'selected');
            }

            selectElement.append(optionElement);
        }
    } catch (error) {
        console.log('Lỗi: ' + error);
        var errorElement = $('#error');
        errorElement.text('Xảy ra lỗi khi lấy dữ liệu để sửa!');
        errorElement.attr('style', 'color: red; font-style: italic;');
    }
}
showHoaToEdit();

var form = $('#edit-form');
form.on('submit', async function (e) {
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
        var errorElement = $('#error');
        errorElement.text('Xảy ra lỗi khi sửa!');
        errorElement.attr('style', 'color: red; font-style: italic;');
    }
})