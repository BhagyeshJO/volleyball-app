import { useEffect, useMemo, useState } from "react";

const translations = {
  en: {
    code: "EN",
    preview: "Interactive front-end preview",
    title: "Volleyball session planner",
    subtitle:
      "Date, time, and location based session creation on top. Upcoming sessions below. Auto team logic with rotation players built in.",
    maxPlayers: "Max players",
    minPlayers: "Min players",
    teamSize: "Team size",
    createSession: "Create new session",
    createSubtitle: "Quickly create a new session with date, time, and location.",
    date: "Date",
    time: "Time",
    location: "Location",
    locationPlaceholder: "Enter court or hall name",
    createButton: "Create session",
    upcomingSessions: "Upcoming sessions",
    upcomingSubtitle: "All upcoming sessions stay visible here.",
    openCreateHint: "Anyone can create a session. Keep it simple and fast.",
    sessions: "sessions",
    open: "Game on",
    full: "Full",
    low: "Too few players",
    selectedSession: "Selected session",
    joined: "joined",
    fullBanner: "No more place left. This session is full.",
    lowBanner: "Less than 10 players. Better to call it off unless more people join.",
    goodBanner: "{count} players joined. Session is good to go.",
    currentCount: "Current count",
    spotsLeft: "Spots left",
    autoTeamMode: "Auto team mode",
    yourName: "Your name",
    namePlaceholder: "Enter your name",
    countMeIn: "Count me in",
    leave: "Leave",
    joinedPlayers: "Joined players",
    nameOnlyMode: "Name-only mode",
    copySummary: "Copy summary",
    summaryCopied: "Session summary copied.",
    autoTeamGenerator: "Auto team generator",
    autoTeamSubtitle: "Teams and rotation are created automatically based on player count.",
    shuffle: "Shuffle",
    min10Hint: "Let at least 10 players join first, then the system will suggest teams.",
    rotationPlayers: "Rotation players",
    waiting: "waiting",
    sessionSelected: "Session selected.",
    emptyNameJoin: "Please enter your name first.",
    duplicateName: "This name is already counted in for this session.",
    noPlace: "No more place left for this session.",
    joinedSuccess: "{name} is in.",
    emptyNameLeave: "Enter the same name you used to join.",
    nameNotFound: "That name was not found in this session.",
    removedSuccess: "{name} removed from the session.",
    minPlayersShuffle: "Wait until at least 10 players join before generating teams.",
    teamsShuffled: "Teams shuffled.",
    createValidation: "Please fill date, time, and location.",
    createdSuccess: "New session created for {date} at {time}.",
    teamMemberCount: "{count} players",
    teamA: "Team A",
    teamB: "Team B",
    teamC: "Team C",
    tooFewPlayers: "Too few players",
    threeFullTeams: "3 full teams ready",
    twoFullTeams: "2 full teams ready",
    twoTeamsRotation: "2 teams + rotation players",
    twoBalancedTeams: "2 balanced teams of 5",
    twoTeamsOneRotation: "2 teams of 5 + 1 rotation player",
    waitingForPlayers: "Waiting for players",
    deleteSession: "Delete session",
    deleteConfirmTitle: "Delete this session?",
    deleteConfirmText: "This session will be removed for everyone.",
    deleteConfirmYes: "Yes, delete",
    deleteConfirmNo: "Cancel",
    deleteSuccess: "Session deleted.",
    loading: "Loading sessions...",
    noSessionYet: "No session yet",
    createFirstSession: "Create your first session above and it will appear here.",
    createSessionFirstForTeams: "Create a session first to see teams here.",
    requestFailed: "Something went wrong. Please try again.",
  },
  de: {
    code: "DE",
    preview: "Interaktive Frontend-Vorschau",
    title: "Volleyball-Session-Planer",
    subtitle:
      "Oben neue Sessions mit Datum, Uhrzeit und Ort erstellen. Unten kommende Sessions. Automatische Teamlogik mit Rotationsspielern inklusive.",
    maxPlayers: "Max. Spieler",
    minPlayers: "Min. Spieler",
    teamSize: "Teamgröße",
    createSession: "Neue Session erstellen",
    createSubtitle: "Erstelle schnell eine neue Session mit Datum, Uhrzeit und Ort.",
    date: "Datum",
    time: "Uhrzeit",
    location: "Ort",
    locationPlaceholder: "Halle oder Platz eingeben",
    createButton: "Session erstellen",
    upcomingSessions: "Kommende Sessions",
    upcomingSubtitle: "Alle kommenden Sessions bleiben hier sichtbar.",
    openCreateHint: "Jeder kann eine Session erstellen. Einfach und schnell.",
    sessions: "Sessions",
    open: "Spiel findet statt",
    full: "Voll",
    low: "Zu wenige Spieler",
    selectedSession: "Ausgewählte Session",
    joined: "angemeldet",
    fullBanner: "Kein Platz mehr frei. Diese Session ist voll.",
    lowBanner: "Weniger als 10 Spieler. Besser absagen, falls nicht mehr Leute dazukommen.",
    goodBanner: "{count} Spieler sind dabei. Die Session kann stattfinden.",
    currentCount: "Aktuelle Anzahl",
    spotsLeft: "Freie Plätze",
    autoTeamMode: "Automatischer Teammodus",
    yourName: "Dein Name",
    namePlaceholder: "Deinen Namen eingeben",
    countMeIn: "Ich bin dabei",
    leave: "Austragen",
    joinedPlayers: "Angemeldete Spieler",
    nameOnlyMode: "Nur-Namen-Modus",
    copySummary: "Zusammenfassung kopieren",
    summaryCopied: "Session-Zusammenfassung kopiert.",
    autoTeamGenerator: "Automatischer Teamgenerator",
    autoTeamSubtitle: "Teams und Rotation werden automatisch je nach Spielerzahl erstellt.",
    shuffle: "Neu mischen",
    min10Hint: "Lass erst mindestens 10 Spieler beitreten, dann schlägt das System Teams vor.",
    rotationPlayers: "Rotationsspieler",
    waiting: "wartend",
    sessionSelected: "Session ausgewählt.",
    emptyNameJoin: "Bitte zuerst deinen Namen eingeben.",
    duplicateName: "Dieser Name ist für diese Session bereits eingetragen.",
    noPlace: "Kein Platz mehr für diese Session.",
    joinedSuccess: "{name} ist dabei.",
    emptyNameLeave: "Gib denselben Namen ein, mit dem du beigetreten bist.",
    nameNotFound: "Dieser Name wurde in dieser Session nicht gefunden.",
    removedSuccess: "{name} wurde aus der Session entfernt.",
    minPlayersShuffle: "Warte, bis mindestens 10 Spieler beigetreten sind, bevor Teams erstellt werden.",
    teamsShuffled: "Teams neu gemischt.",
    createValidation: "Bitte Datum, Uhrzeit und Ort ausfüllen.",
    createdSuccess: "Neue Session erstellt für {date} um {time}.",
    teamMemberCount: "{count} Spieler",
    teamA: "Team A",
    teamB: "Team B",
    teamC: "Team C",
    tooFewPlayers: "Zu wenige Spieler",
    threeFullTeams: "3 komplette Teams bereit",
    twoFullTeams: "2 komplette Teams bereit",
    twoTeamsRotation: "2 Teams + Rotationsspieler",
    twoBalancedTeams: "2 ausgeglichene Teams mit je 5",
    twoTeamsOneRotation: "2 Teams mit je 5 + 1 Rotationsspieler",
    waitingForPlayers: "Warten auf Spieler",
    deleteSession: "Session löschen",
    deleteConfirmTitle: "Diese Session löschen?",
    deleteConfirmText: "Diese Session wird für alle entfernt.",
    deleteConfirmYes: "Ja, löschen",
    deleteConfirmNo: "Abbrechen",
    deleteSuccess: "Session gelöscht.",
    loading: "Sessions werden geladen...",
    noSessionYet: "Noch keine Session",
    createFirstSession: "Erstelle oben deine erste Session, dann erscheint sie hier.",
    createSessionFirstForTeams: "Erstelle zuerst eine Session, um hier Teams zu sehen.",
    requestFailed: "Etwas ist schiefgelaufen. Bitte versuche es erneut.",
  },
  hi: {
    code: "HI",
    preview: "इंटरैक्टिव फ्रंट-एंड प्रिव्यू",
    title: "वॉलीबॉल सेशन प्लानर",
    subtitle:
      "ऊपर डेट, टाइम और लोकेशन के साथ नया सेशन बनाओ। नीचे आने वाले सेशन्स दिखेंगे। प्लेयर काउंट के हिसाब से ऑटो टीम लॉजिक भी है।",
    maxPlayers: "अधिकतम प्लेयर्स",
    minPlayers: "न्यूनतम प्लेयर्स",
    teamSize: "टीम साइज़",
    createSession: "नया सेशन बनाएं",
    createSubtitle: "डेट, टाइम और लोकेशन के साथ जल्दी नया सेशन बनाएं।",
    date: "तारीख",
    time: "समय",
    location: "लोकेशन",
    locationPlaceholder: "कोर्ट या हॉल का नाम डालें",
    createButton: "सेशन बनाएं",
    upcomingSessions: "आने वाले सेशन्स",
    upcomingSubtitle: "सारे आने वाले सेशन्स यहां दिखेंगे।",
    openCreateHint: "कोई भी यूज़र सेशन बना सकता है। सिंपल और फास्ट रखो।",
    sessions: "सेशन्स",
    open: "गेम ऑन",
    full: "फुल",
    low: "बहुत कम प्लेयर्स",
    selectedSession: "चुना हुआ सेशन",
    joined: "जॉइन किए",
    fullBanner: "अब जगह नहीं बची। यह सेशन फुल है।",
    lowBanner: "10 से कम प्लेयर्स हैं। बेहतर है इसे फिलहाल कैंसल कर दो अगर और लोग नहीं जुड़ते।",
    goodBanner: "{count} प्लेयर्स जुड़ चुके हैं। सेशन अच्छे से हो सकता है।",
    currentCount: "अभी की गिनती",
    spotsLeft: "बची हुई जगह",
    autoTeamMode: "ऑटो टीम मोड",
    yourName: "आपका नाम",
    namePlaceholder: "अपना नाम दर्ज करें",
    countMeIn: "मुझे जोड़ो",
    leave: "हटाएं",
    joinedPlayers: "जुड़े हुए प्लेयर्स",
    nameOnlyMode: "सिर्फ नाम मोड",
    copySummary: "समरी कॉपी करें",
    summaryCopied: "सेशन समरी कॉपी हो गई।",
    autoTeamGenerator: "ऑटो टीम जनरेटर",
    autoTeamSubtitle: "प्लेयर काउंट के हिसाब से टीम और रोटेशन अपने आप बनते हैं।",
    shuffle: "शफल",
    min10Hint: "पहले कम से कम 10 प्लेयर्स आने दो, फिर सिस्टम टीम्स सजेस्ट करेगा।",
    rotationPlayers: "रोटेशन प्लेयर्स",
    waiting: "वेटिंग",
    sessionSelected: "सेशन चुन लिया गया है।",
    emptyNameJoin: "पहले अपना नाम डालो।",
    duplicateName: "यह नाम इस सेशन के लिए पहले से जोड़ा जा चुका है।",
    noPlace: "इस सेशन में अब और जगह नहीं है।",
    joinedSuccess: "{name} जुड़ गया है।",
    emptyNameLeave: "जिस नाम से जॉइन किया था वही नाम डालें।",
    nameNotFound: "यह नाम इस सेशन में नहीं मिला।",
    removedSuccess: "{name} को सेशन से हटा दिया गया है।",
    minPlayersShuffle: "टीम बनाने से पहले कम से कम 10 प्लेयर्स होने दो।",
    teamsShuffled: "टीम्स शफल हो गईं।",
    createValidation: "कृपया डेट, टाइम और लोकेशन तीनों भरें।",
    createdSuccess: "{date} को {time} पर नया सेशन बन गया।",
    teamMemberCount: "{count} प्लेयर्स",
    teamA: "टीम A",
    teamB: "टीम B",
    teamC: "टीम C",
    tooFewPlayers: "बहुत कम प्लेयर्स",
    threeFullTeams: "6-6 की 3 पूरी टीमें तैयार",
    twoFullTeams: "6-6 की 2 पूरी टीमें तैयार",
    twoTeamsRotation: "2 टीमें + रोटेशन प्लेयर्स",
    twoBalancedTeams: "5-5 की 2 बैलेंस्ड टीमें",
    twoTeamsOneRotation: "5-5 की 2 टीमें + 1 रोटेशन प्लेयर",
    waitingForPlayers: "प्लेयर्स का इंतज़ार",
    deleteSession: "सेशन हटाएं",
    deleteConfirmTitle: "क्या यह सेशन हटाना है?",
    deleteConfirmText: "यह सेशन सभी के लिए हट जाएगा।",
    deleteConfirmYes: "हाँ, हटाएं",
    deleteConfirmNo: "कैंसल",
    deleteSuccess: "सेशन हटा दिया गया।",
    loading: "सेशन्स लोड हो रहे हैं...",
    noSessionYet: "अभी कोई सेशन नहीं",
    createFirstSession: "ऊपर अपना पहला सेशन बनाओ, फिर वह यहां दिखेगा।",
    createSessionFirstForTeams: "टीम्स यहां देखने के लिए पहले एक सेशन बनाओ।",
    requestFailed: "कुछ गड़बड़ हो गई। फिर से कोशिश करो।",
  },
  ru: {
    code: "RU",
    preview: "Интерактивный предпросмотр интерфейса",
    title: "Планировщик волейбольных сессий",
    subtitle:
      "Сверху создание новой сессии по дате, времени и месту. Ниже ближайшие сессии. Автоматическая логика команд и ротации уже встроена.",
    maxPlayers: "Макс. игроков",
    minPlayers: "Мин. игроков",
    teamSize: "Размер команды",
    createSession: "Создать новую сессию",
    createSubtitle: "Быстро создайте новую сессию с датой, временем и местом.",
    date: "Дата",
    time: "Время",
    location: "Место",
    locationPlaceholder: "Введите название зала или площадки",
    createButton: "Создать сессию",
    upcomingSessions: "Ближайшие сессии",
    upcomingSubtitle: "Все ближайшие сессии остаются видимыми здесь.",
    openCreateHint: "Любой пользователь может создать сессию. Просто и быстро.",
    sessions: "сессий",
    open: "Игра состоится",
    full: "Полно",
    low: "Слишком мало игроков",
    selectedSession: "Выбранная сессия",
    joined: "записались",
    fullBanner: "Свободных мест больше нет. Эта сессия заполнена.",
    lowBanner: "Меньше 10 игроков. Лучше отменить, если больше никто не присоединится.",
    goodBanner: "{count} игроков записались. Сессия может состояться.",
    currentCount: "Текущее число",
    spotsLeft: "Свободные места",
    autoTeamMode: "Авто-режим команд",
    yourName: "Ваше имя",
    namePlaceholder: "Введите ваше имя",
    countMeIn: "Записать меня",
    leave: "Уйти",
    joinedPlayers: "Записанные игроки",
    nameOnlyMode: "Режим только по имени",
    copySummary: "Копировать сводку",
    summaryCopied: "Сводка по сессии скопирована.",
    autoTeamGenerator: "Автогенератор команд",
    autoTeamSubtitle: "Команды и ротация создаются автоматически в зависимости от числа игроков.",
    shuffle: "Перемешать",
    min10Hint: "Пусть сначала присоединятся хотя бы 10 игроков, потом система предложит команды.",
    rotationPlayers: "Игроки ротации",
    waiting: "ожидают",
    sessionSelected: "Сессия выбрана.",
    emptyNameJoin: "Сначала введите ваше имя.",
    duplicateName: "Это имя уже записано на эту сессию.",
    noPlace: "На эту сессию больше нет мест.",
    joinedSuccess: "{name} записан(а).",
    emptyNameLeave: "Введите то же имя, с которым вы записывались.",
    nameNotFound: "Это имя не найдено в данной сессии.",
    removedSuccess: "{name} удалён(а) из сессии.",
    minPlayersShuffle: "Подождите, пока не наберётся хотя бы 10 игроков, прежде чем формировать команды.",
    teamsShuffled: "Команды перемешаны.",
    createValidation: "Пожалуйста, заполните дату, время и место.",
    createdSuccess: "Новая сессия создана на {date} в {time}.",
    teamMemberCount: "{count} игроков",
    teamA: "Команда A",
    teamB: "Команда B",
    teamC: "Команда C",
    tooFewPlayers: "Слишком мало игроков",
    threeFullTeams: "Готовы 3 полные команды",
    twoFullTeams: "Готовы 2 полные команды",
    twoTeamsRotation: "2 команды + игроки ротации",
    twoBalancedTeams: "2 сбалансированные команды по 5",
    twoTeamsOneRotation: "2 команды по 5 + 1 игрок ротации",
    waitingForPlayers: "Ожидание игроков",
    deleteSession: "Удалить сессию",
    deleteConfirmTitle: "Удалить эту сессию?",
    deleteConfirmText: "Эта сессия будет удалена для всех.",
    deleteConfirmYes: "Да, удалить",
    deleteConfirmNo: "Отмена",
    deleteSuccess: "Сессия удалена.",
    loading: "Сессии загружаются...",
    noSessionYet: "Сессий пока нет",
    createFirstSession: "Создайте первую сессию выше, и она появится здесь.",
    createSessionFirstForTeams: "Сначала создайте сессию, чтобы увидеть здесь команды.",
    requestFailed: "Что-то пошло не так. Попробуйте ещё раз.",
  },
};

const EMPTY_SESSIONS = [];

export default function VolleyballBookingPreview() {
  const [language, setLanguage] = useState("en");
  const [sessions, setSessions] = useState(EMPTY_SESSIONS);
  const [selectedId, setSelectedId] = useState(null);
  const [playerName, setPlayerName] = useState("");
  const [message, setMessage] = useState("");
  const [teamSeed, setTeamSeed] = useState(0);
  const [newDate, setNewDate] = useState("2026-04-18");
  const [newTime, setNewTime] = useState("18:30");
  const [newLocation, setNewLocation] = useState("FAU Sports Hall");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const t = translations[language] || translations.en;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = window.localStorage.getItem("volleyball-language");
    if (saved && translations[saved]) {
      setLanguage(saved);
      return;
    }

    const browser = (window.navigator.language || "en").toLowerCase();
    if (browser.startsWith("de")) setLanguage("de");
    else if (browser.startsWith("hi")) setLanguage("hi");
    else if (browser.startsWith("ru")) setLanguage("ru");
    else setLanguage("en");
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("volleyball-language", language);
  }, [language]);

  useEffect(() => {
    loadSessions();
  }, []);

  useEffect(() => {
    if (!sessions.some((session) => session.id === selectedId)) {
      setSelectedId(sessions[0]?.id ?? null);
    }
  }, [sessions, selectedId]);

  const selected = useMemo(() => {
    return sessions.find((session) => session.id === selectedId) ?? sessions[0] ?? null;
  }, [sessions, selectedId]);

  const normalizedSelectedNames = useMemo(() => {
    return (selected?.names ?? []).map((name) => normalizeName(name));
  }, [selected]);

  const teamData = useMemo(() => {
    if (!selected) {
      return {
        label: t.waitingForPlayers,
        teams: [],
        rotation: [],
      };
    }

    const shuffled = seededShuffle([...selected.names], teamSeed + selected.id);
    const count = shuffled.length;

    if (count < selected.min) {
      return {
        label: t.tooFewPlayers,
        teams: [],
        rotation: [],
      };
    }

    if (count === 18) {
      return {
        label: t.threeFullTeams,
        teams: [
          { name: t.teamA, members: shuffled.slice(0, 6) },
          { name: t.teamB, members: shuffled.slice(6, 12) },
          { name: t.teamC, members: shuffled.slice(12, 18) },
        ],
        rotation: [],
      };
    }

    if (count >= 12 && count <= 17) {
      return {
        label: count === 12 ? t.twoFullTeams : t.twoTeamsRotation,
        teams: [
          { name: t.teamA, members: shuffled.slice(0, 6) },
          { name: t.teamB, members: shuffled.slice(6, 12) },
        ],
        rotation: shuffled.slice(12),
      };
    }

    if (count === 10) {
      return {
        label: t.twoBalancedTeams,
        teams: [
          { name: t.teamA, members: shuffled.slice(0, 5) },
          { name: t.teamB, members: shuffled.slice(5, 10) },
        ],
        rotation: [],
      };
    }

    if (count === 11) {
      return {
        label: t.twoTeamsOneRotation,
        teams: [
          { name: t.teamA, members: shuffled.slice(0, 5) },
          { name: t.teamB, members: shuffled.slice(5, 10) },
        ],
        rotation: shuffled.slice(10),
      };
    }

    return {
      label: t.waitingForPlayers,
      teams: [],
      rotation: [],
    };
  }, [selected, teamSeed, t]);

  const statusStyles = {
    open: {
      badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
      banner: "bg-emerald-50 text-emerald-800 border-emerald-200",
    },
    full: {
      badge: "bg-rose-100 text-rose-700 border-rose-200",
      banner: "bg-rose-50 text-rose-800 border-rose-200",
    },
    low: {
      badge: "bg-amber-100 text-amber-700 border-amber-200",
      banner: "bg-amber-50 text-amber-800 border-amber-200",
    },
  };

  const statusText = {
    open: t.open,
    full: t.full,
    low: t.low,
  };

  async function loadSessions() {
    try {
      setLoading(true);
      const data = await apiRequest("/.netlify/functions/get-sessions", {
        method: "GET",
      });
      setSessions(Array.isArray(data.sessions) ? data.sessions : []);
    } catch (error) {
      setMessage(error.message || t.requestFailed);
    } finally {
      setLoading(false);
    }
  }

  const getStatus = (session) => {
    if (!session) return "low";
    const count = session.names.length;
    if (count >= session.max) return "full";
    if (count < session.min) return "low";
    return "open";
  };

  const getSpotsLeft = (session) => {
    if (!session) return 0;
    return Math.max(session.max - session.names.length, 0);
  };

  const joinSession = async () => {
    if (!selected || submitting) return;

    const trimmed = playerName.trim();
    const normalized = normalizeName(trimmed);

    if (!trimmed) {
      setMessage(t.emptyNameJoin);
      return;
    }

    if (normalizedSelectedNames.includes(normalized)) {
      setMessage(t.duplicateName);
      return;
    }

    if (selected.names.length >= selected.max) {
      setMessage(t.noPlace);
      return;
    }

    try {
      setSubmitting(true);
      const data = await apiRequest("/.netlify/functions/join-session", {
        method: "POST",
        body: {
          sessionId: selected.id,
          name: trimmed,
        },
      });
      setSessions(Array.isArray(data.sessions) ? data.sessions : []);
      setPlayerName("");
      setMessage(formatString(t.joinedSuccess, { name: trimmed }));
    } catch (error) {
      setMessage(error.message || t.requestFailed);
    } finally {
      setSubmitting(false);
    }
  };

  const leaveSession = async () => {
    if (!selected || submitting) return;

    const trimmed = playerName.trim();
    const normalized = normalizeName(trimmed);

    if (!trimmed) {
      setMessage(t.emptyNameLeave);
      return;
    }

    if (!normalizedSelectedNames.includes(normalized)) {
      setMessage(t.nameNotFound);
      return;
    }

    try {
      setSubmitting(true);
      const data = await apiRequest("/.netlify/functions/leave-session", {
        method: "POST",
        body: {
          sessionId: selected.id,
          name: trimmed,
        },
      });
      setSessions(Array.isArray(data.sessions) ? data.sessions : []);
      setPlayerName("");
      setMessage(formatString(t.removedSuccess, { name: trimmed }));
    } catch (error) {
      setMessage(error.message || t.requestFailed);
    } finally {
      setSubmitting(false);
    }
  };

  const shuffleTeams = () => {
    if (!selected || selected.names.length < selected.min) {
      setMessage(t.minPlayersShuffle);
      return;
    }
    setTeamSeed((prev) => prev + 1);
    setMessage(t.teamsShuffled);
  };

  const createSession = async () => {
    if (submitting) return;

    if (!newDate || !newTime || !newLocation.trim()) {
      setMessage(t.createValidation);
      return;
    }

    try {
      setSubmitting(true);
      const data = await apiRequest("/.netlify/functions/create-session", {
        method: "POST",
        body: {
          date: newDate,
          time: newTime,
          location: newLocation.trim(),
        },
      });
      setSessions(Array.isArray(data.sessions) ? data.sessions : []);
      if (data.created?.id) {
        setSelectedId(data.created.id);
      }
      setShowDeleteConfirm(false);
      setMessage(
        formatString(t.createdSuccess, {
          date: formatDisplayDate(newDate, language),
          time: newTime,
        })
      );
    } catch (error) {
      setMessage(error.message || t.requestFailed);
    } finally {
      setSubmitting(false);
    }
  };

  const deleteSelectedSession = async () => {
    if (!selected || submitting) return;

    try {
      setSubmitting(true);
      const data = await apiRequest("/.netlify/functions/delete-session", {
        method: "POST",
        body: {
          sessionId: selected.id,
        },
      });
      setSessions(Array.isArray(data.sessions) ? data.sessions : []);
      setShowDeleteConfirm(false);
      setMessage(t.deleteSuccess);
      setPlayerName("");
    } catch (error) {
      setMessage(error.message || t.requestFailed);
    } finally {
      setSubmitting(false);
    }
  };

  const copySessionSummary = async () => {
    if (!selected) return;

    const summary = [
      `${formatDisplayDate(selected.date, language)} · ${selected.time}`,
      selected.location,
      `${selected.names.length}/${selected.max} ${t.joined}`,
      selected.names.length < selected.min
        ? t.lowBanner
        : selected.names.length >= selected.max
          ? t.fullBanner
          : formatString(t.goodBanner, { count: selected.names.length }),
    ].join("\n");

    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(summary);
        setMessage(t.summaryCopied);
        return;
      }
      setMessage(summary);
    } catch {
      setMessage(summary);
    }
  };

  const selectedStatus = getStatus(selected);
  const hasSelectedSession = Boolean(selected);

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {showDeleteConfirm && hasSelectedSession && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
            <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200">
              <h3 className="text-xl font-semibold text-slate-900">{t.deleteConfirmTitle}</h3>
              <p className="mt-2 text-sm text-slate-500">{t.deleteConfirmText}</p>
              <div className="mt-5 flex gap-3">
                <button
                  onClick={deleteSelectedSession}
                  disabled={submitting}
                  className="flex-1 rounded-2xl bg-rose-600 px-4 py-3 text-sm font-medium text-white hover:bg-rose-700 disabled:opacity-60"
                >
                  {t.deleteConfirmYes}
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={submitting}
                  className="flex-1 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-60"
                >
                  {t.deleteConfirmNo}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">{t.preview}</p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">{t.title}</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">{t.subtitle}</p>
            </div>

            <div className="flex flex-col gap-3 xl:items-end">
              <div className="flex flex-wrap gap-2">
                {Object.entries(translations).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => setLanguage(key)}
                    className={`rounded-full px-3 py-2 text-xs font-semibold ring-1 transition ${
                      language === key
                        ? "bg-slate-900 text-white ring-slate-900"
                        : "bg-white text-slate-700 ring-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    {value.code}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
                  <div className="text-2xl font-bold text-slate-900">18</div>
                  <div className="text-xs text-slate-500">{t.maxPlayers}</div>
                </div>
                <div className="rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
                  <div className="text-2xl font-bold text-slate-900">10</div>
                  <div className="text-xs text-slate-500">{t.minPlayers}</div>
                </div>
                <div className="rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
                  <div className="text-2xl font-bold text-slate-900">6</div>
                  <div className="text-xs text-slate-500">{t.teamSize}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">{t.createSession}</h2>
                <p className="text-sm text-slate-500">{t.createSubtitle}</p>
                <p className="mt-1 text-xs text-slate-400">{t.openCreateHint}</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">{t.date}</label>
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">{t.time}</label>
                <input
                  type="time"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">{t.location}</label>
                <input
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder={t.locationPlaceholder}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
                />
              </div>
              <div className="md:col-span-2 grid gap-3 sm:grid-cols-2">
                <button
                  onClick={createSession}
                  disabled={submitting}
                  className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 disabled:opacity-60"
                >
                  {t.createButton}
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  disabled={!hasSelectedSession || submitting}
                  className="w-full rounded-2xl border border-rose-300 bg-white px-5 py-3 text-sm font-medium text-rose-700 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {t.deleteSession}
                </button>
              </div>
            </div>
          </section>

          <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">{t.upcomingSessions}</h2>
                <p className="text-sm text-slate-500">{t.upcomingSubtitle}</p>
              </div>
              <span className="rounded-2xl bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600 ring-1 ring-slate-200">
                {sessions.length} {t.sessions}
              </span>
            </div>

            {loading ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
                {t.loading}
              </div>
            ) : (
              <div className="space-y-3 max-h-[420px] overflow-auto pr-1">
                {sessions.map((session) => {
                  const status = getStatus(session);
                  return (
                    <button
                      key={session.id}
                      onClick={() => {
                        setSelectedId(session.id);
                        setMessage(t.sessionSelected);
                      }}
                      className={`w-full rounded-2xl border p-4 text-left transition ${
                        session.id === selected?.id
                          ? "border-slate-900 bg-slate-50"
                          : "border-slate-200 bg-white hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-lg font-semibold text-slate-900">{formatDisplayDate(session.date, language)}</h3>
                            <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyles[status].badge}`}>
                              {statusText[status]}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-slate-500">
                            {session.time} · {session.location}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                          {session.names.length}/{session.max}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </section>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr,0.95fr]">
          <div className="space-y-6">
            <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              {!hasSelectedSession ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                  <p className="text-sm font-medium text-slate-500">{t.selectedSession}</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-900">{t.noSessionYet}</h2>
                  <p className="mt-2 text-sm text-slate-500">{t.createFirstSession}</p>
                </div>
              ) : (
                <>
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500">{t.selectedSession}</p>
                      <h2 className="text-2xl font-semibold text-slate-900">{formatDisplayDate(selected.date, language)}</h2>
                      <p className="mt-1 text-sm text-slate-500">
                        {selected.time} · {selected.location}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600 ring-1 ring-slate-200">
                      {selected.names.length}/{selected.max} {t.joined}
                    </div>
                  </div>

                  <div className={`mt-5 rounded-2xl border px-4 py-3 text-sm font-medium ${statusStyles[selectedStatus].banner}`}>
                    {selected.names.length >= selected.max
                      ? t.fullBanner
                      : selected.names.length < selected.min
                        ? t.lowBanner
                        : formatString(t.goodBanner, { count: selected.names.length })}
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                      <div className="text-sm text-slate-500">{t.currentCount}</div>
                      <div className="mt-1 text-3xl font-bold text-slate-900">{selected.names.length}</div>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                      <div className="text-sm text-slate-500">{t.spotsLeft}</div>
                      <div className="mt-1 text-3xl font-bold text-slate-900">{getSpotsLeft(selected)}</div>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                      <div className="text-sm text-slate-500">{t.autoTeamMode}</div>
                      <div className="mt-1 text-lg font-semibold text-slate-900">{teamData.label}</div>
                    </div>
                  </div>

                  <div className="mt-5 rounded-3xl bg-slate-50 p-4 ring-1 ring-slate-200">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                      <div className="flex-1">
                        <label className="mb-2 block text-sm font-medium text-slate-700">{t.yourName}</label>
                        <input
                          value={playerName}
                          onChange={(e) => setPlayerName(e.target.value)}
                          placeholder={t.namePlaceholder}
                          className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2 sm:w-auto">
                        <button
                          onClick={joinSession}
                          disabled={submitting}
                          className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 disabled:opacity-60"
                        >
                          {t.countMeIn}
                        </button>
                        <button
                          onClick={leaveSession}
                          disabled={submitting}
                          className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-60"
                        >
                          {t.leave}
                        </button>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-slate-500">{message || t.sessionSelected}</p>
                  </div>

                  <div className="mt-5">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <h3 className="text-lg font-semibold text-slate-900">{t.joinedPlayers}</h3>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={copySessionSummary}
                          className="rounded-2xl border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                        >
                          {t.copySummary}
                        </button>
                        <span className="text-sm text-slate-500">{t.nameOnlyMode}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selected.names.map((name, index) => (
                        <span
                          key={`${selected.id}-${name}-${index}`}
                          className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 ring-1 ring-slate-200"
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </section>
          </div>

          <div className="space-y-6">
            <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">{t.autoTeamGenerator}</h2>
                  <p className="text-sm text-slate-500">{t.autoTeamSubtitle}</p>
                </div>
                <button
                  onClick={shuffleTeams}
                  disabled={!hasSelectedSession}
                  className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:-translate-y-0.5 disabled:opacity-50"
                >
                  {t.shuffle}
                </button>
              </div>

              {!hasSelectedSession || teamData.teams.length === 0 ? (
                <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
                  {!hasSelectedSession ? t.createSessionFirstForTeams : t.min10Hint}
                </div>
              ) : (
                <div className="mt-5 space-y-4">
                  {teamData.teams.map((team) => (
                    <div key={team.name} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                      <div className="mb-3 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-slate-900">{team.name}</h3>
                        <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-500 ring-1 ring-slate-200">
                          {formatString(t.teamMemberCount, { count: team.members.length })}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {team.members.map((member, index) => (
                          <div
                            key={`${team.name}-${member}-${index}`}
                            className="rounded-xl bg-white px-3 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-200"
                          >
                            {member}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  {teamData.rotation.length > 0 && (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-slate-900">{t.rotationPlayers}</h3>
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500 ring-1 ring-slate-200">
                          {teamData.rotation.length} {t.waiting}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {teamData.rotation.map((member, index) => (
                          <span
                            key={`${member}-${index}`}
                            className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 ring-1 ring-slate-200"
                          >
                            {member}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

function normalizeName(name) {
  return name.trim().toLowerCase().replace(/\s+/g, " ");
}

function seededShuffle(array, seed) {
  let currentIndex = array.length;
  let randomSeed = seed * 9301 + 49297;

  while (currentIndex !== 0) {
    randomSeed = (randomSeed * 9301 + 49297) % 233280;
    const randomIndex = Math.floor((randomSeed / 233280) * currentIndex);
    currentIndex -= 1;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

function formatDisplayDate(dateString, language) {
  const date = new Date(`${dateString}T12:00:00`);
  const localeMap = {
    en: "en-GB",
    de: "de-DE",
    hi: "hi-IN",
    ru: "ru-RU",
  };

  return date.toLocaleDateString(localeMap[language] || "en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

function formatString(template, values) {
  return Object.entries(values).reduce((acc, [key, value]) => {
    return acc.replaceAll(`{${key}}`, String(value));
  }, template);
}

async function apiRequest(url, options = {}) {
  const response = await fetch(url, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data?.error || "Request failed");
  }

  return data;
}
