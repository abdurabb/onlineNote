const Note = require('../../models/Notes')

const addNewNote = async (req, res) => {
    const body = req.body
    try {
        if (!body) {
            return res.status(400).json({
                success: false,
                error: 'You must provide a Data',
            })
        }

        const noteData = new Note({
            title: body.noteTitle,
            content: body.noteOptions,
            user: body.user
        })
        const note = noteData.save()
        if (note) {
            return res.status(200).json({
                success: true,
                messege: 'Successfully Added New Note'
            })
        }

    } catch (error) {
        return res.status(400).json({
            success: false,
            messege: 'Something Went Wrong',
            error: error,
        })
    }
}
const getNoteData = async (req, res) => {
    try {
        const id = req.query.id
        if (!id) {
            return res.status(400).json({
                success: false,
                messege: 'Something Went Wrong',
            })
        }

        const notes = await Note.find({ user: id })
        return res.status(200).json({
            success: true,
            messege: 'Success',
            notes
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            messege: 'Something Went Wrong',
            error: error,
        })
    }
}

const deleteNote = async (req, res) => {
    try {
        const id = req.query.id
        const deleteData = await Note.findByIdAndDelete({ _id: id })
        if (deleteData) {
            return res.status(200).json({
                success: true,
                messege: 'Successfully Deleted',
            })
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            messege: 'Something Went Wrong',
            error: error,
        })
    }

}

const editeNote = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({
                success: false,
                messege: 'Something Went Wrong',
            })
        }

        const updatedData = await Note.findByIdAndUpdate({ _id: req.body.noteId }, {
            $set: {
                title: req.body.noteTitle,
                content: req.body.noteOptions
            }
        })

        if (updatedData) {
            return res.status(200).json({
                success: true,
                messege: 'Successfully Updated Note'
            })
        }

    } catch (error) {
        return res.status(400).json({
            success: false,
            messege: 'Something Went Wrong',
            error: error,
        })
    }
}
module.exports = {
    addNewNote, getNoteData, deleteNote, editeNote
}