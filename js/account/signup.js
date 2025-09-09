const firebaseConfig = {
    apiKey: "AIzaSyCFI3i12ddWcjzZ0vfBjT1RlVrVfRuspAg",
    authDomain: "routenote-755cc.firebaseapp.com",
    projectId: "routenote-755cc",
    storageBucket: "routenote-755cc.appspot.com",
    messagingSenderId: "367079377917",
    appId: "1:367079377917:web:a39bec43528756f34ce794"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();  // Firestoreを使う

document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const lastName = document.getElementById("lastName").value.trim();
    const firstName = document.getElementById("firstName").value.trim();
    const birthDate = document.getElementById("birthDate").value;
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const checkpassword = document.getElementById("checkpassword").value;

    if (password != checkpassword) {
        alert("エラー：パスワードが一致しません");
        return;
    }

    const errorMsg = document.getElementById("errorMsg");
    errorMsg.textContent = "";

    try {
        // ユーザー作成
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const uid = userCredential.user.uid;

        // Firestoreにプロフィール情報を保存
        await db.collection("users").doc(uid).set({
            lastName,
            firstName,
            birthDate,
            username,
            email,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });

        alert("登録成功！メール: " + email);
        window.location.href = "/index.html";

    } catch (error) {
        errorMsg.textContent = "登録エラー: " + error.message;
    }
});
