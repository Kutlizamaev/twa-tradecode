// server/index.cjs
const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 4000 // можно сменить на 4001, если 4000 занят

app.use(cors())
app.use(express.json())

// Простая проверка, что сервер жив
app.get('/ping', (req, res) => {
    console.log('GET /ping')
    res.json({ ok: true })
})

// "База" в памяти
let users = [
    {
        id: 1,
        telegramId: 111111,
        telegramUsername: 'existing_user',
    },
]

// Примитивный парсер initData вида "telegramId=123;username=vasya"
function parseInitData(initData) {
    console.log('parseInitData raw:', initData)
    const result = {}
    initData.split(';').forEach((part) => {
        const [key, val] = part.split('=')
        if (key && val) {
            result[key.trim()] = val.trim()
        }
    })
    console.log('parsed:', result)
    return result
}

// Авторизация по initData
app.post('/auth/telegram', (req, res) => {
    console.log('POST /auth/telegram, body:', req.body)

    const { initData } = req.body || {}

    if (!initData) {
        console.log('no initData')
        return res.status(400).json({ error: 'initData is required' })
    }

    const parsed = parseInitData(initData)
    const telegramId = Number(parsed.telegramId)
    const telegramUsername = parsed.username || 'no_username'

    if (!telegramId) {
        console.log('no telegramId in initData')
        return res
            .status(400)
            .json({ error: 'telegramId is missing in initData' })
    }

    let user = users.find((u) => u.telegramId === telegramId)

    if (!user) {
        user = {
            id: users.length + 1,
            telegramId,
            telegramUsername,
        }
        users.push(user)
        console.log('created new user:', user)
    } else {
        console.log('found existing user:', user)
    }

    const token = `mock-token-for-${telegramId}`

    const response = { token, user }
    console.log('response:', response)

    return res.json(response)
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
