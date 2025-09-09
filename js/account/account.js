firebase.auth().onAuthStateChanged((user) => {
    i f (user) {
        // ログイン中
        console.log("ログイン中のユーザー:", user.email);
        // たとえばユーザー名を表示したり、ログアウトボタンを出したり
    } else {
        // 未ログイン → 必要ならログインページに飛ばす
        console.log("未ログイン");
        // window.location.href = "/login.html"; など
    }
});

// Firebase初期化が先にされている前提
firebase.auth().onAuthStateChanged((user) => {
    const iconContainer = document.getElementById("accountIcon");

    if (user) {
        // ログインしている場合 → プロフィール画像表示（なければデフォルト）
        const photoURL = user.photoURL || "/images/default-user.png"; // 任意のデフォルト画像を用意してね

        iconContainer.innerHTML = `
            <img src="${photoURL}" class="account-icon" alt="アカウント" title="${user.email}" onclick="location.href='/account/edit.html'" />
        `;
    } else {
        // 未ログイン → 単なる灰色の丸
        iconContainer.innerHTML = `
            <div class="account-icon" title="ログイン" onclick="location.href='/account/login.html'"></div>
        `;
    }
});

// Firebase初期化済みの前提

const auth = firebase.auth();

auth.onAuthStateChanged(user => {
    const iconImg = document.getElementById('accountIcon');
    const iconLink = document.getElementById('accountIconLink');

    if (user) {
    // ログインしている場合、ユーザーのカスタムクレームやDBなどで管理者判定をする想定
    // ここではメールがadmin@example.comなら管理者と仮定
    if (user.email === 'admin@example.com') {
        iconImg.src = '/icon/admin.png';
        iconImg.alt = '管理者アカウント';
    } else {
        iconImg.src = '/icon/user.png';
        iconImg.alt = 'ユーザーアカウント';
    }
        iconLink.href = '/account/profile.html'; // プロフィール編集ページへ
    } else {
        // ログインしていない場合
        iconImg.src = '/icon/guest.png';
        iconImg.alt = 'ゲスト';
        iconLink.href = '/account/login.html'; // ログインページなどに飛ばしてもいい
    }
});
