// 言語切り替え用変数
let currentLanguage = 'ja';

// 通常のscriptタグで読み込んだNewsを表示（file://でも利用可能）
function loadUpdates() {
    // 更新リストのないページでは何もしない
    if (!document.getElementById('update-list')) return;
    renderUpdates(newsData.updates);
}


// Newsをレンダリングする関数
function renderUpdates(updates) {
    const updateList = document.getElementById('update-list');
    if (!updateList) return;
    //console.log(updateList); // nullなら要素が取得できていない
    updateList.innerHTML = ''; // 一旦リストをクリア
    updates.forEach(update => {
        const listItem = document.createElement('li');
        listItem.textContent = `${update.date} - ${update[currentLanguage]}`;
        const detailUrl = currentLanguage === 'en'
            ? (update.urlEn || update.url)
            : update.url;
        if (typeof detailUrl === 'string' && detailUrl) {
            try {
                const url = new URL(detailUrl, document.baseURI);
                if (url.protocol === 'https:' || url.protocol === 'http:') {
                    const detailLink = document.createElement('a');
                    detailLink.href = url.href;
                    detailLink.textContent = currentLanguage === 'en' ? 'Details' : '詳細';
                    listItem.append(' ', detailLink);
                }
            } catch (error) {
                console.warn('Invalid News detail URL:', detailUrl);
            }
        }
        updateList.appendChild(listItem);
    });
}

// 言語切り替え関数
function switchLanguage(lang) {
    
    // ページ全体の言語を更新 (メタ情報として適切)
    document.documentElement.lang = lang;
    // for News
    currentLanguage = lang;
    // persist selection so other pages open in the same language
    try {
        localStorage.setItem('preferredLanguage', lang);
    } catch (error) {
        console.warn('Unable to persist language preference:', error);
    }
    loadUpdates();

    const sections = document.querySelectorAll('[lang]');
    sections.forEach(section => {
        if (section.getAttribute('lang') === lang) {
            section.style.display = ''; // デフォルトの表示
        } else {
            section.style.display = 'none'; // 非表示
        }
    });
}

// toggle navigation
// ナビゲーションメニューの表示/非表示を切り替える関数
function toggleNav() {
    // ナビゲーション要素を取得
    const nav = document.querySelector('nav');
    
    // ナビゲーションメニューに "active" クラスをトグル
    // "active" クラスがあれば削除し、なければ追加する
    nav.classList.toggle('active');
}

// ナビゲーション全体にクリックイベントリスナーを追加
// ナビゲーションをクリックした際に toggleNav 関数を実行
document.querySelector('nav').addEventListener('click', toggleNav);


// ページ初期読み込み時にデフォルトの言語を設定
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang');
    let storedLang = null;
    try {
        storedLang = localStorage.getItem('preferredLanguage');
    } catch (error) {
        console.warn('Unable to read stored language preference:', error);
    }
    const initialLang = (urlLang === 'en' || urlLang === 'ja')
        ? urlLang
        : (storedLang === 'en' ? 'en' : 'ja');
    switchLanguage(initialLang); // URL指定 > 保存値 > 日本語デフォルト
});
