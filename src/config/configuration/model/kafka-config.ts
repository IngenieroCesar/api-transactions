export class KafkaConfig {
	url: string;
	port: number;
	bindings: {
    topicName: {
      sendTransactionCreated: string;
      sendTransactionStatusApproved: string;
      sendTransactionStatusRejected: string;
    };
  };
}