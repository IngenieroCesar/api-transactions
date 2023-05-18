export class KafkaConfig {
	clientId: string;
	url: string;
	port: number;
	bindings: {
    topicName: {
      sendTransactionCreated: string;
      sendTransactionStatusApproved: string;
      sendTransactionStatusRejected: string;
    };
    groupId: {
      yapeFlow: string;
    };
  };
}

export class SecKafkaConfig {
	key: string;
	secret: string;
	mechanism: any;
}
