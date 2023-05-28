import { Router } from 'express'
import { connection } from '../../apis/database.js'
import { authenticateToken } from '../../apis/authenticateToken.js'

const getAllCharacter = Router()

getAllCharacter.get('/', authenticateToken, async (req, res) => {
  try {
    const itemsPerPage = 10
    const page = parseInt(req.query.page) || 1 // use query parameter or default to 1
    const offset = (page - 1) * itemsPerPage

    const timeZoneOffset = '+07:00' // change this to your desired timezone offset

    const countQuery = 'SELECT COUNT(*) as count FROM hp_character'
    const dataQuery = `
    SELECT hp_character.*, hp_character_image.image_url, 
    DATE_FORMAT(CONVERT_TZ(hp_character.created_at, '+00:00', '${timeZoneOffset}'), '%Y-%m-%d %H:%i:%s') as created_at,
    DATE_FORMAT(CONVERT_TZ(hp_character.updated_at, '+00:00', '${timeZoneOffset}'), '%Y-%m-%d %H:%i:%s') as updated_at
    FROM hp_character
    LEFT JOIN hp_character_image ON hp_character.image_id = hp_character_image.id
    ORDER BY hp_character.updated_at DESC
    LIMIT ${itemsPerPage} OFFSET ${offset}`

    const [countResult] = await (await connection()).query(countQuery)
    const [dataResult] = await (await connection()).query(dataQuery)

    const totalCount = countResult[0].count

    const totalPages = Math.ceil(totalCount / itemsPerPage)

    const response = {
      status: res.statusCode,
      data: dataResult,
      meta: {
        pagination: {
          page: page,
          itemsPerPage: itemsPerPage,
          totalCount: totalCount,
          totalPages: totalPages,
          links: {
            ...(page < totalPages && {
              next: `https://api-harry-potter-app.cyclic.app/characters?page=${
                page + 1
              }`
            }),
            ...(page > 1 &&
              page <= totalPages && {
                previous: `https://api-harry-potter-app.cyclic.app/characters?page=${
                  page - 1
                }`
              })
          }
        }
      }
    }

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.json(response)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default getAllCharacter
