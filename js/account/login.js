// Firebase 設定
const firebaseConfig = {
    apiKey: "AIzaSyCFI3i12ddWcjzZ0vfBjT1RlVrVfRuspAg",
    authDomain: "routenote-755cc.firebaseapp.com",
    projectId: "routenote-755cc",
    storageBucket: "routenote-755cc.appspot.com",
    messagingSenderId: "367079377917",
    appId: "1:367079377917:web:a39bec43528756f34ce794"
};

// 初期化
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// ログイン処理
document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const errorMsg = document.getElementById("errorMsg");

    errorMsg.textContent = "";

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("ログイン成功！ようこそ " + userCredential.user.email);
            window.location.href = "/index.html"; // ログイン後にトップページなどへ遷移
        })
        .catch((error) => {
            errorMsg.textContent = "ログインエラー: " + error.message;
        });
});
