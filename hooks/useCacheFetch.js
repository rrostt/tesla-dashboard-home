import { useState, useEffect } from 'react'

const cacheFetch = ({ url, timeout = 60000 }) => {
    const urlCache = JSON.parse(localStorage['urlCache'] || '{}')

    if (urlCache[url] && urlCache[url].timestamp > Date.now() - timeout) {
        return Promise.resolve(urlCache[url].data)
    } else {
        return fetch(url)
            .then(response => response.json())
            .then(data => {
                urlCache[url] = {
                    timestamp: Date.now(),
                    data: data
                }
                localStorage.setItem('urlCache', JSON.stringify(urlCache))
                return data
            })
    }
}

const useCacheFetch = ({ url, timeout = 60000 }) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [updateToken, setUpdateToken] = useState(Math.random())

    useEffect(() => {
        const urlCache = JSON.parse(localStorage['urlCache'] || '{}')

        if (urlCache[url] && urlCache[url].timestamp > Date.now() - timeout) {
            setData(urlCache[url].data)
        } else {
            setLoading(true)
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    setData(data)
                    urlCache[url] = {
                        timestamp: Date.now(),
                        data: data
                    }
                    localStorage.setItem('urlCache', JSON.stringify(urlCache))
                    setLoading(false)
                })
                .catch(() => setLoading(false))
        }
    }, [updateToken])

    const update = () => {
        const urlCache = JSON.parse(localStorage['urlCache'] || '{}')
        delete urlCache[url]
        localStorage.setItem('urlCache', JSON.stringify(urlCache))
        setUpdateToken(Math.random())
    }

    return {
        data,
        loading,
        update
    }
}

export {
    cacheFetch,
    useCacheFetch
}

export default useCacheFetch
