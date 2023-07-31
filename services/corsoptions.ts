// const allowedOrigins = ['https://example.com', 'http://anotherdomain.com', undefined];
const corsOptions = {
  // origin: (origin: any, callback: any) => {
  //   if (allowedOrigins.includes(origin)) {
  //     callback(null, true);
  //   } else {
  //     console.log(origin);
  //     callback(new Error('Not allowed by CORS'));
  //   }
  // },
  // origin: '*'
};

export default corsOptions;