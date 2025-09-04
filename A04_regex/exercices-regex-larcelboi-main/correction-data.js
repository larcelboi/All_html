// correction-data.js
const DATA = [
    {
        title: "Nom d’utilisateur",
        goal: "Doit commencer par une lettre, puis lettres/chiffres/_ sur 3–16 caractères.",
        regex: {
            display: "^[A-Za-z][A-Za-z0-9_]{2,15}$",
            source: "^[A-Za-z][A-Za-z0-9_]{2,15}$",
            flags: ""
        },
        parts: [
            { label: "^", expr: "^", explain: "Début de chaîne" },
            { label: "Lettre initiale", expr: "[A-Za-z]", explain: "Une lettre (A–Z ou a–z)" },
            { label: "Suite 2–15", expr: "[A-Za-z0-9_]{2,15}", explain: "Lettres/chiffres/_ sur 2 à 15 caractères" },
            { label: "$", expr: "$", explain: "Fin de chaîne" },
        ],
        examples: ["Remy", "remy_c", "A12_", "2remy", "r", "remy-c", "remy__super_long"]
    },

    {
        title: "Mot de passe robuste",
        goal: "8+ caractères, au moins 1 minuscule, 1 majuscule, 1 chiffre et 1 symbole.",
        regex: {
            display: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\w\\s]).{8,}$",
            source: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\w\\s]).{8,}$",
            flags: ""
        },
        parts: [
            { label: "Lookahead", expr: "(?=.*[a-z])", explain: "Contient une minuscule" },
            { label: "Lookahead", expr: "(?=.*[A-Z])", explain: "Contient une majuscule" },
            { label: "Lookahead", expr: "(?=.*\\d)", explain: "Contient un chiffre" },
            { label: "Lookahead", expr: "(?=.*[^\\w\\s])", explain: "Contient un symbole" },
            { label: "Longueur", expr: ".{8,}", explain: "Au moins 8 caractères" },
        ],
        examples: ["Abcdef1!", "Passw0rd!", "aaaaAAAA", "Short1!", "NoDigits!", "Valid$123", "JustEight8!"]
    },

    {
        title: "Téléphone (CA/US)",
        goal: "Formats 123-456-7890, (123)456-7890, 123 456 7890…",
        regex: {
            display: "^\\(?\\d{3}\\)?[ .-]?\\d{3}[ .-]?\\d{4}$",
            source: "^\\(?\\d{3}\\)?[ .-]?\\d{3}[ .-]?\\d{4}$",
            flags: ""
        },
        parts: [
            { label: "Indicatif", expr: "\\(?\\d{3}\\)?", explain: "3 chiffres avec ou sans parenthèses" },
            { label: "Séparateur", expr: "[ .-]?", explain: "Optionnel: espace, point, tiret" },
            { label: "Tronc", expr: "\\d{3}", explain: "3 chiffres" },
            { label: "Séparateur", expr: "[ .-]?", explain: "Optionnel" },
            { label: "Fin", expr: "\\d{4}", explain: "4 chiffres" },
        ],
        examples: ["8195551234", "(819)555-1234", "819-555-1234", "819.555.1234", "819 555 1234", "81-555-1234"]
    },

    {
        title: "Code postal canadien",
        goal: "A1A 1A1 (espace optionnel).",
        regex: {
            display: "^[A-Za-z]\\d[A-Za-z][ -]?\\d[A-Za-z]\\d$",
            source: "^[A-Za-z]\\d[A-Za-z][ -]?\\d[A-Za-z]\\d$",
            flags: ""
        },
        notes: "Cette regex n’exclut pas les lettres interdites pour le 1er caractère (D, F, I, O, Q, U). Pour un cours, c’est OK.",
        parts: [
            { label: "Bloc 1", expr: "[A-Za-z]\\d[A-Za-z]", explain: "Lettre, chiffre, lettre" },
            { label: "Séparateur", expr: "[ -]?", explain: "Optionnel: espace ou tiret" },
            { label: "Bloc 2", expr: "\\d[A-Za-z]\\d", explain: "Chiffre, lettre, chiffre" },
        ],
        examples: ["J8X2Y7", "J8X 2Y7", "H0H 0H0", "123 456", "A1A-1A1", "Z9Z9Z9"]
    },

    {
        title: "Adresse IPv4",
        goal: "Quatre octets 0–255 séparés par des points.",
        regex: {
            display: "^(?:(?:25[0-5]|2[0-4]\\d|1?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|1?\\d?\\d)$",
            source: "^(?:(?:25[0-5]|2[0-4]\\d|1?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|1?\\d?\\d)$",
            flags: ""
        },
        parts: [
            { label: "Octet", expr: "25[0-5]|2[0-4]\\d|1?\\d?\\d", explain: "255 | 200–249 | 0–199" },
            { label: "Points", expr: "( ... \\. ){3}", explain: "Répété 3 fois avec un point" },
            { label: "Dernier", expr: "( ... )", explain: "Dernier octet sans point final" },
        ],
        examples: ["192.168.0.10", "255.255.255.255", "0.0.0.0", "256.1.1.1", "1.2.3", "1.2.3.4.5"]
    },

    {
        title: "Email (HTML5)",
        goal: "Validation via type=email (pas de regex personnalisée ici).",
        regex: {
            display: "[Validation par le navigateur – type=email]",
            source: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
            flags: ""
        },
        notes: "Pour des besoins avancés, une lib dédiée est préférable. La regex ci-dessus est une simplification pédagogique.",
        examples: ["test@example.com", "a@b.co", "user+tag@domain.org", "no-at-sign", "a@b", "a@b."]
    },

    {
        title: "URL (HTML5)",
        goal: "Validation via type=url.",
        regex: {
            display: "[Validation par le navigateur – type=url]",
            source: "^(https?:\\/\\/)[\\w.-]+(?:\\.[\\w.-]+)+(?:[\\w\\-._~:/?#[\\]@!$&'()*+,;=.]+)?$",
            flags: "i"
        },
        notes: "Exigence d’un schéma http/https pour la démo (beaucoup de variations existent).",
        examples: ["https://exemple.com", "http://sub.domain.org/path?x=1", "exemple.com", "ftp://site.com"]
    }
];
