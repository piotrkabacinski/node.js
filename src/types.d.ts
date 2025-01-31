declare namespace NodeJS {
  export interface ProcessEnv {
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_DB: string;
    POSTGRES_HOST: string;
    NODE_ENV: "development" | "production" | "test";
    REDIS_HOST: string;
    REDIS_PORT: string;
    APP_PORT: string;
    REDIS_URL?: string;
    DATABASE_URL?: string;
  }
}
