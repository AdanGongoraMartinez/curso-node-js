// import { MovieModel } from '../models/local-file-system/movie.js'
// import { MovieModel } from '../models/database/movie.js'
import { validateMovie, validatePartialMovie } from '../schemas/movies.js'

export class MovieController {
  constructor({ movieModel }) {
    this.movieModel = movieModel
  }

  getAll = async (req, res) => {
    const { genre } = req.query
    const movies = await this.movieModel.getAll({ genre })

    // que se renderiza
    res.json(movies)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const movie = await this.movieModel.getById({ id })
    if (movie) return res.json(movie)

    res.status(404).json({ message: 'Movie not found' })
  }

  create = async (req, res) => {
    /* const result = validateMovie(req.body)

    if (result.error) {
      return res.status(400).json({ error: result.error.message })
    }

    const newMovie = await MovieModel.create({ input: result.data })

    res.status(201).json(newMovie) */

    const result = validateMovie(req.body)

    if (result.error) {
      return res.status(400).json({ error: result.error.message })
    }

    try {
      const newMovie = await this.movieModel.create({ input: result.data })

      // Verifica qué contiene `newMovie` antes de enviarlo en la respuesta
      console.log(newMovie)

      // Si `newMovie` no tiene el valor correcto, verifica si está retornando algo en la función `create`.
      res.status(201).json(newMovie)
    } catch (error) {
      console.error(error) // Log del error en caso de fallo
      res.status(500).json({ error: 'Error creating movie' })
    }
  }

  update = async (req, res) => {
    const result = validatePartialMovie(req.body)

    if (!result.success) return res.status(400).json({ error: result.error.message })

    const { id } = req.params

    const updatedMovie = await this.movieModel.update({ id, input: result.data })

    return res.json(updatedMovie)
  }

  delete = async (req, res) => {
    const { id } = req.params

    const result = await this.movieModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    return res.json({ message: 'Movie deleted' })
  }
}
