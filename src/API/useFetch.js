import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            fetch(url)
                .then(res => {
                    if (!res.ok) {
                        throw Error('Could not fetch the data for that resource');
                    }
                    return res.json();
                })
                .then(data => {
                    setData(data);
                    setIsLoading(false);
                    setError(null)
                })
                .catch(err => {
                    setIsLoading(false)
                    setError(err.message)
                })
        }, 1000);
        return () => console.log('cleanup');
    }, [url])
    return { data, loading, error }
}

export default useFetch;