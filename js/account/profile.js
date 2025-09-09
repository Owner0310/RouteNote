// /js/account/profile.js

const firebaseConfig = {
    apiKey: "AIzaSyCFI3i12ddWcjzZ0vfBjT1RlVrVfRuspAg",
    authDomain: "routenote-755cc.firebaseapp.com",
    projectId: "routenote-755cc",
    storageBucket: "routenote-755cc.appspot.com",
    messagingSenderId: "367079377917",
    appId: "1:367079377917:web:a39bec43528756f34ce794"
};

// Firebase初期化（他で初期化済みなら不要）
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

const form = document.getElementById("profileForm");
const errorMsg = document.getElementById("errorMsg");

// ログインユーザー情報を取得してフォームにセット
auth.onAuthStateChanged(async (user) => {
    if (!user) {
        // ログインしていなければログインページへ
        window.location.href = "/account/login.html";
        return;
    }

    const uid = user.uid;
    try {
        const doc = await db.collection("users").doc(uid).get();
        if (doc.exists) {
            const data = doc.data();
            document.getElementById("lastName").value = data.lastName || "";
            document.getElementById("firstName").value = data.firstName || "";
            document.getElementById("birthDate").value = data.birthDate || "";
            document.getElementById("username").value = data.username || "";
            document.getElementById("email").value = data.email || user.email;
        } else {
            // Firestoreにユーザーデータがなければメールだけセット
            document.getElementById("email").value = user.email;
        }
    } catch (error) {
        errorMsg.textContent = "プロフィールの読み込みに失敗しました: " + error.message;
    }
});

// プロフィール更新の送信処理
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorMsg.textContent = "";

    const user = auth.currentUser;
    if (!user) {
        errorMsg.textContent = "ログインが必要です。";
        return;
    }

    const uid = user.uid;
    const lastName = document.getElementById("lastName").value.trim();
    const firstName = document.getElementById("firstName").value.trim();
    const birthDate = document.getElementById("birthDate").value;
    const username = document.getElementById("username").value.trim();

    try {
        await db.collection("users").doc(uid).update({
            lastName,
            firstName,
            birthDate,
            username,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
        alert("プロフィールを更新しました。");
    } catch (error) {
        errorMsg.textContent = "更新エラー: " + error.message;
    }
});
