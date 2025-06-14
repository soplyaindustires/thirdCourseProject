-- Таблица пользователей
-- Хранит данные о студентах и организаторах событий
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,                      -- Уникальный идентификатор пользователя
    login VARCHAR(255) UNIQUE NOT NULL,        -- Логин 
    password VARCHAR(255) NOT NULL,            -- Пароль 
    role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'creator')),  -- Роль: участник или создатель события
    full_name VARCHAR(255),                    -- Полное ФИО пользователя
    educational_program VARCHAR(255),          -- Образовательная программа (например, "Программная инженерия")
    group_number VARCHAR(50),                  -- Номер группы (например, "БПМ221")
    course INTEGER,                           -- Курс обучения от 1 до 4
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP      -- Дата регистрации
);

-- Таблица событий
-- Хранит информацию о мероприятиях
CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,                     -- Уникальный идентификатор события
    title VARCHAR(255) NOT NULL,              -- Название события
    description TEXT,                          -- Описание события
    start TIMESTAMP NOT NULL,                  -- Дата начала
    "end" TIMESTAMP NOT NULL,                 -- Дата окончания
    place VARCHAR(255),                        -- Место проведения
    creator_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,  -- Связь с таблицей пользователей
    info_url TEXT,                             -- Ссылка на подробности
    registration_url TEXT                      -- Ссылка на регистрацию
);

-- Индексы для ускорения поиска и JOIN'ов

-- Индекс по логину — используется при авторизации
CREATE INDEX IF NOT EXISTS idx_users_login ON users(login);

-- Индекс по id — не обязателен, но полезен для явных указаний
CREATE INDEX IF NOT EXISTS idx_users_id ON users(id);

-- Индекс по creator_id — ускоряет поиск событий по создателю
CREATE INDEX IF NOT EXISTS idx_events_creator_id ON events(creator_id);

-- Индекс по id для событий — ускоряет поиск по ID
CREATE INDEX IF NOT EXISTS idx_events_id ON events(id);