if (localStorage.getItem('currentUser')) {
    // Nếu đã đăng nhập thì chuyển hướng sang trang index.html
    location = 'index.html';
} else {
    var form = $('#login-form');

    form.on('submit', async function (e) {
        e.preventDefault();

        const userInfo = {};
        for (const el of e.target) {
            if (el.name) {
                userInfo[el.name] = el.value;
            }
        }
        // console.log(userInfo);
        try {
            var user = await axios({
                method: "POST",
                url: "http://localhost:3000/hoa/login",
                data: userInfo,
                headers: { "Content-Type": "application/json" },
            });

            // handle success
            localStorage.setItem('currentUser', JSON.stringify(user.data));
            location = 'index.html';
        } catch (err) {
            // console.log(err.message);
            var errorElement = $('#error');
            errorElement.text('Xảy ra lỗi khi đăng nhập!');
            errorElement.attr('style', 'color: red; font-style: italic;');
        }
    })
}