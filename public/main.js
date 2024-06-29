$('#signup').click(()=>{
    if($('#username').val() != '' && $('#password').val() != ''){
        let data = {
            username: $('#username').val(),
            password: $('#password').val()
        }
        axios.post('/auth/register', data)
        .then(()=>{
            console.log('Registered successfully')
        })
        .catch((err)=>{
            console.log(err)
        })
    }
})
$('#login').click(()=>{
    if($('#username').val() != '' && $('#password').val() != ''){
        let data = {
            username: $('#username').val(),
            password: $('#password').val()
        }
        axios.post('/auth/login', data)
        .then(()=>{
            console.log('Logged in successfully')
            window.location.href = '/homepage';
        })
        .catch((err)=>{
            console.log(err)
        })
    }
})