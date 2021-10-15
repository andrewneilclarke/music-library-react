import { Link } from 'react-router-dom'

const Library2 = ({ tracks, handleDelete, handleEdit }) => {
    return (
        <div className="p-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {tracks.map((track) => (
                    <div
                        key={track.id}
                        className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                        <div className="flex-shrink-0">
                            <img className="h-10 w-10 rounded-full" src="https://cdn-icons-png.flaticon.com/512/1384/1384061.png" alt="artwork" />
                        </div>
                        <div className="flex flex-row">
                            <div className="flex-1 min-w-0 mr-3">
                                <a href="#" className="focus:outline-none">
                                    <span className="absolute inset-0" aria-hidden="true" />
                                    <p className="text-sm font-medium text-gray-900">{track.title}</p>
                                    <p className="text-sm text-gray-500 truncate">{track.artist}</p>
                                </a>
                            </div>
                            <div className="flex-1 min-w-0 mr-3">
                                <a href="#" className="focus:outline-none">
                                    <span className="absolute inset-0" aria-hidden="true" />
                                    <p className="text-sm font-medium text-gray-900">{track.title}</p>
                                    <p className="text-sm text-gray-500 truncate">{track.artist}</p>
                                </a>
                            </div>
                            <div>
                                <div className="-mt-px flex divide-x divide-gray-200 justify-self-end">
                                    <div className="w-0 flex-1 flex">
                                        <div onClick={() => handleDelete(track.id)}

                                            className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </div>
                                    </div>

                                    <div
                                        className="-ml-px w-0 flex-1 flex">
                                        <div

                                            className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                                        >
                                            <Link to={`/tracks/${track.id}`} onClick={handleEdit}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Library2;