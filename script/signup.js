document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
    }

    console.log("회원가입 성공:", { username, email, password });

    alert("회원가입이 완료되었습니다!");
    window.location.href = "login.html";
});
