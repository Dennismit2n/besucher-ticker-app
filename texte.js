/*
 * Besucher-Ticker App · Texte in 14 Sprachen
 * Der Block OVERLAY stammt unverändert aus besucher_ticker.py (Windows-Overlay) und wird mit
 * tools/texte_aus_overlay.py erzeugt; nicht von Hand ändern. EIGEN sind die Texte, die es
 * nur in der App gibt. Gilt eine Sprache für einen Schlüssel nicht, springt Englisch ein.
 */
(function (wurzel, fabrik) {
  'use strict';
  const m = fabrik();
  if (typeof module === 'object' && module.exports) module.exports = m;
  else wurzel.TX = m;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const SPRACHEN = ['de', 'en', 'es', 'fr', 'it', 'nl', 'pl', 'pt', 'tr', 'ru', 'hi', 'zh', 'ja', 'ko'];

  /* OVERLAY-ANFANG */
  const OVERLAY = {
    de: {"titel": "Besucher", "lade": "lade…", "heuteN": "{n} heute", "gesamtN": "{n} gesamt", "jeWerkzeug": "Besucher je Werkzeug", "jeKachel": "Klicks je Kachel", "artAuto": "automatisch", "artSeiten": "Seitenbesuche", "artKlicks": "Kachel-Klicks", "setZaehlart": "Was gezählt wird", "startseite": "Startseite", "zeitHeute": "Heute", "zeit7": "7 Tage", "zeit30": "30 Tage", "zeitGesamt": "Gesamt", "zusAus": "aus", "zusLaender": "Länder", "zusVerweise": "Verweise", "standard": "Standard", "themeSPB": "Schwarz / Pink / Blau", "themeSPE": "Schwarz / Pink / Eisblau", "themeTMI": "Tiefschwarz / Magenta / Indigo", "mJetzt": "Jetzt aktualisieren", "mZeitraum": "Zeitraum", "mEinstellungen": "Einstellungen…", "mZugang": "Zugang ändern", "setFreq": "Update-Frequenz", "setFreqHinweis": "GoatCounter erlaubt 4 Anfragen je Sekunde,\nselbst 15 s sind unkritisch.", "setZeitraum": "Zeitraum für Balken und Zwischensumme", "setZusatz": "Zusatzblock unter den Balken", "setBalken": "Höchstens so viele Balken", "balkenAlle": "alle", "setNullen": "Auch Einträge mit 0 zeigen", "setDicht": "Balken einzeilig (spart Platz)", "setZusatzZeilen": "Zeilen im Zusatzblock", "setGroesse": "Größe", "grKlein": "klein", "grNormal": "normal", "grGross": "groß", "grSehrGross": "sehr groß", "setFarben": "Farben ({n} Varianten)", "schliessen": "Schließen", "abbrechen": "Abbrechen", "aktualisiert": "aktualisiert {zeit}", "netzFehler": "Netzwerkfehler, neuer Versuch…", "ratePause": "Rate-Limit (429), Pause", "tokenUngueltig": "Token ungültig!", "unbekannt": "unbekannt", "direkt": "direkt"},
    en: {"titel": "Visitors", "lade": "loading…", "heuteN": "{n} today", "gesamtN": "{n} total", "jeWerkzeug": "Visitors per tool", "jeKachel": "Clicks per tile", "artAuto": "automatic", "artSeiten": "Page visits", "artKlicks": "Tile clicks", "setZaehlart": "What is counted", "startseite": "Home page", "zeitHeute": "Today", "zeit7": "7 days", "zeit30": "30 days", "zeitGesamt": "All time", "zusAus": "off", "zusLaender": "Countries", "zusVerweise": "Referrers", "standard": "default", "themeSPB": "Black / Pink / Blue", "themeSPE": "Black / Pink / Ice blue", "themeTMI": "Deep black / Magenta / Indigo", "mJetzt": "Refresh now", "mZeitraum": "Time range", "mEinstellungen": "Settings…", "mZugang": "Change access", "setFreq": "Update frequency", "setFreqHinweis": "GoatCounter allows 4 requests per second,\nso even 15 s is no problem.", "setZeitraum": "Time range for bars and subtotal", "setZusatz": "Extra block below the bars", "setBalken": "At most this many bars", "balkenAlle": "all", "setNullen": "Also show entries with 0", "setDicht": "Bars on one line (saves space)", "setZusatzZeilen": "Rows in the extra block", "setGroesse": "Size", "grKlein": "small", "grNormal": "normal", "grGross": "large", "grSehrGross": "extra large", "setFarben": "Colours ({n} variants)", "schliessen": "Close", "abbrechen": "Cancel", "aktualisiert": "updated {zeit}", "netzFehler": "Network error, retrying…", "ratePause": "Rate limit (429), pausing", "tokenUngueltig": "Token invalid!", "unbekannt": "unknown", "direkt": "direct"},
    es: {"titel": "Visitantes", "lade": "cargando…", "heuteN": "{n} hoy", "gesamtN": "{n} en total", "jeWerkzeug": "Visitantes por herramienta", "jeKachel": "Clics por tarjeta", "artAuto": "automático", "artSeiten": "Visitas a páginas", "artKlicks": "Clics en tarjetas", "setZaehlart": "Qué se cuenta", "startseite": "Página de inicio", "zeitHeute": "Hoy", "zeit7": "7 días", "zeit30": "30 días", "zeitGesamt": "Todo", "zusAus": "no", "zusLaender": "Países", "zusVerweise": "Referencias", "standard": "predeterminado", "themeSPB": "Negro / Rosa / Azul", "themeSPE": "Negro / Rosa / Azul hielo", "themeTMI": "Negro intenso / Magenta / Índigo", "mJetzt": "Actualizar ahora", "mZeitraum": "Periodo", "mEinstellungen": "Ajustes…", "mZugang": "Cambiar acceso", "setFreq": "Frecuencia de actualización", "setFreqHinweis": "GoatCounter permite 4 peticiones por segundo,\nasí que incluso 15 s no es problema.", "setZeitraum": "Periodo para barras y subtotal", "setZusatz": "Bloque extra bajo las barras", "setBalken": "Como máximo tantas barras", "balkenAlle": "todas", "setNullen": "Mostrar también entradas con 0", "setDicht": "Barras en una línea (ahorra espacio)", "setZusatzZeilen": "Líneas en el bloque extra", "setGroesse": "Tamaño", "grKlein": "pequeño", "grNormal": "normal", "grGross": "grande", "grSehrGross": "muy grande", "setFarben": "Colores ({n} variantes)", "schliessen": "Cerrar", "abbrechen": "Cancelar", "aktualisiert": "actualizado {zeit}", "netzFehler": "Error de red, reintentando…", "ratePause": "Límite de peticiones (429), pausa", "tokenUngueltig": "¡Token no válido!", "unbekannt": "desconocido", "direkt": "directo"},
    fr: {"titel": "Visiteurs", "lade": "chargement…", "heuteN": "{n} aujourd’hui", "gesamtN": "{n} au total", "jeWerkzeug": "Visiteurs par outil", "jeKachel": "Clics par vignette", "artAuto": "automatique", "artSeiten": "Visites de pages", "artKlicks": "Clics sur les vignettes", "setZaehlart": "Ce qui est compté", "startseite": "Page d’accueil", "zeitHeute": "Aujourd’hui", "zeit7": "7 jours", "zeit30": "30 jours", "zeitGesamt": "Depuis le début", "zusAus": "non", "zusLaender": "Pays", "zusVerweise": "Référents", "standard": "par défaut", "themeSPB": "Noir / Rose / Bleu", "themeSPE": "Noir / Rose / Bleu glacier", "themeTMI": "Noir profond / Magenta / Indigo", "mJetzt": "Actualiser maintenant", "mZeitraum": "Période", "mEinstellungen": "Réglages…", "mZugang": "Changer l’accès", "setFreq": "Fréquence de mise à jour", "setFreqHinweis": "GoatCounter autorise 4 requêtes par seconde,\nmême 15 s ne pose aucun problème.", "setZeitraum": "Période pour les barres et le sous-total", "setZusatz": "Bloc supplémentaire sous les barres", "setBalken": "Au plus autant de barres", "balkenAlle": "toutes", "setNullen": "Afficher aussi les entrées à 0", "setDicht": "Barres sur une ligne (gain de place)", "setZusatzZeilen": "Lignes du bloc supplémentaire", "setGroesse": "Taille", "grKlein": "petite", "grNormal": "normale", "grGross": "grande", "grSehrGross": "très grande", "setFarben": "Couleurs ({n} variantes)", "schliessen": "Fermer", "abbrechen": "Annuler", "aktualisiert": "mis à jour {zeit}", "netzFehler": "Erreur réseau, nouvel essai…", "ratePause": "Limite de requêtes (429), pause", "tokenUngueltig": "Jeton non valide !", "unbekannt": "inconnu", "direkt": "direct"},
    it: {"titel": "Visitatori", "lade": "caricamento…", "heuteN": "{n} oggi", "gesamtN": "{n} in totale", "jeWerkzeug": "Visitatori per strumento", "jeKachel": "Clic per scheda", "artAuto": "automatico", "artSeiten": "Visite alle pagine", "artKlicks": "Clic sulle schede", "setZaehlart": "Cosa viene contato", "startseite": "Pagina iniziale", "zeitHeute": "Oggi", "zeit7": "7 giorni", "zeit30": "30 giorni", "zeitGesamt": "Da sempre", "zusAus": "no", "zusLaender": "Paesi", "zusVerweise": "Referrer", "standard": "predefinito", "themeSPB": "Nero / Rosa / Blu", "themeSPE": "Nero / Rosa / Azzurro ghiaccio", "themeTMI": "Nero profondo / Magenta / Indaco", "mJetzt": "Aggiorna ora", "mZeitraum": "Periodo", "mEinstellungen": "Impostazioni…", "mZugang": "Cambia accesso", "setFreq": "Frequenza di aggiornamento", "setFreqHinweis": "GoatCounter consente 4 richieste al secondo,\nanche 15 s non sono un problema.", "setZeitraum": "Periodo per barre e subtotale", "setZusatz": "Blocco extra sotto le barre", "setBalken": "Al massimo tante barre", "balkenAlle": "tutte", "setNullen": "Mostra anche le voci a 0", "setDicht": "Barre su una riga (risparmia spazio)", "setZusatzZeilen": "Righe nel blocco extra", "setGroesse": "Dimensione", "grKlein": "piccola", "grNormal": "normale", "grGross": "grande", "grSehrGross": "molto grande", "setFarben": "Colori ({n} varianti)", "schliessen": "Chiudi", "abbrechen": "Annulla", "aktualisiert": "aggiornato {zeit}", "netzFehler": "Errore di rete, nuovo tentativo…", "ratePause": "Limite di richieste (429), pausa", "tokenUngueltig": "Token non valido!", "unbekannt": "sconosciuto", "direkt": "diretto"},
    nl: {"titel": "Bezoekers", "lade": "laden…", "heuteN": "{n} vandaag", "gesamtN": "{n} in totaal", "jeWerkzeug": "Bezoekers per tool", "jeKachel": "Klikken per tegel", "artAuto": "automatisch", "artSeiten": "Paginabezoeken", "artKlicks": "Tegelklikken", "setZaehlart": "Wat er geteld wordt", "startseite": "Startpagina", "zeitHeute": "Vandaag", "zeit7": "7 dagen", "zeit30": "30 dagen", "zeitGesamt": "Altijd", "zusAus": "uit", "zusLaender": "Landen", "zusVerweise": "Verwijzers", "standard": "standaard", "themeSPB": "Zwart / Roze / Blauw", "themeSPE": "Zwart / Roze / IJsblauw", "themeTMI": "Diepzwart / Magenta / Indigo", "mJetzt": "Nu bijwerken", "mZeitraum": "Periode", "mEinstellungen": "Instellingen…", "mZugang": "Toegang wijzigen", "setFreq": "Updatefrequentie", "setFreqHinweis": "GoatCounter staat 4 verzoeken per seconde toe,\ndus zelfs 15 s is geen probleem.", "setZeitraum": "Periode voor balken en subtotaal", "setZusatz": "Extra blok onder de balken", "setBalken": "Hoogstens zoveel balken", "balkenAlle": "alle", "setNullen": "Ook items met 0 tonen", "setDicht": "Balken op één regel (bespaart ruimte)", "setZusatzZeilen": "Regels in het extra blok", "setGroesse": "Grootte", "grKlein": "klein", "grNormal": "normaal", "grGross": "groot", "grSehrGross": "heel groot", "setFarben": "Kleuren ({n} varianten)", "schliessen": "Sluiten", "abbrechen": "Annuleren", "aktualisiert": "bijgewerkt {zeit}", "netzFehler": "Netwerkfout, nieuwe poging…", "ratePause": "Limiet bereikt (429), pauze", "tokenUngueltig": "Token ongeldig!", "unbekannt": "onbekend", "direkt": "direct"},
    pl: {"titel": "Odwiedziny", "lade": "wczytywanie…", "heuteN": "dziś: {n}", "gesamtN": "razem: {n}", "jeWerkzeug": "Odwiedziny według narzędzia", "jeKachel": "Kliknięcia według kafelka", "artAuto": "automatycznie", "artSeiten": "Odwiedziny stron", "artKlicks": "Kliknięcia kafelków", "setZaehlart": "Co jest liczone", "startseite": "Strona główna", "zeitHeute": "Dziś", "zeit7": "7 dni", "zeit30": "30 dni", "zeitGesamt": "Od początku", "zusAus": "wył.", "zusLaender": "Kraje", "zusVerweise": "Odsyłacze", "standard": "domyślnie", "themeSPB": "Czarny / Różowy / Niebieski", "themeSPE": "Czarny / Różowy / Lodowy błękit", "themeTMI": "Głęboka czerń / Magenta / Indygo", "mJetzt": "Odśwież teraz", "mZeitraum": "Okres", "mEinstellungen": "Ustawienia…", "mZugang": "Zmień dostęp", "setFreq": "Częstotliwość odświeżania", "setFreqHinweis": "GoatCounter pozwala na 4 zapytania na sekundę,\nwięc nawet 15 s to żaden problem.", "setZeitraum": "Okres dla pasków i sumy częściowej", "setZusatz": "Dodatkowy blok pod paskami", "setBalken": "Najwyżej tyle pasków", "balkenAlle": "wszystkie", "setNullen": "Pokazuj też pozycje z 0", "setDicht": "Paski w jednym wierszu (oszczędza miejsce)", "setZusatzZeilen": "Wiersze w dodatkowym bloku", "setGroesse": "Rozmiar", "grKlein": "mały", "grNormal": "normalny", "grGross": "duży", "grSehrGross": "bardzo duży", "setFarben": "Kolory (warianty: {n})", "schliessen": "Zamknij", "abbrechen": "Anuluj", "aktualisiert": "aktualizacja {zeit}", "netzFehler": "Błąd sieci, ponawiam…", "ratePause": "Limit zapytań (429), przerwa", "tokenUngueltig": "Nieprawidłowy token!", "unbekannt": "nieznane", "direkt": "bezpośrednio"},
    pt: {"titel": "Visitantes", "lade": "carregando…", "heuteN": "{n} hoje", "gesamtN": "{n} no total", "jeWerkzeug": "Visitantes por ferramenta", "jeKachel": "Cliques por cartão", "artAuto": "automático", "artSeiten": "Visitas às páginas", "artKlicks": "Cliques nos cartões", "setZaehlart": "O que é contado", "startseite": "Página inicial", "zeitHeute": "Hoje", "zeit7": "7 dias", "zeit30": "30 dias", "zeitGesamt": "Desde sempre", "zusAus": "não", "zusLaender": "Países", "zusVerweise": "Origens", "standard": "padrão", "themeSPB": "Preto / Rosa / Azul", "themeSPE": "Preto / Rosa / Azul-gelo", "themeTMI": "Preto profundo / Magenta / Índigo", "mJetzt": "Atualizar agora", "mZeitraum": "Período", "mEinstellungen": "Configurações…", "mZugang": "Mudar acesso", "setFreq": "Frequência de atualização", "setFreqHinweis": "O GoatCounter permite 4 requisições por segundo,\nentão até 15 s é tranquilo.", "setZeitraum": "Período para as barras e o subtotal", "setZusatz": "Bloco extra abaixo das barras", "setBalken": "No máximo esta quantidade de barras", "balkenAlle": "todas", "setNullen": "Mostrar também entradas com 0", "setDicht": "Barras numa linha (poupa espaço)", "setZusatzZeilen": "Linhas no bloco extra", "setGroesse": "Tamanho", "grKlein": "pequeno", "grNormal": "normal", "grGross": "grande", "grSehrGross": "muito grande", "setFarben": "Cores ({n} variantes)", "schliessen": "Fechar", "abbrechen": "Cancelar", "aktualisiert": "atualizado {zeit}", "netzFehler": "Erro de rede, tentando de novo…", "ratePause": "Limite de requisições (429), pausa", "tokenUngueltig": "Token inválido!", "unbekannt": "desconhecido", "direkt": "direto"},
    tr: {"titel": "Ziyaretçiler", "lade": "yükleniyor…", "heuteN": "bugün {n}", "gesamtN": "toplam {n}", "jeWerkzeug": "Araç başına ziyaretçi", "jeKachel": "Kart başına tıklama", "artAuto": "otomatik", "artSeiten": "Sayfa ziyaretleri", "artKlicks": "Kart tıklamaları", "setZaehlart": "Neyin sayıldığı", "startseite": "Ana sayfa", "zeitHeute": "Bugün", "zeit7": "7 gün", "zeit30": "30 gün", "zeitGesamt": "Tüm zamanlar", "zusAus": "kapalı", "zusLaender": "Ülkeler", "zusVerweise": "Yönlendirenler", "standard": "varsayılan", "themeSPB": "Siyah / Pembe / Mavi", "themeSPE": "Siyah / Pembe / Buz mavisi", "themeTMI": "Koyu siyah / Macenta / Çivit", "mJetzt": "Şimdi güncelle", "mZeitraum": "Zaman aralığı", "mEinstellungen": "Ayarlar…", "mZugang": "Erişimi değiştir", "setFreq": "Güncelleme sıklığı", "setFreqHinweis": "GoatCounter saniyede 4 isteğe izin verir,\nyani 15 s bile sorun değil.", "setZeitraum": "Çubuklar ve ara toplam için zaman aralığı", "setZusatz": "Çubukların altındaki ek blok", "setBalken": "En fazla bu kadar çubuk", "balkenAlle": "tümü", "setNullen": "0 olan girişleri de göster", "setDicht": "Çubuklar tek satırda (yer kazandırır)", "setZusatzZeilen": "Ek bloktaki satırlar", "setGroesse": "Boyut", "grKlein": "küçük", "grNormal": "normal", "grGross": "büyük", "grSehrGross": "çok büyük", "setFarben": "Renkler ({n} çeşit)", "schliessen": "Kapat", "abbrechen": "İptal", "aktualisiert": "güncellendi {zeit}", "netzFehler": "Ağ hatası, yeniden deneniyor…", "ratePause": "İstek sınırı (429), mola", "tokenUngueltig": "Anahtar geçersiz!", "unbekannt": "bilinmiyor", "direkt": "doğrudan"},
    ru: {"titel": "Посетители", "lade": "загрузка…", "heuteN": "сегодня: {n}", "gesamtN": "всего: {n}", "jeWerkzeug": "Посетители по инструментам", "jeKachel": "Клики по каждой плитке", "artAuto": "автоматически", "artSeiten": "Посещения страниц", "artKlicks": "Клики по плиткам", "setZaehlart": "Что считается", "startseite": "Главная страница", "zeitHeute": "Сегодня", "zeit7": "7 дней", "zeit30": "30 дней", "zeitGesamt": "За всё время", "zusAus": "выкл.", "zusLaender": "Страны", "zusVerweise": "Источники", "standard": "по умолчанию", "themeSPB": "Чёрный / Розовый / Синий", "themeSPE": "Чёрный / Розовый / Ледяной синий", "themeTMI": "Глубокий чёрный / Пурпурный / Индиго", "mJetzt": "Обновить сейчас", "mZeitraum": "Период", "mEinstellungen": "Настройки…", "mZugang": "Изменить доступ", "setFreq": "Частота обновления", "setFreqHinweis": "GoatCounter разрешает 4 запроса в секунду,\nтак что даже 15 с не проблема.", "setZeitraum": "Период для полос и промежуточной суммы", "setZusatz": "Дополнительный блок под полосами", "setBalken": "Не больше стольких полос", "balkenAlle": "все", "setNullen": "Показывать и записи с 0", "setDicht": "Полосы в одну строку (экономит место)", "setZusatzZeilen": "Строк в дополнительном блоке", "setGroesse": "Размер", "grKlein": "маленький", "grNormal": "обычный", "grGross": "большой", "grSehrGross": "очень большой", "setFarben": "Цвета (вариантов: {n})", "schliessen": "Закрыть", "abbrechen": "Отмена", "aktualisiert": "обновлено {zeit}", "netzFehler": "Ошибка сети, повтор…", "ratePause": "Лимит запросов (429), пауза", "tokenUngueltig": "Токен недействителен!", "unbekannt": "неизвестно", "direkt": "напрямую"},
    hi: {"titel": "विज़िटर", "lade": "लोड हो रहा है…", "heuteN": "आज {n}", "gesamtN": "कुल {n}", "jeWerkzeug": "हर टूल के विज़िटर", "jeKachel": "हर कार्ड के क्लिक", "artAuto": "स्वचालित", "artSeiten": "पेज विज़िट", "artKlicks": "कार्ड क्लिक", "setZaehlart": "क्या गिना जाता है", "startseite": "होम पेज", "zeitHeute": "आज", "zeit7": "7 दिन", "zeit30": "30 दिन", "zeitGesamt": "शुरू से अब तक", "zusAus": "बंद", "zusLaender": "देश", "zusVerweise": "रेफ़रर", "standard": "डिफ़ॉल्ट", "themeSPB": "काला / गुलाबी / नीला", "themeSPE": "काला / गुलाबी / बर्फ़ीला नीला", "themeTMI": "गहरा काला / मैजेंटा / इंडिगो", "mJetzt": "अभी अपडेट करें", "mZeitraum": "समय अवधि", "mEinstellungen": "सेटिंग्स…", "mZugang": "पहुँच बदलें", "setFreq": "अपडेट की आवृत्ति", "setFreqHinweis": "GoatCounter हर सेकंड 4 अनुरोधों की अनुमति देता है,\nइसलिए 15 s भी कोई समस्या नहीं।", "setZeitraum": "बार और उप-योग के लिए समय अवधि", "setZusatz": "बार के नीचे अतिरिक्त ब्लॉक", "setBalken": "अधिकतम इतने बार", "balkenAlle": "सभी", "setNullen": "0 वाली प्रविष्टियाँ भी दिखाएँ", "setDicht": "बार एक ही पंक्ति में (जगह बचती है)", "setZusatzZeilen": "अतिरिक्त ब्लॉक में पंक्तियाँ", "setGroesse": "आकार", "grKlein": "छोटा", "grNormal": "सामान्य", "grGross": "बड़ा", "grSehrGross": "बहुत बड़ा", "setFarben": "रंग ({n} प्रकार)", "schliessen": "बंद करें", "abbrechen": "रद्द करें", "aktualisiert": "अपडेट {zeit}", "netzFehler": "नेटवर्क त्रुटि, फिर से कोशिश…", "ratePause": "अनुरोध सीमा (429), विराम", "tokenUngueltig": "टोकन अमान्य!", "unbekannt": "अज्ञात", "direkt": "सीधे"},
    zh: {"titel": "访客", "lade": "正在加载…", "heuteN": "今天 {n}", "gesamtN": "总计 {n}", "jeWerkzeug": "各工具的访客", "jeKachel": "各卡片的点击", "artAuto": "自动", "artSeiten": "页面访问", "artKlicks": "卡片点击", "setZaehlart": "统计什么", "startseite": "首页", "zeitHeute": "今天", "zeit7": "7 天", "zeit30": "30 天", "zeitGesamt": "全部时间", "zusAus": "关", "zusLaender": "国家", "zusVerweise": "来源", "standard": "默认", "themeSPB": "黑 / 粉 / 蓝", "themeSPE": "黑 / 粉 / 冰蓝", "themeTMI": "深黑 / 品红 / 靛蓝", "mJetzt": "立即更新", "mZeitraum": "时间范围", "mEinstellungen": "设置…", "mZugang": "更改访问凭据", "setFreq": "更新频率", "setFreqHinweis": "GoatCounter 允许每秒 4 个请求，\n所以就算 15 秒也没问题。", "setZeitraum": "条形图和小计的时间范围", "setZusatz": "条形图下方的附加区块", "setBalken": "最多显示多少条", "balkenAlle": "全部", "setNullen": "也显示为 0 的条目", "setDicht": "条形单行显示（节省空间）", "setZusatzZeilen": "附加区块的行数", "setGroesse": "大小", "grKlein": "小", "grNormal": "正常", "grGross": "大", "grSehrGross": "特大", "setFarben": "颜色（{n} 种）", "schliessen": "关闭", "abbrechen": "取消", "aktualisiert": "更新于 {zeit}", "netzFehler": "网络错误，正在重试…", "ratePause": "请求超限 (429)，暂停", "tokenUngueltig": "令牌无效！", "unbekannt": "未知", "direkt": "直接访问"},
    ja: {"titel": "訪問者", "lade": "読み込み中…", "heuteN": "今日 {n}", "gesamtN": "合計 {n}", "jeWerkzeug": "ツールごとの訪問者", "jeKachel": "カードごとのクリック", "artAuto": "自動", "artSeiten": "ページ訪問", "artKlicks": "カードのクリック", "setZaehlart": "何を数えるか", "startseite": "トップページ", "zeitHeute": "今日", "zeit7": "7 日間", "zeit30": "30 日間", "zeitGesamt": "全期間", "zusAus": "オフ", "zusLaender": "国", "zusVerweise": "参照元", "standard": "標準", "themeSPB": "黒 / ピンク / 青", "themeSPE": "黒 / ピンク / アイスブルー", "themeTMI": "漆黒 / マゼンタ / インディゴ", "mJetzt": "今すぐ更新", "mZeitraum": "期間", "mEinstellungen": "設定…", "mZugang": "アクセス情報を変更", "setFreq": "更新頻度", "setFreqHinweis": "GoatCounter は毎秒 4 件までリクエストできるので、\n15 秒でも問題ありません。", "setZeitraum": "バーと小計の期間", "setZusatz": "バーの下の追加ブロック", "setBalken": "バーの最大数", "balkenAlle": "すべて", "setNullen": "0 の項目も表示", "setDicht": "バーを1行で表示（省スペース）", "setZusatzZeilen": "追加ブロックの行数", "setGroesse": "サイズ", "grKlein": "小", "grNormal": "標準", "grGross": "大", "grSehrGross": "特大", "setFarben": "色（{n} 種類）", "schliessen": "閉じる", "abbrechen": "キャンセル", "aktualisiert": "更新 {zeit}", "netzFehler": "ネットワークエラー、再試行中…", "ratePause": "リクエスト上限 (429)、一時停止", "tokenUngueltig": "トークンが無効です！", "unbekannt": "不明", "direkt": "直接"},
    ko: {"titel": "방문자", "lade": "불러오는 중…", "heuteN": "오늘 {n}", "gesamtN": "전체 {n}", "jeWerkzeug": "도구별 방문자", "jeKachel": "타일별 클릭", "artAuto": "자동", "artSeiten": "페이지 방문", "artKlicks": "타일 클릭", "setZaehlart": "무엇을 집계할지", "startseite": "홈페이지", "zeitHeute": "오늘", "zeit7": "7일", "zeit30": "30일", "zeitGesamt": "전체 기간", "zusAus": "끔", "zusLaender": "국가", "zusVerweise": "유입 경로", "standard": "기본", "themeSPB": "검정 / 분홍 / 파랑", "themeSPE": "검정 / 분홍 / 얼음 파랑", "themeTMI": "깊은 검정 / 자홍 / 남색", "mJetzt": "지금 업데이트", "mZeitraum": "기간", "mEinstellungen": "설정…", "mZugang": "접속 정보 변경", "setFreq": "업데이트 빈도", "setFreqHinweis": "GoatCounter는 초당 4건의 요청을 허용하므로\n15초도 문제없습니다.", "setZeitraum": "막대와 소계의 기간", "setZusatz": "막대 아래 추가 블록", "setBalken": "최대 막대 수", "balkenAlle": "모두", "setNullen": "0인 항목도 표시", "setDicht": "막대를 한 줄로 (공간 절약)", "setZusatzZeilen": "추가 블록의 줄 수", "setGroesse": "크기", "grKlein": "작게", "grNormal": "보통", "grGross": "크게", "grSehrGross": "아주 크게", "setFarben": "색상 ({n}가지)", "schliessen": "닫기", "abbrechen": "취소", "aktualisiert": "업데이트 {zeit}", "netzFehler": "네트워크 오류, 다시 시도 중…", "ratePause": "요청 한도 (429), 잠시 멈춤", "tokenUngueltig": "토큰이 올바르지 않습니다!", "unbekannt": "알 수 없음", "direkt": "직접"},
  };
  /* OVERLAY-ENDE */

  const EIGEN = {
    de: {
      install: 'Installieren', installDone: 'Als App installiert.', sprache: 'Sprache', darst: 'Darstellung',
      darstOpt: ['Normal', 'Hoher Kontrast dunkel', 'Hoher Kontrast hell', 'Farbenblind', 'Umgekehrte Farben'],
      untertitel: 'Deine GoatCounter-Zahlen am Handy',
      zugangH: 'Mit deiner GoatCounter-Seite verbinden',
      siteL: 'Adresse deiner GoatCounter-Seite', siteP: 'deinname.goatcounter.com', tokenL: 'API-Token',
      tokenHilfe: 'So bekommst du es: bei GoatCounter oben rechts auf deinen Benutzernamen, dann „API“ und „Add new token“. Das Recht „Read statistics“ genügt.',
      tokenOrt: 'Das Token bleibt nur auf diesem Gerät im Speicher dieser App und geht ausschließlich an deine GoatCounter-Seite.',
      verbinden: 'Verbinden', pruefe: 'Prüfe den Zugang…', fehlerLeer: 'Bitte Adresse und Token eintragen.',
      fehlerSite: 'Diese GoatCounter-Seite gibt es nicht. Stimmt die Adresse?',
      zugangLoeschen: 'Zugang löschen', zugangGeloescht: 'Zugang auf diesem Gerät gelöscht.',
      zugangOk: 'Verbunden. Das Token liegt nur auf diesem Gerät.', verbundenMit: 'Verbunden mit {site}',
      offline: 'Kein Netz. Gezeigt wird der letzte Stand ({zeit}).', leer: 'In diesem Zeitraum gibt es noch keine Zahlen.',
      frei: 'Die App zählt nicht mit: kein Tracking, keine Cookies, keine Werbung.',
      liest: 'Sie liest nur deine eigenen Zahlen über die GoatCounter-API.',
      unabhaengig: 'Unabhängiges Werkzeug, nicht von GoatCounter.',
      windows: 'Besucher-Ticker für Windows', quelle: 'Quelltext auf GitHub',
      taktHinweis: 'Im Hintergrund fragt die App nichts ab.',
    },
    en: {
      install: 'Install', installDone: 'Installed as an app.', sprache: 'Language', darst: 'Display',
      darstOpt: ['Normal', 'High contrast dark', 'High contrast light', 'Colour-blind', 'Inverted colours'],
      untertitel: 'Your GoatCounter numbers on your phone',
      zugangH: 'Connect your GoatCounter site',
      siteL: 'Address of your GoatCounter site', siteP: 'yourname.goatcounter.com', tokenL: 'API token',
      tokenHilfe: 'How to get it: in GoatCounter click your user name at the top right, then “API” and “Add new token”. The “Read statistics” permission is enough.',
      tokenOrt: 'The token stays on this device only, in this app’s storage, and is sent to your GoatCounter site and nowhere else.',
      verbinden: 'Connect', pruefe: 'Checking access…', fehlerLeer: 'Please enter the address and the token.',
      fehlerSite: 'This GoatCounter site does not exist. Is the address right?',
      zugangLoeschen: 'Remove access', zugangGeloescht: 'Access removed from this device.',
      zugangOk: 'Connected. The token is stored on this device only.', verbundenMit: 'Connected to {site}',
      offline: 'No connection. Showing the last numbers ({zeit}).', leer: 'No numbers in this time range yet.',
      frei: 'This app counts nothing: no tracking, no cookies, no ads.',
      liest: 'It only reads your own numbers through the GoatCounter API.',
      unabhaengig: 'Independent tool, not made by GoatCounter.',
      windows: 'Besucher-Ticker for Windows', quelle: 'Source code on GitHub',
      taktHinweis: 'While in the background, the app makes no requests.',
    },
    es: {
      install: 'Instalar', installDone: 'Instalada como app.', sprache: 'Idioma', darst: 'Apariencia',
      darstOpt: ['Normal', 'Alto contraste oscuro', 'Alto contraste claro', 'Daltonismo', 'Colores invertidos'],
      untertitel: 'Tus cifras de GoatCounter en el móvil',
      zugangH: 'Conectar con tu sitio de GoatCounter',
      siteL: 'Dirección de tu sitio de GoatCounter', siteP: 'tunombre.goatcounter.com', tokenL: 'Token de la API',
      tokenHilfe: 'Cómo conseguirlo: en GoatCounter pulsa tu nombre de usuario arriba a la derecha, luego “API” y “Add new token”. Basta con el permiso “Read statistics”.',
      tokenOrt: 'El token se queda solo en este dispositivo, en el almacenamiento de esta app, y solo se envía a tu sitio de GoatCounter.',
      verbinden: 'Conectar', pruefe: 'Comprobando el acceso…', fehlerLeer: 'Escribe la dirección y el token.',
      fehlerSite: 'Este sitio de GoatCounter no existe. ¿Es correcta la dirección?',
      zugangLoeschen: 'Borrar acceso', zugangGeloescht: 'Acceso borrado de este dispositivo.',
      zugangOk: 'Conectado. El token solo está en este dispositivo.', verbundenMit: 'Conectado a {site}',
      offline: 'Sin conexión. Se muestran las últimas cifras ({zeit}).', leer: 'Aún no hay cifras en este periodo.',
      frei: 'La app no cuenta nada: sin rastreo, sin cookies, sin anuncios.',
      liest: 'Solo lee tus propias cifras con la API de GoatCounter.',
      unabhaengig: 'Herramienta independiente, no es de GoatCounter.',
      windows: 'Besucher-Ticker para Windows', quelle: 'Código fuente en GitHub',
      taktHinweis: 'En segundo plano la app no hace ninguna consulta.',
    },
    fr: {
      install: 'Installer', installDone: 'Installée comme application.', sprache: 'Langue', darst: 'Affichage',
      darstOpt: ['Normal', 'Contraste élevé sombre', 'Contraste élevé clair', 'Daltonisme', 'Couleurs inversées'],
      untertitel: 'Vos chiffres GoatCounter sur votre téléphone',
      zugangH: 'Connecter votre site GoatCounter',
      siteL: 'Adresse de votre site GoatCounter', siteP: 'votrenom.goatcounter.com', tokenL: 'Jeton d’API',
      tokenHilfe: 'Pour l’obtenir : dans GoatCounter, cliquez sur votre nom d’utilisateur en haut à droite, puis « API » et « Add new token ». La permission « Read statistics » suffit.',
      tokenOrt: 'Le jeton reste uniquement sur cet appareil, dans le stockage de cette application, et n’est envoyé qu’à votre site GoatCounter.',
      verbinden: 'Connecter', pruefe: 'Vérification de l’accès…', fehlerLeer: 'Saisissez l’adresse et le jeton.',
      fehlerSite: 'Ce site GoatCounter n’existe pas. L’adresse est-elle correcte ?',
      zugangLoeschen: 'Supprimer l’accès', zugangGeloescht: 'Accès supprimé de cet appareil.',
      zugangOk: 'Connecté. Le jeton est enregistré uniquement sur cet appareil.', verbundenMit: 'Connecté à {site}',
      offline: 'Pas de connexion. Derniers chiffres affichés ({zeit}).', leer: 'Pas encore de chiffres sur cette période.',
      frei: 'L’application ne compte rien : ni suivi, ni cookies, ni publicité.',
      liest: 'Elle lit seulement vos propres chiffres via l’API GoatCounter.',
      unabhaengig: 'Outil indépendant, non édité par GoatCounter.',
      windows: 'Besucher-Ticker pour Windows', quelle: 'Code source sur GitHub',
      taktHinweis: 'En arrière-plan, l’application n’envoie aucune requête.',
    },
    it: {
      install: 'Installa', installDone: 'Installata come app.', sprache: 'Lingua', darst: 'Aspetto',
      darstOpt: ['Normale', 'Contrasto elevato scuro', 'Contrasto elevato chiaro', 'Daltonismo', 'Colori invertiti'],
      untertitel: 'I tuoi numeri di GoatCounter sul telefono',
      zugangH: 'Collega il tuo sito GoatCounter',
      siteL: 'Indirizzo del tuo sito GoatCounter', siteP: 'tuonome.goatcounter.com', tokenL: 'Token API',
      tokenHilfe: 'Come ottenerlo: in GoatCounter tocca il tuo nome utente in alto a destra, poi «API» e «Add new token». Basta il permesso «Read statistics».',
      tokenOrt: 'Il token resta solo su questo dispositivo, nella memoria di questa app, e viene inviato soltanto al tuo sito GoatCounter.',
      verbinden: 'Collega', pruefe: 'Verifica dell’accesso…', fehlerLeer: 'Inserisci indirizzo e token.',
      fehlerSite: 'Questo sito GoatCounter non esiste. L’indirizzo è giusto?',
      zugangLoeschen: 'Elimina accesso', zugangGeloescht: 'Accesso eliminato da questo dispositivo.',
      zugangOk: 'Collegato. Il token è salvato solo su questo dispositivo.', verbundenMit: 'Collegato a {site}',
      offline: 'Nessuna connessione. Mostro gli ultimi numeri ({zeit}).', leer: 'Ancora nessun numero in questo periodo.',
      frei: 'L’app non conta nulla: niente tracciamento, niente cookie, niente pubblicità.',
      liest: 'Legge solo i tuoi numeri tramite l’API di GoatCounter.',
      unabhaengig: 'Strumento indipendente, non di GoatCounter.',
      windows: 'Besucher-Ticker per Windows', quelle: 'Codice sorgente su GitHub',
      taktHinweis: 'In background l’app non fa richieste.',
    },
    nl: {
      install: 'Installeren', installDone: 'Als app geïnstalleerd.', sprache: 'Taal', darst: 'Weergave',
      darstOpt: ['Normaal', 'Hoog contrast donker', 'Hoog contrast licht', 'Kleurenblind', 'Omgekeerde kleuren'],
      untertitel: 'Je GoatCounter-cijfers op je telefoon',
      zugangH: 'Verbinden met je GoatCounter-site',
      siteL: 'Adres van je GoatCounter-site', siteP: 'jouwnaam.goatcounter.com', tokenL: 'API-token',
      tokenHilfe: 'Zo krijg je het: klik in GoatCounter rechtsboven op je gebruikersnaam, dan op “API” en “Add new token”. Het recht “Read statistics” is genoeg.',
      tokenOrt: 'Het token blijft alleen op dit apparaat, in de opslag van deze app, en gaat alleen naar je GoatCounter-site.',
      verbinden: 'Verbinden', pruefe: 'Toegang controleren…', fehlerLeer: 'Vul het adres en het token in.',
      fehlerSite: 'Deze GoatCounter-site bestaat niet. Klopt het adres?',
      zugangLoeschen: 'Toegang wissen', zugangGeloescht: 'Toegang op dit apparaat gewist.',
      zugangOk: 'Verbonden. Het token staat alleen op dit apparaat.', verbundenMit: 'Verbonden met {site}',
      offline: 'Geen verbinding. De laatste cijfers worden getoond ({zeit}).', leer: 'Nog geen cijfers in deze periode.',
      frei: 'De app telt niets: geen tracking, geen cookies, geen reclame.',
      liest: 'Hij leest alleen je eigen cijfers via de GoatCounter-API.',
      unabhaengig: 'Onafhankelijk hulpmiddel, niet van GoatCounter.',
      windows: 'Besucher-Ticker voor Windows', quelle: 'Broncode op GitHub',
      taktHinweis: 'Op de achtergrond doet de app geen verzoeken.',
    },
    pl: {
      install: 'Zainstaluj', installDone: 'Zainstalowano jako aplikację.', sprache: 'Język', darst: 'Wygląd',
      darstOpt: ['Normalny', 'Wysoki kontrast ciemny', 'Wysoki kontrast jasny', 'Daltonizm', 'Odwrócone kolory'],
      untertitel: 'Twoje liczby z GoatCounter na telefonie',
      zugangH: 'Połącz ze swoją stroną GoatCounter',
      siteL: 'Adres twojej strony GoatCounter', siteP: 'twojanazwa.goatcounter.com', tokenL: 'Token API',
      tokenHilfe: 'Jak go zdobyć: w GoatCounter kliknij swoją nazwę użytkownika w prawym górnym rogu, potem „API” i „Add new token”. Wystarczy uprawnienie „Read statistics”.',
      tokenOrt: 'Token zostaje tylko na tym urządzeniu, w pamięci tej aplikacji, i trafia wyłącznie do twojej strony GoatCounter.',
      verbinden: 'Połącz', pruefe: 'Sprawdzam dostęp…', fehlerLeer: 'Wpisz adres i token.',
      fehlerSite: 'Ta strona GoatCounter nie istnieje. Czy adres jest poprawny?',
      zugangLoeschen: 'Usuń dostęp', zugangGeloescht: 'Dostęp usunięty z tego urządzenia.',
      zugangOk: 'Połączono. Token jest zapisany tylko na tym urządzeniu.', verbundenMit: 'Połączono z {site}',
      offline: 'Brak połączenia. Pokazuję ostatnie liczby ({zeit}).', leer: 'W tym okresie nie ma jeszcze liczb.',
      frei: 'Aplikacja niczego nie liczy: bez śledzenia, bez ciasteczek, bez reklam.',
      liest: 'Odczytuje tylko twoje własne liczby przez API GoatCounter.',
      unabhaengig: 'Niezależne narzędzie, nie od GoatCounter.',
      windows: 'Besucher-Ticker dla Windows', quelle: 'Kod źródłowy na GitHubie',
      taktHinweis: 'W tle aplikacja nie wysyła żadnych zapytań.',
    },
    pt: {
      install: 'Instalar', installDone: 'Instalado como app.', sprache: 'Idioma', darst: 'Aparência',
      darstOpt: ['Normal', 'Alto contraste escuro', 'Alto contraste claro', 'Daltonismo', 'Cores invertidas'],
      untertitel: 'Seus números do GoatCounter no celular',
      zugangH: 'Conectar seu site do GoatCounter',
      siteL: 'Endereço do seu site do GoatCounter', siteP: 'seunome.goatcounter.com', tokenL: 'Token da API',
      tokenHilfe: 'Como conseguir: no GoatCounter, toque no seu nome de usuário no canto superior direito, depois em “API” e “Add new token”. A permissão “Read statistics” basta.',
      tokenOrt: 'O token fica só neste aparelho, no armazenamento deste app, e é enviado apenas ao seu site do GoatCounter.',
      verbinden: 'Conectar', pruefe: 'Verificando o acesso…', fehlerLeer: 'Informe o endereço e o token.',
      fehlerSite: 'Este site do GoatCounter não existe. O endereço está certo?',
      zugangLoeschen: 'Apagar acesso', zugangGeloescht: 'Acesso apagado deste aparelho.',
      zugangOk: 'Conectado. O token fica só neste aparelho.', verbundenMit: 'Conectado a {site}',
      offline: 'Sem conexão. Mostrando os últimos números ({zeit}).', leer: 'Ainda não há números neste período.',
      frei: 'O app não conta nada: sem rastreamento, sem cookies, sem anúncios.',
      liest: 'Ele só lê os seus próprios números pela API do GoatCounter.',
      unabhaengig: 'Ferramenta independente, não é do GoatCounter.',
      windows: 'Besucher-Ticker para Windows', quelle: 'Código-fonte no GitHub',
      taktHinweis: 'Em segundo plano o app não faz nenhuma consulta.',
    },
    tr: {
      install: 'Yükle', installDone: 'Uygulama olarak yüklendi.', sprache: 'Dil', darst: 'Görünüm',
      darstOpt: ['Normal', 'Yüksek karşıtlık koyu', 'Yüksek karşıtlık açık', 'Renk körlüğü', 'Ters renkler'],
      untertitel: 'GoatCounter sayılarınız telefonunuzda',
      zugangH: 'GoatCounter sitenize bağlanın',
      siteL: 'GoatCounter sitenizin adresi', siteP: 'adiniz.goatcounter.com', tokenL: 'API anahtarı',
      tokenHilfe: 'Nasıl alınır: GoatCounter’da sağ üstte kullanıcı adınıza, sonra “API” ve “Add new token” öğesine tıklayın. “Read statistics” izni yeterlidir.',
      tokenOrt: 'Anahtar yalnızca bu cihazda, bu uygulamanın deposunda kalır ve yalnızca GoatCounter sitenize gönderilir.',
      verbinden: 'Bağlan', pruefe: 'Erişim denetleniyor…', fehlerLeer: 'Lütfen adresi ve anahtarı girin.',
      fehlerSite: 'Bu GoatCounter sitesi yok. Adres doğru mu?',
      zugangLoeschen: 'Erişimi sil', zugangGeloescht: 'Erişim bu cihazdan silindi.',
      zugangOk: 'Bağlandı. Anahtar yalnızca bu cihazda saklanıyor.', verbundenMit: '{site} ile bağlı',
      offline: 'Bağlantı yok. Son sayılar gösteriliyor ({zeit}).', leer: 'Bu dönemde henüz sayı yok.',
      frei: 'Uygulama hiçbir şey saymaz: izleme yok, çerez yok, reklam yok.',
      liest: 'Yalnızca kendi sayılarınızı GoatCounter API’si üzerinden okur.',
      unabhaengig: 'Bağımsız bir araçtır, GoatCounter’a ait değildir.',
      windows: 'Windows için Besucher-Ticker', quelle: 'GitHub’da kaynak kodu',
      taktHinweis: 'Arka plandayken uygulama hiçbir istek göndermez.',
    },
    ru: {
      install: 'Установить', installDone: 'Установлено как приложение.', sprache: 'Язык', darst: 'Оформление',
      darstOpt: ['Обычное', 'Высокий контраст тёмный', 'Высокий контраст светлый', 'Для дальтоников', 'Инверсия цветов'],
      untertitel: 'Ваши цифры GoatCounter на телефоне',
      zugangH: 'Подключить ваш сайт GoatCounter',
      siteL: 'Адрес вашего сайта GoatCounter', siteP: 'yourname.goatcounter.com', tokenL: 'Токен API',
      tokenHilfe: 'Как получить: в GoatCounter нажмите на имя пользователя справа вверху, затем «API» и «Add new token». Достаточно права «Read statistics».',
      tokenOrt: 'Токен хранится только на этом устройстве, в памяти этого приложения, и отправляется только на ваш сайт GoatCounter.',
      verbinden: 'Подключить', pruefe: 'Проверяю доступ…', fehlerLeer: 'Введите адрес и токен.',
      fehlerSite: 'Такого сайта GoatCounter нет. Адрес верный?',
      zugangLoeschen: 'Удалить доступ', zugangGeloescht: 'Доступ удалён с этого устройства.',
      zugangOk: 'Подключено. Токен хранится только на этом устройстве.', verbundenMit: 'Подключено к {site}',
      offline: 'Нет сети. Показаны последние цифры ({zeit}).', leer: 'За этот период цифр пока нет.',
      frei: 'Приложение ничего не считает: без отслеживания, без cookie, без рекламы.',
      liest: 'Оно только читает ваши собственные цифры через API GoatCounter.',
      unabhaengig: 'Независимый инструмент, не от GoatCounter.',
      windows: 'Besucher-Ticker для Windows', quelle: 'Исходный код на GitHub',
      taktHinweis: 'В фоне приложение не отправляет запросов.',
    },
    hi: {
      install: 'इंस्टॉल करें', installDone: 'ऐप के रूप में इंस्टॉल हो गया।', sprache: 'भाषा', darst: 'रूप',
      darstOpt: ['सामान्य', 'उच्च कंट्रास्ट गहरा', 'उच्च कंट्रास्ट हल्का', 'रंग-अंधता', 'उलटे रंग'],
      untertitel: 'आपके GoatCounter आंकड़े फ़ोन पर',
      zugangH: 'अपनी GoatCounter साइट से जोड़ें',
      siteL: 'आपकी GoatCounter साइट का पता', siteP: 'yourname.goatcounter.com', tokenL: 'API टोकन',
      tokenHilfe: 'कैसे पाएं: GoatCounter में ऊपर दाईं ओर अपने उपयोगकर्ता नाम पर, फिर "API" और "Add new token" पर क्लिक करें। "Read statistics" अनुमति काफ़ी है।',
      tokenOrt: 'टोकन केवल इसी डिवाइस पर, इस ऐप के संग्रह में रहता है और केवल आपकी GoatCounter साइट पर भेजा जाता है।',
      verbinden: 'जोड़ें', pruefe: 'पहुंच जांची जा रही है…', fehlerLeer: 'कृपया पता और टोकन भरें।',
      fehlerSite: 'यह GoatCounter साइट मौजूद नहीं है। क्या पता सही है?',
      zugangLoeschen: 'पहुंच हटाएं', zugangGeloescht: 'इस डिवाइस से पहुंच हटा दी गई।',
      zugangOk: 'जुड़ गया। टोकन केवल इसी डिवाइस पर है।', verbundenMit: '{site} से जुड़ा',
      offline: 'नेटवर्क नहीं। पिछले आंकड़े दिखाए जा रहे हैं ({zeit})।', leer: 'इस अवधि में अभी कोई आंकड़े नहीं हैं।',
      frei: 'यह ऐप कुछ नहीं गिनता: कोई ट्रैकिंग नहीं, कोई कुकी नहीं, कोई विज्ञापन नहीं।',
      liest: 'यह केवल GoatCounter API से आपके अपने आंकड़े पढ़ता है।',
      unabhaengig: 'स्वतंत्र टूल, GoatCounter का नहीं।',
      windows: 'Windows के लिए Besucher-Ticker', quelle: 'GitHub पर सोर्स कोड',
      taktHinweis: 'बैकग्राउंड में ऐप कोई अनुरोध नहीं भेजता।',
    },
    zh: {
      install: '安装', installDone: '已作为应用安装。', sprache: '语言', darst: '显示',
      darstOpt: ['普通', '高对比度深色', '高对比度浅色', '色盲友好', '反转颜色'],
      untertitel: '手机上的 GoatCounter 数据',
      zugangH: '连接你的 GoatCounter 站点',
      siteL: '你的 GoatCounter 站点地址', siteP: 'yourname.goatcounter.com', tokenL: 'API 令牌',
      tokenHilfe: '获取方法：在 GoatCounter 右上角点击你的用户名，然后点“API”和“Add new token”。只需“Read statistics”权限。',
      tokenOrt: '令牌只保存在这台设备上本应用的存储中，只会发送到你的 GoatCounter 站点。',
      verbinden: '连接', pruefe: '正在检查访问…', fehlerLeer: '请填写地址和令牌。',
      fehlerSite: '这个 GoatCounter 站点不存在。地址正确吗？',
      zugangLoeschen: '删除访问', zugangGeloescht: '已从此设备删除访问。',
      zugangOk: '已连接。令牌只保存在这台设备上。', verbundenMit: '已连接到 {site}',
      offline: '没有网络。显示的是最后的数据（{zeit}）。', leer: '这个时间段还没有数据。',
      frei: '本应用不做任何统计：没有跟踪、没有 Cookie、没有广告。',
      liest: '它只通过 GoatCounter API 读取你自己的数据。',
      unabhaengig: '独立工具，并非 GoatCounter 出品。',
      windows: 'Windows 版 Besucher-Ticker', quelle: 'GitHub 上的源代码',
      taktHinweis: '在后台时应用不会发出任何请求。',
    },
    ja: {
      install: 'インストール', installDone: 'アプリとしてインストールしました。', sprache: '言語', darst: '表示',
      darstOpt: ['標準', 'ハイコントラスト（暗）', 'ハイコントラスト（明）', '色覚サポート', '色反転'],
      untertitel: 'GoatCounter の数字をスマホで',
      zugangH: 'GoatCounter サイトに接続',
      siteL: 'GoatCounter サイトのアドレス', siteP: 'yourname.goatcounter.com', tokenL: 'API トークン',
      tokenHilfe: '取得方法：GoatCounter の右上のユーザー名をクリックし、「API」から「Add new token」を選びます。「Read statistics」の権限だけで足ります。',
      tokenOrt: 'トークンはこの端末のこのアプリの保存領域にだけ残り、あなたの GoatCounter サイトにだけ送られます。',
      verbinden: '接続', pruefe: 'アクセスを確認中…', fehlerLeer: 'アドレスとトークンを入力してください。',
      fehlerSite: 'この GoatCounter サイトは存在しません。アドレスは正しいですか？',
      zugangLoeschen: 'アクセスを削除', zugangGeloescht: 'この端末からアクセスを削除しました。',
      zugangOk: '接続しました。トークンはこの端末にだけ保存されます。', verbundenMit: '{site} に接続中',
      offline: 'ネットワークがありません。最後の数字を表示しています（{zeit}）。', leer: 'この期間の数字はまだありません。',
      frei: 'このアプリは何も数えません。トラッキングなし、Cookie なし、広告なし。',
      liest: 'GoatCounter API であなた自身の数字を読むだけです。',
      unabhaengig: '独立したツールで、GoatCounter の製品ではありません。',
      windows: 'Windows 版 Besucher-Ticker', quelle: 'GitHub のソースコード',
      taktHinweis: 'バックグラウンドではアプリは通信しません。',
    },
    ko: {
      install: '설치', installDone: '앱으로 설치했습니다.', sprache: '언어', darst: '화면',
      darstOpt: ['기본', '고대비 어둡게', '고대비 밝게', '색각 이상 지원', '색 반전'],
      untertitel: '휴대폰에서 보는 GoatCounter 숫자',
      zugangH: 'GoatCounter 사이트 연결',
      siteL: 'GoatCounter 사이트 주소', siteP: 'yourname.goatcounter.com', tokenL: 'API 토큰',
      tokenHilfe: '받는 방법: GoatCounter 오른쪽 위의 사용자 이름을 누른 뒤 “API”와 “Add new token”을 누르세요. “Read statistics” 권한이면 충분합니다.',
      tokenOrt: '토큰은 이 기기의 이 앱 저장소에만 남고 내 GoatCounter 사이트로만 전송됩니다.',
      verbinden: '연결', pruefe: '접근 확인 중…', fehlerLeer: '주소와 토큰을 입력하세요.',
      fehlerSite: '이 GoatCounter 사이트가 없습니다. 주소가 맞나요?',
      zugangLoeschen: '접근 삭제', zugangGeloescht: '이 기기에서 접근을 삭제했습니다.',
      zugangOk: '연결되었습니다. 토큰은 이 기기에만 저장됩니다.', verbundenMit: '{site}에 연결됨',
      offline: '네트워크가 없습니다. 마지막 숫자를 표시합니다 ({zeit}).', leer: '이 기간에는 아직 숫자가 없습니다.',
      frei: '이 앱은 아무것도 세지 않습니다. 추적, 쿠키, 광고가 없습니다.',
      liest: 'GoatCounter API로 내 숫자만 읽습니다.',
      unabhaengig: '독립 도구이며 GoatCounter에서 만든 것이 아닙니다.',
      windows: 'Windows용 Besucher-Ticker', quelle: 'GitHub의 소스 코드',
      taktHinweis: '백그라운드에서는 앱이 요청을 보내지 않습니다.',
    },
  };

  const CACHE = {};
  /** Alle Texte einer Sprache: Overlay und App, Lücken aus Englisch. */
  function texte(code) {
    if (!SPRACHEN.includes(code)) code = 'en';
    if (!CACHE[code]) CACHE[code] = Object.assign({}, OVERLAY.en, EIGEN.en, OVERLAY[code], EIGEN[code]);
    return CACHE[code];
  }

  /** Text mit Platzhaltern {n}, {zeit}, {site} … */
  function tx(code, schluessel, werte) {
    let s = texte(code)[schluessel];
    if (s == null) s = schluessel;
    if (typeof s !== 'string') return s;
    for (const [k, v] of Object.entries(werte || {})) s = s.split('{' + k + '}').join(String(v));
    return s.replace(/\n/g, ' ');
  }

  /** Interne Beschriftungen der Balken und Listen in der gewählten Sprache. */
  function anzeige(label, code) {
    if (label === 'Startseite') return tx(code, 'startseite');
    if (label === '(unbekannt)' || label === '(direkt)') return `(${tx(code, label.slice(1, -1))})`;
    return label;
  }

  function taktName(sek, code) {
    const name = sek >= 120 ? `${sek / 60} min` : `${sek} s`;
    return name + (sek === 60 ? ` (${tx(code, 'standard')})` : '');
  }

  function balkenName(n, code) { return n <= 0 ? tx(code, 'balkenAlle') : String(n); }

  return { SPRACHEN, OVERLAY, EIGEN, texte, tx, anzeige, taktName, balkenName };
});
