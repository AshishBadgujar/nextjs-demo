import Todo from '../../models/Todo'
import initDB from '../../helpers/db'

initDB();

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getTodos(req, res);
            break;
        case "POST":
            await saveTodos(req, res);
            break;
        case "DELETE":
            await deleteTodo(req, res);
            break;
        default:
            break;
    }
}

const getTodos = async (req, res) => {
    let todos = await Todo.find().sort({ createdAt: -1 })
    if (todos) {
        res.json(todos)
    } else {
        res.json([])
    }
}

const saveTodos = async (req, res) => {
    const { text } = req.body;
    if (!text) { return res.json({ err: 'Please add something !' }) }
    try {
        const todos = await new Todo({
            text,
        }).save()
        res.json(todos)
    } catch (error) {
        console.log(error)
        return res.json({ err: error })
    }
}
const deleteTodo = async (req, res) => {
    const { id } = req.body
    try {
        const todos = await Todo.findOneAndDelete(
            { _id: id },
            { new: true }
        )
        res.json(todos)
    } catch (error) {
        console.log(error)
        return res.json({ err: 'error in deleting todo !' })
    }
}