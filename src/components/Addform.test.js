import { render, fireEvent, screen } from '@testing-library/react'
import { user } from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect';
import Addform from './Addform'

test('integration test', async () => {
    const TITLE = 'Test Title';
    const ALBUM = 'Test Album';
    const ARTIST = 'Test Artist';

    render(<Addform />);

    const titleInput = screen.getByLabelText(/title/i)
    const albumInput = screen.getByLabelText(/artist/i)
    const artistInput = screen.getByLabelText(/album/i)
    const submitButton = screen.getByText(/save/i)

    try {
        user.type(titleInput, TITLE)
        user.type(albumInput, ALBUM)
        user.type(artistInput, ARTIST)
    }
    catch (err) {
        'error'
    }

    fireEvent.click(submitButton)

    expect(await screen.findByText(/title/i)).toBeInTheDocument();
    expect(await screen.findByText(/artist/i)).toBeInTheDocument();
    expect(await screen.findByText(/album/i)).toBeInTheDocument();

})

