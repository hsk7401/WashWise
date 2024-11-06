document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === '1234') { 
        alert('로그인 성공!');
        window.location.href = '../main/main.html'; 
    } else {
        alert('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
});
