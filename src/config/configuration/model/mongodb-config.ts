export class MongodbConfing {

	database: string;
	url: string;
	collection: {
        loan: string
    };
}

export class SecMongodbConfig {
	user: string;
	password: string;
	authMechanism: string;
}
