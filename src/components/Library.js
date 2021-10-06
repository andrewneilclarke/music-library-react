const Library = ({ tracks, handleDelete }) => {

    console.log(tracks)

    return (
        <div className="flex flex-col p-8">
            <h1 className="flex flex-col">Recently Added</h1>
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 border-black">
                {tracks.map((item) => (
                    <li key={item.id} className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
                        <div className="w-full flex items-center justify-between p-6 space-x-6">
                            <div className="flex-1 truncate">
                                <div className="flex items-center space-x-3">
                                    <h3 className="text-gray-900 text-sm font-medium truncate">{item.title}</h3>

                                    <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                                        {item.album}
                                    </span>
                                </div>
                                <p className="mt-1 text-gray-900 text-sm truncate">{item.artist}</p>
                                <p className="mt-1 text-gray-500 text-sm truncate">{item.genre}</p>
                            </div>
                            <img className="w-20 h-20 bg-gray-300 rounded-full flex-shrink-0" src={item.artwork} alt="artwork" />
                        </div>
                        <div>
                            <div className="-mt-px flex divide-x divide-gray-200">
                                <div className="w-0 flex-1 flex">
                                    <div onClick={() => handleDelete(item.id)}

                                        className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="-ml-px w-0 flex-1 flex">
                                    <div

                                        className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Library;