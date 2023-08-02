import dotenv from 'dotenv';

dotenv.config();

type TConfig = {
	[key: string]: EnvironmentConfig;
};

type EnvironmentConfig = {
	app: AppConfig;
	db: MongoDBConfig;
};

type AppConfig = {
	PORT: string | number;
};

type MongoDBConfig = {
	URI: string;
};

if(process.env.NODE_ENV === 'production'){
    dotenv.config({path: '.env.production'});
} else {
    dotenv.config({path: '.env.development'})
}

const ENV = process.env.NODE_ENV ?? 'development';

const CONFIG: TConfig = {
	development: {
		app: {
			PORT: process.env.PORT || 8080,
		},
		db: {
			URI: process.env.MONGO_DB_URI || 'mongodb://localhost:27017/test_development',
		},
	},
	production: {
		app: {
			PORT: process.env.PORT || 8081,
		},
		db: {
			URI: process.env.MONGO_DB_URI || 'mongodb://localhost:27017/test_production',
		},
	},
};

export default CONFIG[ENV];
