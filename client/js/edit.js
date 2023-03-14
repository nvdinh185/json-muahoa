var form = document.forms['edit-form'];
var hoaById;

(async () => {
    function getParameterByName(name, url = window.location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    var id = getParameterByName('id');

    try {

        hoaById = await axios.get('http://localhost:3000/hoa/hoa', {
            params: {
                id: id
            }
        });

        hoaById = hoaById.data;

        form.querySelector('input[name="ten"]').value = hoaById.name;
        form.querySelector('input[name="soluong"]').value = hoaById.amount;
        form.querySelector('input[name="giaban"]').value = hoaById.price;
        form.getElementsByTagName("img")[0].src = hoaById.image;

        console.log(hoaById);

        var listHoaType = await axios.get('http://localhost:3000/hoa/type');
        listHoaType = listHoaType.data;

        var selectElement = form.querySelector('select[name="loaihoa"]');

        for (const typeHoa of listHoaType) {
            var optionElement = document.createElement('option');
            optionElement.value = typeHoa.type_id;
            optionElement.innerText = typeHoa.type_name;
            if (hoaById.type === typeHoa.type_id) {
                optionElement.selected = 'selected';
            }

            selectElement.appendChild(optionElement);
        }
    } catch (error) {
        console.log('Lỗi ', error);
    }
})()

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", hoaById.id);
    for (const el of e.target) {
        if (el.files) {
            formData.append("file", el.files[0]);
        } else if (el.value) {
            formData.append(el.name, el.value);
        }
    }
    try {
        var results = await axios({
            method: "POST",
            url: "http://localhost:3000/hoa/edit",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        });

        //handle success
        console.log('results: ', results);
        window.location = 'list.html';
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