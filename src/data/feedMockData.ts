import type { FeedPost, FeedStory, FeedComment, FeedUser, FeedNotification } from '@/types/feed';

const now = Date.now();

/** Реалистичные фото и видео из открытых источников */
const images = {
  // Природа и пейзажи
  nature1: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
  nature2: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
  nature3: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
  sunset: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=800&q=80',
  beach: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
  mountains: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
  
  // Город и архитектура
  city1: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80',
  city2: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80',
  city3: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&q=80',
  moscow: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?w=800&q=80',
  spb: 'https://images.unsplash.com/photo-1556610961-2fecc5927173?w=800&q=80',
  
  // Технологии и работа
  code: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
  laptop: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
  office: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
  conference: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
  
  // Еда и напитки
  coffee: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80',
  breakfast: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&q=80',
  food1: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
  
  // Книги и хобби
  books: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80',
  reading: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=800&q=80',
  
  // Люди и портреты
  people1: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
  selfie: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80',
  team: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
  
  // Аватары
  avatar1: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&q=80',
  avatar2: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
  avatar3: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
  avatar4: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
  avatar5: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80',
  avatar6: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80',
};

/** Тестовые видео (короткие, публичные) */
const videos = {
  nature: 'https://www.w3schools.com/html/mov_bbb.mp4',
  coding: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  travel: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
};

/** Мок-авторы ленты (для отображения имени и аватара) */
export const feedUsers: FeedUser[] = [
  { id: 'user-1', name: 'Александр Иванов', username: 'alex_ivanov', avatar: images.avatar1, followersCount: 42, followingCount: 128 },
  { id: 'feed-user-2', name: 'Мария Петрова', username: 'maria_p', avatar: images.avatar2, followersCount: 156, followingCount: 89, isFollowedByCurrentUser: true },
  { id: 'feed-user-3', name: 'Дмитрий Смирнов', username: 'dmitry_s', avatar: images.avatar3, followersCount: 89, followingCount: 200 },
  { id: 'feed-user-4', name: 'Елена Козлова', username: 'elena_k', avatar: images.avatar4, followersCount: 312, followingCount: 156 },
  { id: 'feed-user-5', name: 'Игорь Новиков', username: 'igor_n', avatar: images.avatar5, followersCount: 67, followingCount: 89 },
  { id: 'feed-user-6', name: 'Анна Волкова', username: 'anna_v', avatar: images.avatar6, followersCount: 445, followingCount: 203 },
];

function getFeedUser(id: string): FeedUser | undefined {
  return feedUsers.find((u) => u.id === id);
}

/** Мок-посты ленты (наполнены реалистичными фото и видео) */
export const initialFeedPosts: FeedPost[] = [
  {
    id: 'feed-post-1',
    authorId: 'feed-user-2',
    media: [{ id: 'm1', type: 'image', url: images.code }],
    caption: 'Отличный день для кода ☀️ Новый проект на React — столько идей! #разработка #react #coding',
    hashtags: ['разработка', 'react', 'coding'],
    createdAt: new Date(now - 1000 * 60 * 60 * 2),
    location: 'Москва',
    visibility: 'public',
    likeCount: 12,
    commentCount: 3,
    likedByCurrentUser: false,
  },
  {
    id: 'feed-post-2',
    authorId: 'feed-user-3',
    media: [{ id: 'm2', type: 'image', url: images.laptop }],
    caption: 'Новый проект в работе 🚀 Готовим что-то крутое для пользователей! #стартап #продукт',
    hashtags: ['стартап', 'продукт'],
    createdAt: new Date(now - 1000 * 60 * 60 * 5),
    visibility: 'public',
    likeCount: 28,
    commentCount: 7,
    likedByCurrentUser: true,
  },
  {
    id: 'feed-post-3',
    authorId: 'user-1',
    media: [{ id: 'm3', type: 'image', url: images.office }],
    caption: 'Первый рабочий день в новом офисе! Атмосфера супер 💼 #офис #работа',
    hashtags: ['офис', 'работа'],
    createdAt: new Date(now - 1000 * 60 * 30),
    visibility: 'public',
    likeCount: 5,
    commentCount: 2,
    likedByCurrentUser: false,
  },
  {
    id: 'feed-post-4',
    authorId: 'feed-user-4',
    media: [
      { id: 'm4a', type: 'image', url: images.beach },
      { id: 'm4b', type: 'image', url: images.sunset },
      { id: 'm4c', type: 'image', url: images.nature1 },
    ],
    caption: 'Незабываемый отпуск 🌸 Море, закаты и горы — что ещё нужно для счастья? #природа #отпуск #море',
    hashtags: ['природа', 'отпуск', 'море'],
    createdAt: new Date(now - 1000 * 60 * 60 * 8),
    location: 'Сочи',
    visibility: 'public',
    likeCount: 156,
    commentCount: 24,
    likedByCurrentUser: false,
  },
  {
    id: 'feed-post-5',
    authorId: 'feed-user-5',
    media: [{ id: 'm5', type: 'image', url: images.coffee }],
    caption: 'Утро начинается с ароматного кофе ☕️ Без него никуда! #кофе #утро #понедельник',
    hashtags: ['кофе', 'утро', 'понедельник'],
    createdAt: new Date(now - 1000 * 60 * 60 * 12),
    visibility: 'public',
    likeCount: 34,
    commentCount: 5,
    likedByCurrentUser: false,
  },
  {
    id: 'feed-post-6',
    authorId: 'feed-user-6',
    media: [
      { id: 'm6a', type: 'image', url: images.conference },
      { id: 'm6b', type: 'image', url: images.team },
    ],
    caption: 'Конференция по фронтенду — невероятный нетворкинг и топовые доклады! 🎤 Уже жду следующую #frontend #javascript #конференция #it',
    hashtags: ['frontend', 'javascript', 'конференция', 'it'],
    createdAt: new Date(now - 1000 * 60 * 60 * 18),
    location: 'Санкт-Петербург',
    visibility: 'public',
    likeCount: 189,
    commentCount: 32,
    likedByCurrentUser: true,
  },
  {
    id: 'feed-post-7',
    authorId: 'feed-user-2',
    media: [{ id: 'm7', type: 'video', url: videos.travel }],
    caption: 'Потрясающий вечер у моря 🌅 Звуки волн и закат — идеальный вечер',
    createdAt: new Date(now - 1000 * 60 * 60 * 24),
    location: 'Крым',
    visibility: 'public',
    likeCount: 72,
    commentCount: 9,
    likedByCurrentUser: false,
  },
  {
    id: 'feed-post-8',
    authorId: 'feed-user-4',
    media: [{ id: 'm8', type: 'image', url: images.books }],
    caption: 'Новая книга в коллекции 📚 «Чистый код» — must read для каждого разработчика! #книги #чтение #саморазвитие',
    hashtags: ['книги', 'чтение', 'саморазвитие'],
    createdAt: new Date(now - 1000 * 60 * 60 * 30),
    visibility: 'public',
    likeCount: 67,
    commentCount: 12,
    likedByCurrentUser: false,
  },
  {
    id: 'feed-post-9',
    authorId: 'feed-user-3',
    media: [{ id: 'm9', type: 'image', url: images.team }],
    caption: 'Релиз новой версии приложения! 🎉 Спасибо всей команде за невероятную работу. Вы лучшие! #релиз #продукт #команда',
    hashtags: ['релиз', 'продукт', 'команда'],
    createdAt: new Date(now - 1000 * 60 * 60 * 36),
    visibility: 'public',
    likeCount: 245,
    commentCount: 48,
    likedByCurrentUser: false,
  },
  {
    id: 'feed-post-10',
    authorId: 'feed-user-5',
    media: [{ id: 'm10', type: 'image', url: images.breakfast }],
    caption: 'Субботний завтрак с семьёй 🥞 Традиция, которую нельзя нарушать! #семья #выходные #завтрак',
    hashtags: ['семья', 'выходные', 'завтрак'],
    createdAt: new Date(now - 1000 * 60 * 60 * 42),
    visibility: 'public',
    likeCount: 45,
    commentCount: 8,
    likedByCurrentUser: false,
  },
  {
    id: 'feed-post-11',
    authorId: 'feed-user-6',
    media: [
      { id: 'm11a', type: 'image', url: images.moscow },
      { id: 'm11b', type: 'image', url: images.city1 },
      { id: 'm11c', type: 'image', url: images.city2 },
    ],
    caption: 'Вечерняя прогулка по центру 🌃 Москва особенно красива ночью #фото #город #москва #архитектура',
    hashtags: ['фото', 'город', 'москва', 'архитектура'],
    createdAt: new Date(now - 1000 * 60 * 60 * 48),
    location: 'Москва',
    visibility: 'public',
    likeCount: 134,
    commentCount: 19,
    likedByCurrentUser: false,
  },
  {
    id: 'feed-post-12',
    authorId: 'user-1',
    media: [
      { id: 'm12a', type: 'image', url: images.nature2 },
      { id: 'm12b', type: 'image', url: images.mountains },
    ],
    caption: 'Выходные в горах — лучший отдых от городской суеты 🏔️ #горы #природа #путешествия',
    hashtags: ['горы', 'природа', 'путешествия'],
    createdAt: new Date(now - 1000 * 60 * 15),
    location: 'Красная Поляна',
    visibility: 'public',
    likeCount: 28,
    commentCount: 6,
    likedByCurrentUser: false,
  },
  {
    id: 'feed-post-13',
    authorId: 'feed-user-2',
    media: [{ id: 'm13', type: 'video', url: videos.nature }],
    caption: 'Маленькое видео с прогулки по лесу 🌲 Звуки природы успокаивают #природа #видео #лес',
    hashtags: ['природа', 'видео', 'лес'],
    createdAt: new Date(now - 1000 * 60 * 60 * 52),
    visibility: 'public',
    likeCount: 89,
    commentCount: 14,
    likedByCurrentUser: true,
  },
  {
    id: 'feed-post-14',
    authorId: 'feed-user-3',
    media: [{ id: 'm14', type: 'image', url: images.spb }],
    caption: 'Питер, ты прекрасен в любую погоду 🌧️ Белые ночи скоро! #питер #спб #путешествия',
    hashtags: ['питер', 'спб', 'путешествия'],
    createdAt: new Date(now - 1000 * 60 * 60 * 56),
    location: 'Санкт-Петербург',
    visibility: 'public',
    likeCount: 178,
    commentCount: 27,
    likedByCurrentUser: false,
  },
  {
    id: 'feed-post-15',
    authorId: 'feed-user-5',
    media: [{ id: 'm15', type: 'image', url: images.food1 }],
    caption: 'Готовил новый рецепт — получилось невероятно вкусно! 🍽️ Скоро выложу рецепт #еда #готовка #рецепт',
    hashtags: ['еда', 'готовка', 'рецепт'],
    createdAt: new Date(now - 1000 * 60 * 60 * 60),
    visibility: 'public',
    likeCount: 56,
    commentCount: 11,
    likedByCurrentUser: false,
  },
];

/** Мок-комментарии к постам */
export const initialFeedComments: FeedComment[] = [
  { id: 'fc-1', postId: 'feed-post-1', authorId: 'feed-user-3', text: 'React — отличный выбор! Какую версию используешь?', createdAt: new Date(now - 1000 * 60 * 60 * 1.9), likeCount: 5, likedByCurrentUser: false },
  { id: 'fc-2', postId: 'feed-post-1', authorId: 'feed-user-2', parentId: 'fc-1', text: 'React 18 с новыми хуками, очень доволен!', createdAt: new Date(now - 1000 * 60 * 60 * 1.8), likeCount: 3, likedByCurrentUser: false },
  { id: 'fc-3', postId: 'feed-post-1', authorId: 'feed-user-6', text: 'Успехов в проекте! 💪', createdAt: new Date(now - 1000 * 60 * 60 * 1.5), likeCount: 2, likedByCurrentUser: false },
  { id: 'fc-4', postId: 'feed-post-2', authorId: 'user-1', text: 'Удачи с проектом! Расскажи потом, что получилось 🚀', createdAt: new Date(now - 1000 * 60 * 60 * 4), likeCount: 4, likedByCurrentUser: false },
  { id: 'fc-5', postId: 'feed-post-2', authorId: 'feed-user-4', text: 'Когда планируете релиз? Уже интересно!', createdAt: new Date(now - 1000 * 60 * 60 * 4.5), likeCount: 6, likedByCurrentUser: false },
  { id: 'fc-6', postId: 'feed-post-2', authorId: 'feed-user-3', parentId: 'fc-5', text: 'Через пару недель, если всё пойдёт по плану!', createdAt: new Date(now - 1000 * 60 * 60 * 4.3), likeCount: 2, likedByCurrentUser: false },
  { id: 'fc-7', postId: 'feed-post-4', authorId: 'feed-user-5', text: 'Какая красота! Море просто невероятное 🌊', createdAt: new Date(now - 1000 * 60 * 60 * 7.5), likeCount: 8, likedByCurrentUser: false },
  { id: 'fc-8', postId: 'feed-post-4', authorId: 'user-1', text: 'Тоже хочу в Сочи! Как там погода сейчас?', createdAt: new Date(now - 1000 * 60 * 60 * 7.4), likeCount: 3, likedByCurrentUser: false },
  { id: 'fc-9', postId: 'feed-post-4', authorId: 'feed-user-4', parentId: 'fc-8', text: 'Супер! +25, солнце каждый день ☀️', createdAt: new Date(now - 1000 * 60 * 60 * 7.2), likeCount: 5, likedByCurrentUser: false },
  { id: 'fc-10', postId: 'feed-post-6', authorId: 'feed-user-2', text: 'Была там в прошлом году — огонь! Доклады топ 🔥', createdAt: new Date(now - 1000 * 60 * 60 * 17), likeCount: 12, likedByCurrentUser: false },
  { id: 'fc-11', postId: 'feed-post-6', authorId: 'feed-user-3', text: 'Какой доклад понравился больше всего?', createdAt: new Date(now - 1000 * 60 * 60 * 16.5), likeCount: 4, likedByCurrentUser: false },
  { id: 'fc-12', postId: 'feed-post-6', authorId: 'feed-user-6', parentId: 'fc-11', text: 'Про оптимизацию рендеринга — очень полезно!', createdAt: new Date(now - 1000 * 60 * 60 * 16.3), likeCount: 7, likedByCurrentUser: false },
  { id: 'fc-13', postId: 'feed-post-9', authorId: 'feed-user-6', text: 'Поздравляю с релизом! 🎉 Отличная работа команды!', createdAt: new Date(now - 1000 * 60 * 60 * 35), likeCount: 15, likedByCurrentUser: false },
  { id: 'fc-14', postId: 'feed-post-9', authorId: 'feed-user-2', text: 'Ура! Уже скачала, тестирую 🙌', createdAt: new Date(now - 1000 * 60 * 60 * 34.5), likeCount: 8, likedByCurrentUser: false },
  { id: 'fc-15', postId: 'feed-post-9', authorId: 'user-1', text: 'Круто! Какие главные фичи в этом релизе?', createdAt: new Date(now - 1000 * 60 * 60 * 34), likeCount: 6, likedByCurrentUser: false },
  { id: 'fc-16', postId: 'feed-post-11', authorId: 'feed-user-5', text: 'Москва ночью — это магия! 🌃', createdAt: new Date(now - 1000 * 60 * 60 * 47), likeCount: 9, likedByCurrentUser: false },
  { id: 'fc-17', postId: 'feed-post-12', authorId: 'feed-user-4', text: 'Горы — это свобода! Отличные фото 🏔️', createdAt: new Date(now - 1000 * 60 * 12), likeCount: 4, likedByCurrentUser: false },
  { id: 'fc-18', postId: 'feed-post-14', authorId: 'user-1', text: 'Питер всегда в сердце! ❤️', createdAt: new Date(now - 1000 * 60 * 60 * 55), likeCount: 11, likedByCurrentUser: false },
];

/** Мок-истории (24 часа) — несколько авторов для просмотра */
export const initialFeedStories: FeedStory[] = [
  {
    id: 'fs-1',
    authorId: 'feed-user-2',
    media: { id: 'sm1', type: 'image', url: images.selfie },
    overlayText: 'Доброе утро! ☀️',
    createdAt: new Date(now - 1000 * 60 * 60 * 1),
    expiresAt: new Date(now + 1000 * 60 * 60 * 23),
  },
  {
    id: 'fs-2',
    authorId: 'feed-user-3',
    media: { id: 'sm2', type: 'image', url: images.code },
    overlayText: 'Кодим допоздна 💻',
    createdAt: new Date(now - 1000 * 60 * 30),
    expiresAt: new Date(now + 1000 * 60 * 60 * 23.5),
  },
  {
    id: 'fs-3',
    authorId: 'feed-user-4',
    media: { id: 'sm3', type: 'video', url: videos.travel },
    createdAt: new Date(now - 1000 * 60 * 60 * 2),
    expiresAt: new Date(now + 1000 * 60 * 60 * 22),
  },
  {
    id: 'fs-4',
    authorId: 'feed-user-5',
    media: { id: 'sm4', type: 'image', url: images.coffee },
    overlayText: 'Время кофе ☕',
    createdAt: new Date(now - 1000 * 60 * 45),
    expiresAt: new Date(now + 1000 * 60 * 60 * 23.25),
  },
  {
    id: 'fs-5',
    authorId: 'feed-user-6',
    media: { id: 'sm5', type: 'image', url: images.sunset },
    overlayText: 'Невероятный закат 🌅',
    createdAt: new Date(now - 1000 * 60 * 15),
    expiresAt: new Date(now + 1000 * 60 * 60 * 23.75),
  },
  {
    id: 'fs-6',
    authorId: 'feed-user-2',
    media: { id: 'sm6', type: 'image', url: images.nature3 },
    overlayText: 'Прогулка в лесу 🌲',
    createdAt: new Date(now - 1000 * 60 * 20),
    expiresAt: new Date(now + 1000 * 60 * 60 * 23.7),
  },
];

/** Мок-уведомления ленты */
export const initialFeedNotifications: FeedNotification[] = [
  { id: 'fn-1', type: 'like_post', actorId: 'feed-user-2', recipientId: 'user-1', postId: 'feed-post-3', createdAt: new Date(now - 1000 * 60 * 15), read: false },
  { id: 'fn-2', type: 'comment', actorId: 'feed-user-3', recipientId: 'user-1', postId: 'feed-post-1', commentId: 'fc-1', createdAt: new Date(now - 1000 * 60 * 60 * 1.9), read: false },
  { id: 'fn-3', type: 'subscribe', actorId: 'feed-user-3', recipientId: 'user-1', createdAt: new Date(now - 1000 * 60 * 60 * 3), read: true },
  { id: 'fn-4', type: 'comment_reply', actorId: 'feed-user-2', recipientId: 'user-1', postId: 'feed-post-1', commentId: 'fc-2', createdAt: new Date(now - 1000 * 60 * 60 * 1.5), read: true },
  { id: 'fn-5', type: 'like_comment', actorId: 'feed-user-4', recipientId: 'user-1', postId: 'feed-post-2', commentId: 'fc-4', createdAt: new Date(now - 1000 * 60 * 60 * 2), read: false },
  { id: 'fn-6', type: 'subscribe', actorId: 'feed-user-5', recipientId: 'user-1', createdAt: new Date(now - 1000 * 60 * 45), read: false },
  { id: 'fn-7', type: 'new_post', actorId: 'feed-user-6', recipientId: 'user-1', postId: 'feed-post-6', createdAt: new Date(now - 1000 * 60 * 60 * 18), read: true },
  { id: 'fn-8', type: 'like_post', actorId: 'feed-user-4', recipientId: 'user-1', postId: 'feed-post-12', createdAt: new Date(now - 1000 * 60 * 10), read: false },
];

export { getFeedUser };
