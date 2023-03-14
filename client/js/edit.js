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

        var hoaById = await axios.get('http://localhost:3000/hoa/hoa', {
            params: {
                id: id
            }
        });

        hoaById = hoaById.data;

        var form = document.forms['edit-form'];

        form.querySelector('input[name="ten"]').value = hoaById.name;
        form.querySelector('input[name="soluong"]').value = hoaById.amount;
        form.querySelector('input[name="giaban"]').value = hoaById.price;
        form.getElementsByTagName("img")[0].src = hoaById.image;

        console.log(hoaById);
    } catch (error) {
        console.log('Lỗi ', error);
    }
})()