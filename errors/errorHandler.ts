function errorHandler(err: Error, req: any, res: any, next: any) {
    console.error('Unhandled Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
    
    next(err);
}

export default errorHandler;