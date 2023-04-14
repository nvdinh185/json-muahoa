var form = document.forms['login-form'];

form.addEventListener('submit', async function (e) {
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
            data: userInfo
        });

        // handle success
        // console.log(user);
        localStorage.setItem('currentUser', JSON.stringify(user.data));
        location = 'list.html';
    } catch (err) {
        var errorElement = document.getElementById('error');
        errorElement.innerText = 'Xảy ra lỗi!';
        Object.assign(errorElement.style, {
            display: 'block',
            color: 'red',
            fontStyle: 'italic',
            fontWeight: 'bold'
        })
    }
})