$('#signup').click(()=>{
    if($('#username').val() != '' && $('#password').val() != ''){
        let data = {
            username: $('#username').val(),
            password: $('#password').val()
        }
        app.post('/auth/register', data)
        .then(()=>{
            console.log('Registered successfully')
        })
        .catch((err)=>{
            console.log(err)
        })
    }
})