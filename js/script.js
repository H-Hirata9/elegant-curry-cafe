document.addEventListener('DOMContentLoaded', function() {
    // ヘッダー固定の挙動
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
    
    // モバイルメニューの切り替え
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });
    
    // ナビゲーションリンクのスクロール
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // モバイルメニューを閉じる
                    menuToggle.classList.remove('active');
                    nav.classList.remove('active');
                }
            }
        });
    });
    
    // メニュータブの切り替え
    const menuTabs = document.querySelectorAll('.menu-category');
    const menuContents = [
        // カレー以外のメニューコンテンツを用意
        {
            category: 'appetizer',
            items: [
                {
                    name: 'フロマージュの盛り合わせ',
                    price: '¥1,200',
                    desc: '厳選された3種のチーズを季節のフルーツやナッツと共に。ワインとの相性も抜群です。',
                    img: 'appetizer1.jpg'
                },
                {
                    name: 'シャルキュトリープレート',
                    price: '¥1,400',
                    desc: '生ハムやパテなど、シャルキュトリーの盛り合わせ。自家製ピクルスを添えて。',
                    img: 'appetizer2.jpg'
                },
                {
                    name: 'エスカルゴのブルゴーニュ風',
                    price: '¥1,300',
                    desc: 'ガーリックバターでじっくり焼き上げた伝統的なエスカルゴ料理。香ばしい香りが食欲をそそります。',
                    img: 'appetizer3.jpg'
                },
                {
                    name: '鴨のコンフィのサラダ仕立て',
                    price: '¥1,500',
                    desc: '低温でじっくり調理した鴨肉のコンフィを、地元の新鮮な野菜と合わせたサラダ。自家製ドレッシングでお楽しみください。',
                    img: 'appetizer4.jpg'
                }
            ]
        },
        {
            category: 'dessert',
            items: [
                {
                    name: 'クレーム・ブリュレ',
                    price: '¥800',
                    desc: 'なめらかなカスタードと香ばしいカラメルの絶妙なハーモニー。当店の定番デザート。',
                    img: 'dessert1.jpg'
                },
                {
                    name: 'タルト・タタン',
                    price: '¥900',
                    desc: 'キャラメリゼしたりんごの香りと甘さが広がる、フランスの伝統的なアップルパイ。バニラアイスを添えて。',
                    img: 'dessert2.jpg'
                },
                {
                    name: 'ショコラ・シャンティ',
                    price: '¥950',
                    desc: '濃厚なガナッシュを使った大人のチョコレートケーキ。カカオ72%の風味をお楽しみください。',
                    img: 'dessert3.jpg'
                },
                {
                    name: 'パリ・ブレスト',
                    price: '¥850',
                    desc: '軽やかなシュー生地とプラリネクリームの組み合わせが絶妙。ナッツの香ばしさが特徴です。',
                    img: 'dessert4.jpg'
                }
            ]
        },
        {
            category: 'drink',
            items: [
                {
                    name: 'ヴィンテージワイン各種',
                    price: '¥800〜',
                    desc: 'フランス各地から取り寄せた厳選ワイン。グラスでもお楽しみいただけます。詳しくはスタッフにお尋ねください。',
                    img: 'drink1.jpg'
                },
                {
                    name: 'クラフトビール',
                    price: '¥950',
                    desc: '日本各地のクラフトブルワリーから季節のビールをご用意。カレーとの意外な相性をお楽しみください。',
                    img: 'drink2.jpg'
                },
                {
                    name: 'スパイスジンジャーエール',
                    price: '¥700',
                    desc: '自家製ジンジャーシロップにカルダモンやシナモンなどのスパイスを加えた、当店オリジナルのソフトドリンク。',
                    img: 'drink3.jpg'
                },
                {
                    name: 'ハーブティー各種',
                    price: '¥650',
                    desc: 'ミントやカモミール、ルイボスなど数種類のハーブティーをご用意。食後のリラックスタイムにどうぞ。',
                    img: 'drink4.jpg'
                }
            ]
        }
    ];
    
    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // アクティブタブの切り替え
            menuTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            const menuItemsContainer = document.querySelector('.menu-items');
            
            if (category === 'curry') {
                // カレーメニューは静的HTMLにあるのでそれを表示
                menuItemsContainer.innerHTML = document.querySelector('.curry-menu').innerHTML;
            } else {
                // その他のメニューはJSで動的に生成
                const menuContent = menuContents.find(content => content.category === category);
                
                if (menuContent) {
                    let html = '';
                    
                    menuContent.items.forEach(item => {
                        html += `
                            <div class="menu-item">
                                <div class="menu-item-image">
                                    <img src="images/${item.img}" alt="${item.name}">
                                </div>
                                <div class="menu-item-content">
                                    <h3>${item.name} <span>${item.price}</span></h3>
                                    <p>${item.desc}</p>
                                </div>
                            </div>
                        `;
                    });
                    
                    menuItemsContainer.innerHTML = html;
                }
            }
        });
    });
    
    // 予約フォームの送信処理（デモ用）
    const reservationForm = document.querySelector('.reservation-form');
    
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // ここに実際の送信処理を追加
            alert('予約リクエストを受け付けました。確認のご連絡を差し上げます。');
            this.reset();
        });
    }
});