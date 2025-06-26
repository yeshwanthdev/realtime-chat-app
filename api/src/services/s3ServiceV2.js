const AWS = require('aws-sdk'),
	rm = require('@root/rm');

class AWSS3Service {
	constructor(config) {
		this.config = config;
		//Initiallising AWS Configuration
		this.init();
		//Creating AWS S3 instance
		this.s3 = new AWS.S3({ params: { Bucket: this.config.BucketName } });
	}

	//private later
	init() {
		AWS.config.accessKeyId = this.config.AccessKeyId;
		AWS.config.secretAccessKey = this.config.SecretAccessKey;
		AWS.config.region = this.config.Region;
		AWS.config.name = this.config.BucketName;
	}

	async upload(file, input = {}) {
		const params = {
			Key: input.path,
			ContentType: input.type,
			Body: file,
			ACL: 'public-read',
		};
		try {
			const result = await this.s3.putObject(params).promise();
			return result;
		} catch (error) {
			throw error;
		}
	}

	async deleteFile(input) {
		const params = { Bucket: this.config.BucketName, Key: input.path };
		try {
			const result = await this.s3.deleteObject(params).promise();
			return result;
		} catch (error) {
			throw error;
		}
	}
}

module.exports = AWSS3Service;
