function logError(err: Error, req: any, res: any) {
    console.error('Error occurred in route:', req.method, req.url);
    console.error('Arguments:', " req.params:", req.params, "req.query:", req.query, "req.body:", req.body);
    console.error('Error message:', err.message);
  
    // next(err);
}

export default logError;