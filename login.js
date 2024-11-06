document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === '1234') { // 간단한 로그인 조건 (임시)
        alert('로그인 성공!');
        window.location.href = '../main/main.html'; // 로그인 후 메인 페이지로 이동
    } else {
        alert('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
});
