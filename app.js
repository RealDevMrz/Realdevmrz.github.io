/* ==========================================================================
   MIORA V4 — Motion & Liquid Glass Application Logic (Persian / English)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // Helper for Persian digits
    function toPersianDigits(num) {
        const pDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        return num.toString().replace(/\d/g, x => pDigits[x]);
    }

    function formatPrice(usdVal, lang) {
        if (lang === 'fa') {
            const tomanVal = Math.round(usdVal * 58000); // 1 USD ~ 58,000 Toman
            const formatted = tomanVal.toLocaleString('fa-IR');
            return `${formatted} تومان`;
        }
        return `$${usdVal.toFixed(2)}`;
    }

    // ==========================================
    // 1. Bilingual Dictionary (FA / EN)
    // ==========================================
    const I18N = {
        fa: {
            langText: "EN / English",
            tag: "کارگاه شمع‌سازی موشن",
            navHome: "خانه", navCollections: "کلکسیون‌ها", navLab: "آزمایشگاه موشن", navEthos: "اصالت ساخت", navReviews: "نظرات",
            lblDockHome: "خانه", lblDockCol: "کلکسیون‌ها", lblDockLab: "آزمایشگاه", lblDockEthos: "اصالت", lblDockRev: "نظرات",
            badge: "نسخه ۴ — انیمیشن‌های موشن و فیزیک شیشه مایع",
            heroTitle: 'شکل‌گرفته در <span class="gradient-text">شیشه مایع.</span><br>ریخته‌شده در <span class="flame-text">شعله آتش.</span>',
            heroSub: "میورا V4 ترکیبی از انیمیشن‌های موشن، ظروف شیشه‌ای کریستالی دست‌ساز و شمع‌های معطر موم طبیعی سویا با پشتیبانی از ریال و تومان.",
            ctaExplore: "مشاهده کلکسیون‌ها", ctaLab: "آزمایشگاه رایحه",
            stat1Val: "۶۰ فریم", stat1Lbl: "انیمیشن‌های موشن",
            stat2Val: "۱۰۰٪ سویا", stat2Lbl: "موم ارگانیک",
            stat3Val: "کریستالی", stat3Lbl: "ظروف قابل شارژ",
            heroCandleTitle: "میورا لونا رز — عنبر و عود",
            heroCandleDesc: "چوب عود دودی، عنبر طلایی و گل رز دمشقی (برای خاموش/روشن کردن کلیک کنید)",
            heroAddBtn: "افزودن به سبد",
            moodTitle: "فضای دلخواه شما:", moodAll: "همه فضاها", moodCalm: "آرامش و سکون", moodEnergy: "گرما و انرژی", moodFocus: "تمرکز و عود", moodNight: "شب‌های عاشقانه",
            colTag: "دست‌پخت‌های فاخر", colTitle: "مجموعه شمع‌های میورا", colSub: "انیمیشن‌های استگر موشن، شمع‌های طبیعی در ظروف شیشه‌ای کریستال مایع را نمایان می‌سازند.",
            catAll: "همه ظروف", catAmber: "عنبر آسمانی", catBotanical: "پناهگاه گیاهی", catMidnight: "مخمل نیمه‌شب", catMoonlight: "مروارید مهتاب",
            labTag: "کارگاه تعاملی", labTitle: "آزمایشگاه موشن میورا", labSub: "جنس ظرف شیشه‌ای و نت‌های رایحه اختصاصی خود را با انیمیشن مایع ترکیب کنید.",
            lblVessel: "۱. انتخاب جنس و رنگ ظرف شیشه‌ای", vAmber: "کریستال کهربایی", vEmerald: "زمردی جنگلی", vViolet: "بنفش نیمه‌شب", vPearl: "مروارید مهتابی",
            lblTop: "۲. انتخاب نت آغازی", lblHeart: "۳. انتخاب نت میانی", lblBase: "۴. انتخاب نت پایانی", lblName: "۵. نامگذاری شمع اختصاصی",
            pyrTop: "آغازی:", pyrHeart: "میانی:", pyrBase: "پایانی:", btnAddCustom: "افزودن به سبد خرید",
            ethosTag: "اصالت ساخت", ethosTitle: "هنر شیشه‌گری و انیمیشن موشن",
            c1h: "کریستال دست‌ساز", c1p: "هر ظرف شیشه‌ای توسط استادکاران برجسته شیشه‌گری با مقاومت حرارتی بالا ساخته می‌شود.",
            c2h: "موم سویا ارگانیک", c2p: "موم ۱۰۰٪ زیست‌تخریب‌پذیر سویا و نارگیل برای ۶۰ ساعت سوختن پاک و بدون دود.",
            c3h: "عطرسازی گراس فرانسه", c3p: "تقطیر شده در شهر گراس فرانسه با عصاره‌های خالص گیاهی و صمغ‌های طبیعی.",
            revTag: "نظرات مشتریان", revTitle: "محبوب علاقمندان رایحه",
            r1t: "«میورا V4 فوق‌العاده است. انیمیشن‌های موشن و کیفیت ظروف شیشه‌ای کهربایی فضا را کاملاً دگرگون کرده است.»",
            r1n: "النا رستوا — پاریس", r1v: "✓ خریدار تایید شده",
            r2t: "«قابلیت خاموش و روشن کردن شعله با کلیک فوق‌العاده جذاب است! قیمت‌گذاری به تومان هم کار را بسیار راحت کرده.»",
            r2n: "مارکوس ونس — نیویورک", r2v: "✓ خریدار تایید شده",
            r3t: "«کارت اعتباری شیشه‌ای و درگاه پرداخت دو زبانه عالی بود. از ظرف بنفش شمع هم به عنوان لیوان استفاده کردم.»",
            r3n: "سوفیا چن — لندن", r3v: "✓ خریدار تایید شده",
            ftrBrandTag: "کارگاه شمع‌سازی موشن",
            ftrDesc: "خلق فضایی درخشان از طریق هنر شیشه مایع، انیمیشن‌های موشن و کیمیای عطرسازی گیاهی.",
            ftrHCol: "کلکسیون‌ها", ftrHServ: "خدمات کارگاه", ftrHJoin: "عضویت در خبرنامه", ftrPJoin: "دریافت دعوتنامه به دست‌پخت‌های محدود.",
            ftrAmber: "عنبر آسمانی", ftrFig: "پناهگاه گیاهی", ftrOud: "مخمل نیمه‌شب", ftrJasmine: "مروارید مهتاب",
            ftrLab: "آزمایشگاه موشن", ftrRefill: "شارژ مجدد ظروف", ftrCorp: "هدایای سازمانی",
            newsPlaceholder: "ایمیل خود را وارد کنید",
            ftrCopy: "© ۲۰۲۶ شمع‌سازی میورا نسخه ۴. طراحی شده با شیشه مایع، انیمیشن موشن و فونت وزیرمتن.",
            cartBtnLabel: "سبد خرید", cartTitle: "سبد خرید شما", btnProceedCheckout: "ادامه به درگاه پرداخت شیشه‌ای",
            chk1: "ارسال", chk2: "کارت شیشه‌ای", chk3: "تایید نهایی",
            chkH1: "۱. آدرس تحویل و بسته بندی فاخر", chkSub1: "ارسال به سراسر ایران و جهان در جعبه‌های شیشه‌ای محافظ",
            lblFn: "نام", lblLn: "نام خانوادگی", lblEm: "ایمیل", lblAd: "آدرس دقیق پستی", lblCt: "شهر", lblCn: "کشور",
            lblDelExp: "انتخاب نوع ارسال", lblFreeSmpl: "🎁 اشانتیون موم عطر (رایگان)", btnContPay: "ادامه به پرداخت",
            chkH2: "۲. روش پرداخت و کارت شیشه‌ای", btnBack1: "بازگشت", btnRevOrder: "بررسی سفارش",
            chkH3: "۳. بررسی نهایی و افروختن شمع", btnBack2: "بازگشت", btnIgnite: "ثبت سفارش و افروختن شمع",
            succH: "فضای میورا شما افروخته شد! 🔥", btnBackAtelier: "بازگشت به کارگاه"
        },
        en: {
            langText: "FA / فارسی",
            tag: "MOTION CANDLE ATELIER",
            navHome: "Home", navCollections: "Collections", navLab: "Motion Lab", navEthos: "Ethos", navReviews: "Reviews",
            lblDockHome: "Home", lblDockCol: "Collections", lblDockLab: "Lab", lblDockEthos: "Ethos", lblDockRev: "Reviews",
            badge: "V4 — Motion Animations & Liquid Glass Physics",
            heroTitle: 'Sculpted in <span class="gradient-text">Liquid Glass.</span><br>Poured in <span class="flame-text">Eternal Flame.</span>',
            heroSub: "MIORA V4 merges motion spring dynamics, mouth-blown crystal vessels, and hand-poured botanical soy scents with Rial & Toman currency support.",
            ctaExplore: "Explore Collections", ctaLab: "Scent Lab",
            stat1Val: "60 FPS", stat1Lbl: "Motion Animations",
            stat2Val: "100% Soy", stat2Lbl: "Botanical Wax",
            stat3Val: "Crystal", stat3Lbl: "Refillable Vessels",
            heroCandleTitle: "MIORA LUNA ROSE — Amber & Oud",
            heroCandleDesc: "Smoked Agarwood, Golden Amber & Damask Rose (Click flame to extinguish/ignite)",
            heroAddBtn: "Add to Order",
            moodTitle: "Atmosphere Mood:", moodAll: "All Atmospheres", moodCalm: "Serenity & Calm", moodEnergy: "Warmth & Energy", moodFocus: "Deep Focus & Oud", moodNight: "Midnight Romance",
            colTag: "Curated Pours", colTitle: "Artisanal Candle Collections", colSub: "Stagger motion animations reveal botanical candles in mouth-blown glass vessels.",
            catAll: "All Vessels", catAmber: "Celestial Amber", catBotanical: "Botanical Sanctuary", catMidnight: "Midnight Velvet", catMoonlight: "Moonlight Pearl",
            labTag: "Interactive Atelier", labTitle: "MIORA Motion Laboratory", labSub: "Blend glass vessel finishes and bespoke scent notes with liquid morph animations.",
            lblVessel: "1. Choose Liquid Glass Vessel Finish", vAmber: "Amber Crystal", vEmerald: "Emerald Forest", vViolet: "Midnight Violet", vPearl: "Moonlight Pearl",
            lblTop: "2. Select Top Note", lblHeart: "3. Select Heart Note", lblBase: "4. Select Base Note", lblName: "5. Name Your Custom Candle",
            pyrTop: "TOP:", pyrHeart: "HEART:", pyrBase: "BASE:", btnAddCustom: "Add Custom Blend",
            ethosTag: "Our Principles", ethosTitle: "Craftsmanship & Motion Design",
            c1h: "Mouth-Blown Crystal", c1p: "Every glass vessel is mouth-blown by master glassmakers with high thermal resilience.",
            c2h: "Botanical Soy Melt", c2p: "100% biodegradable coconut-soy wax for soot-free 60-hour even burn pools.",
            c3h: "Grasse Master Perfumery", c3p: "Distilled in Grasse, France using cold-pressed essential oils and natural resins.",
            revTag: "Testimonials", revTitle: "Loved by Connoisseurs",
            r1t: '"MIORA V4 is incredible. The motion animations and amber glass quality transformed our space entirely."',
            r1n: "Elena Ristova — Paris", r1v: "✓ Verified Buyer",
            r2t: '"Clicking the flame to ignite and extinguish it is so satisfying! Toman price switching is seamless."',
            r2n: "Marcus Vance — New York", r2v: "✓ Verified Buyer",
            r3t: '"The glass credit card visualizer and multi-step checkout are top notch. Reused the violet glass vessel after burning."',
            r3n: "Sophia Chen — London", r3v: "✓ Verified Buyer",
            ftrBrandTag: "MOTION CANDLE ATELIER",
            ftrDesc: "Crafting luminous atmospheres through liquid glass art, motion physics, and botanical perfume alchemy.",
            ftrHCol: "Collections", ftrHServ: "Services", ftrHJoin: "Join the Circle", ftrPJoin: "Receive invitations to limited batch pours.",
            ftrAmber: "Celestial Amber", ftrFig: "Botanical Sanctuary", ftrOud: "Midnight Velvet", ftrJasmine: "Moonlight Pearl",
            ftrLab: "Motion Laboratory", ftrRefill: "Vessel Refills", ftrCorp: "Corporate Gifting",
            newsPlaceholder: "Enter your email address",
            ftrCopy: "© 2026 MIORA Candle Atelier V4. Sculpted with Liquid Glass & Motion System.",
            cartBtnLabel: "Cart", cartTitle: "Your Atmosphere Cart", btnProceedCheckout: "Proceed to Glass Checkout",
            chk1: "Delivery", chk2: "Glass Card", chk3: "Ignite",
            chkH1: "1. Delivery Address & Packaging", chkSub1: "Eco glass boxes delivered worldwide",
            lblFn: "First Name", lblLn: "Last Name", lblEm: "Email", lblAd: "Shipping Address", lblCt: "City", lblCn: "Country",
            lblDelExp: "Select Delivery Experience", lblFreeSmpl: "🎁 Free Wax Melt Sample", btnContPay: "Continue to Payment",
            chkH2: "2. Payment Method & Interactive Glass Card", btnBack1: "Back", btnRevOrder: "Review Order",
            chkH3: "3. Order Review & Ignition", btnBack2: "Back", btnIgnite: "Place Order & Ignite Flame",
            succH: "MIORA V4 Atmosphere Ignited! 🔥", btnBackAtelier: "Back to Atelier"
        }
    };

    let currentLang = 'fa';

    function safeSetText(id, text) {
        if (text === undefined || text === null) return;
        const el = document.getElementById(id);
        if (el) el.innerText = text;
    }

    function safeSetHtml(id, html) {
        if (html === undefined || html === null) return;
        const el = document.getElementById(id);
        if (el) el.innerHTML = html;
    }

    function safeSetPlaceholder(id, placeholder) {
        if (placeholder === undefined || placeholder === null) return;
        const el = document.getElementById(id);
        if (el) el.placeholder = placeholder;
    }

    function safeSetNodeValue(id, childIdx, val) {
        if (val === undefined || val === null) return;
        const el = document.getElementById(id);
        if (el && el.childNodes && el.childNodes[childIdx]) {
            el.childNodes[childIdx].nodeValue = val;
        }
    }

    function setLanguage(lang) {
        currentLang = lang;
        const dict = I18N[lang];
        document.documentElement.setAttribute('dir', lang === 'fa' ? 'rtl' : 'ltr');
        document.documentElement.setAttribute('lang', lang);

        safeSetText('current-lang-text', dict.langText);
        safeSetText('i18n-tag', dict.tag);
        safeSetText('nav-home', dict.navHome);
        safeSetText('nav-collections', dict.navCollections);
        safeSetText('nav-lab', dict.navLab);
        safeSetText('nav-ethos', dict.navEthos);
        safeSetText('nav-reviews', dict.navReviews);

        safeSetText('lbl-dock-home', dict.lblDockHome);
        safeSetText('lbl-dock-col', dict.lblDockCol);
        safeSetText('lbl-dock-lab', dict.lblDockLab);
        safeSetText('lbl-dock-ethos', dict.lblDockEthos);
        safeSetText('lbl-dock-rev', dict.lblDockRev);
        
        safeSetNodeValue('mob-home', 1, " " + dict.navHome);
        safeSetNodeValue('mob-collections', 1, " " + dict.navCollections);
        safeSetNodeValue('mob-lab', 1, " " + dict.navLab);
        safeSetNodeValue('mob-ethos', 1, " " + dict.navEthos);
        safeSetNodeValue('mob-reviews', 1, " " + dict.navReviews);
        safeSetText('mob-footer-desc', dict.ftrDesc);

        safeSetText('badge-text', dict.badge);
        safeSetHtml('hero-heading', dict.heroTitle);
        safeSetText('hero-sub', dict.heroSub);
        safeSetNodeValue('hero-cta-explore', 1, dict.ctaExplore);
        safeSetNodeValue('hero-cta-lab', 3, dict.ctaLab);

        safeSetText('stat-1-val', dict.stat1Val); safeSetText('stat-1-label', dict.stat1Lbl);
        safeSetText('stat-2-val', dict.stat2Val); safeSetText('stat-2-label', dict.stat2Lbl);
        safeSetText('stat-3-val', dict.stat3Val); safeSetText('stat-3-label', dict.stat3Lbl);

        safeSetText('hero-candle-title', dict.heroCandleTitle);
        safeSetText('hero-candle-price', formatPrice(48, lang));
        safeSetText('hero-candle-desc', dict.heroCandleDesc);
        safeSetText('hero-add-span', dict.heroAddBtn);

        safeSetNodeValue('mood-bar-title', 1, " " + dict.moodTitle);
        safeSetText('mood-all', dict.moodAll);
        safeSetText('mood-calm', dict.moodCalm);
        safeSetText('mood-energy', dict.moodEnergy);
        safeSetText('mood-focus', dict.moodFocus);
        safeSetText('mood-night', dict.moodNight);

        safeSetText('col-tag', dict.colTag);
        safeSetText('col-title', dict.colTitle);
        safeSetText('col-sub', dict.colSub);
        safeSetText('cat-all', dict.catAll);
        safeSetText('cat-amber', dict.catAmber);
        safeSetText('cat-botanical', dict.catBotanical);
        safeSetText('cat-midnight', dict.catMidnight);
        safeSetText('cat-moonlight', dict.catMoonlight);

        safeSetText('lab-tag', dict.labTag);
        safeSetText('lab-title', dict.labTitle);
        safeSetText('lab-sub', dict.labSub);
        safeSetText('lbl-vessel', dict.lblVessel);
        safeSetText('v-amber', dict.vAmber);
        safeSetText('v-emerald', dict.vEmerald);
        safeSetText('v-violet', dict.vViolet);
        safeSetText('v-pearl', dict.vPearl);
        safeSetText('lbl-top', dict.lblTop);
        safeSetText('lbl-heart', dict.lblHeart);
        safeSetText('lbl-base', dict.lblBase);
        safeSetText('lbl-name', dict.lblName);
        safeSetText('pyr-lbl-top', dict.pyrTop);
        safeSetText('pyr-lbl-heart', dict.pyrHeart);
        safeSetText('pyr-lbl-base', dict.pyrBase);
        safeSetText('btn-add-custom', dict.btnAddCustom);
        safeSetText('bespoke-price-val', formatPrice(54, lang));

        safeSetText('ethos-tag', dict.ethosTag);
        safeSetText('ethos-title', dict.ethosTitle);
        safeSetText('craft-1-h', dict.c1h); safeSetText('craft-1-p', dict.c1p);
        safeSetText('craft-2-h', dict.c2h); safeSetText('craft-2-p', dict.c2p);
        safeSetText('craft-3-h', dict.c3h); safeSetText('craft-3-p', dict.c3p);

        safeSetText('rev-tag', dict.revTag);
        safeSetText('rev-title', dict.revTitle);
        safeSetText('rev-1-text', dict.r1t);
        safeSetText('rev-1-name', dict.r1n);
        safeSetText('rev-1-tag', dict.r1v);
        safeSetText('rev-2-text', dict.r2t);
        safeSetText('rev-2-name', dict.r2n);
        safeSetText('rev-2-tag', dict.r2v);
        safeSetText('rev-3-text', dict.r3t);
        safeSetText('rev-3-name', dict.r3n);
        safeSetText('rev-3-tag', dict.r3v);

        safeSetText('ftr-brand-tag', dict.ftrBrandTag);
        safeSetText('ftr-desc', dict.ftrDesc);
        safeSetText('ftr-h-col', dict.ftrHCol);
        safeSetText('ftr-h-serv', dict.ftrHServ);
        safeSetText('ftr-h-join', dict.ftrHJoin);
        safeSetText('ftr-p-join', dict.ftrPJoin);
        safeSetText('ftr-link-amber', dict.ftrAmber);
        safeSetText('ftr-link-fig', dict.ftrFig);
        safeSetText('ftr-link-oud', dict.ftrOud);
        safeSetText('ftr-link-jasmine', dict.ftrJasmine);
        safeSetText('ftr-link-lab', dict.ftrLab);
        safeSetText('ftr-link-refill', dict.ftrRefill);
        safeSetText('ftr-link-corp', dict.ftrCorp);
        safeSetPlaceholder('news-input', dict.newsPlaceholder);
        safeSetText('ftr-copy', dict.ftrCopy);

        safeSetText('cart-btn-label', dict.cartBtnLabel);
        safeSetText('cart-drawer-title', dict.cartTitle);
        safeSetText('btn-proceed-checkout', dict.btnProceedCheckout);

        safeSetText('chk-step-1', dict.chk1);
        safeSetText('chk-step-2', dict.chk2);
        safeSetText('chk-step-3', dict.chk3);
        safeSetText('chk-hdr-1', dict.chkH1);
        safeSetText('chk-sub-1', dict.chkSub1);
        safeSetText('lbl-fn', dict.lblFn);
        safeSetText('lbl-ln', dict.lblLn);
        safeSetText('lbl-em', dict.lblEm);
        safeSetText('lbl-ad', dict.lblAd);
        safeSetText('lbl-ct', dict.lblCt);
        safeSetText('lbl-cn', dict.lblCn);
        safeSetText('lbl-del-exp', dict.lblDelExp);
        safeSetText('lbl-free-smpl', dict.lblFreeSmpl);
        safeSetText('btn-cont-pay', dict.btnContPay);

        safeSetText('chk-hdr-2', dict.chkH2);
        safeSetText('btn-back-1', dict.btnBack1);
        safeSetText('btn-rev-order', dict.btnRevOrder);

        safeSetText('chk-hdr-3', dict.chkH3);
        safeSetText('btn-back-2', dict.btnBack2);
        safeSetText('btn-ignite-order', dict.btnIgnite);
        safeSetText('success-hdr', dict.succH);
        safeSetText('btn-back-atelier', dict.btnBackAtelier);

        renderProducts();
        updateCartUI();
    }

    document.getElementById('lang-toggle').addEventListener('click', () => {
        setLanguage(currentLang === 'fa' ? 'en' : 'fa');
        showToast(currentLang === 'fa' ? "زبان به فارسی و تومان تغییر یافت 🇮🇷" : "Language switched to English & USD 🇬🇧");
    });

    // ==========================================
    // 2. Products Database
    // ==========================================
    const PRODUCTS = [
        {
            id: 1,
            nameFa: "میورا لونا رز — عنبر و عود", nameEn: "MIORA LUNA ROSE — Amber & Oud",
            category: "amber", mood: "night", priceUsd: 48.00,
            image: "assets/images/miora_amber.jpg", vesselFa: "کریستال کهربایی", vesselEn: "Amber Crystal",
            scentTagFa: "عود دودی گرم", scentTagEn: "Warm & Smokey Oud",
            burnTimeFa: "۵۰ تا ۵۵ ساعت", burnTimeEn: "50-55 Hours", weight: "8 oz / 230g",
            descriptionFa: "ریخته‌گری دستی در ظروف کریستال کهربایی. با عصاره چوب عود دودی، عنبر طلایی و گل رز دمشقی.",
            descriptionEn: "Hand-poured in mouth-blown warm amber crystal glass. Notes of smoked agarwood, golden amber, and Damask rose.",
            pyramidFa: { top: "فلفل صورتی، هل دودی", heart: "رز دمشقی، شهد عسل", base: "چوب عود دودی، عنبر" },
            pyramidEn: { top: "Pink Pepper, Smoked Cardamom", heart: "Rose Damascena, Honeycomb", base: "Smoked Oud, Amber Resin" }
        },
        {
            id: 2,
            nameFa: "میورا جنگل زمردین — انجیر و سدر", nameEn: "MIORA EMERALD FOREST — Fig & Cedar",
            category: "botanical", mood: "calm", priceUsd: 46.00,
            image: "assets/images/botanical_fig.jpg", vesselFa: "زمردی جنگلی", vesselEn: "Emerald Forest",
            scentTagFa: "گیاهی و تازه", scentTagEn: "Fresh Botanical",
            burnTimeFa: "۵۰ تا ۵۵ ساعت", burnTimeEn: "50-55 Hours", weight: "8 oz / 230g",
            descriptionFa: "در ظروف کریستال زمردی مات. حس قدم زدن در باغ‌های انجیر مدیترانه‌ای و درختان سدر کهنسال.",
            descriptionEn: "Encapsulated in frosted dark emerald glass. A serene walk through a rain-drenched Mediterranean fig grove.",
            pyramidFa: { top: "برگ انجیر وحشی، ترنج", heart: "اکالیپتوس، چای سفید", base: "چوب سدر نمدار، خزه" },
            pyramidEn: { top: "Wild Green Fig, Bergamot", heart: "Alpine Eucalyptus, White Tea", base: "Damp Cedarwood, Oakmoss" }
        },
        {
            id: 3,
            nameFa: "میورا آرورا — وانیل دودی و عود", nameEn: "MIORA AURORA — Smoked Vanilla & Oud",
            category: "midnight", mood: "focus", priceUsd: 52.00,
            image: "assets/images/midnight_oud.jpg", vesselFa: "بنفش نیمه‌شب", vesselEn: "Midnight Violet",
            scentTagFa: "غنی و استوایی", scentTagEn: "Rich & Exotic",
            burnTimeFa: "۶۰ ساعت سوختن", burnTimeEn: "60 Hours", weight: "9 oz / 255g",
            descriptionFa: "در ظروف کریستالی بنفش دودی. دانه‌های وانیل ماداگاسکار، انیسون ستاره‌ای و رایحه چوب بوربون.",
            descriptionEn: "Poured into an iridescent smoky violet crystal vessel. Madagascan vanilla bean, star anise, and bourbon vetiver.",
            pyramidFa: { top: "انیسون ستاره‌ای، کاکائو", heart: "وانیل بوربون، عنبر", base: "عود کمیاب، کشمیر" },
            pyramidEn: { top: "Star Anise, Roasted Cacao", heart: "Bourbon Vanilla, Caramel", base: "Rare Agarwood, Cashmere" }
        },
        {
            id: 4,
            nameFa: "میورا سولستیس — یاس و چای سفید", nameEn: "MIORA SOLSTICE — Jasmine & White Tea",
            category: "moonlight", mood: "calm", priceUsd: 45.00,
            image: "assets/images/moonlight_jasmine.jpg", vesselFa: "مروارید مهتابی", vesselEn: "Moonlight Pearl",
            scentTagFa: "گل‌های معطر", scentTagEn: "Ethereal & Floral",
            burnTimeFa: "۵۰ ساعت سوختن", burnTimeEn: "50 Hours", weight: "8 oz / 230g",
            descriptionFa: "در ظروف صدف مرواریدی. رایحه شکوفه‌های یاس شبانه و برگ‌های چای سفید کوهستان.",
            descriptionEn: "Encased in iridescent opalescent pearl glass. Ethereal night-blooming jasmine blossoms paired with white tea.",
            pyramidFa: { top: "چای سفید، شکوفه مرکبات", heart: "یاس شبانه، گاردنیا", base: "مشک سفید، چوب صندل" },
            pyramidEn: { top: "White Tea, Citrus Blossom", heart: "Night Jasmine, Gardenia", base: "Clean White Musk, Sandalwood" }
        },
        {
            id: 5,
            nameFa: "میورا محصول آسمانی — بوربون و عسل", nameEn: "MIORA CELESTIAL HARVEST — Bourbon",
            category: "amber", mood: "energy", priceUsd: 50.00,
            image: "assets/images/miora_amber.jpg", vesselFa: "کریستال کهربایی", vesselEn: "Amber Crystal",
            scentTagFa: "عنبر گرم و عسل", scentTagEn: "Warm Amber & Honey",
            burnTimeFa: "۵۵ ساعت سوختن", burnTimeEn: "55 Hours", weight: "8.5 oz / 240g",
            descriptionFa: "ترکیب گرم و تسلی‌بخش بشکه‌های بلوط، جوز هندی و عسل وحشی در شیشه کهربایی.",
            descriptionEn: "A rich comforting blend of aged oak bourbon barrels, clove bud, and wild honey in thick amber glass.",
            pyramidFa: { top: "میخک، پوست پرتقال", heart: "بوربون، جوز هندی", base: "عنبر طلایی، تونکا" },
            pyramidEn: { top: "Clove Bud, Orange Zest", heart: "Aged Bourbon, Nutmeg", base: "Golden Amber, Tonka" }
        },
        {
            id: 6,
            nameFa: "میورا تک‌سنگ — چرم و کشمیر", nameEn: "MIORA MONOLITH — Leather & Cashmere",
            category: "midnight", mood: "focus", priceUsd: 55.00,
            image: "assets/images/midnight_oud.jpg", vesselFa: "بنفش نیمه‌شب", vesselEn: "Midnight Violet",
            scentTagFa: "جسورانه و مرموز", scentTagEn: "Bold & Mysterious",
            burnTimeFa: "۶۵ ساعت سوختن", burnTimeEn: "65 Hours", weight: "9.5 oz / 270g",
            descriptionFa: "شیشه تیره تراش‌خورده سنگین با آکورد چرم توسکان، قطران غان دودی و کشمیر سفید.",
            descriptionEn: "Heavy faceted iridescent dark glass with a rich accord of Tuscan leather, smoky birch, and white cashmere.",
            pyramidFa: { top: "قطران غان دودی، آویشن", heart: "چرم توسکان، جیر", base: "عنبر غنی، مشک کشمیر" },
            pyramidEn: { top: "Smoked Birch Tar, Thyme", heart: "Tuscan Leather, Suede", base: "Rich Amber, Cashmere Musk" }
        }
    ];

    let cart = [];
    let promoApplied = false;
    let currentFilter = 'all';
    let currentMood = 'all';

    // ==========================================
    // 3. Cursor Glow & Flame Blow Out Gesture
    // ==========================================
    const cursorOrb = document.getElementById('cursor-orb');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function updateCursor() {
        cursorX += (mouseX - cursorX) * 0.12;
        cursorY += (mouseY - cursorY) * 0.12;
        if (cursorOrb) {
            cursorOrb.style.left = `${cursorX}px`;
            cursorOrb.style.top = `${cursorY}px`;
        }
        requestAnimationFrame(updateCursor);
    }
    updateCursor();

    const flameZone = document.getElementById('flame-interactive-zone');
    const smokeBox = document.getElementById('smoke-box');

    if (flameZone) {
        flameZone.addEventListener('click', () => {
            flameZone.classList.toggle('extinguished');
            const isExtinguished = flameZone.classList.contains('extinguished');

            if (isExtinguished) {
                showToast(currentLang === 'fa' ? "شعله خاموش شد — رقص دود... 🌬️" : "Flame Extinguished — Smoke wisps releasing... 🌬️");
                createSmokeEffect();
            } else {
                showToast(currentLang === 'fa' ? "شعله دوباره افروخته شد! 🔥" : "Flame Re-Ignited! 🔥");
            }
        });
    }

    function createSmokeEffect() {
        if (!smokeBox) return;
        smokeBox.innerHTML = '';
        for (let i = 0; i < 6; i++) {
            const p = document.createElement('div');
            p.style.cssText = `
                position: absolute;
                width: ${10 + Math.random() * 15}px;
                height: ${10 + Math.random() * 15}px;
                background: rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                filter: blur(6px);
                top: 50%;
                left: 50%;
                pointer-events: none;
                animation: smokeUp 1.2s ease-out forwards;
                animation-delay: ${i * 0.1}s;
            `;
            smokeBox.appendChild(p);
        }
    }

    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        @keyframes smokeUp {
            0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0.8; }
            100% { transform: translate(${(Math.random() - 0.5) * 60}px, -120px) scale(2.5); opacity: 0; }
        }
    `;
    document.head.appendChild(styleSheet);

    // ==========================================
    // 4. Web Audio Fireplace Synthesizer
    // ==========================================
    let audioCtx = null;
    let isAudioPlaying = false;
    let crackleNode = null;
    let gainNode = null;

    function initAudio() {
        if (audioCtx) return;
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();
    }

    function toggleAudio() {
        initAudio();
        const audioBtn = document.getElementById('audio-toggle');
        const audioIcon = document.getElementById('audio-icon');

        if (audioCtx.state === 'suspended') audioCtx.resume();

        if (!isAudioPlaying) {
            startFireplaceSound();
            isAudioPlaying = true;
            audioBtn.classList.add('playing');
            audioIcon.setAttribute('data-feather', 'volume-2');
            feather.replace();
            showToast(currentLang === 'fa' ? "صدای آرامش‌بخش شومینه فعال شد 🔥" : "Ambient Fireplace Audio Enabled 🔥");
        } else {
            stopFireplaceSound();
            isAudioPlaying = false;
            audioBtn.classList.remove('playing');
            audioIcon.setAttribute('data-feather', 'volume-x');
            feather.replace();
            showToast(currentLang === 'fa' ? "صدای شومینه قطع شد" : "Ambient Audio Muted");
        }
    }

    function startFireplaceSound() {
        const bufferSize = audioCtx.sampleRate * 2;
        const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const output = noiseBuffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            output[i] = (Math.random() * 2 - 1) * Math.pow(Math.random(), 8);
        }

        crackleNode = audioCtx.createBufferSource();
        crackleNode.buffer = noiseBuffer;
        crackleNode.loop = true;

        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1200, audioCtx.currentTime);

        gainNode = audioCtx.createGain();
        gainNode.gain.setValueAtTime(0.12, audioCtx.currentTime);

        crackleNode.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        crackleNode.start();
    }

    function stopFireplaceSound() {
        if (crackleNode) {
            crackleNode.stop();
            crackleNode.disconnect();
            crackleNode = null;
        }
    }

    document.getElementById('audio-toggle').addEventListener('click', toggleAudio);

    // ==========================================
    // 5. Theme & Canvas Ambient Particles
    // ==========================================
    document.getElementById('theme-toggle').addEventListener('click', () => {
        document.body.classList.toggle('theme-light');
        const isLight = document.body.classList.contains('theme-light');
        document.getElementById('theme-icon').setAttribute('data-feather', isLight ? 'sun' : 'moon');
        feather.replace();
        showToast(isLight ? "تم مروارید روشن فعال شد" : "تم شیشه تیره فعال شد");
    });

    const canvas = document.getElementById('ambient-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class FlameParticle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + Math.random() * 100;
            this.size = Math.random() * 3 + 1;
            this.speedY = Math.random() * 1.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.6 + 0.2;
            this.color = Math.random() > 0.5 ? '#f59e0b' : '#fbbf24';
        }
        update() {
            this.y -= this.speedY;
            this.x += this.speedX + (mouseX - this.x) * 0.0001;
            if (this.y < -10) this.reset();
        }
    }

    const isMobileDevice = window.innerWidth <= 768;
    const particleCount = isMobileDevice ? 15 : 40;

    for (let i = 0; i < particleCount; i++) particles.push(new FlameParticle());

    let lastFrameTime = 0;
    const frameInterval = isMobileDevice ? 1000 / 30 : 1000 / 60; // 30 FPS on mobile, 60 FPS on desktop

    function animateParticles(currentTime) {
        requestAnimationFrame(animateParticles);

        if (currentTime - lastFrameTime < frameInterval) return;
        lastFrameTime = currentTime;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.opacity;
            if (!isMobileDevice) {
                ctx.shadowBlur = 8;
                ctx.shadowColor = p.color;
            }
            ctx.fill();
            ctx.globalAlpha = 1.0;
        });
    }
    requestAnimationFrame(animateParticles);

    // Motion Scroll Reveals (Pre-loads 180px before entering viewport on mobile)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: isMobileDevice ? 0.01 : 0.1,
        rootMargin: isMobileDevice ? '180px 0px' : '0px'
    });

    document.querySelectorAll('.motion-reveal').forEach(el => {
        if (isMobileDevice) {
            el.style.opacity = '1';
            el.style.transform = 'none';
        } else {
            el.style.opacity = '0';
            el.style.transform = 'translateY(35px)';
            el.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        }
        observer.observe(el);
    });

    // ==========================================
    // 6. Render Product Grid
    // ==========================================
    function renderProducts() {
        const productGrid = document.getElementById('product-grid');
        if (!productGrid) return;
        productGrid.innerHTML = '';

        const filtered = PRODUCTS.filter(p => {
            const matchesCat = currentFilter === 'all' || p.category === currentFilter;
            const matchesMood = currentMood === 'all' || p.mood === currentMood;
            return matchesCat && matchesMood;
        });

        filtered.forEach((p) => {
            const card = document.createElement('div');
            card.className = 'product-card glass-card tilt-card';

            const name = currentLang === 'fa' ? p.nameFa : p.nameEn;
            const scentTag = currentLang === 'fa' ? p.scentTagFa : p.scentTagEn;
            const vessel = currentLang === 'fa' ? p.vesselFa : p.vesselEn;
            const burnTime = currentLang === 'fa' ? p.burnTimeFa : p.burnTimeEn;
            const priceStr = formatPrice(p.priceUsd, currentLang);
            const topNote = currentLang === 'fa' ? p.pyramidFa.top.split('،')[0] : p.pyramidEn.top.split(',')[0];

            card.innerHTML = `
                <div class="product-image-box">
                    <span class="scent-badge">${scentTag}</span>
                    <img src="${p.image}" alt="${name}" class="product-img" loading="lazy" decoding="async">
                    <button class="btn btn-sm btn-glass quick-view-btn" data-id="${p.id}">
                        <i data-feather="eye"></i> ${currentLang === 'fa' ? 'نمایش سریع' : 'Quick View'}
                    </button>
                </div>
                <div class="product-info">
                    <h3>${name}</h3>
                    <p class="product-notes">${vessel} • ${topNote}</p>
                    <div class="product-specs">
                        <span><i data-feather="clock" style="width:12px;height:12px;"></i> ${burnTime}</span>
                        <span><i data-feather="box" style="width:12px;height:12px;"></i> ${p.weight}</span>
                    </div>
                </div>
                <div class="product-footer">
                    <span class="product-price">${priceStr}</span>
                    <button class="btn btn-primary btn-sm add-to-cart-btn motion-btn" data-id="${p.id}">
                        <i data-feather="plus"></i> ${currentLang === 'fa' ? 'افزودن به سبد' : 'Add to Cart'}
                    </button>
                </div>
            `;

            productGrid.appendChild(card);
        });

        feather.replace();
        attachCardEvents();
    }

    document.querySelectorAll('.collection-tabs .tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.collection-tabs .tab-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.getAttribute('data-category');
            renderProducts();
        });
    });

    document.querySelectorAll('.mood-pill').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.mood-pill').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentMood = e.target.getAttribute('data-mood');
            renderProducts();
        });
    });

    function attachCardEvents() {
        document.querySelectorAll('#product-grid .quick-view-btn').forEach(btn => {
            btn.addEventListener('click', () => openProductModal(parseInt(btn.getAttribute('data-id'))));
        });
        document.querySelectorAll('#product-grid .add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', () => addToCart(parseInt(btn.getAttribute('data-id'))));
        });
    }

    const heroAddBtn = document.getElementById('hero-add-btn');
    if (heroAddBtn) {
        heroAddBtn.addEventListener('click', () => addToCart(1));
    }

    // ==========================================
    // 7. Bespoke Studio & Bilingual Translations
    // ==========================================
    const BESPOKE_NOTES = {
        top: {
            bergamot: { fa: "ترنج کالابریا و پوست مرکبات", en: "Calabrian Bergamot & Citrus Zest" },
            fig: { fa: "برگ‌های انجیر وحشی", en: "Wild Green Fig Leaves" },
            pepper: { fa: "فلفل صورتی و هل کوبیده", en: "Pink Pepper & Cardamom" },
            jasmine: { fa: "یاس سفید و چای صبحگاهی", en: "White Jasmine & Morning Tea" }
        },
        heart: {
            rose: { fa: "رز دمشقی دودی", en: "Smoked Damask Rose" },
            eucalyptus: { fa: "اکالیپتوس و کاج آلپ", en: "Eucalyptus & Alpine Pine" },
            vanilla: { fa: "انیسون ستاره‌ای و وانیل", en: "Star Anise & Bourbon Vanilla" },
            honey: { fa: "شهد عسل طلایی و عنبر", en: "Golden Honeycomb & Amber" }
        },
        base: {
            oud: { fa: "چوب عود دودی و صندل", en: "Smoked Agarwood Oud & Sandalwood" },
            cedar: { fa: "چوب سدر نمدار و خزه بلوط", en: "Damp Cedarwood & Oakmoss" },
            tonka: { fa: "دانه تونکا خالص و مشک گرم", en: "Pure Tonka Bean & Warm Musk" },
            suede: { fa: "جیر سفید و کشمیر مخملی", en: "White Suede & Velvet Cashmere" }
        },
        vessel: {
            "Amber Crystal": { fa: "کریستال کهربایی", en: "Amber Crystal Vessel" },
            "Emerald Forest": { fa: "زمردی جنگلی", en: "Emerald Forest Vessel" },
            "Midnight Violet": { fa: "بنفش نیمه‌شب", en: "Midnight Violet Vessel" },
            "Moonlight Pearl": { fa: "مروارید مهتابی", en: "Moonlight Pearl Vessel" }
        }
    };

    const bespokeState = {
        vesselFa: "کریستال کهربایی", vesselEn: "Amber Crystal",
        vesselColor: "#F59E0B",
        image: "assets/images/miora_amber.jpg",
        priceUsd: 54.00
    };

    function updateBespokeLabTranslations(lang) {
        const topSelect = document.getElementById('top-note-select');
        if (topSelect) {
            const currTopVal = topSelect.value || 'bergamot';
            topSelect.innerHTML = Object.keys(BESPOKE_NOTES.top).map(k => `
                <option value="${k}" ${k === currTopVal ? 'selected' : ''}>${BESPOKE_NOTES.top[k][lang]}</option>
            `).join('');
        }

        const heartSelect = document.getElementById('heart-note-select');
        if (heartSelect) {
            const currHeartVal = heartSelect.value || 'rose';
            heartSelect.innerHTML = Object.keys(BESPOKE_NOTES.heart).map(k => `
                <option value="${k}" ${k === currHeartVal ? 'selected' : ''}>${BESPOKE_NOTES.heart[k][lang]}</option>
            `).join('');
        }

        const baseSelect = document.getElementById('base-note-select');
        if (baseSelect) {
            const currBaseVal = baseSelect.value || 'oud';
            baseSelect.innerHTML = Object.keys(BESPOKE_NOTES.base).map(k => `
                <option value="${k}" ${k === currBaseVal ? 'selected' : ''}>${BESPOKE_NOTES.base[k][lang]}</option>
            `).join('');
        }

        const nameInput = document.getElementById('custom-candle-name');
        if (nameInput) {
            if (nameInput.value === "شمع اختصاصی میورا شماره ۱" || nameInput.value === "MIORA Bespoke Sanctuary No. 1") {
                nameInput.value = lang === 'fa' ? "شمع اختصاصی میورا شماره ۱" : "MIORA Bespoke Sanctuary No. 1";
            }
        }

        updateBespokePreview();
    }

    const vesselOpts = document.querySelectorAll('.vessel-opt');
    vesselOpts.forEach(opt => {
        opt.addEventListener('click', () => {
            vesselOpts.forEach(o => o.classList.remove('active'));
            opt.classList.add('active');
            bespokeState.vesselEn = opt.getAttribute('data-vessel');
            bespokeState.vesselColor = opt.getAttribute('data-color');
            bespokeState.image = opt.getAttribute('data-img');
            updateBespokePreview();
        });
    });

    if (document.getElementById('top-note-select')) document.getElementById('top-note-select').addEventListener('change', updateBespokePreview);
    if (document.getElementById('heart-note-select')) document.getElementById('heart-note-select').addEventListener('change', updateBespokePreview);
    if (document.getElementById('base-note-select')) document.getElementById('base-note-select').addEventListener('change', updateBespokePreview);
    if (document.getElementById('custom-candle-name')) document.getElementById('custom-candle-name').addEventListener('input', updateBespokePreview);

    function updateBespokePreview() {
        const previewImg = document.getElementById('bespoke-preview-img');
        if (previewImg) {
            previewImg.style.transform = 'scale(0.95)';
            setTimeout(() => {
                previewImg.src = bespokeState.image;
                previewImg.style.transform = 'scale(1)';
            }, 150);
        }

        const glowEl = document.getElementById('preview-glow');
        if (glowEl) glowEl.style.background = `radial-gradient(circle, ${bespokeState.vesselColor}77, transparent 70%)`;

        const vBadge = document.getElementById('bespoke-vessel-badge');
        if (vBadge) {
            const vName = BESPOKE_NOTES.vessel[bespokeState.vesselEn] ? BESPOKE_NOTES.vessel[bespokeState.vesselEn][currentLang] : bespokeState.vesselEn;
            vBadge.innerText = vName;
        }

        const topSelect = document.getElementById('top-note-select');
        const heartSelect = document.getElementById('heart-note-select');
        const baseSelect = document.getElementById('base-note-select');
        
        if (topSelect && heartSelect && baseSelect) {
            const topVal = topSelect.value;
            const heartVal = heartSelect.value;
            const baseVal = baseSelect.value;
            const candleNameInput = document.getElementById('custom-candle-name');
            const candleName = (candleNameInput ? candleNameInput.value.trim() : '') || (currentLang === 'fa' ? "شمع اختصاصی میورا" : "MIORA Bespoke Sanctuary");

            if (document.getElementById('bespoke-display-name')) document.getElementById('bespoke-display-name').innerText = candleName;
            if (document.getElementById('pyr-top')) document.getElementById('pyr-top').innerText = BESPOKE_NOTES.top[topVal] ? BESPOKE_NOTES.top[topVal][currentLang] : topVal;
            if (document.getElementById('pyr-heart')) document.getElementById('pyr-heart').innerText = BESPOKE_NOTES.heart[heartVal] ? BESPOKE_NOTES.heart[heartVal][currentLang] : heartVal;
            if (document.getElementById('pyr-base')) document.getElementById('pyr-base').innerText = BESPOKE_NOTES.base[baseVal] ? BESPOKE_NOTES.base[baseVal][currentLang] : baseVal;
        }
    }

    // Real-Time Input Field Validation with Emerald Green Glow
    function checkFieldValidity(input) {
        if (!input) return;
        const id = input.id;
        const val = input.value.trim();
        let isValid = false;

        if (id === 'ship-fname' || id === 'ship-lname' || id === 'ship-address' || id === 'ship-city') {
            isValid = val.length >= 2;
        } else if (id === 'ship-email') {
            isValid = /\S+@\S+\.\S+/.test(val);
        } else if (id === 'card-name-input') {
            isValid = val.length >= 3;
        } else if (id === 'card-num-input') {
            isValid = val.replace(/\s/g, '').length >= 16;
        } else if (id === 'card-exp-input') {
            isValid = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(val);
        } else if (id === 'card-cvc-input') {
            isValid = val.length >= 3;
        }

        if (isValid) {
            input.classList.remove('field-error');
            input.classList.add('field-valid');
        } else {
            input.classList.remove('field-valid');
        }
    }

    document.querySelectorAll('.glass-input').forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('field-error');
            checkFieldValidity(input);
        });
    });

    document.getElementById('add-bespoke-btn').addEventListener('click', () => {
        const customName = document.getElementById('custom-candle-name').value.trim() || (currentLang === 'fa' ? "شمع اختصاصی میورا" : "MIORA Bespoke Sanctuary");
        const customItem = {
            id: 'bespoke-' + Date.now(),
            name: customName,
            priceUsd: bespokeState.priceUsd,
            image: bespokeState.image,
            qty: 1
        };

        cart.push(customItem);
        updateCartUI();
        openCartDrawer();
        showToast(currentLang === 'fa' ? `ترکیب اختصاصی "${customName}" به سبد اضافه شد ✨` : `Added "${customName}" to Cart ✨`);
    });

    // ==========================================
    // 8. Cart & Multi-Step Checkout
    // ==========================================
    const cartDrawer = document.getElementById('cart-drawer');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartCountEl = document.getElementById('cart-count');

    function openCartDrawer() { cartDrawer.classList.add('active'); cartOverlay.classList.add('active'); }
    function closeCartDrawer() { cartDrawer.classList.remove('active'); cartOverlay.classList.remove('active'); }

    document.getElementById('cart-drawer-toggle').addEventListener('click', openCartDrawer);
    document.getElementById('cart-close').addEventListener('click', closeCartDrawer);
    cartOverlay.addEventListener('click', closeCartDrawer);

    function addToCart(id) {
        const p = PRODUCTS.find(prod => prod.id === id);
        if (!p) return;
        const name = currentLang === 'fa' ? p.nameFa : p.nameEn;
        const existing = cart.find(item => item.id === id);
        if (existing) { existing.qty += 1; }
        else { cart.push({ id: p.id, name: name, priceUsd: p.priceUsd, image: p.image, qty: 1 }); }
        updateCartUI();
        openCartDrawer();
        showToast(currentLang === 'fa' ? `شمع ${name} به سبد افزوده شد 🕯️` : `Added ${name} to Cart 🕯️`);
    }

    function updateCartUI() {
        cartCountEl.innerText = cart.reduce((s, i) => s + i.qty, 0);
        const container = document.getElementById('cart-items-container');
        container.innerHTML = '';

        if (cart.length === 0) {
            container.innerHTML = `<div style="text-align:center; padding:3rem 1rem; color:var(--text-muted);"><p>${currentLang === 'fa' ? 'سبد خرید شما خالی است.' : 'Your cart is empty.'}</p></div>`;
        } else {
            cart.forEach((item, index) => {
                const el = document.createElement('div');
                el.className = 'cart-item';
                const pStr = formatPrice(item.priceUsd * item.qty, currentLang);
                el.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-details">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">${pStr}</div>
                    </div>
                    <div class="cart-qty-ctrl">
                        <button class="qty-btn minus" data-index="${index}">-</button>
                        <span>${item.qty}</span>
                        <button class="qty-btn plus" data-index="${index}">+</button>
                    </div>
                `;
                container.appendChild(el);
            });
        }

        document.querySelectorAll('.qty-btn.minus').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.getAttribute('data-index'));
                if (cart[idx].qty > 1) cart[idx].qty -= 1; else cart.splice(idx, 1);
                updateCartUI();
            });
        });
        document.querySelectorAll('.qty-btn.plus').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.getAttribute('data-index'));
                cart[idx].qty += 1;
                updateCartUI();
            });
        });

        const subtotalUsd = cart.reduce((s, i) => s + (i.priceUsd * i.qty), 0);
        const discountUsd = promoApplied ? subtotalUsd * 0.1 : 0;
        const totalUsd = subtotalUsd - discountUsd;

        document.getElementById('cart-subtotal').innerText = formatPrice(subtotalUsd, currentLang);
        document.getElementById('cart-total').innerText = formatPrice(totalUsd, currentLang);
    }

    document.getElementById('apply-promo-btn').addEventListener('click', () => {
        const val = document.getElementById('promo-input').value.trim().toUpperCase();
        if (val === 'MIORA10' || val === 'MIORA20') {
            promoApplied = true; updateCartUI();
            showToast(currentLang === 'fa' ? "کد تخفیف ۱۰٪ اعمال شد! 🏷️" : "Promo Code Applied: 10% Off! 🏷️");
        } else {
            showToast(currentLang === 'fa' ? "کد تخفیف نامعتبر است" : "Invalid Promo Code");
        }
    });

    // Quick View Modal
    const productModal = document.getElementById('product-modal');
    function openProductModal(id) {
        const p = PRODUCTS.find(prod => prod.id === id);
        if (!p) return;
        const name = currentLang === 'fa' ? p.nameFa : p.nameEn;
        const desc = currentLang === 'fa' ? p.descriptionFa : p.descriptionEn;
        const pStr = formatPrice(p.priceUsd, currentLang);

        document.getElementById('modal-content').innerHTML = `
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:2.5rem; align-items:center;">
                <img src="${p.image}" alt="${name}" style="width:100%; border-radius:var(--radius-md); height:320px; object-fit:cover;">
                <div>
                    <h2 style="font-family:var(--font-heading); font-size:1.8rem;">${name}</h2>
                    <div style="font-family:var(--font-heading); font-size:1.5rem; font-weight:700; color:var(--flame-gold); margin:0.8rem 0;">${pStr}</div>
                    <p style="color:var(--text-secondary); margin-bottom:1.5rem;">${desc}</p>
                    <button class="btn btn-primary btn-block modal-add-btn" data-id="${p.id}"><i data-feather="plus"></i> ${currentLang === 'fa' ? 'افزودن به سبد خرید' : 'Add to Order'}</button>
                </div>
            </div>
        `;
        feather.replace();
        productModal.classList.add('active');
        document.querySelector('.modal-add-btn').addEventListener('click', () => { addToCart(p.id); productModal.classList.remove('active'); });
    }

    document.getElementById('modal-close').addEventListener('click', () => productModal.classList.remove('active'));

    // Checkout Modal
    const checkoutModal = document.getElementById('checkout-modal');
    document.getElementById('checkout-btn').addEventListener('click', () => {
        if (cart.length === 0) return showToast(currentLang === 'fa' ? "سبد خرید شما خالی است!" : "Cart is empty!");
        closeCartDrawer();
        showStep(1);
        checkoutModal.classList.add('active');
    });

    document.getElementById('checkout-close').addEventListener('click', () => checkoutModal.classList.remove('active'));

    function showStep(stepNum) {
        document.querySelectorAll('.step-item').forEach((item, idx) => item.classList.toggle('active', idx + 1 <= stepNum));
        document.querySelectorAll('.checkout-step-panel').forEach((panel, idx) => panel.classList.toggle('active', idx + 1 === stepNum));
        if (stepNum === 3) updateReview();
    }

    function validateStep1() {
        const fields = ['ship-fname', 'ship-lname', 'ship-email', 'ship-address', 'ship-city'];
        let firstInvalid = null;
        fields.forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                const val = input.value.trim();
                let valid = false;
                if (id === 'ship-email') valid = /\S+@\S+\.\S+/.test(val);
                else valid = val.length >= 2;

                if (!valid) {
                    input.classList.remove('field-valid');
                    input.classList.add('field-error');
                    if (!firstInvalid) firstInvalid = input;
                } else {
                    input.classList.remove('field-error');
                    input.classList.add('field-valid');
                }
            }
        });

        if (firstInvalid) {
            firstInvalid.focus();
            showToast(currentLang === 'fa' ? "لطفاً تمام فیلدهای الزامی آدرس را تکمیل کنید!" : "Please fill out all required shipping fields!");
            return false;
        }
        return true;
    }

    function validateStep2() {
        const fields = ['card-name-input', 'card-num-input', 'card-exp-input', 'card-cvc-input'];
        let firstInvalid = null;
        fields.forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                const val = input.value.trim();
                let valid = false;
                if (id === 'card-name-input') valid = val.length >= 3;
                else if (id === 'card-num-input') valid = val.replace(/\s/g, '').length >= 16;
                else if (id === 'card-exp-input') valid = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(val);
                else if (id === 'card-cvc-input') valid = val.length >= 3;

                if (!valid) {
                    input.classList.remove('field-valid');
                    input.classList.add('field-error');
                    if (!firstInvalid) firstInvalid = input;
                } else {
                    input.classList.remove('field-error');
                    input.classList.add('field-valid');
                }
            }
        });

        if (firstInvalid) {
            firstInvalid.focus();
            showToast(currentLang === 'fa' ? "لطفاً اطلاعات کارت را به طور کامل وارد کنید!" : "Please enter complete card details!");
            return false;
        }
        return true;
    }

    document.getElementById('goto-step-2').addEventListener('click', () => {
        if (validateStep1()) showStep(2);
    });
    document.getElementById('back-to-step-1').addEventListener('click', () => showStep(1));
    document.getElementById('goto-step-3').addEventListener('click', () => {
        if (validateStep2()) showStep(3);
    });
    document.getElementById('back-to-step-2').addEventListener('click', () => showStep(2));

    document.querySelectorAll('.delivery-card').forEach(card => {
        card.addEventListener('click', () => {
            const radio = card.querySelector('input[type="radio"]');
            if (radio) radio.checked = true;
            updateReview();
        });
    });

    document.querySelectorAll('.sample-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            const radio = pill.querySelector('input[type="radio"]');
            if (radio) radio.checked = true;
            updateReview();
        });
    });

    function updateReview() {
        const selectedDelivery = document.querySelector('input[name="delivery-method"]:checked');
        const deliveryVal = selectedDelivery ? selectedDelivery.value : 'standard';
        const shippingFeeUsd = deliveryVal === 'express' ? 2.50 : 0.00;

        const subtotalUsd = cart.reduce((s, i) => s + (i.priceUsd * i.qty), 0);
        const discountUsd = promoApplied ? subtotalUsd * 0.1 : 0;
        const totalUsd = subtotalUsd - discountUsd + shippingFeeUsd;

        document.getElementById('review-subtotal').innerText = formatPrice(subtotalUsd - discountUsd, currentLang);
        document.getElementById('checkout-final-amount').innerText = formatPrice(totalUsd, currentLang);

        const reviewShipType = document.getElementById('review-shipping-type');
        if (reviewShipType) {
            reviewShipType.innerText = deliveryVal === 'express'
                ? (currentLang === 'fa' ? "پیک ویژه شعله (۱۵۰,۰۰۰ تومان)" : "Flame Express Courier ($2.50)")
                : (currentLang === 'fa' ? "پست پیشتاز اختصاصی (رایگان)" : "Express Postal Delivery (Free)");
        }

        const selectedSample = document.querySelector('input[name="free-sample"]:checked');
        const sampleVal = selectedSample ? selectedSample.value : 'Luna Amber';
        const reviewSampleChoice = document.getElementById('review-sample-choice');
        if (reviewSampleChoice) {
            const sampleNames = {
                'Luna Amber': { fa: "موم لونا عنبر و عود", en: "Luna Amber & Oud Wax" },
                'Emerald Fig': { fa: "موم انجیر زمردین", en: "Emerald Fig Wax" },
                'Moonlight Jasmine': { fa: "موم یاس مروارید", en: "Moonlight Jasmine Wax" }
            };
            reviewSampleChoice.innerText = sampleNames[sampleVal] ? sampleNames[sampleVal][currentLang] : sampleVal;
        }

        const activePayBtn = document.querySelector('.pay-method-btn.active');
        const payMethod = activePayBtn ? activePayBtn.getAttribute('data-method') : 'gateway';
        const reviewPayType = document.getElementById('review-payment-type');
        if (reviewPayType) {
            reviewPayType.innerText = payMethod === 'c2c'
                ? (currentLang === 'fa' ? "کارت به کارت (بانک ملی)" : "Card to Card (Melli Bank)")
                : (currentLang === 'fa' ? "درگاه آنلاین شاپرک" : "Shaparak Online Gateway");
        }

        const previewContainer = document.getElementById('review-cart-preview');
        if (previewContainer) {
            previewContainer.innerHTML = cart.map(item => {
                const itemTotal = formatPrice(item.priceUsd * item.qty, currentLang);
                return `
                    <div class="mini-cart-card">
                        <img src="${item.image}" alt="${item.name}" class="mini-cart-img">
                        <div class="mini-cart-info">
                            <span class="mini-cart-title">${item.name}</span>
                            <span class="mini-cart-meta">${item.qty}× • ${itemTotal}</span>
                        </div>
                    </div>
                `;
            }).join('');
        }
    }

    // Step 2 Payment Method Switcher (Gateway vs Card-to-Card)
    document.querySelectorAll('.pay-method-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.pay-method-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.pay-mode-panel').forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            const method = btn.getAttribute('data-method');
            const targetPanel = document.getElementById(`pay-mode-${method}`);
            if (targetPanel) targetPanel.classList.add('active');
        });
    });

    // Copy Owner Blu Bank Card Number
    const copyCardBtn = document.getElementById('copy-owner-card');
    if (copyCardBtn) {
        copyCardBtn.addEventListener('click', () => {
            navigator.clipboard.writeText("6219861012345678").then(() => {
                showToast(currentLang === 'fa' ? "شماره کارت بلوبانک سامان کپی شد! 📋" : "Blu Bank Saman Card Copied! 📋");
            }).catch(() => {
                showToast(currentLang === 'fa' ? "شماره کارت: ۶۲۱۹۸۶۱۰۱۲۳۴۵۶۷۸" : "Card: 6219861012345678");
            });
        });
    }

    // Optional Receipt Upload Listener
    const receiptInput = document.getElementById('receipt-file-input');
    if (receiptInput) {
        receiptInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            const txtEl = document.getElementById('receipt-file-text');
            if (file && txtEl) {
                txtEl.innerText = (currentLang === 'fa' ? "فیش بارگذاری شد: " : "Receipt Uploaded: ") + file.name;
                showToast(currentLang === 'fa' ? "تصویر فیش ثبت شد 📸" : "Receipt image attached 📸");
            }
        });
    }

    const successModal = document.getElementById('order-success-modal');
    document.getElementById('checkout-form').addEventListener('submit', (e) => {
        e.preventDefault();
        checkoutModal.classList.remove('active');
        document.getElementById('success-order-id').innerText = '#MIORA-' + Math.floor(10000 + Math.random() * 90000) + '-VX';
        document.getElementById('success-paid-amount').innerText = document.getElementById('checkout-final-amount').innerText;
        cart = []; updateCartUI();
        setTimeout(() => successModal.classList.add('active'), 300);
    });

    const closeSuccessBtn = document.getElementById('close-success-btn');
    if (closeSuccessBtn) {
        closeSuccessBtn.addEventListener('click', () => successModal.classList.remove('active'));
    }

    // Mobile nav logic
    const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
    const mobileNavOverlay = document.getElementById('mobile-nav');
    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', () => mobileNavOverlay.classList.add('active'));
    document.getElementById('mobile-nav-close').addEventListener('click', () => mobileNavOverlay.classList.remove('active'));

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => mobileNavOverlay.classList.remove('active'));
    });

    // Toast with instant click-to-dismiss & auto-dismiss
    function showToast(msg) {
        const t = document.createElement('div');
        t.className = 'toast';
        t.title = currentLang === 'fa' ? 'برای بستن کلیک کنید' : 'Click to dismiss';
        t.innerHTML = `<i data-feather="star" style="color:var(--flame-gold); width:18px; height:18px; flex-shrink:0;"></i><span style="flex:1;">${msg}</span><i data-feather="x" style="width:14px; height:14px; opacity:0.6; flex-shrink:0; margin-left:0.4rem;"></i>`;
        
        let isDismissed = false;
        const autoTimer = setTimeout(() => dismiss(), 3500);

        function dismiss() {
            if (isDismissed) return;
            isDismissed = true;
            clearTimeout(autoTimer);
            t.style.opacity = '0';
            t.style.transform = 'translateY(-10px) scale(0.95)';
            setTimeout(() => t.remove(), 250);
        }

        t.addEventListener('click', dismiss);
        document.getElementById('toast-container').appendChild(t);
        feather.replace();
    }

    // 3D Card Tilt (Desktop mouse devices only)
    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth <= 768) return;
        document.querySelectorAll('.tilt-card').forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; const y = e.clientY - rect.top;
            if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                const rx = ((y - rect.height / 2) / (rect.height / 2)) * -6;
                const ry = ((x - rect.width / 2) / (rect.width / 2)) * 6;
                card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.01)`;
            } else { card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'; }
        });
    });

    // Bulletproof ScrollSpy Navigation Active Highlight on Scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link, .dock-item');

    function updateScrollSpy() {
        const scrollPosition = window.scrollY + 180;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPosition >= top && scrollPosition < top + height) {
                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateScrollSpy, { passive: true });
    updateScrollSpy();

    // Nav Links Click Listener for Immediate Active Highlight
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Sticky Header Shrink & Dark Glass Shadow on Scroll
    const header = document.querySelector('.glass-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Set initial Persian language and render candles
    setLanguage('fa');
    renderProducts();
});
