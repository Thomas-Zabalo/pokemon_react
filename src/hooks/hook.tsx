import {useEffect, useState} from "react";

export function useFetch(url: string) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Erreur ${res.status}: ${res.statusText}`);
                }
                return res.json();
            })
            .then(newData => {
                setData(newData);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError(err.message);
                setData(null);
                setLoading(false);
            });
    }, [url]);

    return { data, loading, error };
}