const fnName = async (params) => {
    try {
        
    } catch (error) {
        console.error('[fnName]', error);
        throw error;
    }
};
const data = await fetch('url', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
}).then((res) => {
    if (!res.ok) throw new Error(`HTTP {res.status}: {res.statusText}`);
    return res.json();
});
console.log('%clabel', 'color:#c69b7e;font-weight:bold', value);
fa-motion
fa-zod-Form
fa-DeviceMotionEvent
fa-zod-FormData
<fa-motion></fa-motion>
import { motion } from 'framer-motion';

const variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: 'easeOut' },
    },
};

<motion.div
    variants={variants}
    initial="hidden"
    animate="visible"
    
/>
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const formSchema = z.object({
    field: z.string().min(1, 'Required'),
});

type formSchemaValues = z.infer<typeof formSchema>;

export function MyForm() {
    const form = useForm<formSchemaValues>({
        resolver: zodResolver(formSchema),
        defaultValues: { field: '' },
    });

    return (
        <form onSubmit={form.handleSubmit((data) => {
            
        })}>
            {/* fields */}
        </form>
    );
}
import React, { createContext, useContext, useReducer, useMemo } from 'react';

interface StateType {
    data: any[];
    isLoading: boolean;
    error: string | null;
}

type ActionType =
    | { type: 'FETCH_START' }
    | { type: 'FETCH_SUCCESS'; payload: any[] }
    | { type: 'FETCH_FAILURE'; payload: string };

const initialState: StateType = { data: [], isLoading: false, error: null };

const reducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case 'FETCH_START': return { ...state, isLoading: true, error: null };
        case 'FETCH_SUCCESS': return { ...state, isLoading: false, data: action.payload };
        case 'FETCH_FAILURE': return { ...state, isLoading: false, error: action.payload };
        default: return state;
    }
};

const NameStateContext = createContext<StateType | undefined>(undefined);
const NameDispatchContext = createContext<React.Dispatch<ActionType> | undefined>(undefined);

export const NameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const memoizedState = useMemo(() => state, [state]);

    return (
        <NameStateContext.Provider value={memoizedState}>
            <NameDispatchContext.Provider value={dispatch}>
                {children}
            </NameDispatchContext.Provider>
        </NameStateContext.Provider>
    );
};

export const useNameState = () => {
    const context = useContext(NameStateContext);
    if (context === undefined) throw new Error('useNameState must be used within a NameProvider');
    return context;
};

export const useNameDispatch = () => {
    const context = useContext(NameDispatchContext);
    if (context === undefined) throw new Error('useNameDispatch must be used within a NameProvider');
    return context;
};

<fa-hook></fa-hook>
import { useState, useEffect } from 'react';

export function use
(param: string) {
    const [data, setData] = useState<unknown>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);

        (async () => {
            try {
                const result = await fetchData(param);
                if (!cancelled) setData(result);
            } catch (err) {
                if (!cancelled) setError(err as Error);
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();

        return () => { cancelled = true; };
    }, [param]);

    return { data, loading, error };
}
import { useState, useEffect } from 'react';

interface HookResponse<T> {
    data: T | null;
    isLoading: boolean;
    error: string | null;
}

export const useStatefulFetch = <T,>(url: string): HookResponse<T> => {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        const execFetch = async () => {
            try {
                setIsLoading(true);
                const res = await fetch(url, { signal: controller.signal });
                if (!res.ok) throw new Error(`Network unexpected status: ${res.status}`);
                const json = await res.json();
                setData(json);
            } catch (err: any) {
                if (err.name !== 'AbortError') {
                    setError(err.message || 'An unexpected error occurred');
                }
            } finally {
                setIsLoading(false);
            }
        };

        execFetch();
        return () => controller.abort();
    }, [url]);

    return { data, isLoading, error };
};
