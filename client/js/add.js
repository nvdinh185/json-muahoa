async function showListLoaiHoa() {
    try {
        var listLoaiHoa = await axios("http://localhost:3000/hoa/type");
        listLoaiHoa = listLoaiHoa.data;

        var selectElement = $('select[class="input-short"]');
        selectElement.html(`<option value=''>-- Chọn loại hoa --</option>`);

        for (const type of listLoaiHoa) {
            var optionElement = $('<option>');
            optionElement.val(type.id);
            optionElement.text(type.name);

            selectElement.append(optionElement);
        }
    } catch (error) {
        console.log('Lỗi: ' + error);
        var errorElement = $('#error');
        errorElement.text('Xảy ra lỗi khi lấy dữ liệu!');
        errorElement.attr('style', 'color: red; font-style: italic;');
    }
}
showListLoaiHoa();

var form = $('#add-form');
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
            method: "POST",
            url: "http://localhost:3000/hoa/add",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        });

        //handle success
        // console.log('results: ', results);
        location = 'list.html?msg=1';
    } catch (error) {
        var errorElement = $('#error');
        errorElement.text('Xảy ra lỗi khi thêm!');
        errorElement.attr('style', 'color: red; font-style: italic;');
    }
})