import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Note from '../Note/Note';
import { createNote } from '../../api/notesApi';

const Notes = (params) => {
    const [notes, setNotes] = useState(params.notes);

    const handleNoteCreate = async () => {
        const newNote = { title: 'Новая заметка', content: 'Текст заметки' };

        try {
            await createNote(newNote);
            window.location.reload();
        } catch (error) {
            alert(error);
        }
    }


    return (
        <div className='container'>
            <h1 className='mt-3 mb-3'>Заметки</h1>
                <Button variant='warning' className='mb-3' onClick={handleNoteCreate}>+ Создать заметку</Button>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='jumbotron'>
                            <ul className='list-group'>
                                {notes.slice(0).reverse().map((note) => 
                                    <Note note={note} />
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
        </div>
    )
};

export default Notes;