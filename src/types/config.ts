type configType = {
  PORT: number;
  mongoPath: string;
  jwtSecret: string;
  jwtSession: {
    session: boolean;
  };
  saltRounds: number;
  uploadPath: string;
  maxWeight: number;
};

export { configType };
