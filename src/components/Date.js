import React from 'react'

export default function Date(props) {
    const countryIndexEn = {
        "BD": "Bangladesh", "BE": "Belgium", "BF": "Burkina Faso", "BG": "Bulgaria", "BA": "Bosnia and Herzegovina",
        "BB": "Barbados", "WF": "Wallis and Futuna", "BL": "Saint Barthelemy", "BM": "Bermuda", "BN": "Brunei", "BO": "Bolivia", "BH": "Bahrain",
        "BI": "Burundi", "BJ": "Benin", "BT": "Bhutan", "JM": "Jamaica", "BV": "Bouvet Island", "BW": "Botswana", "WS": "Samoa", "BQ": "Bonaire, Saint Eustatius and Saba ",
        "BR": "Brazil", "BS": "Bahamas", "JE": "Jersey", "BY": "Belarus", "BZ": "Belize", "RU": "Russia", "RW": "Rwanda", "RS": "Serbia",
        "TL": "East Timor", "RE": "Reunion", "TM": "Turkmenistan", "TJ": "Tajikistan", "RO": "Romania", "TK": "Tokelau", "GW": "Guinea-Bissau",
        "GU": "Guam", "GT": "Guatemala", "GS": "South Georgia and the South Sandwich Islands", "GR": "Greece", "GQ": "Equatorial Guinea",
        "GP": "Guadeloupe", "JP": "Japan", "GY": "Guyana", "GG": "Guernsey", "GF": "French Guiana", "GE": "Georgia", "GD": "Grenada",
        "GB": "United Kingdom", "GA": "Gabon", "SV": "El Salvador", "GN": "Guinea", "GM": "Gambia", "GL": "Greenland", "GI": "Gibraltar",
        "GH": "Ghana", "OM": "Oman", "TN": "Tunisia", "JO": "Jordan", "HR": "Croatia", "HT": "Haiti", "HU": "Hungary", "HK": "Hong Kong",
        "HN": "Honduras", "HM": "Heard Island and McDonald Islands", "VE": "Venezuela", "PR": "Puerto Rico", "PS": "Palestinian Territory",
        "PW": "Palau", "PT": "Portugal", "SJ": "Svalbard and Jan Mayen", "PY": "Paraguay", "IQ": "Iraq", "PA": "Panama", "PF": "French Polynesia",
        "PG": "Papua New Guinea", "PE": "Peru", "PK": "Pakistan", "PH": "Philippines", "PN": "Pitcairn", "PL": "Poland",
        "PM": "Saint Pierre and Miquelon", "ZM": "Zambia", "EH": "Western Sahara", "EE": "Estonia", "EG": "Egypt", "ZA": "South Africa",
        "EC": "Ecuador", "IT": "Italy", "VN": "Vietnam", "SB": "Solomon Islands", "ET": "Ethiopia", "SO": "Somalia", "ZW": "Zimbabwe",
        "SA": "Saudi Arabia", "ES": "Spain", "ER": "Eritrea", "ME": "Montenegro", "MD": "Moldova", "MG": "Madagascar", "MF": "Saint Martin",
        "MA": "Morocco", "MC": "Monaco", "UZ": "Uzbekistan", "MM": "Myanmar", "ML": "Mali", "MO": "Macao", "MN": "Mongolia", "MH": "Marshall Islands",
        "MK": "Macedonia", "MU": "Mauritius", "MT": "Malta", "MW": "Malawi", "MV": "Maldives", "MQ": "Martinique", "MP": "Northern Mariana Islands",
        "MS": "Montserrat", "MR": "Mauritania", "IM": "Isle of Man", "UG": "Uganda", "TZ": "Tanzania", "MY": "Malaysia", "MX": "Mexico",
        "IL": "Israel", "FR": "France", "IO": "British Indian Ocean Territory", "SH": "Saint Helena", "FI": "Finland", "FJ": "Fiji",
        "FK": "Falkland Islands", "FM": "Micronesia", "FO": "Faroe Islands", "NI": "Nicaragua", "NL": "Netherlands", "NO": "Norway",
        "NA": "Namibia", "VU": "Vanuatu", "NC": "New Caledonia", "NE": "Niger", "NF": "Norfolk Island", "NG": "Nigeria", "NZ": "New Zealand",
        "NP": "Nepal", "NR": "Nauru", "NU": "Niue", "CK": "Cook Islands", "XK": "Kosovo", "CI": "Ivory Coast", "CH": "Switzerland", "CO": "Colombia",
        "CN": "China", "CM": "Cameroon", "CL": "Chile", "CC": "Cocos Islands", "CA": "Canada", "CG": "Republic of the Congo",
        "CF": "Central African Republic", "CD": "Democratic Republic of the Congo", "CZ": "Czech Republic", "CY": "Cyprus",
        "CX": "Christmas Island", "CR": "Costa Rica", "CW": "Curacao", "CV": "Cape Verde", "CU": "Cuba", "SZ": "Swaziland", "SY": "Syria",
        "SX": "Sint Maarten", "KG": "Kyrgyzstan", "KE": "Kenya", "SS": "South Sudan", "SR": "Suriname", "KI": "Kiribati", "KH": "Cambodia",
        "KN": "Saint Kitts and Nevis", "KM": "Comoros", "ST": "Sao Tome and Principe", "SK": "Slovakia", "KR": "South Korea", "SI": "Slovenia",
        "KP": "North Korea", "KW": "Kuwait", "SN": "Senegal", "SM": "San Marino", "SL": "Sierra Leone", "SC": "Seychelles", "KZ": "Kazakhstan",
        "KY": "Cayman Islands", "SG": "Singapore", "SE": "Sweden", "SD": "Sudan", "DO": "Dominican Republic", "DM": "Dominica", "DJ": "Djibouti",
        "DK": "Denmark", "VG": "British Virgin Islands", "DE": "Germany", "YE": "Yemen", "DZ": "Algeria", "US": "United States", "UY": "Uruguay",
        "YT": "Mayotte", "UM": "United States Minor Outlying Islands", "LB": "Lebanon", "LC": "Saint Lucia", "LA": "Laos", "TV": "Tuvalu",
        "TW": "Taiwan", "TT": "Trinidad and Tobago", "TR": "Turkey", "LK": "Sri Lanka", "LI": "Liechtenstein", "LV": "Latvia", "TO": "Tonga",
        "LT": "Lithuania", "LU": "Luxembourg", "LR": "Liberia", "LS": "Lesotho", "TH": "Thailand", "TF": "French Southern Territories", "TG": "Togo",
        "TD": "Chad", "TC": "Turks and Caicos Islands", "LY": "Libya", "VA": "Vatican", "VC": "Saint Vincent and the Grenadines",
        "AE": "United Arab Emirates", "AD": "Andorra", "AG": "Antigua and Barbuda", "AF": "Afghanistan", "AI": "Anguilla",
        "VI": "U.S. Virgin Islands", "IS": "Iceland", "IR": "Iran", "AM": "Armenia", "AL": "Albania", "AO": "Angola", "AQ": "Antarctica",
        "AS": "American Samoa", "AR": "Argentina", "AU": "Australia", "AT": "Austria", "AW": "Aruba", "IN": "India", "AX": "Aland Islands",
        "AZ": "Azerbaijan", "IE": "Ireland", "ID": "Indonesia", "UA": "Ukraine", "QA": "Qatar", "MZ": "Mozambique"
    }

    const countryIndexRu = {
        "BD": "Бангладеш", "BE": "Бельгия", "BF": "Буркина-Фасо", "BG": "Болгария", "BA": "Босния и Герцеговина",
        "BB": "Барбадос", "WF": "Уоллис и Футуна", "BL": "Сен-Бартелеми", "BM": "Бермуды", "BN": "Бруней", "BO": "Боливия", "BH": "Бахрейн",
        "BI": "Бурунди", "BJ": "Бенин", "BT": "Бутан", "JM": "Ямайка", "BV": "Остров Буве", "BW": "Ботсвана", " WS ": " Самоа ", " BQ ": " Бонэйр, Сент-Эстатиус и Саба ",
        "BR": "Бразилия", "BS": "Багамы", "JE": "Джерси", "BY": "Беларусь", "BZ": "Белиз", "RU": "Россия", "RW": " Руанда ", " RS ": " Сербия ",
        "TL": "Восточный Тимор", "RE": "Реюньон", "TM": "Туркменистан", "TJ": "Таджикистан", "RO": "Румыния", "TK": "Токелау", " GW ": " Гвинея-Бисау ",
        "GU": "Гуам", "GT": "Гватемала", "GS": "Южная Георгия и Южные Сандвичевы острова", "GR": "Греция", "GQ": "Экваториальная Гвинея",
        "GP": "Гваделупа", "JP": "Япония", "GY": "Гайана", "GG": "Гернси", "GF": "Французская Гвиана", "GE": "Джорджия", " GD ": " Гренада ",
        "GB": "Соединенное Королевство", "GA": "Габон", "SV": "Сальвадор", "GN": "Гвинея", "GM": "Гамбия", "GL": "Гренландия", "GI": "Гибралтар",
        "GH": "Гана", "OM": "Оман", "TN": "Тунис", "JO": "Иордания", "HR": "Хорватия", "HT": "Гаити", "HU": " Венгрия ", " HK ": " Гонконг ",
        "HN": "Гондурас", "HM": "Остров Херд и острова Макдоналд", "VE": "Венесуэла", "PR": "Пуэрто-Рико", "PS": "Палестинская территория",
        "PW": "Палау", "PT": "Португалия", "SJ": "Шпицберген и Ян-Майен", "PY": "Парагвай", "IQ": "Ирак", "PA": "Панама", "PF": "Французская Полинезия",
        "PG": "Папуа-Новая Гвинея", "PE": "Перу", "PK": "Пакистан", "PH": "Филиппины", "PN": "Питкэрн", "PL": "Польша",
        "PM": "Сен-Пьер и Микелон", "ZM": "Замбия", "EH": "Западная Сахара", "EE": "Эстония", "EG": "Египет", "ZA": "Южная Африка ",
        "EC": "Эквадор", "IT": "Италия", "VN": "Вьетнам", "SB": "Соломоновы Острова", "ET": "Эфиопия", "SO": "Сомали", " ZW ": " Зимбабве ",
        "SA": "Саудовская Аравия", "ES": "Испания", "ER": "Эритрея", "ME": "Черногория", "MD": "Молдова", "MG": "Мадагаскар", " MF ": " Сен-Мартен ",
        "MA": "Марокко", "MC": "Монако", "UZ": "Узбекистан", "MM": "Мьянма", "ML": "Мали", "MO": "Макао", "MN": " Монголия "," MH ":" Маршалловы острова ",
        "MK": "Македония", "MU": "Маврикий", "MT": "Мальта", "MW": "Малави", "MV": "Мальдивы", "MQ": "Мартиника", "MP": "Северные Марианские острова",
        "MS": "Монтсеррат", "MR": "Мавритания", "IM": "Остров Мэн", "UG": "Уганда", "TZ": "Танзания", "MY": "Малайзия", "MX": "Мексика",
        "IL": "Израиль", "FR": "Франция", "IO": "Британская территория в Индийском океане", "SH": "Остров Святой Елены", "FI": "Финляндия", "FJ": "Фиджи" ,
        "FK": "Фолклендские острова", "FM": "Микронезия", "FO": "Фарерские острова", "NI": "Никарагуа", "NL": "Нидерланды", "NO": "Норвегия",
        "NA": "Намибия", "VU": "Вануату", "NC": "Новая Каледония", "NE": "Нигер", "NF": "Остров Норфолк", "NG": "Нигерия", "NZ": "Новая Зеландия",
        "NP": "Непал", "NR": "Науру", "NU": "Ниуэ", "CK": "Острова Кука", "XK": "Косово", "CI": "Кот-д'Ивуар", "CH": "Швейцария", "CO": "Колумбия",
        "CN": "Китай", "CM": "Камерун", "CL": "Чили", "CC": "Кокосовые острова", "CA": "Канада", "CG": "Республика Конго. ",
        "CF": "Центральноафриканская Республика", "CD": "Демократическая Республика Конго", "CZ": "Чешская Республика", "CY": "Кипр",
        "CX": "Остров Рождества", "CR": "Коста-Рика", "CW": "Кюрасао", "CV": "Кабо-Верде", "CU": "Куба", "SZ": "Свазиленд", "SY": "Сирия",
        "SX": "Синт-Мартен", "KG": "Кыргызстан", "KE": "Кения", "SS": "Южный Судан", "SR": "Суринам", "KI": "Кирибати", "KH": "Камбоджа",
        "KN": "Сент-Китс и Невис", "KM": "Коморские острова", "ST": "Сан-Томе и Принсипи", "SK": "Словакия", "KR": "Южная Корея", "SI": "Словения",
        "KP": "Северная Корея", "KW": "Кувейт", "SN": "Сенегал", "SM": "Сан-Марино", "SL": "Сьерра-Леоне", "SC": "Сейшельские острова", "KZ": "Казахстан",
        "KY": "Каймановы острова", "SG": "Сингапур", "SE": "Швеция", "SD": "Судан", "DO": "Доминиканская Республика", "DM": "Доминика", "DJ": "Джибути",
        "DK": "Дания", "VG": "Британские Виргинские острова", "DE": "Германия", "YE": "Йемен", "DZ": "Алжир", "США": "Соединенные Штаты", "UY": "Уругвай",
        "YT": "Майотта", "UM": "Внешние малые острова США", "LB": "Ливан", "LC": "Сент-Люсия", "LA": "Лаос", "TV": " Тувалу ",
        "TW": "Тайвань", "TT": "Тринидад и Тобаго", "TR": "Турция", "LK": "Шри-Ланка", "LI": "Лихтенштейн", "LV": "Латвия", "ТО": "Тонга",
        "LT": "Литва", "LU": "Люксембург", "LR": "Либерия", "LS": "Лесото", "TH": "Таиланд", "TF": "Южные территории Франции", "ТГ": "Того",
        "TD": "Чад", "TC": "Острова Теркс и Кайкос", "LY": "Ливия", "VA": "Ватикан", "VC": "Сент-Винсент и Гренадины",
        "AE": "Объединенные Арабские Эмираты", "AD": "Андорра", "AG": "Антигуа и Барбуда", "AF": "Афганистан", "AI": "Ангилья",
        "VI": "Виргинские острова США", "IS": "Исландия", "IR": "Иран", "AM": "Армения", "AL": "Албания", "AO": "Ангола", "AQ": "Антарктика",
        "AS": "Американское Самоа", "AR": "Аргентина", "AU": "Австралия", "AT": "Австрия", "AW": "Аруба", "IN": "Индия", " AX ":" Аландские острова ",
        "AZ": "Азербайджан", "IE": "Ирландия", "ID": "Индонезия", "UA": "Украина", "QA": "Катар", "MZ": "Мозамбик"
    }

    return (
        <div className="date">
            <div className="cityCountry">{props.city}, {props.language === 'en' ? countryIndexEn[props.country] : countryIndexRu[props.country]}</div>
            <div className="time">{props.month} {props.day} {props.time}</div>
        </div>
    )
}
