export class MongodbConfing {

	database: string;
	url: string;
	collection: {
			transactions: string
    };
}

export class SecMongodbConfig {
	user: string;
	password: string;
	authMechanism: string;
}
