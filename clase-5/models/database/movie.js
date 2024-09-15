import mysql from 'mysql2/promise'

const DEFAULT_CONFIG = {
  host: '192.168.1.105',
  user: 'node',
  password: 'node',
  port: 3306,
  database: 'moviesdb'
}

const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG
const connection = await mysql.createConnection(connectionString)

export class MovieModel {
  // to do > obetener geners

  static async getGenresByName({ name }) {
    // obtener ids de la base de datos usando los nombres
    const [genre] = await connection.query(
      'SELECT id, name FROM genre WHERE LOWER(name) = ?;', [name]
    )
    if (genre.length === 0) return []

    return genre
  }

  static async getAll({ genre }) {
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase()

      // Obtener la id del primer resultado del género
      const genres = await this.getGenresByName({ name: lowerCaseGenre })
      if (genres.length === 0) return [] // Si no hay géneros, retornar vacío

      const [{ id }] = genres // Obtener la id del primer género

      // obtener las peliculas de ese genero
      const [moviesFilteredByGenre] = await connection.query(
        `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(movie.id) as id 
       FROM movie 
       JOIN movie_genre ON movie.id = movie_genre.movie_id 
       WHERE movie_genre.genre_id = ?;`,
        [id]
      )
      if (moviesFilteredByGenre === 0) return []

      return moviesFilteredByGenre
    }

    // si no hay genero, devuelve todas las peliculas
    const [movies] = await connection.query(
      'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie;'
    ) // el query retorna una tubla [datos, estructura-tabla]
    // [movies] -> para obtener solo los datos

    return movies
  }

  static async getById({ id }) {
    // obtener ids de la base de datos usando los nombres
    const [movieById] = await connection.query(
      `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) 
      FROM movie 
      WHERE id = UUID_TO_BIN(?);`,
      [id]
    )
    if (movieById.length === 0) return []

    return movieById
  }

  static async create({ input }) {
    const {
      genre: genreInput, // genre is an array
      title, year, director, duration, poster, rate
    } = input

    const [uuidResult] = await connection.query('SELECT UUID() uuid')
    const uuid = uuidResult[0].uuid // Obtener el valor real de uuid

    console.log(uuid)
    // Iniciar transacción
    await connection.query('START TRANSACTION')

    try {
      await connection.query(
        `INSERT INTO movie (id, title, year, director, duration, poster, rate) 
         VALUES (UUID_TO_BIN(?),?,?,?,?,?,?);`,
        [uuid, title, year, director, duration, poster, rate]
      )

      for (const genre of genreInput) {
        await connection.query(
          `INSERT INTO movie_genre (movie_id, genre_id) VALUES
          (UUID_TO_BIN(?), (SELECT id FROM genre WHERE name = ?));`,
          [uuid, genre]
        )
      }

      // Confirmar transacción
      await connection.query('COMMIT')

      // Verificar si la película se creó correctamente

      const [createdMovie] = await this.getById(uuid)
      /* const [createdMovie] = await connection.query(
        `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id)
        FROM movie
        WHERE id = UUID_TO_BIN(?);`,
        [uuid]
      ) */
      console.log(`Created Movie: ${JSON.stringify(createdMovie)}`) // Log para verificar la película creada

      return createdMovie
    } catch (e) {
      // Revertir la transacción en caso de error
      await connection.query('ROLLBACK')

      // NUNCA permitir que el usuario vea este error
      // ya que puede manerja info sensible
      throw new Error('Error creating movie')
      // enviar traza a un servicio interno
      // sendLog(e)
    }
  }

  static async update({ id, input }) {
    // to do
  }

  static async delete({ id }) {
    await connection.query(
      `DELETE
      FROM movie 
      WHERE id = UUID_TO_BIN(?);`,
      [id]
    )
  }
}
